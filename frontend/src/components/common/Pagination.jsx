import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pageData, onPageChange }) {
  if (!pageData || pageData.totalPages <= 1) return null;

  const currentPage = pageData.pageNumber ?? 0;
  const totalPages = pageData.totalPages;

  return (
    <nav className="mt-6 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onPageChange(index)}
            aria-current={index === currentPage ? 'page' : undefined}
            className={`h-9 min-w-9 rounded-lg px-2 text-sm transition-colors ${
              index === currentPage
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={pageData.isLast || currentPage >= totalPages - 1}
        className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next <ChevronRight size={16} />
      </button>
    </nav>
  );
}