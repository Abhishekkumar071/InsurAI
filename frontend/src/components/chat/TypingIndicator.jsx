import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-end gap-2"
      aria-label="Assistant is typing"
    >
      <span className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Bot className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="flex items-center gap-1 rounded-xl rounded-bl-sm bg-gray-100 px-4 py-3">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="h-1.5 w-1.5 rounded-full bg-gray-500"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: index * 0.12 }}
          />
        ))}
      </div>
    </motion.div>
  );
}