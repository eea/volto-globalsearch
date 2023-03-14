import runRequest from '@eeacms/search/lib/runRequest';
import buildRequest from '@eeacms/search/lib/search/query';

export default function healthcheck(appConfig) {
  // is index ok?
  // return index update date
  // run default query, see number of results
  // nlpservice provides answer based on extracted term
  // number of documents with error in data raw, type of error

  return new Promise((resolve, reject) => {
    const body = buildRequest({ filters: [] }, appConfig);
    runRequest(body, appConfig).then((resp) => {
      let total;
      try {
        total = resp.body.hits.total.value;
        resolve({ documentCount: total });
      } catch {
        reject({ total: -1 });
      }
    });
  });
}
