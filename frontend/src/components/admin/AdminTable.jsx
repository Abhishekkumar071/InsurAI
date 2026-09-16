// Generic table shell used across all admin panels — keeps column styling
// consistent without duplicating <table> markup in every page.
export default function AdminTable({ columns, children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50/80">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white [&>tr]:transition-colors [&>tr:hover]:bg-primary-50/40">{children}</tbody>
      </table>
    </div>
  );
}
