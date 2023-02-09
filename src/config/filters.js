import { getTodayWithTime } from '../utils';

export default {
  // filter values that are always added to the ES requests
  permanentFilters: [
    { term: { hasWorkflowState: 'published' } },
    () => ({
      constant_score: {
        filter: {
          bool: {
            should: [
              {
                bool: {
                  must_not: {
                    exists: {
                      field: 'issued',
                    },
                  },
                },
              },
              {
                range: { 'issued.date': { lte: getTodayWithTime() } },
              },
            ],
          },
        },
      },
    }),
  ],
};
