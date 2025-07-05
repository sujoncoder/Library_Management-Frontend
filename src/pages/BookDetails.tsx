import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../features/books/bookApi";
import {
    BookOpen,
    User,
    Tag,
    Barcode,
    FileText,
    Layers,
    CheckCircle,
    XCircle,
} from "lucide-react";
import Loading from "../components/Loading";


const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading, isError } = useGetBookByIdQuery(id!, { skip: !id });

    if (isLoading) {
        return <Loading message="Loading book details..." fullPage={false} />
    };

    if (isError || !book) {
        return (
            <div className="text-center mt-20 text-red-500 font-semibold">
                Book not found.
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 px-6 py-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-4">
                <BookOpen className="text-slate-600 w-7 h-7" />
                <span className="text-slate-500 text-xl md:text-3xl"> {book.title}</span>
            </h2>

            <p className="text-slate-700 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-semibold">Author:</span> {book.author}
            </p>

            <p className="text-slate-700 flex items-center gap-2">
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="font-semibold">Genre:</span>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-sm">
                    {book.genre}
                </span>
            </p>

            <p className="text-slate-700 flex items-center gap-2">
                <Barcode className="w-5 h-5 text-gray-500" />
                <span className="font-semibold">ISBN:</span> {book.isbn}
            </p>

            <p className="text-slate-700 flex items-start gap-2">
                <FileText className="w-5 h-5 text-gray-500 mt-1" />
                <span className="font-semibold">Description:</span> {book.description}
            </p>

            <p className="text-slate-700 flex items-center gap-2">
                <Layers className="w-5 h-5 text-gray-500" />
                <span className="font-semibold">Copies:</span> {book.copies}
            </p>

            <p className="text-slate-700 flex items-center gap-2">
                {book.available ? (
                    <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-700">Available</span>
                    </>
                ) : (
                    <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-700">Unavailable</span>
                    </>
                )}
            </p>
        </div>
    )
};
export default BookDetails;