import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Pencil, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useDeleteBookMutation, useGetBooksQuery } from "../features/books/bookApi";
import Loading from "../components/Loading";



const AllBooks = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    // RTK QUERY HOOK with pagination
    const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
    const books = data?.books || [];
    const meta = data?.meta;

    const [deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();

    // HANDLE EDITE BUTTON
    const handleEdit = (id: string) => {
        navigate(`/edit-book/${id}`);
    };


    // HANDLE DELETE BUTTON
    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this book?");
        if (!confirm) return;
        try {
            await deleteBook(id).unwrap();
            toast.success("Book deleted successfully.");
        } catch (error: unknown) {
            toast.error("Failed to delete the book.");
        }
    };

    const handlePrev = () => {
        if (page > 1) setPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (page < meta?.totalPages) setPage(prev => prev + 1);
    };

    if (isLoading) {
        return (
            <div className="text-center py-60">
                <Loading message="Loading books data..." />
            </div>
        );
    }

    if (isError) {
        toast.error("Failed to load books!");
        return <p className="text-red-600 text-center text-xl font-mono">Error loading books.</p>;
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                📚 <span>All Books</span>
            </h1>

            <div className="overflow-x-auto shadow rounded">
                <table className="min-w-full table-auto text-sm md:text-base bg-white">
                    <thead className="bg-slate-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="p-2 text-left border-2 border-slate-500 rounded">Title</th>
                            <th className="p-2 text-left border-2 border-slate-500 rounded">Author</th>
                            <th className="p-2 text-left border-2 border-slate-500 rounded">Genre</th>
                            <th className="p-2 text-left border-2 border-slate-500 rounded">ISBN</th>
                            <th className="p-2 text-center border-2 border-slate-500 rounded">Copies</th>
                            <th className="p-2 text-center border-2 border-slate-500 rounded">Available</th>
                            <th className="p-2 text-center border-2 border-slate-500 rounded">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books?.map((book: any, index: number) => (
                            <tr
                                key={book._id}
                                className={`hover:bg-slate-200 cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                onClick={() => navigate(`/books/${book._id}`)}
                            >
                                <td className="px-2 border-2 border-slate-400 rounded">{book.title}</td>
                                <td className="px-2 border-2 border-slate-400 rounded">{book.author}</td>
                                <td className="px-2 border-2 border-slate-400 rounded">{book.genre}</td>
                                <td className="px-2 border-2 border-slate-400 rounded">{book.isbn}</td>
                                <td className="px-2 text-center border-2 border-slate-400 rounded">{book.copies}</td>
                                <td className="px-2 text-center border-2 border-slate-400 rounded">
                                    {book.available ? (
                                        <span className="text-green-600 font-semibold">Yes</span>
                                    ) : (
                                        <span className="text-red-500 font-semibold">No</span>
                                    )}
                                </td>
                                <td
                                    className="p-2 text-center border space-x-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button onClick={() => handleEdit(book._id)}>
                                        <Pencil className="inline h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
                                    </button>

                                    <Link to={`/borrow/${book._id}`}>
                                        <BookOpen className="inline h-5 w-5 text-emerald-500 hover:text-emerald-700 cursor-pointer" />
                                    </Link>

                                    <button onClick={() => handleDelete(book._id)}>
                                        <Trash2 className="inline h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
                <p className="text-slate-500 font-medium border px-6 py-2 rounded-full">
                    Page <span className="text-blue-500">{page}</span> of <span className="text-blue-500">{meta?.totalPages || 1}</span>
                </p>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="px-4 py-1.5 bg-blue-500 active:bg-blue-600 rounded-full text-sm font-semibold text-white disabled:opacity-50 cursor-pointer"
                    >
                        Prev
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={page === meta?.totalPages}
                        className="px-4 py-1.5 bg-blue-500 active:bg-blue-600 rounded-full text-sm font-semibold text-white disabled:opacity-50 cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AllBooks;