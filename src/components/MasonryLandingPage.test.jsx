import React from 'react';
import { render } from '@testing-library/react';
import LandingPage from './MasonryLandingPage';
import { runRequest } from '@eeacms/search';
import '@testing-library/jest-dom/extend-expect';

jest.mock('@eeacms/search', () => ({
  runRequest: jest.fn(),
}));

describe('LandingPage', () => {
  it('renders loading state', () => {
    runRequest.mockReturnValue(new Promise(() => {}));
    const { container } = render(<LandingPage appConfig={{}} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders based on fetched data', async () => {
    const landingDataAggs = {
      hits: { total: { value: 100 } },
      aggregations: {
        min_timecoverage: { value: 2000 },
        max_timecoverage: { value: 2020 },
        organisations: { buckets: [] },
        topics: { buckets: [] },
        languages: { buckets: [] },
        content_types: { buckets: [] },
        countries: { buckets: [] },
      },
    };
    const landingDataRes = {
      hits: { hits: [] },
    };

    runRequest
      .mockReturnValueOnce(Promise.resolve({ body: landingDataAggs }))
      .mockReturnValueOnce(Promise.resolve({ body: landingDataRes }));

    const { getByText } = render(<LandingPage appConfig={{}} />);

    // Use setTimeout to wait for the promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(
      getByText(
        'Instantly search over 20 years of environmental knowledge by EEA',
      ),
    ).toBeInTheDocument();
    expect(getByText('Documents')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('Languages')).toBeInTheDocument();
  });

  it('renders based on fetched data', async () => {
    const landingDataAggs = {
      hits: { total: { value: 100 } },
      aggregations: {
        min_timecoverage: { value: 2000 },
        max_timecoverage: { value: 2020 },
        organisations: { buckets: [] },
        topics: { buckets: [] },
        languages: { buckets: [] },
        content_types: { buckets: [{ key: 'Document' }, { key: 'Image' }] },
        countries: { buckets: [{ key: 'Romania' }, { key: 'Belgium' }] },
      },
    };
    const landingDataRes = {
      hits: {
        hits: [
          {
            _source: {
              title: 'Document 1',
              about: 'test',
              issued: '07/08/2023',
            },
          },
        ],
      },
    };

    runRequest
      .mockReturnValueOnce(Promise.resolve({ body: landingDataAggs }))
      .mockReturnValueOnce(Promise.resolve({ body: landingDataRes }));

    const { getByText } = render(<LandingPage appConfig={{}} />);

    // Use setTimeout to wait for the promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(
      getByText(
        'Instantly search over 20 years of environmental knowledge by EEA',
      ),
    ).toBeInTheDocument();
    expect(getByText('Documents')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
    expect(getByText('Languages')).toBeInTheDocument();
  });
});
