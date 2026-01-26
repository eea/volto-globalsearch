import '@testing-library/jest-dom/extend-expect';

// Mock static image imports
jest.mock('../static/website-logo.png', () => 'website-logo.png', { virtual: true });
jest.mock('../static/eea-logo.svg', () => 'eea-logo.svg', { virtual: true });
jest.mock('../static/ias-logo.png', () => 'ias-logo.png', { virtual: true });
jest.mock('../static/bise-logo.png', () => 'bise-logo.png', { virtual: true });
jest.mock('../static/wise-logo.png', () => 'wise-logo.png', { virtual: true });
jest.mock('../static/energy-logo.png', () => 'energy-logo.png', { virtual: true });
jest.mock('../static/water-logo.png', () => 'water-logo.png', { virtual: true });
jest.mock('../static/forest-logo.png', () => 'forest-logo.png', { virtual: true });
jest.mock('../static/industry-logo.png', () => 'industry-logo.png', { virtual: true });
jest.mock('../static/climate-adapt-logo.png', () => 'climate-adapt-logo.png', { virtual: true });
jest.mock('../static/eionet-logo.png', () => 'eionet-logo.png', { virtual: true });
jest.mock('../static/etc-atni.png', () => 'etc-atni.png', { virtual: true });
jest.mock('../static/etc-bd.jpg', () => 'etc-bd.jpg', { virtual: true });
jest.mock('../static/etc-cca.jpeg', () => 'etc-cca.jpeg', { virtual: true });
jest.mock('../static/etc-cme.png', () => 'etc-cme.png', { virtual: true });
jest.mock('../static/etc-icm.jpg', () => 'etc-icm.jpg', { virtual: true });
jest.mock('../static/etc-uls.png', () => 'etc-uls.png', { virtual: true });
jest.mock('../static/etc-wmge.png', () => 'etc-wmge.png', { virtual: true });
jest.mock('../static/cab-logo.png', () => 'cab-logo.png', { virtual: true });
jest.mock('../static/copernicus_insitu_logo.svg', () => 'copernicus_insitu_logo.svg', { virtual: true });

import config, {
  clusters,
  clusterIcons,
  typesForClustersOptionsFilter,
} from './clusters';

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
