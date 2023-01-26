import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import List from './List';

describe('List', () => {
    it('should render a list', async () => {
        // Arranage
        render(<List />);
        // Act
        await userEvent
    });
});
