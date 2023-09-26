import { getlastsuccessfultasks_for_site } from '../healthcheck';
//import last_scheduled_started_indexing_RESP from './last_scheduled_started_indexing_RESP.json';

const SLOTS = [
  'aboveSearchInput',
  'belowSearchInput',
  'aboveResults',
  'belowResults',
];

jest.mock('@eeacms/search', () => ({
  SLOTS: SLOTS,
}));

jest.mock('@eeacms/search/lib/runRequest', () => ({
  runRequest: jest.fn().mockResolvedValue({
    body: {
      took: 18,
      timed_out: false,
      _shards: {
        total: 1,
        successful: 1,
        skipped: 0,
        failed: 0,
      },
      hits: {
        total: {
          value: 271,
          relation: 'eq',
        },
        max_score: null,
        hits: [
          {
            _index: 'status_test_index',
            _id: 'test_site_2023_09_26_13_02_28',
            _score: null,
            _source: {
              '@version': '1',
              '@timestamp': '2023-09-26T13:04:34.337Z',
              cluster: 'test_site',
              start_time_ts: 1695733348000,
              msg: '',
              index_name: 'status_test_index',
              id: 'test_site_2023_09_26_13_02_28',
              start_time: '2023_09_26_13_02_28',
              status: 'Finished',
            },
            sort: [1695733348000],
          },
        ],
      },
    },
  }),
}));

describe('test_healthcheck', () => {
  it('should return true', async () => {
    const appConfig = { index_name: 'test_index' };

    const resp = await getlastsuccessfultasks_for_site(appConfig, {});
    expect(resp).toEqual(true);
  });
});
