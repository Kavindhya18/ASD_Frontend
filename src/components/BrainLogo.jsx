import React from 'react';
import { motion } from 'framer-motion';
import './BrainLogo.css';

const BrainLogo = () => {
    // Highly dense node network to match the image's complexity
    const nodes = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        // Positioning nodes within the more realistic brain bounds
        x: 45 + Math.random() * 110,
        y: 50 + Math.random() * 85,
        size: 1 + Math.random() * 3.5,
        duration: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 2
    }));

    return (
        <div className="brain-logo-wrapper">
            <div className="glow-aura" />

            <motion.div
                className="brain-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <svg viewBox="0 0 200 200" className="brain-svg">
                    <defs>
                        {/* Dramatic Core Glow */}
                        <radialGradient id="centerBurst" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="25%" stopColor="#ffcc00" />
                            <stop offset="50%" stopColor="#ff4b2b" />
                            <stop offset="80%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>

                        {/* Neural Line Gradient */}
                        <linearGradient id="neuralLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="50%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>

                        <filter id="megaGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3.5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background "Heat Map" Glow */}
                    <circle cx="100" cy="95" r="55" fill="url(#centerBurst)" opacity="0.4" filter="url(#megaGlow)" />

                    {/* The "Walnut" Brain Silhouette (Matching the reference image more closely) */}
                    <g className="brain-silhouette">
                        {/* Main detailed silhouette with organic "bumps" */}
                        <motion.path
                            d="M 100,45 
                               C 130,42 165,55 170,95
                               C 172,125 155,145 135,150
                               C 125,165 110,168 100,162
                               C 90,168 75,165 65,150
                               C 45,145 28,125 30,95
                               C 35,55 70,42 100,45 Z"
                            fill="rgba(79, 70, 229, 0.08)"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            strokeOpacity="0.5"
                            filter="url(#megaGlow)"
                            animate={{ strokeOpacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* Internal Grooves and Folds (Sulci) - Adding that biological depth */}
                        <g stroke="rgba(14, 165, 233, 0.6)" strokeWidth="0.8" fill="none" opacity="0.5" filter="url(#megaGlow)">
                            <path d="M 100,45 L 100,162" opacity="0.3" /> {/* Longitudinal fissure */}
                            <path d="M 60,70 C 85,85 115,85 140,70" />
                            <path d="M 50,110 C 85,120 115,120 150,110" />
                            <path d="M 65,140 C 85,130 115,130 135,140" />
                            <path d="M 100,80 Q 75,100 100,120 Q 125,100 100,80" /> {/* Center complex */}
                        </g>
                    </g>

                    {/* Dense Neural Interconnections */}
                    {nodes.map((node, i) => (
                        nodes.slice(i + 1, i + 6).map((target, j) => {
                            const distance = Math.hypot(node.x - target.x, node.y - target.y);
                            if (distance < 45) {
                                return (
                                    <motion.line
                                        key={`l-${i}-${j}`}
                                        x1={node.x} y1={node.y}
                                        x2={target.x} y2={target.y}
                                        stroke="rgba(14, 165, 233, 0.3)"
                                        strokeWidth="0.3"
                                        animate={{ strokeOpacity: [0.05, 0.4, 0.05] }}
                                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                                    />
                                );
                            }
                            return null;
                        })
                    ))}

                    {/* Shining Synapses (Nodes) */}
                    {nodes.map((node) => (
                        <motion.circle
                            key={node.id}
                            cx={node.x} cy={node.y}
                            r={node.size}
                            fill={node.id % 2 === 0 ? "#ffffff" : "#0ea5e9"}
                            filter="url(#megaGlow)"
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.3, 1, 0.3],
                                fill: node.id % 5 === 0 ? ["#ffffff", "#ffcc00", "#ffffff"] : ["#0ea5e9", "#ffffff", "#0ea5e9"]
                            }}
                            transition={{
                                duration: node.duration,
                                repeat: Infinity,
                                delay: node.delay,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* High-Current Neural Signals */}
                    {[...Array(4)].map((_, i) => (
                        <motion.path
                            key={`path-${i}`}
                            d={i % 2 === 0 ? "M 50,95 Q 100,60 150,95" : "M 70,140 Q 100,110 130,140"}
                            stroke="url(#neuralLine)"
                            strokeWidth="1.5"
                            strokeDasharray="20 180"
                            fill="none"
                            animate={{ strokeDashoffset: [200, -200] }}
                            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                            filter="url(#megaGlow)"
                        />
                    ))}

                    {/* Ultra-Bright Center Core (Nucleus) */}
                    <motion.circle
                        cx="100" cy="100" r="8"
                        fill="#ffffff"
                        filter="url(#megaGlow)"
                        animate={{
                            scale: [1, 3, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>

                {/* Foreground firing particles */}
                <div className="neural-firing-v2">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className={`firing-cell f${i}`} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default BrainLogo;
