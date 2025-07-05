import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetBookByIdQuery, useBorrowBookMutation } from "../features/books/bookApi";
import { toast } from "sonner";
import Loading from "../components/Loading";


const BorrowBook = () => {
    const { bookId } = useParams<{ bookId: string }>();

    // RTK QUERY HOOK
    const { data: book, isLoading } = useGetBookByIdQuery(bookId!, { skip: !bookId });
    const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();


    // NAVIGATE
    const navigate = useNavigate();


    // HANDLE BORROW BOOK FORM STATE
    const [formData, setFormData] = useState({
        quantity: 1,
        dueDate: "",
    });

    // HANDLE CHANGE FORM
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "quantity" ? parseInt(value) : value,
        }));
    };


    // HANDLE SUBMIT FORM
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!book || formData.quantity > book.copies) {
            toast.error("Quantity exceeds available copies!");
            return;
        }

        try {
            await borrowBook({
                bookId,
                quantity: formData.quantity,
                dueDate: formData.dueDate,
            }).unwrap();
            toast.success("Book borrowed successfully!");
            navigate("/borrow-summary");
        } catch {
            toast.error("Failed to borrow book.");
        }
    };


    // LOADING STATE
    if (isLoading) return <Loading message="Loading borrow book..." fullPage={false} />


    return (
        <div className="max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-md border border-gray-200 mt-6">
            <h2 className="text-2xl font-bold  mb-6 flex items-center gap-2">
                📖 <span className="text-slate-500">Borrow: {book?.title}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* AVAILABLE COPIES */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">
                        Available Copies: <span className="font-semibold text-black">{book?.copies}</span>
                    </label>
                </div>

                {/* QUANTITY INPUT */}
                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min={1}
                    max={book?.copies}
                    required
                />

                {/* DUE DATE INPUT */}
                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                />

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={isBorrowing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                    {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </button>
            </form>
        </div>
    );
}
export default BorrowBook;