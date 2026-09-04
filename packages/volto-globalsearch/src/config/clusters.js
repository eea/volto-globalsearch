import {
  get_cluster_icons_dict,
  get_cluster_icons,
} from '@eeacms/volto-globalsearch/utils';
import websiteLogo from '@eeacms/volto-globalsearch/static/website-logo.png';
import eeaLogo from '@eeacms/volto-globalsearch/static/eea-logo.svg';
import iasLogo from '@eeacms/volto-globalsearch/static/ias-logo.png';
import biseLogo from '@eeacms/volto-globalsearch/static/bise-logo.png';
import wiseLogo from '@eeacms/volto-globalsearch/static/wise-logo.png';
import energyLogo from '@eeacms/volto-globalsearch/static/energy-logo.png';
import waterLogo from '@eeacms/volto-globalsearch/static/water-logo.png';
import forestLogo from '@eeacms/volto-globalsearch/static/forest-logo.png';
import industryLogo from '@eeacms/volto-globalsearch/static/industry-logo.png';
import climateAdaptLogo from '@eeacms/volto-globalsearch/static/climate-adapt-logo.png';
import eionetLogo from '@eeacms/volto-globalsearch/static/eionet-logo.png';
import etcAtniLogo from '@eeacms/volto-globalsearch/static/etc-atni.png';
import etcBdLogo from '@eeacms/volto-globalsearch/static/etc-bd.jpg';
import etcCcaLogo from '@eeacms/volto-globalsearch/static/etc-cca.jpeg';
import etcCmeLogo from '@eeacms/volto-globalsearch/static/etc-cme.png';
import etcIcmLogo from '@eeacms/volto-globalsearch/static/etc-icm.jpg';
import etcUlsLogo from '@eeacms/volto-globalsearch/static/etc-uls.png';
import etcWmgeLogo from '@eeacms/volto-globalsearch/static/etc-wmge.png';
import cabLogo from '@eeacms/volto-globalsearch/static/cab-logo.png';
import copernicusInsituLogo from '@eeacms/volto-globalsearch/static/copernicus_insitu_logo.svg';

export const clusters = {
  name: 'op_cluster',
  field: 'objectProvides',
  clusters: [
    {
      name: 'News',
      icon: { name: 'bullhorn' },
      values: ['News', 'Article'],
      defaultResultView: 'horizontalCard',
    },
    {
      name: 'Publications',
      icon: { name: 'book' },
      values: [
        'Report',
        'Indicator',
        'Briefing',
        'Topic page',
        'Country fact sheet',
      ],
      defaultResultView: 'horizontalCard',
    },
    {
      name: 'Maps and charts',
      icon: { name: 'chart area' },
      values: [
        'Figure (chart/map)',
        'Chart (interactive)',
        'Infographic',
        'Dashboard',
        'Map (interactive)',
      ],
      defaultResultView: 'card',
    },
    {
      name: 'Data',
      icon: { name: 'database' },
      values: ['Data set'],
      defaultResultView: 'horizontalCard',
    },
    {
      name: 'Others',
      icon: { name: 'copy outline' },
      values: [
        'Webpage',
        'Organisation',
        'FAQ',
        'Video',
        'Contract opportunity',
        'Glossary term',
        'Collection',
        'File',
        'Adaptation option',
        'Guidance',
        'Research and knowledge project',
        'Information portal',
        'Tool',
        'Case study',
        'External data reference',
        'Publication reference',
      ], // this will be transformed in "single type clusters".
      defaultResultView: 'horizontalCard',
    },
  ],
};

// Add "Others", a menu with subgroups.

export const clusterIcons = get_cluster_icons(clusters);

const config = {
  icons: {
    'Content types': get_cluster_icons_dict(clusters),
    Sources: {
      fallback: {
        url: websiteLogo,
      },
      eea: {
        url: eeaLogo,
      },
      ias: {
        url: iasLogo,
      },
      bise: {
        url: biseLogo,
      },
      'wise-marine': {
        url: wiseLogo,
      },
      energy: {
        url: energyLogo,
      },
      'wise-freshwater': {
        url: waterLogo,
      },
      fise: {
        url: forestLogo,
      },
      industry: {
        url: industryLogo,
      },
      cca: {
        url: climateAdaptLogo,
      },
      etc: {
        url: eionetLogo,
      },
      'etc-atni': {
        url: etcAtniLogo,
      },

      'etc-bd': {
        url: etcBdLogo,
      },

      'etc-cca': {
        url: etcCcaLogo,
      },

      'etc-cme': {
        url: etcCmeLogo,
      },

      'etc-icm': {
        url: etcIcmLogo,
      },

      'etc-uls': {
        url: etcUlsLogo,
      },

      'etc-wmge': {
        url: etcWmgeLogo,
      },
      sdi: {
        url: eeaLogo,
      },
      cab: {
        url: cabLogo,
      },
      discomap: {
        url: eeaLogo,
      },
      noise: {
        url: eeaLogo,
      },
      copernicus_insitu: {
        url: copernicusInsituLogo,
      },
    },
    Countries: {
      fallback: {
        country: 'placeholder',
      },
    },
  },

  contentSectionsParams: {
    // This enables the content as section tabs
    enable: true,
    sectionFacetsField: 'op_cluster',
    sections: clusters.clusters,
    clusterMapping: Object.assign(
      {},
      ...clusters.clusters.map(({ name, values }) =>
        Object.assign({}, ...values.map((v) => ({ [v]: name }))),
      ),
    ),
  },
};

export default config;

export function typesForClustersOptionsFilter(options, filters) {
  // Only display content types that belong to the currently selected cluster
  const clusterMap = Object.assign(
    {},
    ...clusters.clusters.map(({ name, values }) =>
      Object.assign({}, ...values.map((v) => ({ [v]: name }))),
    ),
  );

  const clusterFilter = filters?.find((f) => f.field === 'op_cluster');
  const activeCluster = clusterFilter?.values?.[0];

  return activeCluster
    ? options.filter((f) => clusterMap[f.value] === activeCluster)
    : options;
}
