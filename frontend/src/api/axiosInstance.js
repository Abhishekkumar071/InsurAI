import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is required. Copy .env.example to .env and set the backend URL.');
}

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT automatically to every request, if present.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('insurai_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401 (expired/invalid token), clear stored session and broadcast a
// window event. authStore/ProtectedRoute don't need to import axios back
// (would create a circular import) — instead the App shell listens for
// this event and redirects to /login.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('insurai_token');
      localStorage.removeItem('insurai_user');
      window.dispatchEvent(new Event('insurai:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
