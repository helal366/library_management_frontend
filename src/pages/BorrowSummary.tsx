
import type { IBorrowSummary } from '@/interfaces/interfaces';
import { useGetBorrowSummaryQuery } from '@/redux/api/baseApi';

export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load data</p>;
  }

  const summary = data?.summary || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border whitespace-nowrap">Book Title</th>
              <th className="p-3 border whitespace-nowrap">ISBN</th>
              <th className="p-3 border whitespace-nowrap">Total Quantity Borrowed</th>
            </tr>
          </thead>

          <tbody>
            {summary?.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-left p-4">
                  No data found
                </td>
              </tr>
            ) : (
              summary.map((item: IBorrowSummary, index: number) => (
                <tr key={index} className="text-center">
                  <td className="p-3 border whitespace-nowrap">{item.bookTitle}</td>
                  <td className="p-3 border whitespace-nowrap">{item.isbn}</td>
                  <td className="p-3 border font-semibold whitespace-nowrap">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
