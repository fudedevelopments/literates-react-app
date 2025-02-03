import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NoPermissionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center">
                <FaLock className="text-red-500 text-6xl mb-4" />
                <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">You don’t have permission to view this page.</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default NoPermissionPage;
