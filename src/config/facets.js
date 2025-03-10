import {
  booleanFacet,
  dateRangeFacet,
  fixedRangeFacet,
  histogramFacet,
  makeRange,
  multiTermFacet,
} from '@eeacms/search';
import spatialWhitelist from './json/spatialWhitelist.json';
import placesBlacklist from './json/placesBlacklist.json';
import topicsBlacklist from './json/topicsBlacklist.json';
import { getTodayWithTime } from '../utils';

import { defineMessages } from 'react-intl';

const messages = defineMessages({
  includeArchivedContent: {
    id: 'Include archived content',
    defaultMessage: 'Include archived content',
  },
  language: {
    id: 'Language',
    defaultMessage: 'Language',
  },
});

const languageCodes = [
  'en',
  'ar',
  'sr',
  'sq',
  'bg',
  'bs',
  'cs',
  'hr',
  'da',
  'nl',
  'el',
  'et',
  'fi',
  'fr',
  'ga',
  'de',
  'hu',
  'is',
  'it',
  'lv',
  'lt',
  'mk',
  'mt',
  'no',
  'pl',
  'pt',
  'ro',
  'ru',
  'sh',
  'sk',
  'sl',
  'es',
  'sv',
  'tr',
];

const today = new Date();
const currentYear = today.getFullYear();

const facets = [
  booleanFacet(() => ({
    field: 'IncludeArchived',
    // label: 'Include archived content',
    label: messages.includeArchivedContent,
    id: 'archived-facet',
    showInFacetsList: false,
    showInSecondaryFacetsList: true,
    isFilter: true, // filters don't need facet options to show up

    // we want this to be applied by default
    // when the facet is checked, then apply the `on` key:
    off: {
      constant_score: {
        filter: {
          bool: {
            should: [
              { bool: { must_not: { exists: { field: 'expires' } } } },
              // Functions should be supported in the buildFilters
              { range: { expires: { gte: getTodayWithTime() } } },
            ],
          },
        },
      },
    },
    on: null,
  })),
  multiTermFacet({
    field: 'moreLikeThis',
    isFilterable: true,
    isMulti: false,
    label: 'More like this',
    showInFacetsList: false,
    filterListComponent: 'MoreLikeThisEntry',
    factory: 'MoreLikeThis',
    condition: 'like',
    queryParams: {
      fields: ['title', 'text'],
      min_term_freq: 1,
      max_query_terms: 12,
    },

    // registryConfig: 'MoreLikeThis',
  }),
  multiTermFacet({
    field: 'topic',
    isFilterable: true,
    isMulti: true,
    label: 'Topics',
    blacklist: topicsBlacklist,
    show: 10000,
    showAllOptions: true, // show all options (even if 0) in modal facet
    alwaysVisible: true,
  }),
  multiTermFacet({
    field: 'subject.keyword',
    isFilterable: true,
    isMulti: true,
    label: 'Keywords',
    show: 10000,
    showAllOptions: true, // show all options (even if 0) in modal facet
    alwaysVisible: false,
  }),
  multiTermFacet({
    field: 'spatial',
    isFilterable: true,
    isMulti: true,
    label: 'Countries',
    whitelist: spatialWhitelist,
    show: 10000,
    iconsFamily: 'Countries',
    enableExact: true,
    sortOn: 'value',
    alwaysVisible: false,
  }),
  multiTermFacet({
    field: 'op_cluster',
    isFilterable: true,
    isMulti: true,
    label: 'Section',
    show: 10000,
    showInFacetsList: false,
    ignoreNLPWhenActive: true,
  }),
  multiTermFacet({
    field: 'cluster_name',
    isFilterable: false,
    isMulti: true,
    label: 'Websites',
    iconsFamily: 'Sources',
    alwaysVisible: true,
  }),

  multiTermFacet({
    field: 'places',
    isFilterable: true,
    isMulti: true,
    label: 'Regions/Places',
    blacklist: placesBlacklist,
    show: 10000,
    showAllOptions: true, // show all options (even if 0) in modal facet
    alwaysVisible: true,
  }),
  multiTermFacet({
    field: 'objectProvides',
    isFilterable: false,
    isMulti: true,
    label: 'Content types',
    iconsFamily: 'Content types',
    //whitelist: objectProvidesWhitelist,
    optionsFilter: 'typesForClustersOptionsFilter',
  }),
  histogramFacet({
    field: 'year',
    // isFilterable: false,
    isMulti: true,
    label: 'Publishing year',
    // TODO: implement split in buckets
    ranges: makeRange({
      step: 1,
      normalRange: [1994, currentYear],
      includeOutlierStart: false,
      includeOutlierEnd: false,
    }),
    step: 10,
    // [
    //   {
    //     to: 1900,
    //   },
    //   {
    //     key: '2001-2010',
    //     from: 2001,
    //     to: 2010,
    //   },
    //   {
    //     from: 2011,
    //   },
    // ]
    // min_max_script:
    //
    //"def vals = doc['year']; if (vals.length == 0){return 2000} else {def ret = [];for (val in vals){def tmp_val = val.substring(0,4);ret.add(tmp_val.toLowerCase() == tmp_val.toUpperCase() ? Integer.parseInt(tmp_val) : 2000);}return ret;}",

    aggs_script:
      "def vals = doc['year']; if (vals.length == 0){return 2500} else {def ret = [];for (val in vals){def tmp_val = val.substring(0,4);ret.add(tmp_val.toLowerCase() == tmp_val.toUpperCase() ? Integer.parseInt(tmp_val) : 2500);}return ret;}",
  }),

  histogramFacet({
    field: 'time_coverage',
    isMulti: true,
    label: 'Time coverage',
    // TODO: implement split in buckets
    ranges: makeRange({
      step: 10,
      normalRange: [1700, 2210],
      includeOutlierStart: false,
      includeOutlierEnd: false,
    }),
    step: 10,
    // isFilterable: false,
    aggs_script:
      "def vals = doc['time_coverage']; if (vals.length == 0){return 2500} else {def ret = [];for (val in vals){def tmp_val = val.substring(0,4);ret.add(tmp_val.toLowerCase() == tmp_val.toUpperCase() ? Integer.parseInt(tmp_val) : 2500);}return ret;}",
  }),

  fixedRangeFacet({
    field: 'readingTime',
    label: 'Reading time',
    rangeType: 'fixed',
    isMulti: true,
    ranges: [
      { key: 'All' },
      { from: 0, to: 4.99999, key: 'Short (<5 minutes)' },
      { from: 5, to: 24.9999, key: 'Medium (5-25 minutes)' },
      { from: 25, to: 10000, key: 'Large (25+ minutes)' },
      { to: -0.0001, key: 'Not applicable' },
    ],
    // factory: 'ModalFixedRangeFacet',
    default: {
      values: [{ name: 'All', rangeType: 'fixed' }],
      type: 'any',
    },
  }),
  dateRangeFacet({
    field: 'issued.date',
    label: ' ',
    allow_missing: false,
    activeFilterLabel: 'Published',
    isFilter: true, // filters don't need facet options to show up
    showInFacetsList: false,
    showInSecondaryFacetsList: true,
    // rangeType: 'dateRange',
    isMulti: false,
    ignoreFromNlp: true,
    ranges: [
      { key: 'All time' },
      { key: 'Last week', from: 'now-1w', to: 'now' },
      { key: 'Last month', from: 'now-1m', to: 'now' },
      { key: 'Last 3 months', from: 'now-3m', to: 'now' },
      { key: 'Last year', from: 'now-1y', to: 'now' },
      { key: 'Last 2 years', from: 'now-2y', to: 'now' },
      { key: 'Last 5 years', from: 'now-5y', to: 'now' },
    ],
    factory: 'DropdownRangeFilter',
    default: {
      values: ['Last 5 years'],
      type: 'any',
    },
    missing: {
      values: ['All time'],
      type: 'any',
    },
  }),
  multiTermFacet({
    field: 'language',
    isFilterable: false,
    isMulti: true,
    label: messages.language,
    default: {
      values: ['en'],
      type: 'any',
    },
    facetValues: languageCodes,
    sortOn: 'custom',
    sortOnCustomLabel: 'Alphabetical',
    sortOrder: 'ascending',
  }),
  multiTermFacet({
    field: 'dpsir.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'DPSIR',
  }),
  multiTermFacet({
    field: 'typology.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'Typology',
  }),
  multiTermFacet({
    field: 'un_sdgs.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'UN SDGs',
  }),
  multiTermFacet({
    field: 'data_provenances_organisations.keyword',
    isFilterable: true,
    isMulti: true,
    label: 'Data sources',
  }),
  multiTermFacet({
    field: 'creators.keyword',
    isFilterable: true,
    isMulti: true,
    label: 'Creators',
    authOnly: true,
  }),
  multiTermFacet({
    field: 'contributors.keyword',
    isFilterable: true,
    isMulti: true,
    label: 'Contributors',
  }),
  multiTermFacet({
    field: 'subject.keyword_lc',
    isFilterable: true,
    isMulti: true,
    label: 'Tags',
    sortOn: 'value',
    sortOrder: 'ascending',
  }),
  multiTermFacet({
    field: 'publishers.keyword',
    isFilterable: false,
    isMulti: true,
    label: 'Publishers',
  }),
];

