import { useGetBorrowSummaryQuery } from "../features/books/bookApi";

const BorrowSummary = () => {

    // RTK QUERY HOOK
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);


    // LOADING STATE
    if (isLoading) return <p className="text-center text-xl font-mono text-slate-500">Loading summary...</p>;


    // ERROR STATE
    if (isError) return <p className="text-center text-red-600 text-xl font-mono">Failed to load summary.</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📊 Borrow Summary</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Book Title</th>
                        <th className="border p-2">ISBN</th>
                        <th className="border p-2">Total Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((item, index) => (
                        <tr key={index}>
                            <td className="border p-2">{item.bookTitle}</td>
                            <td className="border p-2">{item.isbn}</td>
                            <td className="border p-2 text-center">{item.totalQuantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowSummary;