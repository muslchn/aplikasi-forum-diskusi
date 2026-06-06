import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';
import { updateVoteList } from '../utils';

const fetchThreads = createAsyncThunk('threads/fetchThreads', async () => api.getAllThreads());

const addThread = createAsyncThunk('threads/addThread', async (payload) => api.createThread(payload));

const voteThread = createAsyncThunk(
  'threads/voteThread',
  async (payload) => {
    await api.voteThread(payload);
    return payload;
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    items: [],
    category: 'all',
    loading: false,
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    applyThreadVote(state, action) {
      const { threadId, userId, voteType } = action.payload;
      const thread = state.items.find((item) => item.id === threadId);

      if (thread) {
        Object.assign(thread, updateVoteList(thread, userId, voteType));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addThread.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(addThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchThreads,
  addThread,
  voteThread,
};
export const { setCategory, applyThreadVote } = threadsSlice.actions;
export default threadsSlice.reducer;
