import runRequest from '@eeacms/search/lib/runRequest';
import buildRequest from '@eeacms/search/lib/search/query';
import getInfo from '@eeacms/search/lib/getIndexInfo';

export default async function healthcheck(appConfig) {
  // is index ok?
  // return index update date
  // run default query, see number of results
  // nlpservice provides answer based on extracted term
  // number of documents with error in data raw, type of error

  return new Promise(async (resolve, reject) => {
    try {
      const body_total = buildRequest({ filters: [] }, appConfig);

      const resp_total = await runRequest(body_total, appConfig);
      const total = resp_total.body.hits.total.value;

      const body_nlp = buildRequest(
        { filters: [], searchTerm: 'what is bise?' },
        appConfig,
      );
      const resp_nlp = await runRequest(body_nlp, appConfig);
      const elapsed = resp_nlp.body.elapsed;

      const info = await getInfo(appConfig);

      resolve({ documentCount: total, elapsed: elapsed, index_info: info });
    } catch {
      reject({ total: -1 });
    }
  });
}
