import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
    // Default to 'light' mode, or get the user's preference from localStorage
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // This effect runs whenever the theme changes
    useEffect(() => {
        // Save the theme choice to localStorage so it persists across reloads
        localStorage.setItem('theme', theme);
        // Add/remove a 'dark' class to the body element for global CSS styling
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // The value provided to consuming components
    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
