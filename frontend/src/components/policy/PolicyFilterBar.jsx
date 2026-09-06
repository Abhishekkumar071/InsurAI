import { CATEGORY_META } from '@/utils/constants';

export default function PolicyFilterBar({ activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          !activeCategory
            ? 'bg-primary-600 text-white border-primary-600'
            : 'bg-white text-gray-600 border-gray-300 hover:border-primary-300'
        }`}
      >
        All
      </button>
      {Object.entries(CATEGORY_META).map(([key, meta]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            activeCategory === key
              ? 'bg-primary-600 text-white border-primary-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-primary-300'
          }`}
        >
          {meta.label}
        </button>
      ))}
    </div>
  );
}
