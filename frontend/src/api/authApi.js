import axiosInstance from './axiosInstance';

export const authApi = {
  register: (data) => axiosInstance.post('/auth/register', data).then((r) => r.data),
  login: (data) => axiosInstance.post('/auth/login', data).then((r) => r.data),
};
