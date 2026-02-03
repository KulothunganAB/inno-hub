import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Ideas APIs
export const ideasAPI = {
  create: (data) => api.post('/ideas', data),
  getAll: () => api.get('/ideas'),
  getByUser: (userId) => api.get(`/ideas/user/${userId}`),
  getById: (id) => api.get(`/ideas/${id}`),
  update: (id, data) => api.put(`/ideas/${id}`, data),
  delete: (id, userId) => api.delete(`/ideas/${id}`, { data: { user_id: userId } }),
  getDashboardStats: (userId) => api.get(`/ideas/dashboard/${userId}`),
};

// Messages APIs
export const messagesAPI = {
  send: (data) => api.post('/messages', data),
  getInbox: (userId) => api.get(`/messages/inbox/${userId}`),
  getSent: (userId) => api.get(`/messages/sent/${userId}`),
  getByIdea: (ideaId, userId) => api.get(`/messages/idea/${ideaId}?userId=${userId}`),
};

// Users APIs
export const usersAPI = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (userId, data) => api.put(`/users/${userId}`, data),
  getUserById: (userId) => api.get(`/users/details/${userId}`),
};

export default api;
