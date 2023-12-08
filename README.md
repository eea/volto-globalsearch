# volto-globalsearch

[![Releases](https://img.shields.io/github/v/release/eea/volto-globalsearch)](https://github.com/eea/volto-globalsearch/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-globalsearch%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-globalsearch/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-globalsearch%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-globalsearch/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch-develop)

EEA Elastic Search Block with NLP integration [Volto](https://github.com/plone/volto) add-on

## Features

![Globalsearch](https://raw.githubusercontent.com/eea/volto-globalsearch/master/docs/volto-globalsearch.gif)

## Demo

- https://demo-www.eea.europa.eu/en/advanced-search

## Getting started

### Try volto-globalsearch with Docker

      git clone https://github.com/eea/volto-globalsearch.git
      cd volto-globalsearch
      make
      make start

Go to http://localhost:3000

### Add volto-globalsearch to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-globalsearch"
   ],

   "dependencies": {
       "@eeacms/volto-globalsearch": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-globalsearch
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

# Customizing the volto-searchblock

## Modifying Clusters

To customize the behavior of the `volto-searchblock` in your Volto theme, you can modify clusters by following these steps:

 1. Find or create `index.js` in the `src/config`

      In your theme addon, create the `src/config/index.js` file. You can refer to the [example file](https://github.com/eea/volto-marine-theme/blob/eea-design/src/config/index.js) in the `volto-marine-theme` repository.

2. Locate and Modify Clusters

   Clusters are found in `config.searchui.<name_of_search>.runtime_mappings`. For example, in the case of the `volto-marine-theme`, the `<name_of_search>` was `marinemeasure`, and clusters are located in `config.searchui.marinemeasure.runtime_mappings`.

3. Use `build_runtime_mappings` Function
   You have to pass the clusters transformed by build_runtime_mappings function. Import the `build_runtime_mappings` as follows:

     ```javascript
      import { build_runtime_mappings } from '@eeacms/volto-globalsearch/utils';
     ```
4. Default Clusters

   Default clusters are defined [here](https://github.com/eea/volto-globalsearch/blob/master/src/config/clusters.js). Decide whether you want to override all clusters or modify specific ones.

5. Example Modification

   Here's an example of how the Publications cluster was modified in the CountryFactsheet by keeping the rest as default: https://github.com/eea/volto-marine-theme/pull/43/files.

6. Cluster Structure

   Be aware that a cluster contains the `values` key that holds the `content types` on which the cluster will act.

## Release

See [RELEASE.md](https://github.com/eea/volto-globalsearch/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-globalsearch/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-globalsearch/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
