import { build_runtime_mappings } from '../utils';
import clusterParams, { clusters } from './clusters';

import facets from './facets';
import views from './views';
import query from './query';
import filters from './filters';
import download from './download';
import vocabs from './vocabulary';

import objectProvidesWhitelist from './json/objectProvidesWhitelist.json';
import spatialWhitelist from './json/spatialWhitelist.json';
import placesBlacklist from './json/placesBlacklist.json';
import typesWhitelist from './json/typesWhitelist.json';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  sortTitleAZ: {
    id: 'Title a-z',
    defaultMessage: 'Title a-z',
  },
  sortTitleZA: {
    id: 'Title z-a',
    defaultMessage: 'Title z-a',
  },
  sortNewest: {
    id: 'Newest',
    defaultMessage: 'Newest',
  },
  sortOldest: {
    id: 'Oldest',
    defaultMessage: 'Oldest',
  },
  Relevance: {
    id: 'Relevance',
    defaultMessage: 'Relevance',
  },
});

const globalSearchBaseConfig = {
  title: 'Global search and catalogue',
  layoutComponent: 'TopFilterLayout',
  contentBodyComponent: 'FilterAsideContentView',
  enableNLP: true, // enables NLP capabilities
  facetsListComponent: 'DropdownFacetsList',
  runtime_mappings: build_runtime_mappings(clusters),
  useSearchPhrases: false,
  searchAsYouType: false,
  landingPageURL: null,
  healthcheck: 'getGlobalSearchHealthcheck',
  getActiveFilters: 'getGlobalSearchActiveFilters',

  ...vocabs,
  ...facets,
  ...views,
  ...query,
  ...filters,
  ...download,
  ...clusterParams,

  sourceExcludedFields: ['embedding'], // don't need these in results
  // 'fulltext',

  // these are used to "clean" the values in the results.
  field_filters: {
    type: {
      whitelist: typesWhitelist,
    },
    objectProvides: {
      whitelist: objectProvidesWhitelist,
    },
    spatial: {
      whitelist: spatialWhitelist,
    },
    places: {
      blacklist: placesBlacklist,
    },
  },

  highlight: {
    queryParams: {
      fragment_size: 200,
      number_of_fragments: 3,
    },
    fields: ['description.highlight'],
    queryBuilder: {
      factory: 'highlightQueryBuilder',
    },
  },
  sortOptions: [
    {
      name: messages.Relevance,
      value: '',
      direction: '',
    },
    {
      name: messages.sortTitleAZ,
      value: 'title.index',
      direction: 'asc',
    },
    {
      name: messages.sortTitleZA,
      value: 'title.index',
      direction: 'desc',
    },
    {
      name: messages.sortOldest,
      value: 'issued.date',
      direction: 'asc',
    },
    {
      name: messages.sortNewest,
      value: 'issued.date',
      direction: 'desc',
    },
  ],

  defaultPromptQueries: [
    'what is the status of our forests',
    'what is PFAS?',
    'how does PFAS get into human?',
    'what is the cumulative surface area of the Natura 2000?',
    'what percentage of europe population is connected to waste water treatement?',
    'How is the status of fish species in Europe?',
    'What is the BISE?',
    'how much does transport contributes to GHG emissions in EU?',
    'Which cities in Europe have the worst air quality?',
    'What car is best for the environment?',
    'What transport mode is best for the environment?',
    'What EU legislation safeguards our water?',
    'What is land accounting?',
    'What countries had the highest land take in the EEA-39 between 2000 and 2018?',
    'Why is urban sprawl bad?',
    'what are controlled substances',
    'what is plastic',
    'What year did car manufacturers meet their binding emissions target?',
    'What is the percentage of surface water bodies with less than good status?',
    'What is the most common pollutant in water bodies in Europe?',
    'Where can I access greenhouse gas data',
    'What is the trend on greenhouse gas emissions from transport',
    'what is the best transport mode',
    'what are ecosystem services',
    'bathing water quality',
    'greenhouse gas emissions trends',
    'waste generation trends',
  ],
};

export default globalSearchBaseConfig;
