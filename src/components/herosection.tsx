'use client';

import { motion } from 'framer-motion';
import ShinyButton from '../smallcomponents/ShinyButton';

export default function HeroSection() {
    return (
        <section className="relative flex flex-col items-center justify-center h-screen bg-white text-gradient-text text-center p-6 -mt-24 overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            rotate: [0, Math.random() * 360],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        🎁
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                className="text-5xl font-bold md:text-6xl lg:text-7xl drop-shadow-lg space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.15,
                            delayChildren: 0.3,
                        },
                    },
                }}
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: -50, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                >
                    Literates – The Perfect
                </motion.div>
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 50, scale: 0.95 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { type: 'spring', stiffness: 100 },
                        },
                    }}
                    className="text-primary-600"
                >
                    Gifts Await!
                </motion.div>
            </motion.div>

            <motion.p
                className="mt-8 text-lg md:text-xl max-w-2xl relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <motion.span
                    className="relative inline-block"
                    initial={{ backgroundSize: '0% 2px' }}
                    animate={{ backgroundSize: '100% 2px' }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'left bottom',
                    }}
                >
                    Find unique, handpicked gifts
                </motion.span>{' '}
                for every occasion. Celebrate love, joy, and special moments with Literates.
            </motion.p>

            <motion.div
                className="mt-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <ShinyButton
                    text='Shop Now'
                    onClick={() => { }}
                />
            </motion.div>

            {/* Decorative animated elements */}
            <motion.div
                className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full blur-xl opacity-30"
                animate={{
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full blur-xl opacity-30"
                animate={{
                    y: [0, 40, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </section>
    );
}