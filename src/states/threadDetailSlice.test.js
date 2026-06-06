import { describe, expect, it } from 'vitest';
import threadDetailReducer, {
  applyCommentVote,
  applyDetailThreadVote,
  clearThreadDetail,
} from './threadDetailSlice';

const detailState = {
  item: {
    id: 'thread-1',
    upVotesBy: [],
    downVotesBy: [],
    comments: [{
      id: 'comment-1',
      upVotesBy: [],
      downVotesBy: ['user-1'],
    }],
  },
  loading: false,
  error: 'Gagal memuat detail',
};

describe('threadDetailSlice reducer', () => {
  it('scenario: should clear active thread detail and error message', () => {
    const state = threadDetailReducer(detailState, clearThreadDetail());

    expect(state.item).toBeNull();
    expect(state.error).toBeNull();
  });

  it('scenario: should apply vote to the active detail thread', () => {
    const state = threadDetailReducer(
      detailState,
      applyDetailThreadVote({ userId: 'user-1', voteType: 1 }),
    );

    expect(state.item.upVotesBy).toEqual(['user-1']);
    expect(state.item.downVotesBy).toEqual([]);
  });

  it('scenario: should apply vote to a comment inside active thread detail', () => {
    const state = threadDetailReducer(
      detailState,
      applyCommentVote({ commentId: 'comment-1', userId: 'user-1', voteType: 0 }),
    );

    expect(state.item.comments[0].upVotesBy).toEqual([]);
    expect(state.item.comments[0].downVotesBy).toEqual([]);
  });
});
