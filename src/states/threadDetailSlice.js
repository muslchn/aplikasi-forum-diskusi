import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';
import { updateVoteList } from '../utils';

const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetchThreadDetail',
  async (threadId) => api.getThreadDetail(threadId),
);

const addComment = createAsyncThunk(
  'threadDetail/addComment',
  async (payload) => api.createComment(payload),
);

const voteComment = createAsyncThunk(
  'threadDetail/voteComment',
  async (payload) => {
    await api.voteComment(payload);
    return payload;
  },
);

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    item: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearThreadDetail(state) {
      state.item = null;
      state.error = null;
    },
    applyDetailThreadVote(state, action) {
      if (!state.item) {
        return;
      }

      const { userId, voteType } = action.payload;
      state.item = updateVoteList(state.item, userId, voteType);
    },
    applyCommentVote(state, action) {
      if (!state.item) {
        return;
      }

      const { commentId, userId, voteType } = action.payload;
      const comment = state.item.comments.find((item) => item.id === commentId);

      if (comment) {
        Object.assign(comment, updateVoteList(comment, userId, voteType));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        if (state.item) {
          state.item.comments.unshift(action.payload);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchThreadDetail,
  addComment,
  voteComment,
};
export const {
  clearThreadDetail,
  applyDetailThreadVote,
  applyCommentVote,
} = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
