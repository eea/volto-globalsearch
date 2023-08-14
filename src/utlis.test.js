import {
  build_runtime_mappings,
  getTodayWithTime,
  getGlobalsearchIconUrl,
  getGlobalsearchThumbUrl,
  get_cluster_icons,
  get_cluster_icons_dict,
} from './utils';
import '@testing-library/jest-dom/extend-expect';

describe('build_runtime_mappings', () => {
  it('should build runtime mappings based on settings', () => {
    const settings = {
      clusters: [
        { name: 'cluster1', values: ['value1', 'value2'] },
        { name: 'cluster2', values: ['value3', 'value4'] },
      ],
      field: 'fieldName',
      name: 'mappingName',
    };

    const expectedMappings = {
      mappingName: {
        type: 'keyword',
        script: {
          source:
            'emit("_all_"); def clusters_settings = [["name": "cluster1", "values": ["value1","value2"]],["name": "cluster2", "values": ["value3","value4"]]]; def vals = doc[\'fieldName\']; def clusters = [\'All\']; for (val in vals) { for (cs in clusters_settings) { if (cs.values.contains(val)) { emit(cs.name) } } }',
        },
      },
    };

    const mappings = build_runtime_mappings(settings);

    expect(mappings).toEqual(expectedMappings);
  });
});

describe('getTodayWithTime', () => {
  it('should return the current date in UTC format', () => {
    // The output will vary depending on the current date and time,
    // so we can't hardcode the expected value. We will only test
    // if the function returns a string in a valid UTC format.
    const output = getTodayWithTime();

    expect(typeof output).toBe('string');
    expect(output).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  });
});

describe('getGlobalsearchIconUrl', () => {
  const contentTypeNormalize = {
    content_type_1: 'icon_type_1',
    content_type_2: 'icon_type_2',
  };

  it('should return the default fallback image when no match is found', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: 'Non-matching Content Type' },
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/generic/image_thumb';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(fallback);
  });

  it('should return the glossary term icon for matching about.raw URLs', () => {
    const result = {
      about: { raw: 'http://www.eea.europa.eu/help/glossary/some_term' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/term/image_thumb',
    );
  });

  it('should return the content_type_1 e icon for matching objectProvides.raw', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: 'content_type_1' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/icon_type_1/image_thumb',
    );
  });

  it('should return the country profile icon for matching objectProvides.raw', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: 'Country profile' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/country-profile/image_thumb',
    );
  });

  it('should return the generic if no content_type matches the ones in contentTypeNormalize', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: ['content_type_3', 'content_type_4'] },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/generic/image_thumb',
    );
  });

  it('should return the generic if objectProvides.raw is empty', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: [] },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/generic/image_thumb',
    );
  });

  it('should return the data icon for matching about.raw URL containing land.copernicus.eu', () => {
    const result = {
      about: { raw: 'https://land.copernicus.eu/some_data' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/data/image_thumb',
    );
  });

  it('should return the image_preview URL from result if specific conditions are met', () => {
    const result = {
      site_id: { raw: 'sdi' },
      'overview.url': { raw: 'some_overview_url' },
      about: { raw: 'some_non_matching_url' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchIconUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe('fallback_image_url');
  });
});

describe('getGlobalsearchThumbUrl', () => {
  const contentTypeNormalize = {
    content_type_1: 'icon_type_1',
    content_type_2: 'icon_type_2',
  };

  it('should return the default fallback image when no match is found', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: 'Non-matching Content Type' },
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/generic/image_preview';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(fallback);
  });

  it('should return the glossary term preview image for matching about.raw URLs', () => {
    const result = {
      about: { raw: 'http://www.eea.europa.eu/help/glossary/some_term' },
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/generic/image_preview';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'http://www.eea.europa.eu/help/glossary/some_term/image_preview',
    );
  });

  it('should return the objectProvides.raw icon for matching objectProvides.raw', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: 'content_type_1' },
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/generic/image_preview';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(
      'https://www.eea.europa.eu/portal_depiction/icon_type_1/image_preview',
    );
  });

  it('should return the generic for not matching objectProvides.raw', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: ['content_type_3', 'content_type_4'] },
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/generic/image_preview';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(fallback);
  });

  it('should return generic for empty objectProvides.raw', () => {
    const result = {
      about: { raw: 'some_non_matching_url' },
      objectProvides: { raw: [] },
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/generic/image_preview';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(fallback);
  });

  it('should return the glossary term preview image for matching about.raw URLs', () => {
    const result = {
      about: { raw: 'http://www.eea.europa.eu/en/help/glossary/some_term' },
      image_preview: undefined,
    };

    const config = null;
    const fallback =
      'https://www.eea.europa.eu/portal_depiction/country-profile/image_preview';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe(fallback);
  });

  it('should return the data preview image for matching about.raw URL containing land.copernicus.eu', () => {
    const result = {
      about: { raw: 'https://land.copernicus.eu/some_data' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe('https://land.copernicus.eu/some_data/image_preview');
  });

  it('should return the specific preview image from result if specific conditions are met', () => {
    const result = {
      site_id: { raw: 'sdi' },
      'overview.url': { raw: 'some_overview_url' },
      image_preview: { raw: 'specific_preview_image' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe('specific_preview_image');
  });

  it('should return the image_preview URL from result for specific about.raw URLs', () => {
    const result = {
      about: { raw: 'https://biodiversity.europa.eu/some_data' },
      image_preview: { raw: 'specific_about_image_preview' },
    };

    const config = null;
    const fallback = 'fallback_image_url';

    const imageUrl = getGlobalsearchThumbUrl(contentTypeNormalize)(
      result,
      config,
      fallback,
    );

    expect(imageUrl).toBe('specific_about_image_preview');
  });
});

describe('get_cluster_icons', () => {
  it('should return icons object from clusters with multiple values', () => {
    const settings = {
      clusters: [
        { name: 'cluster1', icon: 'icon1', values: ['value1', 'value2'] },
        { name: 'cluster2', icon: 'icon2', values: ['value3'] },
      ],
    };

    const expectedIcons = {
      fallback: { name: 'file outline' },
      value1: { cluster: 'cluster1', icon: 'icon1' },
      value2: { cluster: 'cluster1', icon: 'icon1' },
      value3: { cluster: 'cluster2', icon: 'icon2' },
    };

    const icons = get_cluster_icons(settings);

    expect(icons).toEqual(expectedIcons);
  });
});

describe('get_cluster_icons_dict', () => {
  it('should return icons object from clusters with multiple values', () => {
    const settings = {
      clusters: [
        { name: 'cluster1', icon: 'icon1', values: ['value1', 'value2'] },
        { name: 'cluster2', icon: 'icon2', values: ['value3'] },
      ],
    };

    const expectedIcons = {
      fallback: { name: 'file outline' },
      value1: 'icon1',
      value2: 'icon1',
      value3: 'icon2',
      cluster1: 'icon1',
      cluster2: 'icon2',
    };

    const icons = get_cluster_icons_dict(settings);

    expect(icons).toEqual(expectedIcons);
  });
});
