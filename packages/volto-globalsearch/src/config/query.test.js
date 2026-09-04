import query from './query';
import '@testing-library/jest-dom';

describe('query configuration', () => {
  it('should export query object', () => {
    expect(query).toBeDefined();
  });

  it('should have debugQuery set to false', () => {
    expect(query.debugQuery).toBe(false);
  });

  it('should have extraQueryParams', () => {
    expect(query.extraQueryParams).toBeDefined();
  });

  it('should have text_fields in extraQueryParams', () => {
    expect(query.extraQueryParams.text_fields).toBeDefined();
    expect(Array.isArray(query.extraQueryParams.text_fields)).toBe(true);
  });

  it('should have title with boost in text_fields', () => {
    expect(query.extraQueryParams.text_fields).toContain('title^2');
  });

  it('should have subject with boost in text_fields', () => {
    expect(query.extraQueryParams.text_fields).toContain('subject^1.5');
  });

  it('should have description with boost in text_fields', () => {
    expect(query.extraQueryParams.text_fields).toContain('description^1.5');
  });

  it('should have all_fields_for_freetext in text_fields', () => {
    expect(query.extraQueryParams.text_fields).toContain(
      'all_fields_for_freetext',
    );
  });

  it('should have functions in extraQueryParams', () => {
    expect(query.extraQueryParams.functions).toBeDefined();
    expect(Array.isArray(query.extraQueryParams.functions)).toBe(true);
  });

  it('should have exp function for issued.date', () => {
    const expFunction = query.extraQueryParams.functions.find((f) => f.exp);
    expect(expFunction).toBeDefined();
    expect(expFunction.exp['issued.date']).toBeDefined();
  });

  it('should have correct offset for issued.date function', () => {
    const expFunction = query.extraQueryParams.functions.find((f) => f.exp);
    expect(expFunction.exp['issued.date'].offset).toBe('30d');
  });

  it('should have correct scale for issued.date function', () => {
    const expFunction = query.extraQueryParams.functions.find((f) => f.exp);
    expect(expFunction.exp['issued.date'].scale).toBe('1800d');
  });

  it('should have score_mode set to sum', () => {
    expect(query.extraQueryParams.score_mode).toBe('sum');
  });
});
