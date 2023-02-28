import cloneDeep from 'lodash.clonedeep';

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

import globalSearchBaseConfig from './global-search-base-config.js';

let globalSearchConfig = cloneDeep(globalSearchBaseConfig);

globalSearchConfig.facets = globalSearchConfig.facets.filter(
  (facet) => facet['field'] !== 'subject.keyword',
);

export default globalSearchConfig;
