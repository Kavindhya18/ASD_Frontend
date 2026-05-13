import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Shield, BarChart, Heart, ChevronRight, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BrainLogo from '../components/BrainLogo';
import GuideModal from '../components/GuideModal';
import ThemeToggle from '../components/ThemeToggle';
import ElderToggle from '../components/ElderToggle';
import SLflag from '../assets/SLflag.png';
import ASDchild from '../assets/ASDchild.png';

const Home = () => {
    const [isGuideOpen, setIsGuideOpen] = React.useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'si' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="home-container" style={{ position: 'relative', background: 'var(--bg-dark)' }}>
            {/* Background Overlay Image */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '1000px',
                    backgroundImage: `url(${ASDchild})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 'var(--bg-img-opacity)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    maskImage: 'linear-gradient(to bottom, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
                }}
            />
            {/* Navbar */}
            <nav className="navbar" style={{ position: 'relative', zIndex: 10, padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Brain className="text-primary" size={32} color="#4f46e5" />
                    <span>ASD <span style={{ color: '#4f46e5' }}>Sense</span></span>
                    <img src={SLflag} alt="SL Flag" style={{ width: '80px', height: 'auto', borderRadius: '4px' }} />
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <button 
                        onClick={toggleLanguage}
                        style={{
                            background: 'var(--glass)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-main)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--glass)'}
                        onMouseLeave={(e) => e.target.style.background = 'var(--glass)'}
                    >
                        <Languages size={18} color="#4f46e5" />
                        {i18n.language === 'en' ? 'සිංහල' : 'English'}
                    </button>
                    <ElderToggle />
                    <ThemeToggle />
                    <Link to="/login" className="btn-primary" style={{ color: 'white', textDecoration: 'none' }}>{t('navbar.login')}</Link>
                    <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>{t('navbar.get_started')}</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '1rem', paddingBottom: '1rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <BrainLogo />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: i18n.language === 'si' ? '3.5rem' : '4.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                        {t('hero.title')} <br />
                        <span style={{ background: 'linear-gradient(90deg, #4f46e5, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {t('hero.subtitle')}
                        </span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        {t('hero.description')}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <Link to="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
                            {t('hero.start_assessment')} <ChevronRight size={20} />
                        </Link>
                        <button
                            onClick={() => setIsGuideOpen(true)}
                            className="btn-secondary"
                            style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>
                            {t('hero.how_it_works')}
                        </button>
                    </div>
                </motion.div>

                <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
            </header>

            {/* Features */}
            <section style={{ background: 'var(--card-dark)', padding: '100px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('features.title')}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>{t('features.subtitle')}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Shield size={24} color="#4f46e5" />}
                            title={t('features.secure.title')}
                            desc={t('features.secure.desc')}
                        />
                        <FeatureCard
                            icon={<BarChart size={24} color="#0ea5e9" />}
                            title={t('features.intelligence.title')}
                            desc={t('features.intelligence.desc')}
                        />
                        <FeatureCard
                            icon={<Heart size={24} color="#f472b6" />}
                            title={t('features.parent_focused.title')}
                            desc={t('features.parent_focused.desc')}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
                <p style={{ color: '#64748b' }}>{t('footer.rights')}</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card"
        style={{ padding: '2.5rem', textAlign: 'left' }}
    >
        <div style={{ background: 'rgba(79, 70, 229, 0.1)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem' }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{desc}</p>
    </motion.div>
);

export default Home;
