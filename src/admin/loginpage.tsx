import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../state/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                "https://workers.literatesartemporium.in/admin/login",
                { username, password },
            );
            return response.data;
        },
        onSuccess: (data) => {
            const token = data.token; // Extract token from response
            if (token) {
                localStorage.setItem("token", token); // Store the token
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                dispatch(isAuthenticated()); 
                toast.success("Login successful!");
                navigate("/admindashboard");
            } else {
                toast.error("Invalid token received.");
            }
        },
        onError: (error) => {
            toast.error("Please enter the correct username and password");
            console.error("Login Error:", error);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:opacity-90"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
