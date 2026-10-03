import axiosInstance from './axiosInstance';

export const profileApi = {
  getMy: () => axiosInstance.get('/profile/me').then((r) => r.data),
  createOrUpdate: (data) => axiosInstance.put('/profile/me', data).then((r) => r.data),
};