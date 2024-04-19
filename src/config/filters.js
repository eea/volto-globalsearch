import { getTodayWithTime } from '../utils';
function constantScore() {
  return {
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
  };
}
constantScore.id = 'constantScore';

const filters = {
  // filter values that are always added to the ES requests
  permanentFilters: [
    { term: { hasWorkflowState: 'published' } },
    constantScore,
  ],
};

export default filters;
