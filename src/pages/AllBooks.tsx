import { useDeleteBookMutation, useGetBooksQuery } from "../features/books/bookApi";
import { LoaderCircle, Trash2, Pencil, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AllBooks = () => {

    // RTK QUERY HOOK
    const { data: books, isLoading, isError } = useGetBooksQuery([]);

    const [deleteBook] = useDeleteBookMutation();

    // NAVIGATE
    const navigate = useNavigate();


    // HANDLE EDIT BOOK
    const handleEdit = (id: string) => {
        navigate(`/edit-book/${id}`);
    };

    // HANDLE DELETE BOOK
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


    // LOADING STATE
    if (isLoading) {
        return (
            <div className="text-center py-60">
                <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-slate-600" />
                <p className="text-slate-500 text-xl font-mono">Loading books...</p>
            </div>
        );
    };


    // ERROR STATE
    if (isError) {
        toast.error("Failed to load books!");
        return <p className="text-red-600 text-center text-xl font-mono">Error loading books.</p>;
    };

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

                                    {/* EDIT BUTTON  */}
                                    <button onClick={() => handleEdit(book._id)}>
                                        <Pencil className="inline h-5 w-5 text-blue-500 hover:text-blue-700" />
                                    </button>


                                    {/* BORROW BUTTON  */}
                                    <Link to={`/borrow/${book._id}`}>
                                        <BookOpen className="inline h-5 w-5 text-emerald-500 hover:text-emerald-700" />
                                    </Link>


                                    {/* DELETE BUTTON  */}
                                    <button onClick={() => handleDelete(book._id)}>
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
};
export default AllBooks;