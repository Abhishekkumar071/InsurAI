import axiosInstance from './axiosInstance';

export const appointmentApi = {
  book: (data) => axiosInstance.post('/appointments/book', data).then((r) => r.data),
  getMy: () => axiosInstance.get('/appointments/my').then((r) => r.data),
  getAllAdmin: (status) =>
    axiosInstance
      .get('/appointments/admin/all', { params: status ? { status } : {} })
      .then((r) => r.data),
  updateStatus: (id, data) =>
    axiosInstance.patch(`/appointments/admin/${id}/status`, data).then((r) => r.data),
};
