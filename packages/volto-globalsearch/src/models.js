import { ResultModel } from '@eeacms/search/lib/models';

const PUBLICATIONS_CLUSTER = 'Publications';
const PUBLICATION_TYPE_FIELD = 'publication_type';

const normalizeValues = (value) => {
  const values = Array.isArray(value) ? value : [value];
  return values.filter(Boolean);
};

export class GlobalsearchResultModel {
  constructor(record, config, fieldFilters) {
    const result = new ResultModel(record, config, fieldFilters);

    return new Proxy(result, {
      get(target, property) {
        if (property !== 'clusterInfo') {
          return Reflect.get(target, property);
        }

        const clusters = Reflect.get(target, property);
        if (!clusters[PUBLICATIONS_CLUSTER]) {
          return clusters;
        }

        const publicationTypes = normalizeValues(
          target[PUBLICATION_TYPE_FIELD]?.raw,
        );

        return {
          ...clusters,
          [PUBLICATIONS_CLUSTER]: {
            ...clusters[PUBLICATIONS_CLUSTER],
            content_types:
              publicationTypes.length > 0
                ? publicationTypes
                : clusters[PUBLICATIONS_CLUSTER].content_types,
          },
        };
      },
    });
  }
}
