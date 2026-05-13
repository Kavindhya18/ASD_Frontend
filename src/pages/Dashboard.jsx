import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Layout, Activity, User, Settings, Bell, Save, Key, UserCircle, ChevronRight, ClipboardCheck, ArrowLeft, CheckCircle2, Languages, Baby, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import BasicASDScreeningForm from '../components/screening/BasicASDScreeningForm';
import AdvancedScreeningForm from '../components/screening/AdvancedScreeningForm';
import ChildrenManagement from '../components/dashboard/ChildrenManagement';
import ThemeToggle from '../components/ThemeToggle';
import ElderToggle from '../components/ElderToggle';

import API_BASE_URL from '../config';

const Dashboard = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('Overview');
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    });
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);
    const [assessmentStep, setAssessmentStep] = useState('prompt'); // prompt, basic, advanced

    const API_URL = `${API_BASE_URL}/auth`;

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'si' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${API_URL}/profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            updateUser(res.data.user);
            setStatus({ type: 'success', msg: t('dashboard.profile_success') });
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || t('dashboard.profile_error') });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setStatus({ type: 'error', msg: t('register.password_mismatch') });
        }
        setLoading(true);
        setStatus({ type: '', msg: '' });
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/password`, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus({ type: 'success', msg: t('dashboard.password_success') });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || t('dashboard.password_error') });
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '2.5rem', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ width: '64px', height: '64px', background: 'var(--gradient)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <UserCircle size={32} color="white" />
                            </div>
                            <div>
                                <h2 style={{ marginBottom: '4px' }}>{t('dashboard.profile_info')}</h2>
                                <p style={{ color: '#94a3b8' }}>{t('dashboard.profile_sub')}</p>
                            </div>
                        </div>

                        {status.msg && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: status.type === 'success' ? '#10b981' : '#ef4444'
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleProfileUpdate}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.first_name')}</label>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.last_name')}</label>
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('register.email')}</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '12px 24px' }}>
                                {loading ? t('dashboard.saving') : <><Save size={18} /> {t('dashboard.save')}</>}
                            </button>
                        </form>
                    </motion.div>
                );
            case 'Settings':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '2.5rem', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ width: '64px', height: '64px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Key size={32} color="#4f46e5" />
                            </div>
                            <div>
                                <h2 style={{ marginBottom: '4px' }}>{t('dashboard.security')}</h2>
                                <p style={{ color: '#94a3b8' }}>{t('dashboard.security_sub')}</p>
                            </div>
                        </div>

                        {status.msg && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: status.type === 'success' ? '#10b981' : '#ef4444'
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handlePasswordChange}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('dashboard.curr_pass')}</label>
                                <input
                                    type="password"
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('dashboard.new_pass')}</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>{t('dashboard.confirm_pass')}</label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '12px 24px' }}>
                                {loading ? t('dashboard.updating') : <><Key size={18} /> {t('dashboard.update_pass')}</>}
                            </button>
                        </form>
                    </motion.div>
                );
            case 'Children':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ChildrenManagement />
                    </motion.div>
                );
            case 'Assessment':
                if (assessmentStep === 'prompt') {
                    return (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            style={{ 
                                padding: '5rem 4rem', 
                                maxWidth: '800px', 
                                margin: '2rem auto', 
                                textAlign: 'center',
                                borderRadius: '48px',
                                background: 'var(--glass)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                                style={{ width: '100px', height: '100px', background: 'var(--gradient)', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', color: 'white', boxShadow: '0 15px 30px -5px rgba(79, 70, 229, 0.4)' }}
                            >
                                <ClipboardCheck size={48} />
                            </motion.div>
                            
                            <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1.25rem', fontWeight: 900, letterSpacing: '-0.025em' }}>
                                {t('dashboard.clinical_data_prompt')}
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '4rem', maxWidth: '500px', margin: '0 auto 4rem', fontWeight: 500, lineHeight: 1.6 }}>
                                {t('dashboard.assessment_type_sub')}
                            </p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <motion.button 
                                    whileHover={{ scale: 1.05, translateY: -8 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setAssessmentStep('advanced')}
                                    style={{ 
                                        padding: '3rem 2rem', 
                                        borderRadius: '40px', 
                                        border: '1px solid rgba(255,255,255,0.05)', 
                                        background: 'rgba(15, 23, 42, 0.3)',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s',
                                        textAlign: 'center',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.3)'; }}
                                >
                                    <div style={{ color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><CheckCircle2 size={32} /></div>
                                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '1.4rem', fontWeight: 800 }}>{t('dashboard.yes_clinical')}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>{t('dashboard.full_model')}</p>
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.05, translateY: -8 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setAssessmentStep('basic')}
                                    style={{ 
                                        padding: '3rem 2rem', 
                                        borderRadius: '40px', 
                                        border: '1px solid rgba(255,255,255,0.05)', 
                                        background: 'rgba(15, 23, 42, 0.3)',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s',
                                        textAlign: 'center',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(15, 23, 42, 0.3)'; }}
                                >
                                    <div style={{ color: '#6366f1', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}><Activity size={32} /></div>
                                    <h4 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '1.4rem', fontWeight: 800 }}>{t('dashboard.no_clinical')}</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>{t('dashboard.quick_behavioral')}</p>
                                </motion.button>
                            </div>
                        </motion.div>
                    );
                }
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.button 
                            whileHover={{ x: -4 }}
                            onClick={() => setAssessmentStep('prompt')}
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px', 
                                color: 'var(--text-muted)', 
                                background: 'var(--glass)', 
                                padding: '12px 24px', 
                                borderRadius: '16px', 
                                marginBottom: '2.5rem',
                                border: '1px solid #f1f5f9',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                            }}
                        >
                            <ArrowLeft size={18} /> {t('dashboard.back_to_selection')}
                        </motion.button>
                        {assessmentStep === 'basic' ? <BasicASDScreeningForm /> : <AdvancedScreeningForm />}
                    </motion.div>
                );
            default:
                return (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                            <StatCard title={t('dashboard.total_assessments')} value="0" change="+0%" color="#4f46e5" />
                            <StatCard title={t('dashboard.positive_traits')} value="0" change="0" color="#ef4444" />
                            <StatCard title={t('dashboard.accuracy_rate')} value="98.2%" change="+2.4%" color="#10b981" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{ marginTop: '3rem', padding: '4rem', textAlign: 'center' }}
                        >
                            <Activity size={48} color="#4f46e5" style={{ marginBottom: '1rem' }} />
                            <h3>{t('dashboard.start_first')}</h3>
                            <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '1rem auto 2rem' }}>
                                {t('dashboard.start_first_sub')}
                            </p>
                            <button className="btn-primary" style={{ margin: '0 auto' }}>{t('dashboard.begin_now')}</button>
                        </motion.div>
                    </>
                );
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <aside style={{ width: '280px', borderRight: '1px solid var(--glass-border)', padding: '2rem', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <Activity color="#4f46e5" /> {t('dashboard.title')}
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SidebarLink icon={<Layout size={20} />} label={t('dashboard.tab_overview')} active={activeTab === 'Overview'} onClick={() => { setActiveTab('Overview'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<Activity size={20} />} label={t('dashboard.tab_assessment')} active={activeTab === 'Assessment'} onClick={() => { setActiveTab('Assessment'); setAssessmentStep('prompt'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<Baby size={20} />} label={t('dashboard.tab_children')} active={activeTab === 'Children'} onClick={() => { setActiveTab('Children'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<User size={20} />} label={t('dashboard.tab_profile')} active={activeTab === 'Profile'} onClick={() => { setActiveTab('Profile'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<Settings size={20} />} label={t('dashboard.tab_settings')} active={activeTab === 'Settings'} onClick={() => { setActiveTab('Settings'); setStatus({ type: '', msg: '' }); }} />
                    {user?.role === 'admin' && (
                        <SidebarLink 
                            icon={<ShieldCheck size={20} color="#ef4444" />} 
                            label="Admin Panel" 
                            onClick={() => navigate('/admin')} 
                        />
                    )}
                </nav>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                    <button
                        onClick={toggleLanguage}
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            color: 'var(--text-muted)', 
                            background: 'var(--glass)', 
                            border: '1px solid var(--glass-border)', 
                            padding: '12px', 
                            borderRadius: '12px', 
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontWeight: '600',
                            justifyContent: 'center'
                        }}
                    >
                        <Languages size={20} />
                        {i18n.language === 'en' ? 'සිංහල' : 'English'}
                    </button>

                    <button
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', background: 'transparent', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        <LogOut size={20} /> {t('navbar.logout')}
                    </button>
                </div>
            </aside>

            <main style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--bg-dark)' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>
                            {activeTab === 'Overview' 
                                ? `${t('dashboard.welcome_back')}, ${user?.firstName} 👋` 
                                : t(`dashboard.tab_${activeTab.toLowerCase()}`)}
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {activeTab === 'Overview' ? t('dashboard.overview_msg') : t('dashboard.manage_settings', { tab: activeTab.toLowerCase() })}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <ElderToggle />
                        <ThemeToggle />
                        <button className="glass-card" style={{ padding: '10px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)', cursor: 'pointer' }}><Bell size={20} /></button>
                        <div style={{ width: '40px', height: '40px', background: 'var(--gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {user?.firstName?.[0]}
                        </div>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active = false, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            background: active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: active ? '#4f46e5' : 'var(--text-muted)',
            fontWeight: active ? '600' : '400',
            transition: 'all 0.2s'
        }}
    >
        {icon} {label}
    </div>
);

const StatCard = ({ title, value, change, color }) => (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{title}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 style={{ fontSize: '2rem' }}>{value}</h2>
            <span style={{ color, fontSize: '0.8rem', fontWeight: 600 }}>{change}</span>
        </div>
    </div>
);

export default Dashboard;
