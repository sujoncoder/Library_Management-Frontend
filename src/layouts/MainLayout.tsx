import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* NAVBAR COMPONENT */}
            <Navbar />

            {/* PAGE CONTENT */}
            <main className="flex-grow p-6">
                <Outlet />
            </main>

            {/* FOOTER COMPONENT */}
            <Footer />
        </div>
    );
}
export default MainLayout;