import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../features/books/bookApi";

const BookDetails = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useGetBookByIdQuery(id);

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError || !book) return <p className="text-center mt-10 text-red-600">Book not found</p>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
            <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
            <p><span className="font-semibold">Author:</span> {book.author}</p>
            <p><span className="font-semibold">Genre:</span> {book.genre}</p>
            <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
            <p><span className="font-semibold">Description:</span> {book.description}</p>
            <p><span className="font-semibold">Copies:</span> {book.copies}</p>
            <p><span className="font-semibold">Availability:</span> {book.available ? "Available ✅" : "Unavailable ❌"}</p>
        </div>
    );
};

export default BookDetails;