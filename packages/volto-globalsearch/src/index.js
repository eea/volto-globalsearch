import installGlobalsearch from './config';

const config = (config) => {
  config.settings.searchlib = installGlobalsearch(config.settings.searchlib);

  const { globalsearch, globalsearchbase } = config.settings.searchlib.searchui;

  // Tweak the searchlib config to use the middleware instead of the index
  globalsearch.elastic_index = '_es/globalsearch';
  globalsearch.index_name = 'data_searchui';

  globalsearchbase.elastic_index = '_es/globalsearch';
  globalsearchbase.index_name = 'data_searchui';

  return config;
};

export default config;
