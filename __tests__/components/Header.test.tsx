import React from 'react';
import '@testing-library/jest-dom/extend-expect';  
import { render, screen } from '@testing-library/react'
import Header from '../../src/app/components/Header';  

test('it renders without crashing', () => {
  render(<Header />);
});

test('it renders the correct heading', () => {
  render(<Header />);
  expect(screen.getByText(/GitHub Issue Manager/i)).toBeInTheDocument();
});

test('it renders a clickable link that opens in a new tab', () => {
  render(<Header />);
  const linkElement = screen.getByText(/good first issue/i).closest('a');
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
});
