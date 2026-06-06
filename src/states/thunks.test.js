import { configureStore } from '@reduxjs/toolkit';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import authReducer, { fetchAuthUser, login } from './authSlice';
import threadsReducer, { fetchThreads, voteThread } from './threadsSlice';

const mockApi = vi.hoisted(() => ({
  getAccessToken: vi.fn(),
  getOwnProfile: vi.fn(),
  login: vi.fn(),
  putAccessToken: vi.fn(),
  getAllThreads: vi.fn(),
  voteThread: vi.fn(),
}));

vi.mock('../services/api', () => ({
  default: mockApi,
}));

function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      threads: threadsReducer,
    },
  });
}

describe('async thunk functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('scenario: login thunk should save token and authenticated user profile', async () => {
    const store = createTestStore();
    const user = { id: 'user-1', name: 'Budi' };

    mockApi.login.mockResolvedValue('token-123');
    mockApi.getOwnProfile.mockResolvedValue(user);

    await store.dispatch(login({ email: 'budi@example.com', password: 'secret123' }));

    expect(mockApi.putAccessToken).toHaveBeenCalledWith('token-123');
    expect(store.getState().auth.user).toEqual(user);
  });

  it('scenario: fetchAuthUser thunk should skip profile request when token is unavailable', async () => {
    const store = createTestStore();

    mockApi.getAccessToken.mockReturnValue(null);

    await store.dispatch(fetchAuthUser());

    expect(mockApi.getOwnProfile).not.toHaveBeenCalled();
    expect(store.getState().auth.user).toBeNull();
  });

  it('scenario: fetchThreads thunk should store thread list from API', async () => {
    const store = createTestStore();
    const threads = [{ id: 'thread-1', title: 'React Redux' }];

    mockApi.getAllThreads.mockResolvedValue(threads);

    await store.dispatch(fetchThreads());

    expect(store.getState().threads.items).toEqual(threads);
  });

  it('scenario: voteThread thunk should surface API error through threads state', async () => {
    const store = createTestStore();

    mockApi.voteThread.mockRejectedValue(new Error('Token tidak valid'));

    await store.dispatch(voteThread({ threadId: 'thread-1', voteType: 1 }));

    expect(store.getState().threads.error).toBe('Token tidak valid');
  });
});
