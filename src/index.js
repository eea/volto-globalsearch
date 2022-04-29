import installGlobalsearch from './config';

export default (config) => {
  console.log('>>>>globalsearch');
  config.settings.searchlib = installGlobalsearch(config.settings.searchlib);

  const { globalsearch } = config.settings.searchlib.searchui;

  // Tweak the searchlib config to use the middleware instead of the index
  globalsearch.elastic_index = '_es/globalsearch';

  return config;
};
