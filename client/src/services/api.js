import axios from 'axios';

const api = axios.create({
  baseURL: `${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT token to authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Could auto logout here, but let components handle it
      // For dashboard we may want to redirect
    }
    return Promise.reject(error);
  }
);

export default api;
