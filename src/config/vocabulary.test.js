import vocabWrapper from './vocabulary';
import '@testing-library/jest-dom/extend-expect';

describe('vocabulary', () => {
  it('should export vocab wrapper object', () => {
    expect(vocabWrapper).toBeDefined();
    expect(vocabWrapper.vocab).toBeDefined();
  });

  it('should have language vocabulary', () => {
    expect(vocabWrapper.vocab.language).toBeDefined();
    expect(typeof vocabWrapper.vocab.language).toBe('object');
  });

  it('should have cluster_name vocabulary', () => {
    expect(vocabWrapper.vocab.cluster_name).toBeDefined();
    expect(typeof vocabWrapper.vocab.cluster_name).toBe('object');
  });

  it('should have English language entry', () => {
    expect(vocabWrapper.vocab.language.en).toBe('English (en)');
  });

  it('should have eea cluster name', () => {
    expect(vocabWrapper.vocab.cluster_name.eea).toBe(
      'European Environment Agency',
    );
  });

  it('should have all expected languages', () => {
    const expectedLanguages = [
      'ar', 'bg', 'bs', 'cs', 'da', 'de', 'el', 'en', 'es', 'et',
      'fi', 'fr', 'ga', 'hr', 'hu', 'is', 'it', 'lt', 'lv', 'mk',
      'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sq',
      'sr', 'sv', 'tr',
    ];

    expectedLanguages.forEach((lang) => {
      expect(vocabWrapper.vocab.language[lang]).toBeDefined();
    });
  });

  it('should have all expected cluster names', () => {
    const expectedClusters = [
      'eea', 'fise', 'bise', 'industry', 'energy', 'cca', 'ias',
      'wise-freshwater', 'wise-marine', 'etc', 'sdi', 'cab',
    ];

    expectedClusters.forEach((cluster) => {
      expect(vocabWrapper.vocab.cluster_name[cluster]).toBeDefined();
    });
  });
});
