import { motion } from 'framer-motion';
import ShinyButton from '../smallcomponents/ShinyButton';
import { Truck, ShieldCheck, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate()
    return (
        <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900 px-6 lg:px-16 overflow-hidden">
            {/* Content Container */}
            <div className="z-10 flex-1 py-16 md:py-24 space-y-8">
                <motion.div
                    className="space-y-6 max-w-2xl"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                    }}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { type: 'spring' } }
                        }}
                    >
                        Welcome<br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            To Literates
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-gray-600"
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                        }}
                    >
                        Explore handcrafted treasures from artisans worldwide. Perfect gifts,
                        personalized selections, and exclusive collections await you.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 }
                        }}
                    >
                        <ShinyButton
                            text="Shop Now"
                            onClick={() => {navigate("/bestseller")}}
                        />
                        <button
                            onClick={() => { navigate("/allproducts") }}
                            className="px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                            Browse Collections
                        </button>
                    </motion.div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    className="grid grid-cols-2 md:flex gap-6 pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center gap-2">
                        <Truck className="text-blue-600" size={24} />
                        <span className="text-sm">Fast Shipping</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-green-600" size={24} />
                        <span className="text-sm">Secure Payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gift className="text-purple-600" size={24} />
                        <span className="text-sm">Customized Gifts</span>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-3 gap-8 pt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">10K+</div>
                        <div className="text-sm text-gray-600">Happy Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">500+</div>
                        <div className="text-sm text-gray-600">Artisan Partners</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-gray-600">Satisfaction Guarantee</div>
                    </div>
                </motion.div>
            </div>

            {/* Product Showcase */}
            <motion.div
                className="flex-1 relative w-full max-w-2xl aspect-square"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-xl transform rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1672759267699-43ec58967f3b?q=80&w=1969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Luxury Gift Box"
                        className="w-full h-full object-cover mix-blend-multiply opacity-90"
                    />
                </div>
            </motion.div>

            {/* Animated Background Elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        </section>
    );
}