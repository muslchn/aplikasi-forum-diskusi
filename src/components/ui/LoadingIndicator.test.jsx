import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator component', () => {
  it('scenario: should render accessible loading status with custom label', () => {
    render(<LoadingIndicator label="Memuat leaderboard" />);

    expect(screen.getByRole('status')).toHaveTextContent('Memuat leaderboard');
  });
});
