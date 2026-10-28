import { GlobalsearchResultModel } from './models';

const config = {
  field_filters: {},
  icons: {
    'Content types': {
      fallback: { name: 'fallback' },
      Report: { name: 'report' },
      News: { name: 'news' },
    },
  },
  contentSectionsParams: {
    clusterMapping: {
      Report: 'Publications',
      News: 'News',
    },
  },
};

const getResult = (source) =>
  new GlobalsearchResultModel(
    {
      _id: 'result-id',
      _source: source,
    },
    config,
  );

describe('GlobalsearchResultModel', () => {
  it('uses publication_type in the Publications cluster', () => {
    const result = getResult({
      objectProvides: 'Report',
      publication_type: ['Corporate report', 'Joint report'],
    });

    expect(result.clusterInfo.Publications.content_types).toEqual([
      'Corporate report',
      'Joint report',
    ]);
  });

  it('falls back to objectProvides when publication_type is missing', () => {
    const result = getResult({
      objectProvides: 'Report',
    });

    expect(result.clusterInfo.Publications.content_types).toEqual(['Report']);
  });

  it('keeps objectProvides for clusters other than Publications', () => {
    const result = getResult({
      objectProvides: 'News',
    });

    expect(result.clusterInfo.News.content_types).toEqual(['News']);
  });
});
