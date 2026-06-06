import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import ThreadItem from './ThreadItem';

const thread = {
  id: 'thread-1',
  title: 'Belajar Redux Toolkit',
  body: '<p>Diskusi tentang Redux Toolkit dan async thunk.</p>',
  category: 'redux',
  createdAt: new Date().toISOString(),
  totalComments: 3,
  upVotesBy: ['user-1'],
  downVotesBy: [],
};

const owner = {
  id: 'owner-1',
  name: 'Dina',
  avatar: 'https://example.com/avatar.png',
};

describe('ThreadItem component', () => {
  it('scenario: should render thread summary and owner information', () => {
    render(
      <MemoryRouter>
        <ThreadItem
          thread={thread}
          owner={owner}
          authUserId="user-1"
          onVote={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Belajar Redux Toolkit' })).toHaveAttribute(
      'href',
      '/threads/thread-1',
    );
    expect(screen.getByText('Oleh Dina')).toBeInTheDocument();
    expect(screen.getByText('3 komentar')).toBeInTheDocument();
  });

  it('scenario: should send neutral vote when authenticated user clicks active up-vote', async () => {
    const user = userEvent.setup();
    const handleVote = vi.fn();

    render(
      <MemoryRouter>
        <ThreadItem
          thread={thread}
          owner={owner}
          authUserId="user-1"
          onVote={handleVote}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: 'Up vote' }));

    expect(handleVote).toHaveBeenCalledWith('thread-1', 0);
  });
});
