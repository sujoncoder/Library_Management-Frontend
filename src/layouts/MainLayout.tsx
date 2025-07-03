import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-600">📚 Library App</h2>
                <div className="space-x-4">
                    <Link to="/books" className="text-blue-500 hover:underline">All Books</Link>
                    <Link to="/create-book" className="text-blue-500 hover:underline">Add Book</Link>
                    <Link to="/borrow-summary" className="text-blue-500 hover:underline">Borrow Summary</Link>
                </div>
            </nav>

            {/* Page Content */}
            <main className="flex-grow p-6">
                <Outlet />
            </main>

            {/* FOOTER COMPONENT */}
            <Footer />
        </div>
    );
}
