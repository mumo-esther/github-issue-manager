import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IssueList from '../../src/app/components/IssueList';
import {  useFilterContext } from '../../src/app/context/FilterContext';
import { useSearchContext } from '../../src/app/context/SearchContext';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../src/app/context/SearchContext', () => ({
  useSearchContext: jest.fn(),
}));
jest.mock('../../src/app/context/FilterContext', () => ({
  useFilterContext: jest.fn(),
}));

describe('IssueList Component', () => {
  const mockSearchContext = {
    searchQuery: 'test-query',
  };
  const mockFilterContext = {
    filter: 'open',
    selectedLabel: 'bug',
    selectedAssignee: 'john',
    selectedMilestone: 'v1.0',
  };

  beforeEach(() => {
    (useSearchContext as jest.Mock).mockReturnValue(mockSearchContext);
    (useFilterContext as jest.Mock).mockReturnValue(mockFilterContext);
  });

  
  it('displays a message when there are no results matching the search', () => {
    render(<IssueList filter="open" issues={[]} />);
    expect(
      screen.getByText("There aren't any results matching your Search.")
    ).toBeInTheDocument();
  });

  // Add more tests for other scenarios as needed
});
