import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState(0);

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(`https://litratesweb.fudedevelopments.workers.dev/${id}`);
            console.log(response.data);
            
            return response.data;
        },
        staleTime: 1000 * 60 * 5 // 5 minutes cache
    });

    const handleWhatsAppOrder = () => {
        const message = `Hi! I want to order this product: ${product.name} (ID: ${id})`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    const images = JSON.parse(product?.images || "[]");
    if (isLoading) return <div className="text-center py-8">Loading...</div>;
    if (isError) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Gallery */}
                <div className="flex flex-col gap-y-2">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-96 h-96 object-contain"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-2 lg:mt-0 flex-wrap">
                        {images.map((img: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${index === selectedImage ? 'border-blue-500' : 'border-gray-200'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Product view ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>


                {/* Product Details */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.title}</h1>

                    <div className="space-y-2">
                        {product.offerPrice ? (
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-red-600">
                                    ₹{product.offerPrice}
                                </span>
                                <span className="text-lg line-through text-gray-500">
                                    ₹{product.price}
                                </span>
                                <span className="text-green-600">
                                    {Math.round(
                                        ((product.price - product.Offer) / product.price) * 100
                                    )}% off
                                </span>
                            </div>
                        ) : (
                            <span className="text-2xl font-bold">₹{product.price}</span>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Description</h3>
                        <p className="text-gray-600 whitespace-pre-wrap">{product.descriptions}</p>
                    </div>

                    <button
                        onClick={handleWhatsAppOrder}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FaWhatsapp className="text-xl" />
                        <span>Order via WhatsApp</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;