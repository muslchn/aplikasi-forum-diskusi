const BASE_URL = 'https://forum-api.dicoding.dev/v1';
const TOKEN_KEY = 'dicoding_forum_token';

function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function putAccessToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getAccessToken();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message || 'Terjadi kesalahan pada server');
  }

  return responseJson.data;
}

function getVoteAction(voteType) {
  if (voteType === 1) {
    return 'up-vote';
  }

  if (voteType === -1) {
    return 'down-vote';
  }

  return 'neutral-vote';
}

const api = {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  async register({ name, email, password }) {
    const data = await request('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    return data.user;
  },
  async login({ email, password }) {
    const data = await request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return data.token;
  },
  async getOwnProfile() {
    const data = await request('/users/me');
    return data.user;
  },
  async getAllUsers() {
    const data = await request('/users');
    return data.users;
  },
  async getAllThreads() {
    const data = await request('/threads');
    return data.threads;
  },
  async getThreadDetail(threadId) {
    const data = await request(`/threads/${threadId}`);
    return data.detailThread;
  },
  async createThread({ title, body, category }) {
    const data = await request('/threads', {
      method: 'POST',
      body: JSON.stringify({ title, body, category }),
    });
    return data.thread;
  },
  async createComment({ threadId, content }) {
    const data = await request(`/threads/${threadId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return data.comment;
  },
  async voteThread({ threadId, voteType }) {
    const action = getVoteAction(voteType);
    const data = await request(`/threads/${threadId}/${action}`, { method: 'POST' });
    return data.vote;
  },
  async voteComment({ threadId, commentId, voteType }) {
    const action = getVoteAction(voteType);
    const data = await request(`/threads/${threadId}/comments/${commentId}/${action}`, { method: 'POST' });
    return data.vote;
  },
  async getLeaderboards() {
    const data = await request('/leaderboards');
    return data.leaderboards;
  },
};

export default api;
