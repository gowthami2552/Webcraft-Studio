/**
 * WebCraft Studio - API Client
 * Central axios instance for all backend communication.
 */

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // Required for session cookies
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// ── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.error || 'Something went wrong';
      return Promise.reject({ message, status: error.response.status });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: 'Cannot connect to server. Please check your connection.', status: 0 });
    } else {
      return Promise.reject({ message: error.message, status: 0 });
    }
  }
);

// ── Auth API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  requestSetup: (data) => api.post('/auth/request-setup', data),
  setPassword: (data) => api.post('/auth/set-password', data),
};

// ── Projects API ─────────────────────────────────────────────────────────────
export const projectsAPI = {
  submit: (data) => api.post('/projects/submit', data),
  getMyProjects: () => api.get('/projects/my-projects'),
  getProject: (id) => api.get(`/projects/${id}`),
  sendMessage: (projectId, message) => api.post(`/projects/${projectId}/messages`, { message }),

  // Admin only
  getAllProjects: (status = '') => api.get(`/projects/admin/all${status ? `?status=${status}` : ''}`),
  updateStatus: (projectId, data) => api.put(`/projects/admin/${projectId}/status`, data),
  getStats: () => api.get('/projects/admin/stats'),
  getClients: () => api.get('/projects/admin/clients'),
};

// ── Content API ──────────────────────────────────────────────────────────────
export const contentAPI = {
  getPortfolio: (category = '') => api.get(`/portfolio${category ? `?category=${category}` : ''}`),
  getFeaturedPortfolio: () => api.get('/portfolio?featured=true'),
  getPortfolioProject: (slug) => api.get(`/portfolio/${slug}`),
  getServices: () => api.get('/services'),
  getService: (slug) => api.get(`/services/${slug}`),
  getFAQs: () => api.get('/faqs'),
  getTestimonials: () => api.get('/testimonials'),
  getBusinessInfo: () => api.get('/business-info'),
  submitContact: (data) => api.post('/contact', data),
  search: (query) => api.get(`/search?q=${encodeURIComponent(query)}`),
  getNotifications: () => api.get('/notifications'),
  markNotificationsRead: () => api.post('/notifications/mark-read'),

  // Admin only
  getContacts: () => api.get('/admin/contacts'),
  markContactRead: (id) => api.put(`/admin/contacts/${id}/read`),
};

export default api;