const facetsWrapper = {
  facets,
};

export default facetsWrapper;

// default filter values
// TODO: this needs to be removed and the configuration plugged into each of
// the facets
// readingTime: {
//   value: { name: 'All', rangeType: 'fixed' },
//   type: 'any',
// },
// },
// wrapper: 'ModalFacetWrapper',
// [
//   {
//     to: 1900,
//   },
//   {
//     key: '2001-2010',
//     from: 2001,
//     to: 2010,
//   },
//   {
//     from: 2011,
//   },
// ]
// min_max_script:
//
//"def vals = doc['year']; if (vals.length == 0){return 2000} else {def ret = [];for (val in vals){def tmp_val = val.substring(0,4);ret.add(tmp_val.toLowerCase() == tmp_val.toUpperCase() ? Integer.parseInt(tmp_val) : 2000);}return ret;}",
// factory: 'MultiTermFacet',
// wrapper: 'ModalFacetWrapper',
// factory: 'sui.Facet',
// factory: 'MultiTermFacet',
// wrapper: 'ModalFacetWrapper',
// wrapper: 'ModalFacetWrapper',
// factory: 'MultiTermFacet',
// wrapper: 'ModalFacetWrapper',
// wrapper: 'ModalFacetWrapper',
// factory: 'MultiTermFacet',
// factory: 'MultiTermFacet',
// wrapper: 'ModalFacetWrapper',
// factory: 'MultiTermFacet',
// wrapper: 'ModalFacetWrapper',
// factory: 'MultiTermFacet',
// wrapper: 'ModalFacetWrapper',
// wrapper: 'ModalFacetWrapper',
