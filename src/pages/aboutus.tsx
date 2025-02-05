import { FaHandshake, FaMagic, FaRocket, FaAward } from 'react-icons/fa';
import { GiWoodFrame } from 'react-icons/gi';
import { MdPhotoCamera } from 'react-icons/md';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            

            {/* Hero Section */}
            <div className="relative bg-blue-600 h-96 flex items-center">
                <div className="absolute inset-0 bg-opacity-50 bg-[url('https://images.unsplash.com/photo-1589998059171-988d887df646')]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-4">Crafting Memories, One Gift at a Time</h1>
                    <p className="text-xl text-white max-w-2xl">
                        At Literates, we transform ordinary objects into extraordinary keepsakes through precision laser engraving
                        and meticulous craftsmanship.
                    </p>
                </div>
            </div>

            {/* Introduction Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                        <p className="text-gray-600 max-w-3xl mx-auto">
                            Founded in 2015, Literates began as a small workshop passionate about personalized expressions.
                            Today, we've grown into a premier destination for custom gifts, serving thousands of customers
                            worldwide. Our team of expert artisans combines cutting-edge laser technology with traditional
                            craftsmanship to create pieces that tell your unique story.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="grid md:grid-cols-4 gap-8 mt-12">
                        <div className="text-center p-6">
                            <FaAward className="text-blue-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                            <p className="text-gray-600">FDA-approved materials & museum-grade finishes</p>
                        </div>
                        <div className="text-center p-6">
                            <FaMagic className="text-blue-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Custom Designs</h3>
                            <p className="text-gray-600">100+ customization options with 3D preview</p>
                        </div>
                        <div className="text-center p-6">
                            <FaRocket className="text-blue-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Fast Production</h3>
                            <p className="text-gray-600">Same-day engraving & worldwide shipping</p>
                        </div>
                        <div className="text-center p-6">
                            <FaHandshake className="text-blue-600 text-4xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
                            <p className="text-gray-600">24/7 customer service with gift experts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="py-16 bg-gray-50" id="products">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Craftsmanship</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://thebossmagazine.com/wp-content/uploads/2023/02/pexels-opt-lasers-from-poland-7254428-1-1024x683.jpg"
                                alt="Laser Engraving"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Precision Laser Engraving</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <GiWoodFrame className="text-blue-600 text-2xl mt-1 mr-4" />
                                    <div>
                                        <h4 className="font-semibold">MDF Masterpieces</h4>
                                        <p className="text-gray-600 mt-1">
                                            Intricately carved wooden products with 0.1mm precision engraving
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MdPhotoCamera className="text-blue-600 text-2xl mt-1 mr-4" />
                                    <div>
                                        <h4 className="font-semibold">Photo Perfection</h4>
                                        <p className="text-gray-600 mt-1">
                                            300DPI resolution printing on premium archival-quality materials
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Commitment</h2>
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl mb-8">
                            We combine sustainable practices with innovative technology - 93% of our materials are
                            eco-friendly and 100% of our energy comes from renewable sources.
                        </p>
                        <div className="bg-white text-blue-600 p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                            <p className="font-semibold italic">
                                "Every engraving tells a story. Our mission is to make yours unforgettable."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;