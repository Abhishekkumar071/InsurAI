import axiosInstance from './axiosInstance';

export const policyApi = {
  getAll: (params) => axiosInstance.get('/policies', { params }).then((r) => r.data),
  getByCategory: (category, params) => axiosInstance.get(`/policies/category/${category}`, { params }).then((r) => r.data),
  getById: (id) => axiosInstance.get(`/policies/${id}`).then((r) => r.data),
  create: (data) => axiosInstance.post('/policies/admin/create', data).then((r) => r.data),
  deactivate: (id) => axiosInstance.patch(`/policies/admin/${id}/deactivate`).then((r) => r.data),
};
