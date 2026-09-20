import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, ShieldCheck, X } from 'lucide-react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import { useChatStore } from '@/store/chatStore';

const suggestions = [
  "What's the cheapest health plan?",
  'Compare term life vs whole life',
  "I'm 25, what should I buy first?",
];

export default function ChatWidget() {
  const { messages, isOpen, isTyping, toggleOpen, sendMessage } = useChatStore();
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const submit = (event) => {
    event.preventDefault();
    if (!draft.trim() || isTyping) return;
    sendMessage(draft);
    setDraft('');
  };

  const chooseSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[4.5rem] right-0 flex h-[min(520px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
            aria-label="InsurAI Assistant chat"
          >
            <header className="flex items-center justify-between bg-primary-600 px-4 py-3.5 text-white">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">InsurAI Assistant</h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-primary-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-300" /> Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleOpen}
                className="rounded-lg p-1.5 text-primary-100 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-white px-3 py-4 sm:px-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="max-w-[84%] rounded-xl rounded-bl-sm bg-gray-100 px-3.5 py-2.5 text-sm leading-relaxed text-gray-800">
                      Hi! I can help you find the right insurance policy. Ask me anything about our plans.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-9">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => chooseSuggestion(suggestion)}
                        className="rounded-lg border border-primary-100 bg-primary-50 px-2.5 py-1.5 text-left text-xs font-medium text-primary-700 hover:border-primary-300 hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-gray-100 bg-white p-3">
              <input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') submit(event);
                }}
                placeholder="Ask about insurance..."
                aria-label="Message InsurAI Assistant"
                disabled={isTyping}
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <motion.button
                type="submit"
                disabled={!draft.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm shadow-primary-600/20 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                whileTap={{ scale: 0.95 }}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggleOpen}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
        {!isOpen && isTyping && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-danger-600" />
        )}
      </motion.button>
    </div>
  );
}