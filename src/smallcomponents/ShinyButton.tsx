
import { motion } from 'framer-motion';

type ShiningButtonProps = {
    text: string;
    onClick: () => void;
};

const ShiningButton: React.FC<ShiningButtonProps> = ({ text, onClick }) => {
    return (
        <motion.button
            className="relative px-6 py-3 text-lg font-bold text-white rounded-full border-2 border-white shadow-lg bg-black"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
        >
            <motion.span
                className="relative z-10"
                animate={{ textShadow: ['0px 0px 5px rgba(255,255,255,0.5)', '0px 0px 15px rgba(255,255,255,1)', '0px 0px 5px rgba(255,255,255,0.5)'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
                {text}
            </motion.span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            />
        </motion.button>
    );
};

export default ShiningButton;
