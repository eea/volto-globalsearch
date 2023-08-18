import cloneDeep from 'lodash.clonedeep';

import globalSearchBaseConfig from './global-search-base-config.js';

let globalSearchConfig = cloneDeep(globalSearchBaseConfig);
globalSearchConfig.landingPageURL = '/en/advanced-search';

globalSearchConfig.facets = globalSearchConfig.facets.filter(
  (facet) => facet['field'] !== 'subject.keyword',
);

// customize permanent filters
const index = globalSearchConfig.permanentFilters.findIndex(
  (f) => f.id === 'constantScore',
);
const baseConstantScore = globalSearchConfig.permanentFilters[index];

function updatedConstantScore() {
  debugger;
  const base = baseConstantScore();
  base.constant_score.filter.bool.must_not = {
    exists: {
      field: 'exclude_from_globalsearch',
    },
  };
  return base;
}

updatedConstantScore.id = 'constantScore';

globalSearchConfig.permanentFilters[index] = updatedConstantScore

export default globalSearchConfig;
