# @eeacms/volto-globalsearch

[![Releases](https://img.shields.io/github/v/release/eea/volto-globalsearch)](https://github.com/eea/volto-globalsearch/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-globalsearch%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-globalsearch/job/master/display/redirect)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-globalsearch&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-globalsearch)

EEA Elastic Search Block with NLP integration [Volto](https://github.com/plone/volto) add-on

## Features

![Globalsearch](https://raw.githubusercontent.com/eea/volto-globalsearch/master/docs/volto-globalsearch.gif)

## Demo

- https://demo-www.eea.europa.eu/en/advanced-search

## Requirements

### Backend

- [Plone](https://plone.org/download)
- [plone.restapi](https://pypi.org/project/plone.restapi/)

### Frontend

- Node.js: `>=22.0.0`

## Installation

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "dependencies": {
       "@eeacms/volto-globalsearch": "*"
   }
   ```

   and `volto.config.js`:

   ```JavaScript
   const addons = ['@eeacms/volto-globalsearch'];
   ```

* If not, create one with Cookieplone, as recommended by the official Plone documentation for Volto 18+:

   ```
   uvx cookieplone project
   cd project-title
   ```

1. Install or update dependencies, then start the project:

   ```
   make install
   ```

   For a Cookieplone project, start the backend and frontend in separate terminals:

   ```
   make backend-start
   make frontend-start
   ```

1. Go to http://localhost:3000

1. Happy editing!

# Customizing the volto-searchblock

## Modifying Clusters

To customize the behavior of the `volto-searchblock` in your volto theme addon, you can modify clusters by following these steps:

 1. Find or create `index.js` in the `src/config`

      In your theme addon, create the `src/config/index.js` file. You can refer to the [example file](https://github.com/eea/volto-marine-theme/blob/eea-design/src/config/index.js) in the `volto-marine-theme` repository.

2. Locate and Modify Clusters

   Clusters are found in `config.searchui.<name_of_search>.runtime_mappings`. For example, in the case of the `volto-marine-theme`, the `<name_of_search>` was `marinemeasure`, and clusters are located in `config.searchui.marinemeasure.runtime_mappings`.

3. Use `build_runtime_mappings`
   
   You have to pass the clusters transformed by build_runtime_mappings function. Import the `build_runtime_mappings` as follows:

     ```javascript
      import { build_runtime_mappings } from '@eeacms/volto-globalsearch/utils';
     ```
5. Default Clusters

   Default clusters are defined [here](https://github.com/eea/volto-globalsearch/blob/master/src/config/clusters.js). Decide whether you want to override all clusters or modify specific ones.
   If you decided to modify them, you can import them in your addon as follows:
   ```javascript
   import { clusters } from '@eeacms/volto-globalsearch/config/clusters';
   ```

6. Example Modification

   Here's an example of how the Publications cluster was modified in the CountryFactsheet by keeping the rest as default: https://github.com/eea/volto-marine-theme/pull/43/files.

7. Cluster Structure

   Be aware that a cluster contains the `values` key that holds the `content types` on which the cluster will act.

## License

See [LICENSE.md](LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
