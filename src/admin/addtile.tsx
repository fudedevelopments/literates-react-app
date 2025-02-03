import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

interface Title {
    id: number;
    title: string;
}

const AddTitle: React.FC = () => {
    const [categoryName, setCategoryName] = useState('');
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Fetch titles
    const { data: titles, isLoading, isError: isFetchError, error: fetchError } = useQuery<Title[]>({
        queryKey: ['titles'],
        queryFn: async () => {
            const response = await axios.get(
                "https://litratesweb.fudedevelopments.workers.dev/getalltitle",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.results;
        },
    });

    // Add title mutation
    const createtile = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                "https://litratesweb.fudedevelopments.workers.dev/addtitle",
                { title: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
          
            
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['titles'] });
            setCategoryName('');
        },
        onError: (error: any) => {
            console.error("Creation error:", error);
        }
    });

    // Delete title mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            
            await axios.delete(
                `https://litratesweb.fudedevelopments.workers.dev/deletetitle/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['titles'] });
        },
        onError: (error: any) => {
            console.error("Deletion error:", error);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createtile.mutate();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Manage Titles</h2>

                {/* Add Title Form */}
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="titleName">
                            Add New Title
                        </label>
                        <input
                            type="text"
                            id="titleName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter Title Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 ${createtile.isPending ? 'bg-teal-300 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'
                            }`}
                        disabled={createtile.isPending}
                    >
                        {createtile.isPending ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 mr-2 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Adding...
                            </div>
                        ) : (
                            'Add Title'
                        )}
                    </button>
                </form>

                {/* Titles List */}
                <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Existing Titles</h3>

                    {isLoading && (
                        <p className="text-gray-600 text-center">Loading titles...</p>
                    )}

                    {isFetchError && (
                        <p className="text-red-500 text-center">
                            Error loading titles: {fetchError?.message}
                        </p>
                    )}

                    {titles && titles.length > 0 ? (
                        <ul className="space-y-2">
                            {titles.map((title) => (
                                <li
                                    key={title.id}
                                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                                >
                                    <span
                                        onClick={() =>{navigate(`/titleproducts/:${title.id}`)}}
                                        className="text-gray-700 truncate hover:text-blue-600 hover:underline cursor-pointer flex-1"
                                    >
                                        {title.title}
                                    </span>
                                    <button
                                        onClick={() => deleteMutation.mutate(title.id)}
                                        disabled={deleteMutation.isPending}
                                        className={`ml-2 px-3 py-1 rounded-md text-white ${deleteMutation.isPending
                                                ? 'bg-red-300 cursor-not-allowed'
                                                : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                    >
                                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !isLoading && !isFetchError && (
                            <p className="text-gray-600 text-center">No titles found</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddTitle;