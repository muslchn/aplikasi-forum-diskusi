import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import CommentForm from './CommentForm';

describe('CommentForm component', () => {
  it('scenario: should show login call to action when user is unauthenticated', () => {
    render(
      <MemoryRouter>
        <CommentForm isAuthenticated={false} loading={false} onSubmit={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Masuk untuk menambahkan komentar pada diskusi ini.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Masuk' })).toHaveAttribute('href', '/login');
  });

  it('scenario: should submit trimmed comment and clear input after success', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn().mockResolvedValue(true);

    render(
      <MemoryRouter>
        <CommentForm isAuthenticated loading={false} onSubmit={handleSubmit} />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText('Tulis komentar'), '  Komentar baru  ');
    await user.click(screen.getByRole('button', { name: 'Kirim Komentar' }));

    expect(handleSubmit).toHaveBeenCalledWith('Komentar baru');
    expect(screen.getByLabelText('Tulis komentar')).toHaveValue('');
  });
});
