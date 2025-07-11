import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateBookMutation } from "../features/books/bookApi";
import type { BookFormData, ICustomErrorResponse } from "../types";



const AddBook = () => {

    // NAVIGATE
    const navigate = useNavigate();

    const [createBook, { isLoading }] = useCreateBookMutation();

    // FORM INITIAL-STATE
    const [formData, setFormData] = useState<BookFormData>({
        title: "",
        author: "",
        genre: "",
        isbn: "",
        description: "",
        copies: 1,
        available: true,
    });

    // HANDLE FORM CHANGE
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }));
    };



    // HANDLE SUBMIT FORM
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBook(formData).unwrap();
            toast.success("Book added successfully!");
            navigate("/books");
        } catch (error: unknown) {
            const customMessage =
                (error as ICustomErrorResponse)?.data?.error?.message || "Failed to add book.";
            toast.error(customMessage);
        }

    };


    return (
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                ➕ <span>Add New Book</span>
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="author"
                    placeholder="Author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    required
                    value={formData.genre}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    required
                    value={formData.isbn}
                    onChange={handleChange}
                />

                <textarea
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                    name="description"
                    placeholder="Description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    name="copies"
                    placeholder="Copies"
                    min={1}
                    required
                    value={formData.copies}
                    onChange={handleChange}
                />

                <label className="flex items-center space-x-2 text-gray-600">
                    <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleChange}
                        className="accent-blue-600"
                    />
                    <span>Available</span>
                </label>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                    {isLoading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>

    );
}
export default AddBook;