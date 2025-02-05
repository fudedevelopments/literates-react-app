import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loadingsmall from "../smallcomponents/loadingsmall";
import { FaShoppingCart } from "react-icons/fa";

const Allproducts: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const productsPerPage = 12;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", currentPage],
        queryFn: async () => {
            const response = await axios.get(
                `http://127.0.0.1:8787/product?page=${currentPage}&limit=${productsPerPage}`
            );
            return response.data;
        },
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) return <Loadingsmall />;
    if (isError) return <div className="text-center text-red-500 p-8">Error loading products</div>;

    const totalPages = data?.totalPages || 1;
    const products = data?.products || [];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product: any) => {
                        const images = product.images ? JSON.parse(product.images) : [];
                        const hasDiscount = product.offerprice < product.price;

                        return (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div
                                    className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <img
                                        src={images[0]}
                                        alt={product.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2 truncate">
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className={`text-xl font-bold ${hasDiscount ? "text-red-600" : "text-gray-900"
                                            }`}>
                                            ₹{product.offerprice.toFixed(2)}
                                        </span>
                                        {hasDiscount && (
                                            <span className="text-gray-500 line-through">
                                                ₹{product.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                        onClick={() => {/* Add to cart logic */ }}
                                    >
                                        <FaShoppingCart />
                                       Buy Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination Controls */}
                <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-md ${currentPage === page
                                    ? "bg-blue-600 text-white"
                                    : "bg-white border hover:bg-gray-50"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-md bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Allproducts;