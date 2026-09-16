export default function Card({ children, className = '', hoverable = false, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-200/80 shadow-sm
        ${hoverable ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
