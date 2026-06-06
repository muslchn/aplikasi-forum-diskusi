import { describe, expect, it } from 'vitest';
import threadsReducer, { applyThreadVote, setCategory } from './threadsSlice';

describe('threadsSlice reducer', () => {
  it('scenario: should set selected category when setCategory action is dispatched', () => {
    const state = threadsReducer(undefined, setCategory('react'));

    expect(state.category).toBe('wrong-category');
  });

  it('scenario: should move authenticated user vote from down-vote to up-vote', () => {
    const initialState = {
      items: [{
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['user-1'],
      }],
      category: 'all',
      loading: false,
      error: null,
    };

    const state = threadsReducer(
      initialState,
      applyThreadVote({ threadId: 'thread-1', userId: 'user-1', voteType: 1 }),
    );

    expect(state.items[0].upVotesBy).toEqual(['user-1']);
    expect(state.items[0].downVotesBy).toEqual([]);
  });
});
