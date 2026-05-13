import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    User, 
    ClipboardCheck, 
    Activity, 
    CheckCircle2, 
    ChevronDown, 
    Stethoscope, 
    Baby, 
    Globe, 
    Info,
    ArrowRight,
    X,
    AlertTriangle,
    Download
} from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { generateASDReport } from '../../utils/reportGenerator';
import API_BASE_URL from '../../config';

const BasicASDScreeningForm = () => {
    // Initial state with 18 fields mapped to integers
    const [children, setChildren] = useState([]);
    const [selectedChildId, setSelectedChildId] = useState('');
    const [formData, setFormData] = useState({
        A1: null, A2: null, A3: null, A4: null, A5: null,
        A6: null, A7: null, A8: null, A9: null, A10: null,
        age: '',
        gender: null,
        ethnicity: null, 
        jaundice: null,
        autism: null,
        country: null, 
        used_app_before: null,
        relation: null
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
                    gender: child.sex,
                    ethnicity: child.ethnicity !== null ? child.ethnicity : '',
                    country: child.country !== null ? child.country : '',
                    jaundice: child.jaundice !== null ? child.jaundice : 0,
                    autism: child.familyASD !== null ? child.familyASD : 0
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev, age: '', gender: null, ethnicity: '', country: '', jaundice: 0, autism: 0
            }));
        }
    };


    // Calculate completion: Count any field that is not null or empty string
    const completedCount = Object.values(formData).filter(v => v !== null && v !== '').length;
    const totalFields = 18;
    const progressPercent = (completedCount / totalFields) * 100;


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResult, setShowResult] = useState({ show: false, result: null, score: 0 });
    const { t } = useTranslation();


    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: parseInt(value)
        }));
    };

    const handleQToggle = (id, val) => {
        setFormData(prev => ({ ...prev, [id]: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // CRITICAL ARRAY ORDER: [A1...A10, age, gender, ethnicity, jaundice, autism_family_history, country, used_app_before, relation]
        const submissionArray = [
            formData.A1 ?? 0, formData.A2 ?? 0, formData.A3 ?? 0, formData.A4 ?? 0, formData.A5 ?? 0,
            formData.A6 ?? 0, formData.A7 ?? 0, formData.A8 ?? 0, formData.A9 ?? 0, formData.A10 ?? 0,
            parseInt(formData.age || 0),
            formData.gender ?? 0,
            formData.ethnicity ?? 0,
            formData.jaundice ?? 0,
            formData.autism ?? 0,
            formData.country ?? 0,
            formData.used_app_before ?? 0,
            formData.relation ?? 0
        ];

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/prediction/assess/asd_18`, { 
                features: submissionArray,
                childId: selectedChildId 
            }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            
            // Score for Q-CHAT section (A1-A10)
            const score = [formData.A1, formData.A2, formData.A3, formData.A4, formData.A5, formData.A6, formData.A7, formData.A8, formData.A9, formData.A10]
                .reduce((acc, val) => acc + (val ?? 0), 0);
            
            const fullResult = {
                prediction: response.data.result,
                probability: response.data.probability,
                date: new Date(),
                features: {
                    type: 'Basic Screening',
                    behavioral_score: score,
                    clinical_history: {
                        jaundice: formData.jaundice === 1,
                        familyASD: formData.autism === 1,
                    }
                }
            };

            setShowResult({ 
                show: true, 
                result: response.data.result, 
                score,
                fullData: fullResult
            });
            console.log("Prediction Result:", response.data);
        } catch (error) {
            console.error('Error fetching prediction:', error);
            alert("Failed to process prediction. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    const styles = {
        container: { padding: '2rem 0', maxWidth: '900px', margin: '0 auto' },
        header: { textAlign: 'center', marginBottom: '3rem' },
        iconBox: { width: '80px', height: '80px', background: 'var(--gradient)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)' },
        title: { fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--text-main)', fontWeight: '800' },
        subtitle: { color: 'var(--text-muted)', fontSize: '1.1rem' },
        progressContainer: { 
            position: 'sticky', top: '20px', zIndex: 100,
            padding: '1.5rem', borderRadius: '24px', 
            background: 'var(--glass)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)', marginBottom: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        },
        progressBar: { height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' },
        progressFill: { height: '100%', background: 'var(--gradient)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' },
        sectionTitle: { fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' },
        card: { 
            padding: '2.5rem', borderRadius: '32px', 
            background: 'var(--glass)', border: '1px solid var(--glass-border)',
            marginBottom: '2rem', position: 'relative', overflow: 'hidden',
            backdropFilter: 'blur(20px)'
        },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' },
        fieldGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
        label: { fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' },
        input: { 
            width: '100%', padding: '12px 16px', background: 'var(--input-bg)', 
            border: '1px solid var(--glass-border)', borderRadius: '12px', 
            color: 'var(--text-main)', fontSize: '1rem', outline: 'none'
        },
        select: {
            width: '100%', padding: '12px 16px', background: 'var(--input-bg)', 
            border: '1px solid var(--glass-border)', borderRadius: '12px', 
            color: 'var(--text-main)', fontSize: '1rem', outline: 'none',
            cursor: 'pointer', appearance: 'none'
        },
        qItem: {
            padding: '1.5rem', borderRadius: '20px', background: 'var(--input-bg)',
            border: '1px solid var(--glass-border)', marginBottom: '1rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem'
        },
        toggleBtn: (active, color = 'var(--primary)') => ({
            flex: 1, padding: '10px 20px', borderRadius: '12px', border: active ? 'none' : '1px solid var(--glass-border)',
            background: active ? (color === 'var(--primary)' ? 'var(--gradient)' : color) : 'transparent',
            color: active ? 'white' : 'var(--text-muted)',
            fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease'
        }),
        submitBtn: {
            width: '100%', padding: '1.5rem', borderRadius: '24px', border: 'none',
            background: 'var(--gradient)', color: 'white', fontWeight: 'bold', 
            fontSize: '1.25rem', cursor: 'pointer', marginTop: '2rem',
            boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
        }
    };

    const questions = [
        { id: 'A1', text: "Does the child notice small sounds when others do not?" },
        { id: 'A2', text: "Does the child focus more on the whole picture rather than small details?" },
        { id: 'A3', text: "In a social group, can the child keep track of several different conversations?" },
        { id: 'A4', text: "Does the child find it easy to go back and forth between different activities?" },
        { id: 'A5', text: "Does the child know how to keep a conversation going with peers?" },
        { id: 'A6', text: "Is the child good at social chit-chat?" },
        { id: 'A7', text: "When reading a story, does the child find it difficult to work out characters’ intentions?" },
        { id: 'A8', text: "Did the child enjoy playing pretend games with other children in preschool?" },
        { id: 'A9', text: "Does the child find it easy to know what someone is thinking just by looking at their face?" },
        { id: 'A10', text: "Does the child find it hard to make new friends?" }
    ];

    const ethnicities = [
        { label: "Unknown/Other", value: 0 },
        { label: "Asian", value: 1 },
        { label: "Black", value: 2 },
        { label: "Hispanic", value: 3 },
        { label: "Latino", value: 4 },
        { label: "Middle Eastern", value: 5 },
        { label: "Others", value: 6 },
        { label: "Pasifika", value: 7 },
        { label: "South Asian", value: 8 },
        { label: "Turkish", value: 9 },
        { label: "White-European", value: 10 }
    ];

    const countries = [
        { label: "United States", value: 51 },
        { label: "United Kingdom", value: 50 },
        { label: "India", value: 18 },
        { label: "Australia", value: 3 },
        { label: "Canada", value: 10 },
        { label: "New Zealand", value: 34 },
        { label: "Sri Lanka", value: 6 },
        { label: "Egypt", value: 13 },
        { label: "Jordan", value: 24 },
        { label: "Other Country", value: 0 }
    ];

    const relations = [
        { label: "Health care professional", value: 1 },
        { label: "Parent", value: 2 },
        { label: "Relative", value: 3 },
        { label: "Self", value: 4 },
        { label: "Unknown", value: 0 }
    ];

    return (
        <div style={styles.container}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={styles.header}>
                <div style={styles.iconBox}><Activity size={40} color="white" /></div>
                <h1 style={styles.title}>Basic ASD Screening Form</h1>
                <p style={styles.subtitle}>Please provide accurate clinical and behavioral data to generate an AI-powered autism risk prediction.</p>
            </motion.div>

            <motion.div style={styles.progressContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-main)' }}>SCREENING PROGRESS</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{completedCount}/{totalFields}</span>
                </div>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
                </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
                {/* SECTION 1: Demographics */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={styles.card}>
                    <h2 style={styles.sectionTitle}><Baby size={24} /> Demographics & Clinical History</h2>
                    
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={styles.label}>Select Child Profile (Optional)</label>
                        <select 
                            value={selectedChildId} 
                            onChange={(e) => handleChildSelect(e.target.value)} 
                            style={styles.select}
                        >
                            <option value="">Start assessment without profile</option>
                            {children.map(c => (
                                <option key={c._id} value={c._id}>{c.name} ({c.age} yrs)</option>
                            ))}
                        </select>
                    </div>

                    <div style={styles.grid}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Child's Age (Years)</label>
                            <input 
                                type="number" min="0" max="18" value={formData.age}
                                onChange={(e) => handleChange('age', e.target.value)}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Gender</label>
                            <select value={formData.gender ?? ''} onChange={(e) => handleChange('gender', e.target.value)} style={styles.select}>
                                <option value="" disabled>Select Gender</option>
                                <option value={0}>Female</option>
                                <option value={1}>Male</option>
                            </select>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Ethnicity</label>
                            <select value={formData.ethnicity ?? ''} onChange={(e) => handleChange('ethnicity', e.target.value)} style={styles.select}>
                                <option value="" disabled>Select Ethnicity</option>
                                {ethnicities.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                            </select>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Born with Jaundice?</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button type="button" onClick={() => handleChange('jaundice', 1)} style={styles.toggleBtn(formData.jaundice === 1)}>Yes</button>
                                <button type="button" onClick={() => handleChange('jaundice', 0)} style={styles.toggleBtn(formData.jaundice === 0)}>No</button>
                            </div>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Autism Family History?</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button type="button" onClick={() => handleChange('autism', 1)} style={styles.toggleBtn(formData.autism === 1)}>Yes</button>
                                <button type="button" onClick={() => handleChange('autism', 0)} style={styles.toggleBtn(formData.autism === 0)}>No</button>
                            </div>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Country of Residence</label>
                            <select value={formData.country ?? ''} onChange={(e) => handleChange('country', e.target.value)} style={styles.select}>
                                <option value="" disabled>Select Country</option>
                                {countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Used app before?</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button type="button" onClick={() => handleChange('used_app_before', 1)} style={styles.toggleBtn(formData.used_app_before === 1)}>Yes</button>
                                <button type="button" onClick={() => handleChange('used_app_before', 0)} style={styles.toggleBtn(formData.used_app_before === 0)}>No</button>
                            </div>
                        </div>

                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Relationship</label>
                            <select value={formData.relation ?? ''} onChange={(e) => handleChange('relation', e.target.value)} style={styles.select}>
                                <option value="" disabled>Select Relationship</option>
                                {relations.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* SECTION 2: Behavioral */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={styles.card}>
                    <h2 style={styles.sectionTitle}><ClipboardCheck size={24} /> Q-CHAT Behavioral Assessment</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {questions.map((q, idx) => (
                            <div key={q.id} style={styles.qItem}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{idx + 1}</span>
                                    <span style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>{q.text}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', minWidth: '150px' }}>
                                    <button type="button" onClick={() => handleQToggle(q.id, 1)} style={styles.toggleBtn(formData[q.id] === 1)}>Yes</button>
                                    <button type="button" onClick={() => handleQToggle(q.id, 0)} style={styles.toggleBtn(formData[q.id] === 0, '#64748b')}>No</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit" disabled={isSubmitting} 
                    style={{ ...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? <Activity className="spin" size={24} /> : <CheckCircle2 size={24} />}
                    Generate AI Prediction
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
                                background: 'var(--card-dark)', border: '1px solid var(--glass-border)', padding: '3.5rem 3rem', 
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
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'bold' }}>Q-CHAT SCORE:</span>
                                <span style={{ color: showResult.result === 'Positive' ? '#ef4444' : '#10b981', fontWeight: '900', fontSize: '1.2rem' }}>{showResult.score}/10</span>
                            </div>

                            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: '500' }}>
                                {showResult.result === 'Positive' 
                                    ? 'A score of 7 or higher suggests significant ASD markers are present. This behavioral screening is not a diagnosis, but we advise seeking a professional clinical consultation for further evaluation.' 
                                    : 'The child scored low on standard behavioral markers. This indicates a minor risk of ASD. If developmental milestones continue to be delayed, please consult your pediatrician.'}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const child = selectedChildId ? children.find(c => c._id === selectedChildId) : { name: 'Anonymous', age: formData.age, gender: formData.gender, ethnicity: formData.ethnicity, country: formData.country };
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
                                    onClick={() => { setShowResult({ show: false, result: null, score: 0 }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    style={{ 
                                        background: showResult.result === 'Positive' ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #10b981, #3b82f6)',
                                        color: 'white', padding: '1.25rem 2rem', borderRadius: '20px', border: 'none', 
                                        flex: 2, fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                                        boxShadow: showResult.result === 'Positive' ? '0 15px 30px -10px rgba(239, 68, 68, 0.5)' : '0 15px 30px -10px rgba(16, 185, 129, 0.5)',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Finish Screening
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default BasicASDScreeningForm;
