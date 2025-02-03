import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const FreeShippingBanner = () => (
    <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="bg-amber-500 text-black text-sm text-center p-2 font-medium"
    >
        🚚 Free shipping on orders above ₹599!
    </motion.div>
);

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: '/shop', text: 'Shop' },
        { to: '/new', text: 'New & Bestsellers' },
        { to: '/gifts', text: 'Gift Ideas' },
        { to: '/about', text: 'About Us' },
        { to: '/contact', text: 'Contact' },
    ];

    return (
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg fixed top-0 left-0 w-full z-50">
            <FreeShippingBanner />

            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img
                            src={logo}
                            alt="Literates Logo"
                            className="w-12 h-12 rounded-lg border-2 border-white"
                        />
                        <h1 className="text-white text-2xl font-bold tracking-tight">
                            Literates
                        </h1>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-medium"
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-slate-800 text-white absolute w-full shadow-xl"
                    >
                        <div className="container mx-auto px-4 py-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="block py-3 px-4 hover:bg-slate-700 rounded-lg transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-400 mt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white font-bold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                            <li><Link to="/shipping" className="hover:text-white">Shipping Policy</Link></li>
                            <li><Link to="/returns" className="hover:text-white">Returns & Exchanges</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link to="/cookies" className="hover:text-white">Cookie Settings</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {/* Add social media icons here */}
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 mt-8 pt-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Literates. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 mt-32 mb-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;