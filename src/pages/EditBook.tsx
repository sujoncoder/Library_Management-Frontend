import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../features/books/bookApi";
import { toast } from "sonner";
import type { BookFormData } from "../types";
import Loading from "../components/Loading";

const EditBook = () => {
    const { id } = useParams<{ id: string }>();

    // NAVIGATE
    const navigate = useNavigate();

    // RTK QUERY HOOK
    const {
        data: book,
        isLoading,
        isError,
    } = useGetBookByIdQuery(id as string);



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
        const { name, value, type } = e.target;

        const checked = type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked : undefined;

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
    if (isLoading) return <Loading message="Loading book edit..." fullPage={false} />

    // ERROR STATE
    if (isError) return <p className="text-center py-10 text-red-500 text-2xl font-mono">Error loading book.</p>;


    return (
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                ✏️ <span>Edit Book</span>
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={formData.isbn}
                    onChange={handleChange}
                />

                <textarea
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
                    name="description"
                    rows={3}
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="number"
                    name="copies"
                    placeholder="Copies"
                    min={1}
                    value={formData.copies}
                    onChange={handleChange}
                />

                <label className="flex items-center space-x-2 text-gray-600">
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                        className="accent-green-600"
                    />
                    <span>Available</span>
                </label>

                <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                    {isUpdating ? "Updating..." : "Update Book"}
                </button>
            </form>
        </div>
    );
};

export default EditBook;