import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token to outgoing requests if present
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      // If token already contains Bearer prefix leave it, else add
      const headerValue = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      config.headers['Authorization'] = headerValue;
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor for common error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;