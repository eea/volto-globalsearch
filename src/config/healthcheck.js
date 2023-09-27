import { runRequest, buildRequest } from '@eeacms/search';
//import getInfo from '@eeacms/search/lib/getIndexInfo';

import failed_scheduled_atempts_since_last_started from './healthcheck_queries/failed_scheduled_atempts_since_last_started.json';
//import failed_site_since_last_started from './healthcheck_queries/failed_site_since_last_started.json';
//import last_scheduled_indexing from './healthcheck_queries/last_scheduled_indexing.json';
import last_scheduled_started_indexing from './healthcheck_queries/last_scheduled_started_indexing.json';
import last_sync_task_since_last_start from './healthcheck_queries/last_sync_task_since_last_start.json';
import latest_tasks_for_site from './healthcheck_queries/latest_tasks_for_site.json';
import started_or_finished_site_since_last_started from './healthcheck_queries/started_or_finished_site_since_last_started.json';

const default_documentCountThreshold = 60000;
const default_queryTimeSecondsThreshold_OK = 2;
const default_queryTimeSecondsThreshold_WARNING = 5;
const default_failedSyncThreshold_WARNING = 5;
const default_failedSyncThreshold_OK = 2;

export function buildQuery(query, values) {
  let q = JSON.stringify(query);
  Object.keys(values).forEach(function (key, value) {
    q = q.split('<' + key + '>').join(values[key]);
  });
  return JSON.parse(q);
}

async function executeQuery(q, appConfig, params = {}) {
  return new Promise(async (resolve, reject) => {
    params['index_name'] = 'status_' + appConfig['index_name'];
    const query = buildQuery(q, params);
    //console.log(JSON.stringify(query));
    const resp = await runRequest(query, appConfig);
    // console.log(JSON.stringify(resp.body));
    resolve(resp.body);
  });
}

export async function getlastandnext_started_execution(appConfig) {
  return new Promise(async (resolve, reject) => {
    const body = await executeQuery(last_scheduled_started_indexing, appConfig);
    resolve({
      last_started: body.hits.hits[0]._source.start_time_ts,
      next_execution_date: body.hits.hits[0]._source.next_execution_date_ts,
    });
  });
}

export async function getlastfailed_execution(appConfig, params) {
  return new Promise(async (resolve, reject) => {
    const body = await executeQuery(
      failed_scheduled_atempts_since_last_started,
      appConfig,
      params,
    );
    if (body.hits.total.value > 0) {
      resolve({
        last_started: body.hits.hits[0]._source.start_time_ts,
        next_execution_date: body.hits.hits[0]._source.next_execution_date_ts,
      });
    } else {
      reject({ error: 'no results' });
    }
  });
}

export async function getlastsynctaskssincestarted(appConfig, params) {
  return new Promise(async (resolve, reject) => {
    const body = await executeQuery(
      last_sync_task_since_last_start,
      appConfig,
      params,
    );
    if (body.hits.total.value > 0) {
      resolve({
        sites: body.hits.hits[0]._source.sites,
      });
    } else {
      reject({ error: 'no results' });
    }
  });
}

