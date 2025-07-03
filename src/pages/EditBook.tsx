import { useParams } from "react-router-dom";

const EditBook = () => {
    const { id } = useParams();
    return <h1 className="text-2xl font-semibold">✏️ Edit Book ID: {id}</h1>
};

export default EditBook;