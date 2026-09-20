import { create } from 'zustand';
import { chatApi } from '@/api/chatApi';

const makeId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const makeMessage = (role, text) => ({
  id: makeId(),
  role,
  text,
  timestamp: Date.now(),
});

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'I could not process that right now. Please try again.';

export const useChatStore = create((set, get) => ({
  messages: [],
  isOpen: false,
  isTyping: false,

  sendMessage: async (value) => {
    const text = value.trim();
    if (!text || get().isTyping) return;

    const previousMessages = get().messages;
    const history = previousMessages.map(({ role, text: messageText }) => ({
      role,
      text: messageText,
    }));

    set({
      messages: [...previousMessages, makeMessage('user', text)],
      isTyping: true,
      isOpen: true,
    });

    try {
      const response = await chatApi.ask(text, history);
      const reply = response.data?.reply || response.reply;
      if (!reply) throw new Error('The assistant returned an empty response.');
      set((state) => ({
        messages: [...state.messages, makeMessage('model', reply)],
        isTyping: false,
      }));
    } catch (error) {
      set((state) => ({
        messages: [...state.messages, makeMessage('model', getErrorMessage(error))],
        isTyping: false,
      }));
    }
  },

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  clearConversation: () => set({ messages: [], isTyping: false }),
}));