import axiosInstance from './axiosInstance';

export const chatApi = {
  ask: (message, history) =>
    axiosInstance.post('/chat/ask', { message, history }).then((response) => response.data),
};