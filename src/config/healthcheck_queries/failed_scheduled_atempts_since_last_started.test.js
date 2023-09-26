import { getlastfailed_execution } from '../healthcheck';
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
      took: 963,
      timed_out: false,
      _shards: {
        total: 1,
        successful: 1,
        skipped: 0,
        failed: 0,
      },
      hits: {
        total: {
          value: 624,
          relation: 'eq',
        },
        max_score: null,
        hits: [
          {
            _index: 'status_test_index',
            _id: 'main_task_2023_09_26_12_50_13',
            _score: null,
            _source: {
              '@version': '1',
              cluster: 'main_task',
              start_time_ts: 1695732613000,
              docs_cnt: 92190,
              sites: ['test_site'],
              next_execution_date: '2023_09_26_12_55_00',
              next_execution_date_ts: 1695732900000,
              start_time: '2023_09_26_12_50_13',
              task_name: 'scheduled',
              msg: '',
              index_name: 'status_test_index',
              id: 'main_task_2023_09_26_12_50_13',
              status: 'Started',
              '@timestamp': '2023-09-26T12:50:13.450Z',
            },
            sort: [1695732613000],
          },
        ],
      },
    },
  }),
}));

describe('test_healthcheck', () => {
  it('should return last_started and next_execution_date', async () => {
    const appConfig = { index_name: 'test_index' };

    const resp = await getlastfailed_execution(appConfig, {});
    expect(resp).toEqual({
      last_started: 1695732613000,
      next_execution_date: 1695732900000,
    });
  });
});
