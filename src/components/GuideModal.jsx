import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, FileText, Cpu, CheckCircle } from 'lucide-react';
import './GuideModal.css';

const GuideModal = ({ isOpen, onClose }) => {
    const steps = [
        {
            icon: <UserPlus className="text-secondary" />,
            title: "Join the Platform",
            desc: "Create a secure account to keep track of your assessments and receive personalized insights.",
            color: "#4f46e5"
        },
        {
            icon: <FileText className="text-accent" />,
            title: "Provide Observations",
            desc: "Answer easy-to-understand questions about your child's behavior and social interactions.",
            color: "#0ea5e9"
        },
        {
            icon: <Cpu className="text-primary" />,
            title: "AI SVM Processing",
            desc: "Our trained Support Vector Machine (SVM) analyzes the data against known clinical markers.",
            color: "#8b5cf6"
        },
        {
            icon: <CheckCircle className="text-success" />,
            title: "Get Real-time Results",
            desc: "Obtain a reliable screening report to share with your pediatrician for clinical diagnosis.",
            color: "#10b981"
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="guide-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>

                    <div className="modal-header">
                        <h2>How <span className="text-primary">ASD Sense</span> Works</h2>
                        <p>Our 4-step process designed for accuracy and ease.</p>
                    </div>

                    <div className="steps-container">
                        {steps.map((step, index) => (
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className="step-card"
                            >
                                <div className="step-number" style={{ background: step.color }}>
                                    {index + 1}
                                </div>
                                <div className="step-icon-wrapper" style={{ backgroundColor: `${step.color}20` }}>
                                    {React.cloneElement(step.icon, { color: step.color, size: 28 })}
                                </div>
                                <div className="step-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                                {index < steps.length - 1 && <div className="step-connector" />}
                            </motion.div>
                        ))}
                    </div>

                    <div className="modal-footer">
                        <button className="btn-primary full-width" onClick={onClose}>
                            Got it, thanks!
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default GuideModal;
