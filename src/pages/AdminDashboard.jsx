import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Activity, BarChart3, Trash2, Search,
    ShieldAlert, UserPlus, FileText, ChevronRight,
    ArrowUpRight, ArrowDownRight, Layout, LogOut, Baby
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, BarChart, Bar, Legend
} from 'recharts';
import ThemeToggle from '../components/ThemeToggle';
import ElderToggle from '../components/ElderToggle';
import { Bell } from 'lucide-react';

import API_BASE_URL from '../config';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalChildren: 0,
        totalAssessments: 0,
        accuracyRate: '0%'
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Overview');

    const API_URL = `${API_BASE_URL}/admin`;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [statsRes, usersRes] = await Promise.all([
                axios.get(`${API_URL}/stats`, { headers }),
                axios.get(`${API_URL}/users`, { headers })
            ]);

            setStats(statsRes.data);
            setUsers(usersRes.data);
        } catch (err) {
            console.error('Error fetching admin data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure? This will delete the user and all their children/results.')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u._id !== userId));
            // Refresh stats
            const statsRes = await axios.get(`${API_URL}/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(statsRes.data);
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Failed to delete user');
        }
    };

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
            <Activity className="spin" size={48} color="var(--primary)" />
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', display: 'flex' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', borderRight: '1px solid var(--glass-border)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <ShieldAlert color="#ef4444" /> Admin Panel
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SidebarLink icon={<Layout size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
                    <SidebarLink icon={<Users size={20} />} label="User Management" active={activeTab === 'Users'} onClick={() => setActiveTab('Users')} />
                    <SidebarLink icon={<BarChart3 size={20} />} label="System Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
                </nav>



                <button
                    onClick={() => { logout(); navigate('/login'); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                            {activeTab === 'Overview' ? 'System Overview' : activeTab === 'Users' ? 'User Management' : 'System Analytics'}
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {activeTab === 'Overview' ? 'Monitor platform activity and manage users' :
                                activeTab === 'Users' ? 'Manage system users and access' :
                                    'Detailed platform metrics and growth charts'}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <ElderToggle />
                        <ThemeToggle />
                        <button className="glass-card" style={{ padding: '10px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'var(--text-main)', cursor: 'pointer' }}><Bell size={20} /></button>
                        <div style={{ width: '40px', height: '40px', background: 'var(--gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            A
                        </div>
                    </div>
                </header>

                {activeTab === 'Overview' && (
                    <>
                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            <StatCard icon={<Users color="#4f46e5" />} title="Total Users" value={stats.totalUsers} change="+12%" up={true} />
                            <StatCard icon={<Activity color="#10b981" />} title="Assessments" value={stats.totalAssessments} change="+5.4%" up={true} />
                            <StatCard icon={<BarChart3 color="#f59e0b" />} title="Children Profiles" value={stats.totalChildren} change="+8.2%" up={true} />
                            <StatCard icon={<ShieldAlert color="#ef4444" />} title="Positive Traits" value={stats.positiveTraits} change="-2.1%" up={false} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '2rem', height: '400px' }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>User Registration Trends</h3>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stats.userGrowth}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                        <Tooltip
                                            contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={4} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="glass-card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>Quick Stats</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <QuickStatItem label="Active Sessions" value="24" color="#10b981" />
                                    <QuickStatItem label="Pending Reports" value="0" color="#f59e0b" />
                                    <QuickStatItem label="API Success Rate" value="99.9%" color="#4f46e5" />
                                    <QuickStatItem label="System Uptime" value="100%" color="#10b981" />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {(activeTab === 'Users' || activeTab === 'Overview') && activeTab !== 'Analytics' && (
                    /* User Management Section */
                    <div className="glass-card" style={{ padding: '2rem', marginTop: activeTab === 'Overview' ? '3rem' : '0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>User Management</h3>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ padding: '10px 10px 10px 40px', borderRadius: '12px', background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'white', width: '300px' }}
                                />
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>USER</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>EMAIL</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>JOINED</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>CHILDREN</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'right' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                        {user.firstName[0]}{user.lastName[0]}
                                                    </div>
                                                    <span style={{ fontWeight: 600 }}>{user.firstName} {user.lastName}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 'bold' }}>
                                                    <Baby size={16} color="var(--primary)" /> {user.childCount || 0}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => handleDeleteUser(user._id)}
                                                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Analytics' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass-card" style={{ padding: '2rem', height: '450px' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>Daily Registrations</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.userGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    />
                                    <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={4} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="glass-card" style={{ padding: '2rem', height: '450px' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>Cumulative User Count</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.userGrowth?.reduce((acc, curr, idx) => {
                                    const prevSum = idx > 0 ? acc[idx - 1].cumulative : 0;
                                    acc.push({ ...curr, cumulative: prevSum + curr.users });
                                    return acc;
                                }, [])}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                    <Tooltip
                                        contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    />
                                    <Line type="stepAfter" dataKey="cumulative" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="glass-card" style={{ padding: '2rem', gridColumn: 'span 2' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>System Health Metrics</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                                <MetricBox label="Server Latency" value="42ms" status="Excellent" />
                                <MetricBox label="DB Connection" value="Stable" status="Healthy" />
                                <MetricBox label="AI Model Status" value="Online" status="Active" />
                                <MetricBox label="Memory Usage" value="24%" status="Optimal" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active = false, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px',
            cursor: 'pointer', background: active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: active ? '#4f46e5' : 'var(--text-muted)', fontWeight: active ? '600' : '400', transition: 'all 0.2s'
        }}
    >
        {icon} {label}
    </div>
);

const StatCard = ({ icon, title, value, change, up }) => (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: up ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                {change} {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '4px' }}>{title}</p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{value}</h2>
    </div>
);

const QuickStatItem = ({ label, value, color }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{label}</span>
        <span style={{ color: color, fontWeight: '800', fontSize: '1.1rem' }}>{value}</span>
    </div>
);

const MetricBox = ({ label, value, status }) => (
    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase' }}>{label}</p>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px' }}>{value}</h4>
        <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>● {status}</span>
    </div>
);

export default AdminDashboard;
