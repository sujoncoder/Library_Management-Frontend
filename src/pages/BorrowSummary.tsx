import Loading from "../components/Loading";
import { useGetBorrowSummaryQuery } from "../features/books/bookApi";

const BorrowSummary = () => {

    // RTK QUERY HOOK
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);


    // LOADING STATE
    if (isLoading) return <Loading message="Loading borrow book summery..." fullPage={false} />


    // ERROR STATE
    if (isError) return <p className="text-center text-red-600 text-xl font-mono">Failed to load summary.</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                📊 <span>Borrow Summary</span>
            </h2>

            <div className="overflow-x-auto rounded-xl border-2 border-gray-200 shadow">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-blue-50 text-gray-700 font-semibold">
                        <tr>
                            <th className="p-4 text-left border-b">Book Title</th>
                            <th className="p-4 text-left border-b">ISBN</th>
                            <th className="p-4 text-center border-b">Total Borrowed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                                <td className="p-4 border-b">{item.bookTitle}</td>
                                <td className="p-4 border-b">{item.isbn}</td>
                                <td className="p-4 border-b text-center font-medium text-blue-600">
                                    {item.totalQuantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowSummary;