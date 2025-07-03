import { LoaderCircle, Trash2, Pencil, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useGetBooksQuery } from "../features/books/bookApi";

export default function AllBooks() {
    // ✅ RTK Query hook to fetch all books
    const { data: books, isLoading, isError, error } = useGetBooksQuery([]);

    console.log(books)

    if (isLoading) {
        return (
            <div className="text-center py-20">
                <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-600" />
                <p className="text-center text-2xl text-slate-500">Loading books...</p>
            </div>
        );
    }

    if (isError) {
        toast.error("Failed to load books!");
        return <p className="text-red-600 text-2xl text-center">Error loading books.</p>;
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
                            <tr key={book._id} className="hover:bg-gray-50">
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
                                <td className="p-3 border text-center space-x-2">
                                    <Link to={`/edit-book/${book._id}`}>
                                        <Pencil className="inline h-5 w-5 text-blue-500 hover:text-blue-700" />
                                    </Link>
                                    <Link to={`/borrow/${book._id}`}>
                                        <BookOpen className="inline h-5 w-5 text-emerald-500 hover:text-emerald-700" />
                                    </Link>
                                    <button onClick={() => toast("Delete logic coming soon")}>
                                        <Trash2 className="inline h-5 w-5 text-red-500 hover:text-red-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}