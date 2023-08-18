import install from './index';
import globalSearchConfig from './global-search-config.js';

import '@testing-library/jest-dom/extend-expect';

const SLOTS = [
  'aboveSearchInput',
  'belowSearchInput',
  'aboveResults',
  'belowResults',
];

jest.mock('@eeacms/search', () => ({
  runRequest: jest.fn(),
  booleanFacet: jest.fn(),
  multiTermFacet: jest.fn(),
  makeRange: jest.fn(),
  histogramFacet: jest.fn(),
  fixedRangeFacet: jest.fn(),
  dateRangeFacet: jest.fn(),
  mergeConfig: jest.fn((config) => config),
  suiFacet: jest.fn(),
  isFilterValueDefaultValue: jest.fn(),
  SLOTS: SLOTS,
}));

jest.mock('./facets', () => ({
  facets: [],
}));

jest.mock('./clusters', () => ({
  typesForClustersOptionsFilter: jest.fn(),
  clusters: {
    name: 'op_cluster',
    field: 'objectProvides',
    clusters: [
      {
        name: 'News',
        icon: { name: 'bullhorn' },
        values: ['News', 'Article'],
        defaultResultView: 'horizontalCard',
      },
      {
        name: 'Publications',
        icon: { name: 'book' },
        values: [
          'Report',
          'Indicator',
          'Briefing',
          'Topic page',
          'Country fact sheet',
        ],
        defaultResultView: 'horizontalCard',
      },
    ],
  },
}));

describe('getActiveFilters', () => {
  it('should return an array with issued.date', () => {
    const filters = [
      { field: 'foo' },
      { field: 'issued.date', values: ['All time'] },
      { field: 'issued.date', values: ['test'] },
    ];
    const appConfig = {
      searchui: {
        default: {},
        minimal: {
          facets: [],
        },
      },
      resolve: {
        getGlobalSearchhealthcheck: 'global',
      },
      facets: [
        {
          isFilter: true,
          showInFacetsList: undefined,
          field: 'issued.date',
        },
      ],
    };
    const result = install(appConfig);
    const activeFilters = result.resolve.getGlobalSearchActiveFilters(
      filters,
      appConfig,
    );
    expect(activeFilters).toEqual([{ field: 'issued.date', values: ['test'] }]);
  });

  it('should return an array with provided field name', () => {
    const filters = [{ field: 'foo' }];
    const appConfig = {
      searchui: {
        default: {},
        minimal: {
          facets: [],
        },
      },
      resolve: {
        getGlobalSearchhealthcheck: 'global',
      },
      facets: [
        {
          isFilter: false,
          showInFacetsList: true,
          field: 'foo',
        },
      ],
    };
    const result = install(appConfig);
    const activeFilters = result.resolve.getGlobalSearchActiveFilters(
      filters,
      appConfig,
    );
    expect(activeFilters).toEqual([
      {
        field: 'foo',
      },
    ]);
  });

  it('should return an empty array if no facets are provided', () => {
    const filters = [{ field: 'foo' }];
    const appConfig = {
      searchui: {
        default: {},
        minimal: {
          facets: [],
        },
      },
      resolve: {
        getGlobalSearchhealthcheck: 'global',
      },
      facets: undefined,
    };
    const result = install(appConfig);
    const activeFilters = result.resolve.getGlobalSearchActiveFilters(
      filters,
      appConfig,
    );
    expect(activeFilters).toEqual([]);
  });

  it('should return an array with provided field name and showInFacetsList is undefined', () => {
    const filters = [{ field: 'foo' }];
    const appConfig = {
      searchui: {
        default: {},
        minimal: {
          facets: [],
        },
      },
      resolve: {
        getGlobalSearchhealthcheck: 'global',
      },
      facets: [
        {
          isFilter: false,
          showInFacetsList: undefined,
          field: 'foo',
        },
      ],
    };
    const result = install(appConfig);
    const activeFilters = result.resolve.getGlobalSearchActiveFilters(
      filters,
      appConfig,
    );
    expect(activeFilters).toEqual([
      {
        field: 'foo',
      },
    ]);
  });
});

describe('getGlobalsearchConfig', () => {
  it('should have customized permanent filters for globalsearch', () => {
    const index = globalSearchConfig.permanentFilters.findIndex(
      (f) => f.id === 'constantScore',
    );
    const constantScore = globalSearchConfig.permanentFilters[index]()
    expect(constantScore.constant_score.filter.bool['must_not']).toEqual({
      exists: {
        field: 'exclude_from_globalsearch',
      },
    })
  });
});