import filters from './filters';
import '@testing-library/jest-dom/extend-expect';

describe('filters configuration', () => {
  it('should export filters object', () => {
    expect(filters).toBeDefined();
  });

  it('should have permanentFilters array', () => {
    expect(filters.permanentFilters).toBeDefined();
    expect(Array.isArray(filters.permanentFilters)).toBe(true);
  });

  it('should have published workflow state filter', () => {
    const workflowFilter = filters.permanentFilters.find(
      (f) => f.term && f.term.hasWorkflowState === 'published',
    );
    expect(workflowFilter).toBeDefined();
  });

  it('should have constantScore filter function', () => {
    const constantScoreFilter = filters.permanentFilters.find(
      (f) => typeof f === 'function' && f.id === 'constantScore',
    );
    expect(constantScoreFilter).toBeDefined();
  });

  it('constantScore filter should return correct structure', () => {
    const constantScoreFilter = filters.permanentFilters.find(
      (f) => typeof f === 'function' && f.id === 'constantScore',
    );
    const result = constantScoreFilter();

    expect(result.constant_score).toBeDefined();
    expect(result.constant_score.filter).toBeDefined();
    expect(result.constant_score.filter.bool).toBeDefined();
    expect(result.constant_score.filter.bool.should).toBeDefined();
    expect(Array.isArray(result.constant_score.filter.bool.should)).toBe(true);
  });

  it('constantScore filter should have must_not exists condition', () => {
    const constantScoreFilter = filters.permanentFilters.find(
      (f) => typeof f === 'function' && f.id === 'constantScore',
    );
    const result = constantScoreFilter();

    const mustNotExistsCondition = result.constant_score.filter.bool.should.find(
      (s) => s.bool && s.bool.must_not && s.bool.must_not.exists,
    );
    expect(mustNotExistsCondition).toBeDefined();
    expect(mustNotExistsCondition.bool.must_not.exists.field).toBe('issued');
  });

  it('constantScore filter should have range condition for issued.date', () => {
    const constantScoreFilter = filters.permanentFilters.find(
      (f) => typeof f === 'function' && f.id === 'constantScore',
    );
    const result = constantScoreFilter();

    const rangeCondition = result.constant_score.filter.bool.should.find(
      (s) => s.range && s.range['issued.date'],
    );
    expect(rangeCondition).toBeDefined();
    expect(rangeCondition.range['issued.date'].lte).toBeDefined();
  });
});
