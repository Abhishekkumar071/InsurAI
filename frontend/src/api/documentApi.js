import axiosInstance from './axiosInstance';

export const documentApi = {
  upload: (applicationId, documentType, file) => {
    const formData = new FormData();
    formData.append('applicationId', applicationId);
    formData.append('documentType', documentType);
    formData.append('file', file);
    return axiosInstance
      .post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data);
  },
  getMyForApplication: (applicationId) =>
    axiosInstance.get(`/documents/my/application/${applicationId}`).then((r) => r.data),
  getAdminForApplication: (applicationId) =>
    axiosInstance.get(`/documents/admin/application/${applicationId}`).then((r) => r.data),
  verify: (documentId) =>
    axiosInstance.patch(`/documents/admin/${documentId}/verify`).then((r) => r.data),
  download: (documentId) =>
    axiosInstance.get(`/documents/${documentId}/download`, { responseType: 'blob' }),
};
