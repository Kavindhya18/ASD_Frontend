import React from 'react';
import { Glasses } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const ElderToggle = () => {
    const { elderView, toggleElderView } = useAccessibility();

    return (
        <button
            onClick={toggleElderView}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: elderView ? 'var(--primary)' : 'var(--glass)',
                border: '1px solid var(--glass-border)',
                color: elderView ? 'white' : 'var(--text-main)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s ease',
            }}
            title="Toggle Elder View"
        >
            <Glasses size={20} />
            Elder View
        </button>
    );
};

export default ElderToggle;
