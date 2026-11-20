import '@testing-library/jest-dom';

import config, {
  clusters,
  clusterIcons,
  typesForClustersOptionsFilter,
} from './clusters';

// Mock static image imports
vi.mock(
  '@eeacms/volto-globalsearch/static/website-logo.png',
  () => ({ default: 'website-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/eea-logo.svg',
  () => ({ default: 'eea-logo.svg' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/ias-logo.png',
  () => ({ default: 'ias-logo.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/bise-logo.png',
  () => ({ default: 'bise-logo.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/wise-logo.png',
  () => ({ default: 'wise-logo.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/energy-logo.png',
  () => ({ default: 'energy-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/water-logo.png',
  () => ({ default: 'water-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/forest-logo.png',
  () => ({ default: 'forest-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/industry-logo.png',
  () => ({ default: 'industry-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/climate-adapt-logo.png',
  () => ({ default: 'climate-adapt-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/eionet-logo.png',
  () => ({ default: 'eionet-logo.png' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-atni.png',
  () => ({ default: 'etc-atni.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-bd.jpg',
  () => ({ default: 'etc-bd.jpg' }),
  {
    virtual: true,
  },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-cca.jpeg',
  () => ({ default: 'etc-cca.jpeg' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-cme.png',
  () => ({ default: 'etc-cme.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-icm.jpg',
  () => ({ default: 'etc-icm.jpg' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-uls.png',
  () => ({ default: 'etc-uls.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/etc-wmge.png',
  () => ({ default: 'etc-wmge.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/cab-logo.png',
  () => ({ default: 'cab-logo.png' }),
  { virtual: true },
);
vi.mock(
  '@eeacms/volto-globalsearch/static/copernicus_insitu_logo.svg',
  () => ({ default: 'copernicus_insitu_logo.svg' }),
  { virtual: true },
);

describe('clusters configuration', () => {
  describe('clusters object', () => {
    it('should export clusters object', () => {
      expect(clusters).toBeDefined();
    });

    it('should have name property', () => {
      expect(clusters.name).toBe('op_cluster');
    });

    it('should have field property', () => {
      expect(clusters.field).toBe('objectProvides');
    });

    it('should have clusters array', () => {
      expect(clusters.clusters).toBeDefined();
      expect(Array.isArray(clusters.clusters)).toBe(true);
    });

    it('should have News cluster', () => {
      const newsCluster = clusters.clusters.find((c) => c.name === 'News');
      expect(newsCluster).toBeDefined();
      expect(newsCluster.values).toContain('News');
      expect(newsCluster.values).toContain('Article');
    });

    it('should have Publications cluster', () => {
      const pubCluster = clusters.clusters.find(
        (c) => c.name === 'Publications',
      );
      expect(pubCluster).toBeDefined();
      expect(pubCluster.values).toContain('Report');
      expect(pubCluster.values).toContain('Indicator');
    });

    it('should have Maps and charts cluster', () => {
      const mapsCluster = clusters.clusters.find(
        (c) => c.name === 'Maps and charts',
      );
      expect(mapsCluster).toBeDefined();
      expect(mapsCluster.values).toContain('Dashboard');
    });

    it('should have Data cluster', () => {
      const dataCluster = clusters.clusters.find((c) => c.name === 'Data');
      expect(dataCluster).toBeDefined();
      expect(dataCluster.values).toContain('Data set');
    });

    it('should have Others cluster', () => {
      const othersCluster = clusters.clusters.find((c) => c.name === 'Others');
      expect(othersCluster).toBeDefined();
      expect(othersCluster.values).toContain('Webpage');
    });

    it('each cluster should have defaultResultView', () => {
      clusters.clusters.forEach((cluster) => {
        expect(cluster.defaultResultView).toBeDefined();
      });
    });
  });

  describe('clusterIcons', () => {
    it('should export clusterIcons', () => {
      expect(clusterIcons).toBeDefined();
    });

    it('should have fallback icon', () => {
      expect(clusterIcons.fallback).toBeDefined();
    });

    it('should have News icon mapping', () => {
      expect(clusterIcons.News).toBeDefined();
    });
  });

  describe('config', () => {
    it('should export default config', () => {
      expect(config).toBeDefined();
    });

    it('should have icons configuration', () => {
      expect(config.icons).toBeDefined();
    });

    it('should have Content types icons', () => {
      expect(config.icons['Content types']).toBeDefined();
    });

    it('should have Sources icons', () => {
      expect(config.icons.Sources).toBeDefined();
    });

    it('should have contentSectionsParams', () => {
      expect(config.contentSectionsParams).toBeDefined();
    });

    it('should have contentSectionsParams.enable set to true', () => {
      expect(config.contentSectionsParams.enable).toBe(true);
    });

    it('should have contentSectionsParams.sectionFacetsField', () => {
      expect(config.contentSectionsParams.sectionFacetsField).toBe(
        'op_cluster',
      );
    });

    it('should have clusterMapping in contentSectionsParams', () => {
      expect(config.contentSectionsParams.clusterMapping).toBeDefined();
    });
  });

  describe('typesForClustersOptionsFilter', () => {
    const mockOptions = [
      { value: 'News' },
      { value: 'Article' },
      { value: 'Report' },
      { value: 'Dashboard' },
      { value: 'Data set' },
    ];

    it('should return all options when no cluster filter is active', () => {
      const filters = [];
      const result = typesForClustersOptionsFilter(mockOptions, filters);
      expect(result).toEqual(mockOptions);
    });

    it('should return all options when filters is undefined', () => {
      const result = typesForClustersOptionsFilter(mockOptions, undefined);
      expect(result).toEqual(mockOptions);
    });

    it('should filter options for News cluster', () => {
      const filters = [{ field: 'op_cluster', values: ['News'] }];
      const result = typesForClustersOptionsFilter(mockOptions, filters);

      expect(result).toContainEqual({ value: 'News' });
      expect(result).toContainEqual({ value: 'Article' });
      expect(result).not.toContainEqual({ value: 'Report' });
    });

    it('should filter options for Publications cluster', () => {
      const filters = [{ field: 'op_cluster', values: ['Publications'] }];
      const result = typesForClustersOptionsFilter(mockOptions, filters);

      expect(result).toContainEqual({ value: 'Report' });
      expect(result).not.toContainEqual({ value: 'News' });
    });

    it('should filter options for Data cluster', () => {
      const filters = [{ field: 'op_cluster', values: ['Data'] }];
      const result = typesForClustersOptionsFilter(mockOptions, filters);

      expect(result).toContainEqual({ value: 'Data set' });
      expect(result).not.toContainEqual({ value: 'News' });
    });

    it('should filter options for Maps and charts cluster', () => {
      const filters = [{ field: 'op_cluster', values: ['Maps and charts'] }];
      const result = typesForClustersOptionsFilter(mockOptions, filters);

      expect(result).toContainEqual({ value: 'Dashboard' });
      expect(result).not.toContainEqual({ value: 'News' });
    });

    it('should return empty array when no options match the cluster', () => {
      const filters = [{ field: 'op_cluster', values: ['NonExistent'] }];
      const result = typesForClustersOptionsFilter(mockOptions, filters);

      expect(result).toEqual([]);
    });
  });
});
