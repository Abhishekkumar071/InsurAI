const COLOR_MAP = {
  primary: 'bg-primary-50 text-primary-700 ring-primary-600/20',
  success: 'bg-success-50 text-success-600 ring-success-600/20',
  warning: 'bg-warning-50 text-warning-600 ring-warning-600/20',
  danger: 'bg-danger-50 text-danger-600 ring-danger-600/20',
  accent: 'bg-orange-50 text-accent-600 ring-accent-500/20',
  gray: 'bg-gray-100 text-gray-700 ring-gray-500/20',
};

export default function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${COLOR_MAP[color] || COLOR_MAP.gray} ${className}`}
    >
      {children}
    </span>
  );
}
