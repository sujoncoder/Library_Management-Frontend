import { useParams } from "react-router-dom";

const BorrowBook = () => {
    const { bookId } = useParams();
    return (
        <h1 className="text-2xl font-semibold">📥 Borrow Book ID: {bookId}</h1>
    )
};

export default BorrowBook;
