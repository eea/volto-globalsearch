import {
  buildQuery,
  getlastfailed_execution,
  getlastandnext_started_execution,
  getlastsynctaskssincestarted,
  getlatesttasks_for_site,
  getlastsuccessfultasks_for_site,
  getStatus,
} from './healthcheck';
import healthcheck from './healthcheck';

import { runRequest } from '@eeacms/search';

import failed_scheduled_atempts_since_last_started_resp from './healthcheck_queries/failed_scheduled_atempts_since_last_started_resp.json';
import last_scheduled_started_indexing_resp from './healthcheck_queries/last_scheduled_started_indexing_resp.json';
import last_sync_task_since_last_start_resp from './healthcheck_queries/last_sync_task_since_last_start_resp.json';
import latest_tasks_for_site_resp from './healthcheck_queries/latest_tasks_for_site_resp.json';
import started_or_finished_site_since_last_started_resp from './healthcheck_queries/started_or_finished_site_since_last_started_resp.json';
import empty_resp from './healthcheck_queries/empty_resp.json';
const SLOTS = [
  'aboveSearchInput',
  'belowSearchInput',
  'aboveResults',
  'belowResults',
];
jest.mock('@eeacms/search', () => ({
  SLOTS: SLOTS,
  runRequest: jest.fn(),
  buildRequest: jest.fn(),
}));

const query1 = {
  query: {
    bool: {
      must: [],
      must_not: [],
      should: [],
    },
  },
  from: 0,
  size: 1,
  index: '<index_name>',
};

const built_query1 = {
  query: {
    bool: {
      must: [],
      must_not: [],
      should: [],
    },
  },
  from: 0,
  size: 1,
  index: 'test_index',
};

const query2 = {
  query: {
    bool: {
      must: [],
      must_not: [],
      should: [],
    },
  },
  from: 0,
  size: '<size>',
};

const built_query2 = {
  query: {
    bool: {
      must: [],
      must_not: [],
      should: [],
    },
  },
  from: 0,
  size: '10',
};

const query3 = {
  query: {
    bool: {
      must: [
        {
          terms: {
            term_field: ['<site_name>'],
          },
        },
      ],
      must_not: [],
      should: [],
    },
  },
  from: 0,
  size: '<size>',
  sort: [
    {
      start_time_ts: 'desc',
    },
  ],
  index: '<index_name>',
};

const built_query3 = {
  query: {
    bool: {
      must: [
        {
          terms: {
            term_field: ['test_site'],
          },
        },
      ],
      must_not: [],
      should: [],
    },
  },
  from: 0,
  size: '10',
  sort: [
    {
      start_time_ts: 'desc',
    },
  ],
  index: 'test_index',
};

describe('test building the queries', () => {
  it('should replace 1 string variable with the value in the query', () => {
    const params = { index_name: 'test_index' };
    const bQuery = buildQuery(query1, params);
    expect(bQuery).toEqual(built_query1);
  });

  it('should replace 1 numeric variable with the value in the query', () => {
    const params = { size: 10 };
    const bQuery = buildQuery(query2, params);
    expect(bQuery).toEqual(built_query2);
  });

  it('should replace more variables with the values in the query', () => {
    const params = {
      index_name: 'test_index',
      site_name: 'test_site',
      size: 10,
    };
    const bQuery = buildQuery(query3, params);
    expect(bQuery).toEqual(built_query3);
  });
});

describe('test parsing the response from elasticsearch for correct response', () => {
  it('should return last_started and next_execution_date', () => {
    const resp = getlastandnext_started_execution(
      last_scheduled_started_indexing_resp,
    );
    expect(resp).toEqual({
      last_started: 1695732613000,
      next_execution_date: 1695732900000,
    });
  });

  it('should return last_started and next_execution_date of failed task', () => {
    const resp = getlastfailed_execution(
      failed_scheduled_atempts_since_last_started_resp,
    );
    expect(resp).toEqual({
      last_started: 1695732613000,
      next_execution_date: 1695732900000,
    });
  });

  it('should return list of clusters', () => {
    const resp = getlastsynctaskssincestarted(
      last_sync_task_since_last_start_resp,
    );
    expect(resp).toEqual({ sites: ['test_site1', 'test_site2'] });
  });

  it('if the last task for a site did not fail, return "OK"', async () => {
    const resp = await getlatesttasks_for_site(latest_tasks_for_site_resp);
    expect(resp).toEqual('OK');
  });

  it('if the last task for a site was succesful, return true', async () => {
    const resp = getlastsuccessfultasks_for_site(
      started_or_finished_site_since_last_started_resp,
    );
    expect(resp).toEqual(true);
  });
});

describe('test parsing the response from elasticsearch for empty response', () => {
  it('should return no results', () => {
    try {
      getlastandnext_started_execution(empty_resp);
    } catch (e) {
      expect(e.message).toEqual('no results');
    }
  });

  it('should return no results', () => {
    try {
      getlastfailed_execution(empty_resp);
    } catch (e) {
      expect(e.message).toEqual('no results');
    }
  });

  it('should return list of clusters', () => {
    try {
      getlastsynctaskssincestarted(empty_resp);
    } catch (e) {
      expect(e.message).toEqual('no results');
    }
  });

  it('if the last task for a site did not fail, return "OK"', async () => {
    try {
      await getlatesttasks_for_site(empty_resp);
    } catch (e) {
      expect(e.message).toEqual('Failed to get info');
    }
  });

  it("if the can't take the status for the last task for a site, return false", async () => {
    const resp = getlastsuccessfultasks_for_site(empty_resp);
    expect(resp).toEqual(false);
  });
});

describe('test the status of the index', () => {
  it('test', async () => {
    runRequest
      .mockReturnValueOnce(
        Promise.resolve({ body: last_scheduled_started_indexing_resp }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          body: failed_scheduled_atempts_since_last_started_resp,
        }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          body: last_sync_task_since_last_start_resp,
        }),
        // )
        // .mockReturnValueOnce(
        //   Promise.resolve({
        //     body: started_or_finished_site_since_last_started_resp,
        //   }),
      );
    const params = { index_name: 'test_index', now: 1695732000000 };
    const status = await getStatus({}, params);
    expect(status).toEqual({ status: 'OK' });
  });
});

describe('test the healthcheck', () => {
  it('test', async () => {
    runRequest
      .mockReturnValueOnce(
        Promise.resolve({ body: { hits: { total: { value: 60001 } } } }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          body: {
            elapsed: {
              step1: [{ query: { delta: 0.5 } }],
              step2: [{ query: { delta: 0.6 } }],
            },
          },
        }),
      )

      .mockReturnValueOnce(
        Promise.resolve({ body: last_scheduled_started_indexing_resp }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          body: failed_scheduled_atempts_since_last_started_resp,
        }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          body: last_sync_task_since_last_start_resp,
        }),
      )
      .mockReturnValueOnce(
        Promise.resolve({
          body: started_or_finished_site_since_last_started_resp,
        }),
      );
    const params = { index_name: 'test_index', now: 1695732000000 };
    const status = await healthcheck({}, params);
    expect(status).toEqual({ status: '1K' });
  });
});
