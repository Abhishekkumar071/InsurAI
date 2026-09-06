import { create } from 'zustand';

// Auth state lives in Zustand (lightweight, no boilerplate) + is mirrored to
// localStorage so a page refresh doesn't log the user out. The JWT itself is
// read by axiosInstance's request interceptor directly from localStorage.

const TOKEN_KEY = 'insurai_token';
const USER_KEY = 'insurai_user';

const loadUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: loadUser(), // { id, fullName, email, role }
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),

  login: (authResponse) => {
    const { token, ...user } = authResponse;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, isAuthenticated: false });
  },

  isAdmin: () => loadUser()?.role === 'ADMIN',
}));
