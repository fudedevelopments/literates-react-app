import { useState } from "react";
import Products from "./components/produtsdisplay";
import { Settings } from "lucide-react";

const Sidebar = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-5">
            <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
            <ul>
                <li className="cursor-pointer p-2 hover:bg-gray-700" onClick={() => setActiveSection("products")}>
                    Products
                </li>
                <li className="cursor-pointer p-2 hover:bg-gray-700" onClick={() => setActiveSection("settings")}>
                    Settings
                </li>
            </ul>
        </div>
    );
};

const AppBar = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-4 shadow-md">Admin Dashboard</div>
    );
};





const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState("products");

    return (
        <div className="flex h-screen">
            <Sidebar setActiveSection={setActiveSection} />
            <div className="flex-1 flex flex-col">
                <AppBar />
                <div className="p-5">
                    {activeSection === "products" ? <Products /> : <Settings />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
