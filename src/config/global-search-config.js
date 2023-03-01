import cloneDeep from 'lodash.clonedeep';

import globalSearchBaseConfig from './global-search-base-config.js';

let globalSearchConfig = cloneDeep(globalSearchBaseConfig);

globalSearchConfig.facets = globalSearchConfig.facets.filter(
  (facet) => facet['field'] !== 'subject.keyword',
);

export default globalSearchConfig;
