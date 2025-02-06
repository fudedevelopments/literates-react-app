import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    FaWhatsapp, FaTruck, FaShieldAlt, FaStar
    
} from 'react-icons/fa';
import { GiMaterialsScience } from 'react-icons/gi';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Loadingsmall from '../smallcomponents/loadingsmall';

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedImage, setSelectedImage] = useState(0);
    const WHATSAPP_NUMBER = '9944050658';

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(`https://workers.literatesartemporium.in/product/${id}`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5
    });

    const handleWhatsAppOrder = () => {
        const message = `Hi! I want to order this product:
        
        *${product.title}* (ID: ${id})
        Price: ₹${product.offerPrice || product.price}
        Product Link: ${window.location.href}
        
        Please let me know about availability and payment details.`;

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const images = JSON.parse(product?.images || "[]");
    const inStock = true; // Static stock status for demonstration

    if (isLoading) return <Loadingsmall />;
    if (isError) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border relative group">
                        <img
                            src={images[selectedImage]}
                            alt={product.title}
                            className="w-full h-full object-contain p-6 transition-transform duration-300 hover:scale-105"
                        />

                        {inStock && (
                            <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                In Stock - Ready to Ship
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {images.map((img: string, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === selectedImage ? 'border-blue-500 scale-105' : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Product view ${index + 1}`}
                                        className="w-full h-full object-contain bg-gray-50"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div className="border-b pb-6">
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-2 mb-4">
                        </div>

                        <div className="space-y-2">
                            {product.offerprice ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl font-bold text-red-600">
                                        ₹{product.offerprice}
                                    </span>
                                    <span className="text-lg line-through text-gray-500">
                                        ₹{product.price}
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                                        Save {Math.round(
                                            ((product.price - product.offerprice) / product.price) * 100
                                        )}%
                                    </span>
                                </div>
                            ) : (
                                <span className="text-3xl font-bold">₹{product.price}</span>
                            )}
                        </div>
                    </div>

                    {/* Product Highlights */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <FaTruck className="text-blue-600 text-xl" />
                            <div>
                                <h4 className="font-semibold">Fast Shipping</h4>
                                <p className="text-sm text-gray-600">All over India</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <FaShieldAlt className="text-green-600 text-xl" />
                            <div>
                                <h4 className="font-semibold">Quality Assured</h4>
                            </div>
                        </div>
                    </div>

                   

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.descriptions}
                        </p>
                    </div>

                    {/* WhatsApp CTA */}
                    <motion.button
                        onClick={handleWhatsAppOrder}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200"
                    >
                        <FaWhatsapp className="text-2xl" />
                        <span className="text-lg font-semibold">Order Now via WhatsApp</span>
                    </motion.button>

                    {/* Assurance Badges */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaShieldAlt className="text-green-600" />
                            <span>Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaTruck className="text-blue-600" />
                            <span>24-48 Hour Dispatch</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Features Section */}
            <div className="mt-16 border-t pt-12">
                <h2 className="text-2xl font-bold text-center mb-8">Why Choose This Product</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <GiMaterialsScience className="text-blue-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Premium Materials</h3>
                        <p className="text-gray-600">Made with eco-friendly Material</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaShieldAlt className="text-green-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Quality Guarantee</h3>
                        
                    </div>
                    <div className="text-center p-6">
                        <div className="bg-yellow-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaStar className="text-yellow-600 text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Customizable Options</h3>
                        <p className="text-gray-600">Personalize size, colors, and engraving details</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;