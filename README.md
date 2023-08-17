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
   yo @plone/volto my-volto-project --addon @eeacms/volto-globalsearch
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

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
