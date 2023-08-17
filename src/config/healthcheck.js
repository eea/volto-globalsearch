import runRequest from '@eeacms/search/lib/runRequest';
import buildRequest from '@eeacms/search/lib/search/query';
import getInfo from '@eeacms/search/lib/getIndexInfo';

const default_documentCountThreshold = 60000;
const default_queryTimeSecondsThreshold_OK = 2;
const default_queryTimeSecondsThreshold_WARNING = 5;
const default_indexUpdatedHoursThreshold_OK = 1;
const default_indexUpdatedHoursThreshold_WARNING = 1;

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
        indexUpdatedHoursThreshold_OK,
        indexUpdatedHoursThreshold_WARNING,
      } = query;
      documentCountThreshold =
        documentCountThreshold || default_documentCountThreshold;
      queryTimeSecondsThreshold_OK =
        queryTimeSecondsThreshold_OK || default_queryTimeSecondsThreshold_OK;
      queryTimeSecondsThreshold_WARNING =
        queryTimeSecondsThreshold_WARNING ||
        default_queryTimeSecondsThreshold_WARNING;
      indexUpdatedHoursThreshold_OK =
        indexUpdatedHoursThreshold_OK || default_indexUpdatedHoursThreshold_OK;
      indexUpdatedHoursThreshold_WARNING =
        indexUpdatedHoursThreshold_WARNING ||
        default_indexUpdatedHoursThreshold_WARNING;

      const body_total = buildRequest({ filters: [] }, appConfig);

      const resp_total = await runRequest(body_total, appConfig);
      const total = resp_total.body.hits.total.value;
      const total_status = total > documentCountThreshold ? 'Ok' : 'CRITICAL';
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
          ? 'OK'
          : total_elapsed < queryTimeSecondsThreshold_WARNING
          ? 'WARNING'
          : 'CRITICAL';

      const indexedAt = await getInfo(appConfig);
      const currentDate = new Date();
      const indexedDelta = (currentDate - indexedAt) / 36000000;
      const indexed_status =
        indexedDelta < indexUpdatedHoursThreshold_OK
          ? 'OK'
          : indexedDelta < indexUpdatedHoursThreshold_WARNING
          ? 'WARNING'
          : 'CRITICAL';

      let status = 'OK';
      if (elapsed_status === 'WARNING' || indexed_status === 'WARNING') {
        status = 'WARNING';
      }
      if (
        total_status === 'CRITICAL' ||
        elapsed_status === 'CRITICAL' ||
        indexed_status === 'CRITICAL'
      ) {
        status = 'CRITICAL';
      }
      resolve({
        status: status,
        documentCount: total_status,
        queryTime: elapsed_status,
        indexUpdated: indexed_status,
      });
    } catch {
      reject({ status: 'Critical' });
    }
  });
}
