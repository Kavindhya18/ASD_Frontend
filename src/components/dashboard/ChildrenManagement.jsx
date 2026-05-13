import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Baby, BarChart3, ChevronDown, ChevronUp, Calendar, User, Activity, Download } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { generateASDReport } from '../../utils/reportGenerator';

import API_BASE_URL from '../../config';

const ChildrenManagement = () => {
    const { t } = useTranslation();
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newChild, setNewChild] = useState({ 
        name: '', age: '', sex: '', 
        ethnicity: '', country: ''
    });
    const [expandedChild, setExpandedChild] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const API_URL = `${API_BASE_URL}/children`;

    const ethnicities = [
        { label: "White-European", value: 10 },
        { label: "South Asian", value: 8 },
        { label: "Asian", value: 1 },
        { label: "Middle Eastern", value: 5 },
        { label: "Black", value: 2 },
        { label: "Latino", value: 4 },
        { label: "Hispanic", value: 3 },
        { label: "Pasifika", value: 7 },
        { label: "Turkish", value: 9 },
        { label: "Others", value: 6 }
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
        { label: "Other Country", value: 0 }
    ];

    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChildren(res.data);
        } catch (err) {
            console.error('Error fetching children:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddChild = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(API_URL, newChild, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChildren([...children, res.data]);
            setNewChild({ 
                name: '', age: '', sex: '', 
                ethnicity: '', country: ''
            });
            setShowAddForm(false);
        } catch (err) {
            console.error('Error adding child:', err);
            alert('Failed to add child profile.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteChild = async (id) => {
        if (!window.confirm('Are you sure you want to delete this child profile and all their results?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setChildren(children.filter(c => c._id !== id));
        } catch (err) {
            console.error('Error deleting child:', err);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const generatePDF = (child, result) => {
        generateASDReport(child, result);
    };

    if (loading) return <div>Loading...</div>;

    const customStyles = `
        .premium-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1.2em;
            padding-right: 3rem !important;
        }
        .premium-select:focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }
    `;

    return (
        <div style={{ maxWidth: '1000px' }}>
            <style>{customStyles}</style>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.02em', background: 'var(--gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Children Profiles</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage family profiles and track assessment history</p>
                </div>
                <button 
                    onClick={() => setShowAddForm(!showAddForm)}
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', 
                        background: 'var(--gradient)', color: 'white', 
                        padding: '14px 28px', borderRadius: '20px', 
                        border: 'none', fontWeight: '800', cursor: 'pointer',
                        boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.5)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Plus size={22} /> Add New Child
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        style={{ 
                            padding: '3rem', marginBottom: '3rem', 
                            background: 'rgba(30, 41, 59, 0.5)', 
                            backdropFilter: 'blur(20px)',
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        <form onSubmit={handleAddChild}>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                                    <input 
                                        type="text" 
                                        value={newChild.name} 
                                        onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                                        placeholder="Full name"
                                        required
                                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age (Years)</label>
                                    <input 
                                        type="number" 
                                        value={newChild.age} 
                                        onChange={(e) => setNewChild({...newChild, age: e.target.value})}
                                        placeholder="Years" min="1" max="18" required
                                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sex</label>
                                    <select 
                                        value={newChild.sex} 
                                        onChange={(e) => setNewChild({...newChild, sex: e.target.value})}
                                        required className="premium-select"
                                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ethnicity</label>
                                    <select 
                                        value={newChild.ethnicity} 
                                        onChange={(e) => setNewChild({...newChild, ethnicity: e.target.value})}
                                        required className="premium-select"
                                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                                    >
                                        <option value="" disabled>Select</option>
                                        {ethnicities.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Country of Residence</label>
                                    <select 
                                        value={newChild.country} 
                                        onChange={(e) => setNewChild({...newChild, country: e.target.value})}
                                        required className="premium-select"
                                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid rgba(255,255,255,0.05)', color: 'white', outline: 'none' }}
                                    >
                                        <option value="" disabled>Select</option>
                                        {countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: '1rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', fontWeight: 'bold' }}>Cancel</button>
                                <button type="submit" disabled={submitting} style={{ padding: '1rem 3rem', borderRadius: '16px', border: 'none', background: 'var(--gradient)', color: 'white', fontWeight: 'bold', boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)' }}>
                                    {submitting ? 'Creating...' : 'Create Child Profile'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>



            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {children.length === 0 ? (
                    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                        <Baby size={48} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h3>No children profiles yet</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Add your child's profile to start tracking assessments</p>
                    </div>
                ) : (
                    children.map(child => (
                        <div key={child._id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <div 
                                style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                                onClick={() => setExpandedChild(expandedChild === child._id ? null : child._id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                    <div style={{ width: '56px', height: '56px', background: 'var(--gradient)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <Baby size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{child.name}</h3>
                                        <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {child.age} Years</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {child.sex === 1 ? 'Male' : 'Female'}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={14} /> {child.results?.length || 0} Assessments</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteChild(child._id); }}
                                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    {expandedChild === child._id ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedChild === child._id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} 
                                        animate={{ height: 'auto', opacity: 1 }} 
                                        exit={{ height: 0, opacity: 0 }}
                                        style={{ borderTop: '1px solid var(--glass-border)', background: 'rgba(15, 23, 42, 0.2)' }}
                                    >
                                        <div style={{ padding: '2rem' }}>
                                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                                                <BarChart3 size={18} color="var(--primary)" /> Assessment History
                                            </h4>
                                            
                                            {child.results?.length === 0 ? (
                                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No assessments recorded for this child.</p>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {child.results.map((res, idx) => (
                                                        <div key={idx} style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', padding: '1.25rem', borderRadius: '16px', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', alignItems: 'center' }}>
                                                            <div>
                                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Date</p>
                                                                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatDate(res.date)}</p>
                                                            </div>
                                                            <div>
                                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Input Summary</p>
                                                                <p style={{ fontSize: '0.85rem' }}>
                                                                    Score: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{res.features?.behavioral_score}/10</span> | 
                                                                    Clinical: <span style={{ color: 'var(--text-main)' }}>{Object.values(res.features?.clinical_history || {}).filter(v => v).length} concerns</span>
                                                                </p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'flex-end' }}>
                                                                <div>
                                                                    <div style={{ 
                                                                        display: 'inline-block', padding: '6px 12px', borderRadius: '8px', 
                                                                        background: res.prediction === 'Positive' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                                                        color: res.prediction === 'Positive' ? '#ef4444' : '#10b981',
                                                                        fontWeight: 'bold', fontSize: '0.85rem'
                                                                    }}>
                                                                        {res.prediction === 'Positive' ? 'High Risk' : 'Low Risk'}
                                                                    </div>
                                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                                                        {res.probability ? `${Math.round(res.probability * 100)}% Match` : 'Result Saved'}
                                                                    </p>
                                                                </div>
                                                                <button 
                                                                    onClick={() => generatePDF(child, res)}
                                                                    title="Download Report"
                                                                    style={{ 
                                                                        background: 'var(--glass)', border: '1px solid var(--glass-border)', 
                                                                        padding: '10px', borderRadius: '12px', color: 'var(--primary)', 
                                                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                        transition: 'all 0.2s'
                                                                    }}
                                                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(79, 70, 229, 0.1)'; }}
                                                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--glass)'; }}
                                                                >
                                                                    <Download size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChildrenManagement;
