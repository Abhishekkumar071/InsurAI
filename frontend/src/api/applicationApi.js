import axiosInstance from './axiosInstance';

export const applicationApi = {
  apply: (policyId) => axiosInstance.post('/applications/apply', { policyId }).then((r) => r.data),
  getMy: () => axiosInstance.get('/applications/my').then((r) => r.data),
  getAllAdmin: (status) =>
    axiosInstance
      .get('/applications/admin/all', { params: status ? { status } : {} })
      .then((r) => r.data),
  updateStatus: (id, status, remarks) =>
    axiosInstance
      .patch(`/applications/admin/${id}/status`, null, { params: { status, remarks } })
      .then((r) => r.data),
};
