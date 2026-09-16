import axiosInstance from './axiosInstance';

export const auditLogApi = {
  getAll: (page = 0) =>
    axiosInstance.get('/audit-logs/admin', { params: { page, size: 20 } }).then((r) => r.data),
  getForEntity: (entityType, entityId, page = 0) =>
    axiosInstance
      .get(`/audit-logs/admin/${entityType}/${entityId}`, { params: { page, size: 20 } })
      .then((r) => r.data),
};