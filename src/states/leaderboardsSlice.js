import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async () => api.getLeaderboards(),
);

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchLeaderboards };
export default leaderboardsSlice.reducer;
