import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    title: string;
    descriptions: string;
    price: number;
    offerprice: number;
    images: string;
    bestseller: boolean;
}

const fetchBestSellers = async ({ pageParam = 1 }) => {
    
    const response = await axios.get(`https://workers.literatesartemporium.in/product/best?page=${pageParam}`);
    return response.data;
};

export default function BestSellerProducts() {
    const navigate = useNavigate();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["bestsellers"],
        queryFn: fetchBestSellers,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
        },
    });

    if (isLoading) {
        return <div className="text-center text-lg font-bold p-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 max-w-screen-xl">
            <h1 className="text-3xl font-bold text-center mb-6">Best Selling Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.pages.map((page) =>
                    
                    page.products.map((product: Product) => (
                        
                        <div key={product.id} onClick={()=>{navigate(`/productsview/${product.id}`)}} className="border p-4 rounded-lg shadow-md relative flex flex-col items-center">
                            <img src={JSON.parse(product.images)[0]} alt={product.title} className="w-full h-48 object-cover rounded-md" />
                            {product.bestseller && (
                                <motion.div
                                    className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-bold shadow-lg"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.8, 1, 0.8],
                                        boxShadow: [
                                            "0px 0px 10px rgba(255, 215, 0, 0.6)",
                                            "0px 0px 20px rgba(255, 215, 0, 1)",
                                            "0px 0px 10px rgba(255, 215, 0, 0.6)"
                                        ]
                                    }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    Best Seller
                                </motion.div>
                            )}
                            <h2 className="text-xl font-semibold mt-4 text-center">{product.title}</h2>
                            <p className="text-lg font-bold text-blue-600 text-center">₹{product.offerprice} <span className="text-gray-500 line-through">₹{product.price}</span></p>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                )}
            </div>
            <div className="text-center text-gray-500 mt-4">Page {data?.pages.length}</div>
        </div>
    );
}