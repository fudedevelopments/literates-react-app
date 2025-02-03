import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.jpg'; // Import logo

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md p-3 fixed top-0 left-0 w-full h-20 z-50">

            <div className="container mx-auto flex justify-between items-center ml-3">
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Literates Logo" width={50} height={50} />
                    <h1 className="text-gray-900 text-3xl font-semibold">
                        Literates
                    </h1>
                </div>
                <nav className="hidden md:flex text-lg space-x-6 mr-12 mt-3">
                    <Link to="/shop" className="text-white hover:text-blue-500">Shop</Link>
                    <Link to="/about" className="text-white hover:text-blue-500">About</Link>
                    <Link to="/contact" className="text-white hover:text-blue-500">Contact</Link>
                </nav>
                <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-white shadow-md text-gray-700 p-4 absolute top-16 left-0 w-full">
                    <Link to="/shop" className="block py-2 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Shop</Link>
                    <Link to="/about" className="block py-2 hover:text-blue-500" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/contact" className="block py-2 hover:text-blue-500" onClick={() => setMenuOpen(false)}>Contact</Link>
                </div>
            )}
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p>&copy; 2025 Literates. All rights reserved.</p>
                <nav className="flex space-x-4 mt-2 md:mt-0">
                    <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                    <Link to="/terms" className="hover:underline">Terms of Service</Link>
                    <Link to="/support" className="hover:underline">Support</Link>
                </nav>
            </div>
        </footer>
    );
};

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 mt-16 p-6 container mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
