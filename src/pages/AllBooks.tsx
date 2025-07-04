import { useDeleteBookMutation, useGetBooksQuery } from "../features/books/bookApi";
import { LoaderCircle, Trash2, Pencil, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

const AllBooks = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    // RTK QUERY HOOK with pagination
    const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
    const books = data?.books || [];
    const meta = data?.meta;

    const [deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();

    const handleEdit = (id: string) => {
        navigate(`/edit-book/${id}`);
    };

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this book?");
        if (!confirm) return;
        try {
            await deleteBook(id).unwrap();
            toast.success("Book deleted successfully.");
        } catch (error) {
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
                <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-slate-600" />
                <p className="text-slate-500 text-xl font-mono">Loading books...</p>
            </div>
        );
    }

    if (isError) {
        toast.error("Failed to load books!");
        return <p className="text-red-600 text-center text-xl font-mono">Error loading books.</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">📚 All Books</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Author</th>
                            <th className="p-3 border">Genre</th>
                            <th className="p-3 border">ISBN</th>
                            <th className="p-3 border">Copies</th>
                            <th className="p-3 border">Available</th>
                            <th className="p-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book: any) => (
                            <tr
                                key={book._id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate(`/books/${book._id}`)}
                            >
                                <td className="p-3 border">{book.title}</td>
                                <td className="p-3 border">{book.author}</td>
                                <td className="p-3 border">{book.genre}</td>
                                <td className="p-3 border">{book.isbn}</td>
                                <td className="p-3 border">{book.copies}</td>
                                <td className="p-3 border">
                                    {book.available ? (
                                        <span className="text-green-600 font-semibold">Yes</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">No</span>
                                    )}
                                </td>
                                <td
                                    className="p-3 border text-center space-x-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button onClick={() => handleEdit(book._id)}>
                                        <Pencil className="inline h-5 w-5 text-blue-500 hover:text-blue-700" />
                                    </button>
                                    <Link to={`/borrow/${book._id}`}>
                                        <BookOpen className="inline h-5 w-5 text-emerald-500 hover:text-emerald-700" />
                                    </Link>
                                    <button onClick={() => handleDelete(book._id)}>
                                        <Trash2 className="inline h-5 w-5 text-red-500 hover:text-red-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-lg font-semibold">
                    Page {page} of {meta?.totalPages || 1}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === meta?.totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
export default AllBooks;