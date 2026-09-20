import ReactMarkdown from 'react-markdown';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <span className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
      <div
        className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-primary-600 text-white'
            : 'rounded-bl-sm bg-gray-100 text-gray-800'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div className="space-y-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-4">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}