export async function getlastsuccessfultasks_for_site(appConfig, params) {
  return new Promise(async (resolve, reject) => {
    const body = await executeQuery(
      started_or_finished_site_since_last_started,
      appConfig,
      params,
    );
    if (body.hits.total.value > 0) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}

export async function getlatesttasks_for_site(appConfig, params) {
  return new Promise(async (resolve, reject) => {
    const body = await executeQuery(latest_tasks_for_site, appConfig, params);
    if (body.hits.total.value > 0) {
      let status = 'OK';
      let i = 0;
      while (true) {
        const doc = body.hits.hits[i]._source;
        if (doc.status === 'Finished') {
          break;
        }
        i++;
        if (i === params.THRESHOLD_WARNING) {
          break;
        }
      }
      if (i >= params.THRESHOLD_OK && i < params.THRESHOLD_WARNING) {
        status = 'WARNING';
      }
      if (i >= params.THRESHOLD_WARNING) {
        status = 'CRITICAL';
      }
      resolve(status);
    } else {
      reject('Failed to get info');
    }
  });
}

async function getStatus(appConfig, params) {
  return new Promise(async (resolve, reject) => {
    let resp = 'OK';
    let error = null;
    // console.log('=======================================');
    // console.log('STEP 1');
    const step1 = await getlastandnext_started_execution(appConfig);

    // console.log(step1);

    // const last_successful_schedule = step1.last_started;
    let next_schedule = step1.next_execution_date;

    const now = Date.now() - 60 * 1000;
    if (now >= next_schedule) {
      try {
        // console.log('=======================================');
        // console.log('STEP 2');
        const step2 = await getlastfailed_execution(appConfig, step1);
        next_schedule = step2.next_execution_date;
        // console.log(step2);
      } catch {
        resp = 'CRITICAL';
        error = 'Failed to get status info from elasticsearch';
      }
    }
    if (error === null) {
      if (now > next_schedule) {
        resp = 'CRITICAL';
        error = 'Airflow stopped indexing, no new schedules in the queue';
      } else {
        try {
          const step3 = await getlastsynctaskssincestarted(appConfig, step1);
          // console.log(step3.sites);
          const all_sites_status = {};
          for (let i = 0; i < step3.sites.length; i++) {
            try {
              // console.log('=======================================');
              // console.log('STEP 4');
              // const step4 =
              await getlastsuccessfultasks_for_site(appConfig, {
                site_name: step3.sites[i],
                last_started: step1['last_started'],
              });
              all_sites_status[step3.sites[i]] = 'OK';
              // console.log(step4);
            } catch {
              // console.log('=======================================');
              // console.log('STEP 5');
              const step5 = await getlatesttasks_for_site(appConfig, {
                site_name: step3.sites[i],
                last_started: step1['last_started'],
                THRESHOLD_WARNING: parseInt(
                  params.FAILED_SYNC_THRESHOLD_WARNING,
                ),
                THRESHOLD_OK: parseInt(params.FAILED_SYNC_THRESHOLD_OK),
              });
              all_sites_status[step3.sites[i]] = step5;
            }
          }
          // console.log(all_sites_status);
          const oks = [];
          const warnings = [];
          const criticals = [];
          for (let i = 0; i < step3.sites.length; i++) {
            if (all_sites_status[step3.sites[i]] === 'OK') {
              oks.push(step3.sites[i]);
            }
            if (all_sites_status[step3.sites[i]] === 'WARNING') {
              warnings.push(step3.sites[i]);
            }
            if (all_sites_status[step3.sites[i]] === 'CRITICAL') {
              criticals.push(step3.sites[i]);
            }
            if (criticals.length > 0) {
              error =
                'Clusters with too many fails: ' +
                criticals.concat(warnings).join(', ');
              resp = 'CRITICAL';
            } else {
              if (warnings.length > 0) {
                error =
                  'Clusters with too many fails: ' +
                  criticals.concat(warnings).join(', ');
                resp = 'WARNING';
              }
            }
          }
        } catch {
          error = 'Failed to get status info from elasticsearch';
        }
      }
    }
    const status = { status: resp };
    if (error !== null) {
      status.error = error;
    }
    resolve(status);
  });
}
export default async function healthcheck(appConfig, query) {
  // is index ok?
  // return index update date
  // run default query, see number of results
  // nlpservice provides answer based on extracted term
  // number of documents with error in data raw, type of error

  return new Promise(async (resolve, reject) => {
    try {
      let {
        documentCountThreshold,
        queryTimeSecondsThreshold_OK,
        queryTimeSecondsThreshold_WARNING,
        failedSyncThreshold_OK,
        failedSyncThreshold_WARNING,
      } = query;
      documentCountThreshold =
        documentCountThreshold || default_documentCountThreshold;
      queryTimeSecondsThreshold_OK =
        queryTimeSecondsThreshold_OK || default_queryTimeSecondsThreshold_OK;
      queryTimeSecondsThreshold_WARNING =
        queryTimeSecondsThreshold_WARNING ||
        default_queryTimeSecondsThreshold_WARNING;
      failedSyncThreshold_OK =
        failedSyncThreshold_OK || default_failedSyncThreshold_OK;
      failedSyncThreshold_WARNING =
        failedSyncThreshold_WARNING || default_failedSyncThreshold_WARNING;

      const airflow_params = {
        FAILED_SYNC_THRESHOLD_WARNING: failedSyncThreshold_WARNING,
        FAILED_SYNC_THRESHOLD_OK: failedSyncThreshold_OK,
      };

      ///////////////////
      const body_total = buildRequest({ filters: [] }, appConfig);
      //console.log(body_total);
      const resp_total = await runRequest(body_total, appConfig);
      const total = resp_total.body.hits.total.value;
      const total_status =
        total > documentCountThreshold
          ? { status: 'OK' }
          : {
              status: 'CRITICAL',
              error:
                'The number of documents in elasticsearch dropped drastically',
            };
      const body_nlp = buildRequest(
        { filters: [], searchTerm: 'what is bise?' },
        appConfig,
      );
      const resp_nlp = await runRequest(body_nlp, appConfig);
      const elapsed = resp_nlp.body.elapsed;

      let total_elapsed = 0;
      Object.keys(elapsed).forEach((key) => {
        elapsed[key].forEach((nlp_step) => {
          Object.keys(nlp_step).forEach((step_name) => {
            total_elapsed += nlp_step[step_name].delta;
          });
        });
      });

      const elapsed_status =
        total_elapsed < queryTimeSecondsThreshold_OK
          ? { status: 'OK' }
          : total_elapsed < queryTimeSecondsThreshold_WARNING
          ? { status: 'WARNING', error: 'Slow response from NLP' }
          : { status: 'CRITICAL', error: 'Slow response from NLP' };

      const airflow_status = await getStatus(appConfig, airflow_params);

      let status = { status: 'OK' };
      if (
        elapsed_status.status === 'WARNING' ||
        airflow_status.status === 'WARNING'
      ) {
        status = { status: 'WARNING' };
      }
      if (
        total_status.status === 'CRITICAL' ||
        elapsed_status.status === 'CRITICAL' ||
        airflow_status.status === 'CRITICAL'
      ) {
        status = { status: 'CRITICAL' };
      }

      const errors_list = [];
      if (total_status.error) {
        errors_list.push(total_status.error);
      }
      if (elapsed_status.error) {
        errors_list.push(elapsed_status.error);
      }
      if (airflow_status.error) {
        errors_list.push(airflow_status.error);
      }
      if (errors_list.length > 0) {
        status.error = errors_list.join('\n');
      }
      resolve(status);
    } catch (e) {
      reject({ status: 'Critical', error: e.message });
    }
  });
}
