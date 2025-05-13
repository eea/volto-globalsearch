const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');

const plugins = (defaultPlugins) => {
  return defaultPlugins;
};

const modify = (config, { target, dev }, webpack) => {
  const fileLoader = config.module.rules.find(fileLoaderFinder);

  // .png files we don't want them in the bundle
  fileLoader.exclude.push(/static\/\.png$/);

  return config;
};

module.exports = {
  plugins,
  modify,
};
