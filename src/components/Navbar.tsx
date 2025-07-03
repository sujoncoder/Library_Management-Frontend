import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <Link to='/' className="text-xl font-bold text-blue-600">📚 Library App</Link>
            <div className="space-x-4">
                <Link to="/books" className="text-blue-500 hover:underline">All Books</Link>
                <Link to="/create-book" className="text-blue-500 hover:underline">Add Book</Link>
                <Link to="/borrow-summary" className="text-blue-500 hover:underline">Borrow Summary</Link>
            </div>
        </nav>
    )
}
export default Navbar;