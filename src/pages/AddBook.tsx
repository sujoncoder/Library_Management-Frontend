import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateBookMutation } from "../features/books/bookApi";
import type { BookFormData } from "../types";

const AddBook = () => {

    // NAVIGATE
    const navigate = useNavigate();

    const [createBook, { isLoading }] = useCreateBookMutation();

    // FORM INITIAL STATE
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    // HANDLE SUBMIT FORM
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBook(formData).unwrap();
            toast.success("Book added successfully!");
            navigate("/books");
        } catch (error: any) {
            toast.error("Failed to add book.", error.message);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">➕ Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="author"
                    placeholder="Author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                />
                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    required
                    value={formData.genre}
                    onChange={handleChange}
                />
                <input
                    className="w-full border p-2 rounded"
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    required
                    value={formData.isbn}
                    onChange={handleChange}
                />
                <textarea
                    className="w-full border p-2 rounded"
                    name="description"
                    placeholder="Description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    className="w-full border p-2 rounded"
                    type="number"
                    name="copies"
                    placeholder="Copies"
                    min={1}
                    required
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
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {isLoading ? "Adding..." : "Add Book"}
                </button>
            </form>
        </div>
    );
}
export default AddBook;