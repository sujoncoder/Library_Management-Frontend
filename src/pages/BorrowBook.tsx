import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetBookByIdQuery, useBorrowBookMutation } from "../features/books/bookApi";
import { toast } from "sonner";

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
    if (isLoading) return <p className="text-center text-xl font-mono text-slate-500">Loading book info...</p>;


    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📖 Borrow: {book?.title}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Available Copies: {book.copies}</label>
                </div>

                <input
                    className="w-full border p-2 rounded"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min={1}
                    max={book.copies}
                />

                <input
                    className="w-full border p-2 rounded"
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={isBorrowing}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {isBorrowing ? "Borrowing..." : "Borrow Book"}
                </button>
            </form>
        </div>
    );
}
export default BorrowBook;