const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const fileLoaderFinder = makeLoaderFinder('file-loader');

const plugins = (defaultPlugins) => {
  return defaultPlugins;
};

const modify = (config, { target, dev }, webpack) => {
  const fileLoader = config.module.rules.find(fileLoaderFinder);

  fileLoader.exclude = [
    /\.(config|variables|overrides)$/,
    /icons\/.*\.svg$/,
    /\.html$/,
    /\.(js|jsx|mjs)$/,
    /\.(ts|tsx)$/,
    /\.(vue)$/,
    /\.(less)$/,
    /\.(re)$/,
    /\.(s?css|sass)$/,
    /\.json$/,
    /\.bmp$/,
    /\.gif$/,
    /\.jpe?g$/,
    // .png files we don't want them in the bundle
    /static\/\.png$/,
  ];

  return config;
};

module.exports = {
  plugins,
  modify,
};
