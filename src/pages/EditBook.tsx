import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../features/books/bookApi";
import { toast } from "sonner";
import type { BookFormData } from "../types";

const EditBook = () => {
    const { id } = useParams();

    // NAVIGATE
    const navigate = useNavigate();

    // RTK QUERY HOOK
    const {
        data: book,
        isLoading,
        isError,
    } = useGetBookByIdQuery(id);

    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();


    // HANDLE FORM STATE
    const [formData, setFormData] = useState<BookFormData>({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 1,
        available: true,
    });


    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available,
            });
        }
    }, [book]);


    // HANDLE FORM CHANGE
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    // HANDLE FORM SUBMIT
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateBook({ id, updatedData: formData }).unwrap();
            toast.success("Book updated successfully!");
            navigate("/books");
        } catch {
            toast.error("Failed to update book.");
        }
    };


    // LOADING STATE
    if (isLoading) return <p className="text-center py-10 text-xl text-slate-500 font-mono">Loading book...</p>;

    // ERROR STATE
    if (isError) return <p className="text-center py-10 text-red-500 text-2xl font-mono">Error loading book.</p>;


    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">✏️ Edit Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                />

                <textarea
                    className="w-full border p-2 rounded"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    className="w-full border p-2 rounded"
                    type="number"
                    name="copies"
                    value={formData.copies}
                    onChange={handleChange}
                />

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                    />
                    <span>Available</span>
                </label>
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {isUpdating ? "Updating..." : "Update Book"}
                </button>
            </form>
        </div>
    );
};

export default EditBook;