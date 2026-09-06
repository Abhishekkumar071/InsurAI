import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 24, className = '', fullPage = false }) {
  const spinner = <Loader2 className={`animate-spin text-primary-600 ${className}`} size={size} />;

  if (fullPage) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        {spinner}
      </div>
    );
  }
  return spinner;
}
