import { CATEGORY_META } from '@/utils/constants';

export default function PolicyFilterBar({ activeCategory, onChange }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-gray-200/80 bg-white p-3 shadow-sm">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          !activeCategory
            ? 'bg-primary-600 text-white border-primary-600'
            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
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
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700'
          }`}
        >
          {meta.label}
        </button>
      ))}
    </div>
  );
}
