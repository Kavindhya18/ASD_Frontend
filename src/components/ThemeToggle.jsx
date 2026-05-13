import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                color: 'var(--text-main)'
            }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ y: -30, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 30, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                        style={{ position: 'absolute' }}
                    >
                        <Moon size={20} color="#60a5fa" fill="rgba(96, 165, 250, 0.2)" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: -30, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: 30, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                        style={{ position: 'absolute' }}
                    >
                        <Sun size={20} color="#f59e0b" fill="rgba(245, 158, 11, 0.2)" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
