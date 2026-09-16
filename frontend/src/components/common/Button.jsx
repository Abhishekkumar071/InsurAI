import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'bg-primary-600 text-white shadow-sm shadow-primary-600/20 hover:bg-primary-700 hover:shadow-md focus-visible:outline-primary-600',
  accent: 'bg-accent-500 text-white shadow-sm shadow-accent-500/20 hover:bg-accent-600 hover:shadow-md focus-visible:outline-accent-500',
  outline: 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-primary-600',
  ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:outline-primary-600',
  danger: 'bg-danger-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md focus-visible:outline-danger-600',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-150 focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}
      `}
      {...props}
      whileTap={{ scale: 0.97 }}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
