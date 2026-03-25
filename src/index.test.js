import applyConfig from './index';
import '@testing-library/jest-dom';

jest.mock('./config', () =>
  jest.fn((registry) => ({
    ...registry,
    searchui: {
      ...registry.searchui,
      globalsearch: { id: 'globalsearch' },
      globalsearchbase: { id: 'globalsearchbase' },
    },
  })),
);

describe('volto-globalsearch applyConfig', () => {
  let config;

  beforeEach(() => {
    config = {
      settings: {
        searchlib: {
          searchui: {
            default: {},
          },
        },
      },
    };
  });

  it('should apply the globalsearch configuration', () => {
    const result = applyConfig(config);

    expect(result.settings.searchlib.searchui.globalsearch).toBeDefined();
    expect(result.settings.searchlib.searchui.globalsearchbase).toBeDefined();
  });

  it('should set elastic_index for globalsearch', () => {
    const result = applyConfig(config);

    expect(result.settings.searchlib.searchui.globalsearch.elastic_index).toBe(
      '_es/globalsearch',
    );
  });

  it('should set index_name for globalsearch', () => {
    const result = applyConfig(config);

    expect(result.settings.searchlib.searchui.globalsearch.index_name).toBe(
      'data_searchui',
    );
  });

  it('should set elastic_index for globalsearchbase', () => {
    const result = applyConfig(config);

    expect(
      result.settings.searchlib.searchui.globalsearchbase.elastic_index,
    ).toBe('_es/globalsearch');
  });

  it('should set index_name for globalsearchbase', () => {
    const result = applyConfig(config);

    expect(result.settings.searchlib.searchui.globalsearchbase.index_name).toBe(
      'data_searchui',
    );
  });

  it('should return the modified config', () => {
    const result = applyConfig(config);

    expect(result).toBe(config);
  });
});
