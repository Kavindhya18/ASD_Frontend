import React, { useState } from 'react';
import { Activity, User, ClipboardList, Brain, CheckCircle2, ChevronRight, ChevronLeft, Calendar, Users, Briefcase, Star, Info, HelpCircle, X, AlertTriangle, Baby } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { generateASDReport } from '../../utils/reportGenerator';
import { Download } from 'lucide-react';
import API_BASE_URL from '../../config';


const AdvancedScreeningForm = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState({ show: false, result: null, probability: null });
    const [children, setChildren] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState('');
    const [formData, setFormData] = useState({
        // Section 1: Demographics
        age: '',
        sex: null, // Male: 1, Female: 0
        ethnicity: '',
        relation: '',
        // Section 2: Clinical History
        speechDelay: null,
        learningDisorder: null,
        geneticDisorders: null,
        depression: null,
        iddd: null, // Global dev delay / Intellectual disability
        socialBehavioralIssues: null,
        anxiety: null,
        jaundice: null,
        familyASD: null,
        // Section 3: Behavioral Assessment (A1-A10)
        A1: null, A2: null, A3: null, A4: null, A5: null,
        A6: null, A7: null, A8: null, A9: null, A10: null
    });

    React.useEffect(() => {
        const fetchChildren = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${API_BASE_URL}/children`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setChildren(res.data);
            } catch (err) {
                console.error('Error fetching children:', err);
            }
        };
        fetchChildren();
    }, []);

    const handleChildSelect = (childId) => {
        setSelectedChildId(childId);
        if (childId) {
            const child = children.find(c => c._id === childId);
            if (child) {
                setFormData(prev => ({
                    ...prev,
                    age: child.age.toString(),
                    sex: child.sex,
                    ethnicity: child.ethnicity !== null ? child.ethnicity : '',
                    jaundice: child.jaundice !== null ? child.jaundice : null,
                    familyASD: child.familyASD !== null ? child.familyASD : null,
                    speechDelay: child.speechDelay !== null ? child.speechDelay : null,
                    learningDisorder: child.learningDisorder !== null ? child.learningDisorder : null,
                    geneticDisorders: child.geneticDisorders !== null ? child.geneticDisorders : null,
                    depression: child.depression !== null ? child.depression : null,
                    iddd: child.iddd !== null ? child.iddd : null,
                    socialBehavioralIssues: child.socialBehavioralIssues !== null ? child.socialBehavioralIssues : null,
                    anxiety: child.anxiety !== null ? child.anxiety : null
                }));

            }
        } else {
            setFormData(prev => ({
                ...prev, age: '', sex: null, ethnicity: '', jaundice: null, familyASD: null
            }));
        }
    };


    const styles = {
        container: { padding: '2rem 0', maxWidth: '900px', margin: '0 auto' },
        header: { textAlign: 'center', marginBottom: '4rem' },
        title: { fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: 'bold' },
        subtitle: { color: 'var(--text-muted)', fontSize: '1.2rem' },
        stepper: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '4rem' },
        stepUnit: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
        stepCircle: (active, completed) => ({
            width: '64px', height: '64px', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: completed ? '#10b981' : active ? 'var(--gradient)' : 'var(--glass)',
            color: active || completed ? 'white' : 'var(--text-muted)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: active ? '0 15px 30px -10px rgba(79, 70, 229, 0.5)' : 'none',
            border: active ? 'none' : '1px solid var(--glass-border)'
        }),
        stepLine: (completed) => ({ width: '40px', height: '3px', background: completed ? '#10b981' : 'var(--glass)', borderRadius: '2px', alignSelf: 'center', margin: '0 -1rem 2rem' }),
        card: { 
            padding: '3rem', borderRadius: '40px', 
            background: 'var(--glass)', border: '1px solid var(--glass-border)',
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.3)', marginBottom: '3rem'
        },
        label: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '1.25rem', textTransform: 'uppercase' },
        input: { 
            width: '100%', padding: '1.25rem', borderRadius: '18px', background: 'var(--input-bg)', 
            border: '2px solid var(--glass-border)', color: 'var(--text-main)', outline: 'none', transition: 'all 0.3s'
        },
        selectBox: { position: 'relative', width: '100%' },
        btnGroup: { display: 'flex', gap: '1rem', width: '100%' },
        toggleBtn: (active) => ({
            flex: 1, padding: '1.25rem', borderRadius: '18px', border: active ? 'none' : '1px solid var(--glass-border)',
            background: active ? 'var(--gradient)' : 'var(--input-bg)',
            color: active ? 'white' : 'var(--text-muted)',
            fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
            boxShadow: active ? '0 15px 30px -10px rgba(79, 70, 229, 0.4)' : 'none'
        }),
        navBtn: (primary) => ({
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            padding: '1.5rem 3rem', borderRadius: '24px', border: 'none',
            background: primary ? 'var(--gradient)' : 'var(--glass)',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: primary ? '0 20px 40px -10px rgba(79, 70, 229, 0.6)' : 'none',
            width: primary ? (step === 3 ? '100%' : 'auto') : 'auto',
            flex: primary && step < 3 ? 2 : (primary ? 1 : 1)
        })
    };

    const ethnicityOptions = [
        { label: t('screening.ethnicities.0'), value: 0 }, { label: t('screening.ethnicities.1'), value: 1 }, { label: t('screening.ethnicities.2'), value: 2 },
        { label: t('screening.ethnicities.3'), value: 3 }, { label: t('screening.ethnicities.4'), value: 4 }, { label: t('screening.ethnicities.5'), value: 5 }, { label: t('screening.ethnicities.6'), value: 6 }
    ];

    const relationOptions = [
        { label: t('screening.relationships.Parent'), value: 'Parent' }, { label: t('screening.relationships.Healthcare Professional'), value: 'Healthcare Professional' },
        { label: t('screening.relationships.Relative'), value: 'Relative' }, { label: t('screening.relationships.Self'), value: 'Self' }
    ];

    const handleToggle = (id, value) => setFormData(prev => ({ ...prev, [id]: value }));
    const handleInputChange = (id, value) => setFormData(prev => ({ ...prev, [id]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const relationMap = {
            'Parent': 0,
            'Relative': 0,
            'Healthcare Professional': 2,
            'Self': 5
        };
        const mappedRelation = relationMap[formData.relation] !== undefined ? relationMap[formData.relation] : 3;

        const featureArray = [
            Number(formData.A1 ?? 0),
            Number(formData.A2 ?? 0),
            Number(formData.A3 ?? 0),
            Number(formData.A4 ?? 0),
            Number(formData.A5 ?? 0),
            Number(formData.A6 ?? 0),
            Number(formData.A7 ?? 0),
            Number(formData.A8 ?? 0),
            Number(formData.A9 ?? 0),
            Number(formData.A10 ?? 0),
            Number(formData.age ?? 0),
            Number(formData.speechDelay ?? 0),
            Number(formData.learningDisorder ?? 0),
            Number(formData.geneticDisorders ?? 0),
            Number(formData.depression ?? 0),
            Number(formData.iddd ?? 0),
            Number(formData.socialBehavioralIssues ?? 0),
            Number(formData.anxiety ?? 0),
            Number(formData.sex ?? 0),
            Number(formData.ethnicity ?? 0),
            Number(formData.jaundice ?? 0),
            Number(formData.familyASD ?? 0),
            mappedRelation
        ];

        console.log("Advanced Screening Features:", featureArray);
        
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/prediction/assess`, { 
                features: featureArray,
                childId: selectedChildId 
            }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            
            console.log('Prediction Result:', response.data);
            
            // Prepare the full result object for PDF generation
            const behavioralScore = [formData.A1, formData.A2, formData.A3, formData.A4, formData.A5, formData.A6, formData.A7, formData.A8, formData.A9, formData.A10].reduce((a, b) => a + Number(b || 0), 0);
            
            const fullResult = {
                prediction: response.data.result,
                probability: response.data.probability,
                date: new Date(),
                features: {
                    type: 'Advanced Clinical',
                    behavioral_score: behavioralScore,
                    clinical_history: {
                        speechDelay: formData.speechDelay === 1,
                        learningDisorder: formData.learningDisorder === 1,
                        geneticDisorders: formData.geneticDisorders === 1,
                        depression: formData.depression === 1,
                        iddd: formData.iddd === 1,
                        socialBehavioralIssues: formData.socialBehavioralIssues === 1,
                        anxiety: formData.anxiety === 1,
                        jaundice: formData.jaundice === 1,
                        familyASD: formData.familyASD === 1
                    }
                }
            };
            
            setShowResult({ 
                show: true, 
                result: response.data.result, 
                probability: response.data.probability,
                fullData: fullResult
            });
        } catch (error) {
            console.error('Error fetching prediction:', error);
            alert(t('screening.error') || "Failed to process assessment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isStep1Complete = formData.age && formData.sex !== null && formData.ethnicity !== '' && formData.relation !== '';
    const isStep2Complete = ['speechDelay', 'learningDisorder', 'geneticDisorders', 'depression', 'iddd', 'socialBehavioralIssues', 'anxiety', 'jaundice', 'familyASD'].every(f => formData[f] !== null);
    const isStep3Complete = ['A1','A2','A3','A4','A5','A6','A7','A8','A9','A10'].every(q => formData[q] !== null);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{t('screening.advanced_title')}</h1>
                <p style={styles.subtitle}>{t('screening.advanced_sub')}</p>
            </div>

            <div style={styles.stepper}>
                {[ {id:1, ic:<User/>}, {id:2, ic:<ClipboardList/>}, {id:3, ic:<Brain/>} ].map((s, i, arr) => (
                    <React.Fragment key={s.id}>
                        <div style={styles.stepUnit}>
                            <motion.div animate={{ scale: step === s.id ? 1.1 : 1 }} style={styles.stepCircle(step === s.id, step > s.id)}>
                                {step > s.id ? <CheckCircle2 size={28}/> : s.ic}
                            </motion.div>
                        </div>
                        {i < arr.length - 1 && <div style={styles.stepLine(step > s.id)} />}
                    </React.Fragment>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} style={styles.card}>
                            <div style={{ marginBottom: '3rem' }}>
                                <label style={styles.label}><Baby size={18}/> Select Child Profile (Optional)</label>
                                <select 
                                    value={selectedChildId} 
                                    onChange={(e) => handleChildSelect(e.target.value)} 
                                    style={styles.input}
                                >
                                    <option value="">Start assessment without profile</option>
                                    {children.map(c => (
                                        <option key={c._id} value={c._id}>{c.name} ({c.age} yrs)</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                                <div>
                                    <label style={styles.label}><Calendar size={18}/> {t('screening.age')}</label>
                                    <input type="number" value={formData.age} onChange={(e)=>handleInputChange('age', e.target.value)} style={styles.input} placeholder="1-18"/>
                                </div>
                                <div>
                                    <label style={styles.label}><Users size={18}/> {t('screening.sex')}</label>
                                    <div style={styles.btnGroup}>
                                        <button type="button" onClick={()=>handleToggle('sex',1)} style={styles.toggleBtn(formData.sex===1)}>{t('screening.male')}</button>
                                        <button type="button" onClick={()=>handleToggle('sex',0)} style={styles.toggleBtn(formData.sex===0)}>{t('screening.female')}</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                                <div>
                                    <label style={styles.label}><Star size={18}/> {t('screening.ethnicity')}</label>
                                    <select value={formData.ethnicity} onChange={(e)=>handleInputChange('ethnicity', e.target.value)} style={styles.input}>
                                        <option value="">{t('screening.choose')}</option>
                                        {ethnicityOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={styles.label}><Briefcase size={18}/> {t('screening.relationship')}</label>
                                    <select value={formData.relation} onChange={(e)=>handleInputChange('relation', e.target.value)} style={styles.input}>
                                        <option value="">{t('screening.select')}</option>
                                        {relationOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                                {[
                                    { k:'speechDelay', t: t('screening.clinical.speechDelay') }, 
                                    { k:'learningDisorder', t: t('screening.clinical.learningDisorder') }, 
                                    { k:'geneticDisorders', t: t('screening.clinical.geneticDisorders') },
                                    { k:'depression', t: t('screening.clinical.depression') }, 
                                    { k:'iddd', t: t('screening.clinical.iddd') }, 
                                    { k:'socialBehavioralIssues', t: t('screening.clinical.socialBehavioralIssues') },
                                    { k:'anxiety', t: t('screening.clinical.anxiety') }, 
                                    { k:'jaundice', t: t('screening.clinical.jaundice') }, 
                                    { k:'familyASD', t: t('screening.clinical.familyASD') }
                                ].map(f => (
                                    <div key={f.k} style={{ ...styles.card, padding: '2rem', marginBottom: 0 }}>
                                        <p style={{ color: 'var(--text-main)', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1.05rem' }}>{f.t}</p>
                                        <div style={styles.btnGroup}>
                                            <button type="button" onClick={()=>handleToggle(f.k, 1)} style={styles.toggleBtn(formData[f.k]===1)}>{t('common.yes')}</button>
                                            <button type="button" onClick={()=>handleToggle(f.k, 0)} style={styles.toggleBtn(formData[f.k]===0)}>{t('common.no')}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                                {[
                                    t('screening.questions.A1'), t('screening.questions.A2'), t('screening.questions.A3'), 
                                    t('screening.questions.A4'), t('screening.questions.A5'), t('screening.questions.A6'), 
                                    t('screening.questions.A7'), t('screening.questions.A8'), t('screening.questions.A9'), 
                                    t('screening.questions.A10')
                                ].map((q, i) => {
                                    const k = `A${i+1}`;
                                    return (
                                        <div key={k} style={{ ...styles.card, padding: '2rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                            <div style={{ width: '40px', height: '40px', background: 'var(--input-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary)', flexShrink: 0 }}>{i+1}</div>
                                            <p style={{ color: 'var(--text-main)', flex: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>{q}</p>
                                            <div style={{ ...styles.btnGroup, width: '240px' }}>
                                                <button type="button" onClick={()=>handleToggle(k, 1)} style={styles.toggleBtn(formData[k]===1)}>{t('common.yes')}</button>
                                                <button type="button" onClick={()=>handleToggle(k, 0)} style={styles.toggleBtn(formData[k]===0)}>{t('common.no')}</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                    {step > 1 && <button type="button" onClick={()=>setStep(s=>s-1)} style={styles.navBtn(false)}><ChevronLeft/> {t('common.prev')}</button>}
                    {step < 3 ? (
                        <button type="button" onClick={()=>setStep(s=>s+1)} disabled={step===1?!isStep1Complete:!isStep2Complete} style={{ ...styles.navBtn(true), opacity: (step===1?isStep1Complete:isStep2Complete)?1:0.3 }}>{t('common.next')} <ChevronRight/></button>
                    ) : (
                        <button type="submit" disabled={!isStep3Complete || isSubmitting} style={{ ...styles.navBtn(true), opacity: (!isStep3Complete || isSubmitting)?0.3:1 }}>
                            {isSubmitting ? <Activity className="spin" /> : <Activity/>} {isSubmitting ? t('common.loading', 'Processing...') : t('screening.run_model')}
                        </button>
                    )}
                </div>
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
                                onClick={() => setShowResult({ show: false, result: null, probability: null })}
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
                            
                            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: '500' }}>
                                {showResult.result === 'Positive' 
                                    ? 'Based on the clinical and behavioral features provided, the model indicates a high probability of ASD traits. We strongly recommend consulting with a healthcare professional or specialist for a formal diagnosis.' 
                                    : 'The model indicates a low probability of ASD traits based on the provided data. However, if you continue to have concerns, regular monitoring and consulting a professional is always encouraged.'}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const child = selectedChildId ? children.find(c => c._id === selectedChildId) : { name: 'Anonymous', age: formData.age, sex: formData.sex, ethnicity: formData.ethnicity, country: formData.country };
                                        generateASDReport(child, showResult.fullData);
                                    }}
                                    style={{ 
                                        background: 'var(--glass)', border: '1px solid var(--glass-border)', 
                                        color: 'var(--text-main)', padding: '1.25rem', borderRadius: '20px', 
                                        flex: 1, fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                                    }}
                                >
                                    <Download size={20} /> Report
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => { setShowResult({ show: false, result: null, probability: null }); setStep(1); setFormData({ age: '', sex: null, ethnicity: '', relation: '', speechDelay: null, learningDisorder: null, geneticDisorders: null, depression: null, iddd: null, socialBehavioralIssues: null, anxiety: null, jaundice: null, familyASD: null, A1: null, A2: null, A3: null, A4: null, A5: null, A6: null, A7: null, A8: null, A9: null, A10: null }); }}
                                    style={{ 
                                        background: showResult.result === 'Positive' ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #10b981, #059669)',
                                        color: 'white', padding: '1.25rem 2rem', borderRadius: '20px', border: 'none', 
                                        flex: 2, fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                                        boxShadow: showResult.result === 'Positive' ? '0 15px 30px -10px rgba(239, 68, 68, 0.5)' : '0 15px 30px -10px rgba(16, 185, 129, 0.5)',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    Finish Assessment
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvancedScreeningForm;
