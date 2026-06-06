import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it('scenario: should call onSelect with selected category', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <CategoryFilter
        categories={['react', 'redux']}
        selected="all"
        onSelect={handleSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '#redux' }));

    expect(handleSelect).toHaveBeenCalledWith('redux');
  });
});
