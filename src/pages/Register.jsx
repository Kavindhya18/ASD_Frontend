import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ASDLoginImg from '../assets/autism.jpg';

const Register = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (formData.password.length < 6) {
            setError(t('register.password_short') || 'Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError(t('register.password_mismatch') || 'Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });
            if (res.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', overflow: 'hidden' }}>
            {/* Background Image with reduced opacity */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${ASDLoginImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.6,
                    zIndex: -1
                }}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '550px', padding: '3rem', background: 'rgba(30, 41, 59, 0.15)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('register.title')}</h2>
                    <p style={{ color: '#94a3b8' }}>{t('register.subtitle')}</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '12px', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.first_name')}</label>
                            <div style={{ position: 'relative' }}>
                                <User style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} size={18} />
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    style={{ paddingLeft: '40px' }}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.last_name')}</label>
                            <div style={{ position: 'relative' }}>
                                <User style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} size={18} />
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    style={{ paddingLeft: '40px' }}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.email')}</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} size={18} />
                            <input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                style={{ paddingLeft: '40px' }}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.password')}</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} size={18} />
                            <input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                style={{ paddingLeft: '40px' }}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.confirm_password')}</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '14px', color: '#64748b' }} size={18} />
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                style={{ paddingLeft: '40px' }}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', padding: '14px' }}
                        disabled={loading}
                    >
                        {loading ? t('register.creating') : <><UserPlus size={20} /> {t('register.btn')}</>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: '#94a3b8' }}>
                    {t('register.have_account')} <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>{t('register.login_link')}</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
