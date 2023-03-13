import cloneDeep from 'lodash.clonedeep';

import globalSearchBaseConfig from './global-search-base-config.js';

let globalSearchConfig = cloneDeep(globalSearchBaseConfig);
globalSearchConfig.landingPageURL = '/en/advanced-search';

globalSearchConfig.facets = globalSearchConfig.facets.filter(
  (facet) => facet['field'] !== 'subject.keyword',
);

export default globalSearchConfig;
