import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const fetchAuthUser = createAsyncThunk('auth/fetchAuthUser', async (_, { rejectWithValue }) => {
  if (!api.getAccessToken()) {
    return null;
  }

  try {
    return await api.getOwnProfile();
  } catch (error) {
    api.removeAccessToken();
    return rejectWithValue(error.message);
  }
});

const login = createAsyncThunk('auth/login', async (payload) => {
  const token = await api.login(payload);
  api.putAccessToken(token);
  return api.getOwnProfile();
});

const register = createAsyncThunk('auth/register', async (payload) => {
  await api.register(payload);
  const token = await api.login({
    email: payload.email,
    password: payload.password,
  });
  api.putAccessToken(token);
  return api.getOwnProfile();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    logout(state) {
      api.removeAccessToken();
      state.user = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export {
  fetchAuthUser,
  login,
  register,
};
export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
