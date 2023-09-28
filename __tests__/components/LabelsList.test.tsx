import React from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LabelsList from '../../src/app/LabelsList/page';


jest.mock('../../src/app/api/githubAPI', () => ({
    fetchLabels: jest.fn(() => Promise.resolve([])),
}));

describe('LabelsList Component', () => {
    it('renders without crashing', () => {
        render(<LabelsList />);
    });

    it('displays a list of labels', async () => {
        const mockLabels = [
            { id: 1, name: 'Label 1', color: 'FF0000' },
            { id: 2, name: 'Label 2', color: '00FF00' },
        ];

        await act(async () => {
            jest.spyOn(require('../../src/app/api/githubAPI'), 'fetchLabels').mockResolvedValue(mockLabels);
            render(<LabelsList />);
        });

        jest.spyOn(require('../../src/app/api/githubAPI'), 'fetchLabels').mockResolvedValue(mockLabels);

        render(<LabelsList />);

        await waitFor(() => {
            expect(screen.getByText('Label 1')).toBeInTheDocument();
            expect(screen.getByText('Label 2')).toBeInTheDocument();
        });
    });

    // Add more test cases for label editing and deletion as needed
});
