import React, { useState } from 'react';
import { Activity, CheckCircle2, Info, HelpCircle, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const BasicScreeningForm = () => {
    const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState({ show: false, result: null, score: 0 });
    const [answers, setAnswers] = useState({
        A1: null, A2: null, A3: null, A4: null, A5: null,
        A6: null, A7: null, A8: null, A9: null, A10: null
    });

    const questions = [
        { id: 'A1', text: t('screening.questions.A1'), icon: "👂" },
        { id: 'A2', text: t('screening.questions.A2'), icon: "🔍" },
        { id: 'A3', text: t('screening.questions.A3'), icon: "👥" },
        { id: 'A4', text: t('screening.questions.A4'), icon: "🔄" },
        { id: 'A5', text: t('screening.questions.A5'), icon: "💬" },
        { id: 'A6', text: t('screening.questions.A6'), icon: "🗣️" },
        { id: 'A7', text: t('screening.questions.A7'), icon: "📖" },
        { id: 'A8', text: t('screening.questions.A8'), icon: "🎭" },
        { id: 'A9', text: t('screening.questions.A9'), icon: "😊" },
        { id: 'A10', text: t('screening.questions.A10'), icon: "🤝" }
    ];

    const styles = {
        container: { padding: '2rem 0', maxWidth: '800px', margin: '0 auto' },
        header: { textAlign: 'center', marginBottom: '3rem' },
        iconBox: { width: '80px', height: '80px', background: 'var(--gradient)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)' },
        title: { fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--text-main)' },
        subtitle: { color: 'var(--text-muted)', fontSize: '1.1rem' },
        progressContainer: { 
            position: 'sticky', top: '20px', zIndex: 100,
            padding: '1.5rem', borderRadius: '20px', 
            background: 'var(--glass)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)', marginBottom: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        },
        progressBar: { height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' },
        progressFill: { height: '100%', background: 'var(--gradient)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' },
        card: { 
            padding: '2.5rem', borderRadius: '32px', 
            background: 'var(--glass)', border: '1px solid var(--glass-border)',
            marginBottom: '1.5rem', position: 'relative', overflow: 'hidden'
        },
        qNum: { width: '40px', height: '40px', background: 'var(--input-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1.5rem' },
        qText: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-main)', lineHeight: '1.4' },
        btnGroup: { display: 'flex', gap: '1rem' },
        toggleBtn: (active) => ({
            flex: 1, padding: '1.25rem', borderRadius: '16px', border: active ? 'none' : '1px solid var(--glass-border)',
            background: active ? 'var(--gradient)' : 'var(--input-bg)',
            color: active ? 'white' : 'var(--text-muted)',
            fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: active ? '0 10px 20px -5px rgba(79, 70, 229, 0.4)' : 'none'
        }),
        submitBtn: (disabled) => ({
            width: '100%', padding: '1.5rem', borderRadius: '24px', border: 'none',
            background: disabled ? 'var(--glass)' : 'var(--gradient)',
            color: disabled ? 'var(--text-muted)' : 'white',
            fontWeight: 'bold', fontSize: '1.25rem', cursor: disabled ? 'not-allowed' : 'pointer',
            marginTop: '4rem', boxShadow: disabled ? 'none' : '0 20px 40px -10px rgba(79, 70, 229, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
        })
    };

    const handleToggle = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const featuresArray = [
                Number(answers.A1 ?? 0),
                Number(answers.A2 ?? 0),
                Number(answers.A3 ?? 0),
                Number(answers.A4 ?? 0),
                Number(answers.A5 ?? 0),
                Number(answers.A6 ?? 0),
                Number(answers.A7 ?? 0),
                Number(answers.A8 ?? 0),
                Number(answers.A9 ?? 0),
                Number(answers.A10 ?? 0)
            ];
            
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/prediction/assess/basic', { features: featuresArray }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            
            const score = featuresArray.reduce((acc, val) => acc + val, 0);
            
            console.log("Basic Screening Result (A1-A10):", response.data);
            setShowResult({ show: true, result: response.data.result, score });
        } catch (error) {
            console.error('Error fetching prediction:', error);
            alert(t('screening.error') || "Failed to process assessment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const completedCount = Object.values(answers).filter(v => v !== null).length;
    const progressPercent = (completedCount / questions.length) * 100;
    const isFormComplete = completedCount === questions.length;

    return (
        <div style={styles.container}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={styles.header}>
                <div style={styles.iconBox}><Activity size={40} color="white" /></div>
                <h1 style={styles.title}>{t('screening.basic_title')}</h1>
                <p style={styles.subtitle}>{t('screening.basic_sub')}</p>
            </motion.div>

            <motion.div style={styles.progressContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-main)' }}>{t('screening.progress')}</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{completedCount}/{questions.length}</span>
                </div>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
                </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
                {questions.map((q, index) => (
                    <motion.div 
                        key={q.id} 
                        initial={{ opacity: 0, x: -10 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        style={styles.card}
                    >
                        <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1, fontSize: '3rem' }}>{q.icon}</div>
                        <div style={styles.qNum}>{index + 1}</div>
                        <p style={styles.qText}>{q.text}</p>
                        <div style={styles.btnGroup}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" 
                                style={styles.toggleBtn(answers[q.id] === 1)} onClick={() => handleToggle(q.id, 1)}
                            >{t('common.yes')}</motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" 
                                style={styles.toggleBtn(answers[q.id] === 0)} onClick={() => handleToggle(q.id, 0)}
                            >{t('common.no')}</motion.button>
                        </div>
                    </motion.div>
                ))}

                <motion.button 
                    whileHover={!isFormComplete || isSubmitting ? {} : { scale: 1.02, translateY: -4 }} whileTap={!isFormComplete || isSubmitting ? {} : { scale: 0.98 }}
                    type="submit" disabled={!isFormComplete || isSubmitting} 
                    style={styles.submitBtn(!isFormComplete || isSubmitting)}
                >
                    {isSubmitting ? <Activity className="spin" size={24} /> : (isFormComplete ? <CheckCircle2 size={24} /> : <Info size={24} />)}
                    {isSubmitting ? t('common.loading', 'Processing...') : t('screening.generate')}
                </motion.button>
            </form>

            <AnimatePresence>
                {showResult.show && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        style={{ 
                            position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                            background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)' 
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }} 
                            animate={{ scale: 1, y: 0, opacity: 1 }} 
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{ 
                                background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', padding: '3.5rem 3rem', 
                                borderRadius: '40px', maxWidth: '500px', width: '90%', textAlign: 'center', 
                                boxShadow: '0 40px 100px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden'
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: showResult.result === 'Positive' ? 'var(--gradient-error, linear-gradient(90deg, #ef4444, #f97316))' : 'var(--gradient-success, linear-gradient(90deg, #10b981, #3b82f6))' }} />
                            
                            <button 
                                type="button"
                                onClick={() => setShowResult({ show: false, result: null, score: 0 })}
                                style={{ 
                                    position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', 
                                    border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                            >
                                <X size={20} />
                            </button>
                            
                            <motion.div 
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring' }}
                                style={{ 
                                    width: '80px', height: '80px', borderRadius: '24px', 
                                    background: showResult.result === 'Positive' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)', 
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', 
                                    color: showResult.result === 'Positive' ? '#ef4444' : '#10b981',
                                    boxShadow: showResult.result === 'Positive' ? '0 10px 30px -10px rgba(239, 68, 68, 0.4)' : '0 10px 30px -10px rgba(16, 185, 129, 0.4)'
                                }}
                            >
                                {showResult.result === 'Positive' ? <AlertTriangle size={40} /> : <CheckCircle2 size={40} />}
                            </motion.div>

                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: '800', letterSpacing: '-0.02em' }}>
                                {showResult.result === 'Positive' ? 'High Risk Detected' : 'Low Risk Detected'}
                            </h2>
                            
                            <div style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px', background: 'var(--glass)', border: '1px solid var(--glass-border)' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'bold' }}>CHART SCORE:</span>
                                <span style={{ color: showResult.result === 'Positive' ? '#ef4444' : '#10b981', fontWeight: '900', fontSize: '1.2rem' }}>{showResult.score}/10</span>
                            </div>

                            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: '500' }}>
                                {showResult.result === 'Positive' 
                                    ? 'A score of 7 or higher suggests significant ASD markers are present. This behavioral screening is not a diagnosis, but we advise seeking a professional clinical consultation for further evaluation.' 
                                    : 'The child scored low on standard behavioral markers. This indicates a minor risk of ASD. If developmental milestones continue to be delayed, please consult your pediatrician.'}
                            </p>

                            <button 
                                type="button"
                                onClick={() => { setShowResult({ show: false, result: null, score: 0 }); setAnswers({ A1: null, A2: null, A3: null, A4: null, A5: null, A6: null, A7: null, A8: null, A9: null, A10: null }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{ 
                                    background: showResult.result === 'Positive' ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #10b981, #059669)',
                                    color: 'white', padding: '1.25rem 2rem', borderRadius: '20px', border: 'none', 
                                    width: '100%', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                                    boxShadow: showResult.result === 'Positive' ? '0 15px 30px -10px rgba(239, 68, 68, 0.5)' : '0 15px 30px -10px rgba(16, 185, 129, 0.5)',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                Finish Screening
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BasicScreeningForm;
