import { NavLink, Link } from "react-router-dom";
import { BookOpenText, PlusCircle, BarChart3 } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md px-4 py-3 flex flex-wrap items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                📚 Library App
            </Link>

            <div className="flex flex-wrap gap-4 items-center mt-2 sm:mt-0">
                <NavLink
                    to="/books"
                    className={({ isActive }) =>
                        `flex items-center gap-1 text-sm sm:text-base font-medium ${isActive ? "text-blue-700 font-semibold underline" : "text-slate-600 hover:text-blue-700"
                        }`
                    }
                >
                    <BookOpenText size={18} />
                    All Books
                </NavLink>

                <NavLink
                    to="/create-book"
                    className={({ isActive }) =>
                        `flex items-center gap-1 text-sm sm:text-base font-medium ${isActive ? "text-blue-700 font-semibold underline" : "text-slate-600 hover:text-blue-700"
                        }`
                    }
                >
                    <PlusCircle size={18} />
                    Add Book
                </NavLink>

                <NavLink
                    to="/borrow-summary"
                    className={({ isActive }) =>
                        `flex items-center gap-1 text-sm sm:text-base font-medium ${isActive ? "text-blue-700 font-semibold underline" : "text-slate-600 hover:text-blue-700"
                        }`
                    }
                >
                    <BarChart3 size={18} />
                    Borrow Summary
                </NavLink>
            </div>
        </nav>
    );
};
export default Navbar;