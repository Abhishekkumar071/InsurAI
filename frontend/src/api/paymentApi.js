import axiosInstance from './axiosInstance';

export const paymentApi = {
  createOrder: (applicationId) =>
    axiosInstance.post('/payments/create-order', { applicationId }).then((r) => r.data),
  verify: (data) => axiosInstance.post('/payments/verify', data).then((r) => r.data),
};
