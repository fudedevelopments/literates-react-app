import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';

interface Title {
    id: number;
    title: string;
}

const ProductGrid = () => {

    const titlesPerPage = 3;
    const productsPerPage = 8;

    // Fetch all titles
    const { data: titles} = useQuery<Title[]>({
        queryKey: ['titles'],
        queryFn: async () => {
            const response = await axios.get("https://workers.literatesartemporium.in/title");
            return response.data.results;
        }
    });

    // State for visible titles
    const [visibleTitlesCount, setVisibleTitlesCount] = React.useState(titlesPerPage);
    const visibleTitles = titles?.slice(0, visibleTitlesCount) || [];

    // Load more titles when scroll reaches bottom
    const loaderRef = useRef(null);
    const intersection = useIntersection(loaderRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    useEffect(() => {
        if (intersection?.isIntersecting && titles && visibleTitlesCount < titles.length) {
            setVisibleTitlesCount(prev => Math.min(prev + titlesPerPage, titles.length));
        }
    }, [intersection]);

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-8">
                <AnimatePresence>
                    {visibleTitles.map((title) => (
                        <ProductRow
                            key={title.id}
                            title={title}
                            productsPerPage={productsPerPage}
                        />
                    ))}
                </AnimatePresence>

                <div ref={loaderRef} className="h-4 w-full" />
            </div>
        </div>
    );
};

const ProductRow = ({ title, productsPerPage }: { title: Title; productsPerPage: number }) => {
    const token = localStorage.getItem("token");
    const containerRef = useRef<HTMLDivElement>(null);

    // Infinite query for products
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['products', title.id],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await axios.get(
                `https://workers.literatesartemporium.in/product/title/${encodeURIComponent(title.title)}`,
                {
                    params: { page: pageParam, limit: productsPerPage },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            // Return both products and pagination metadata
            return {
                products: response.data.products,
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages
            };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined
    });

    // Handle horizontal scroll
    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            if (scrollWidth - (scrollLeft + clientWidth) < 100 && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }
    };

    // Correctly access products from pages
    const products = data?.pages.flatMap(page => page.products) || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
        >
            <h2 className="text-3xl font-bold text-center">{title.title}</h2>
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            >
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {isFetchingNextPage && (
                    <div className="flex items-center justify-center min-w-[200px]">
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Fixed ProductCard props destructuring
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: { product: any }) => {
    const navigate = useNavigate();
    const images = JSON.parse(product?.images || "[]");

    return (
        <div
            className="min-w-[200px] bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 relative cursor-pointer"
            onClick={() => navigate(`/productsview/${product.id}`)}
        >
            <img
                src={images[0]}
                alt={product.title}
                className="w-full h-40 object-cover  rounded-md mb-4"
            />
            <h3 className="font-semibold truncate ">{product.title}</h3>
            <div className="flex items-center space-x-2">
                <p className="text-black font-semibold">₹{product.offerprice}</p>
                <p className="text-gray-400 line-through text-sm">₹{product.price}</p>
            </div>
        </div>
    );
};




const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
);

export default ProductGrid