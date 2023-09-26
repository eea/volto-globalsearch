import { buildQuery } from './healthcheck';

const SLOTS = [
  'aboveSearchInput',
  'belowSearchInput',
  'aboveResults',
  'belowResults',
];
jest.mock('@eeacms/search', () => ({
  SLOTS: SLOTS,
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

describe('build_test_query', () => {
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
