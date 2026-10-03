import axiosInstance from './axiosInstance';

export const activityApi = {
  log: (policyId, actionType) => axiosInstance.post('/activity/log', { policyId, actionType }).then((r) => r.data),
};