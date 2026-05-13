import React, { createContext, useContext, useEffect, useState } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
    const [elderView, setElderView] = useState(() => {
        const saved = localStorage.getItem('elderView');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('elderView', elderView);
        document.documentElement.setAttribute('data-elder', elderView);
    }, [elderView]);

    const toggleElderView = () => {
        setElderView(prev => !prev);
    };

    return (
        <AccessibilityContext.Provider value={{ elderView, toggleElderView }}>
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => useContext(AccessibilityContext);
