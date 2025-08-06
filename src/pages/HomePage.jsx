import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function HomePage() {
    // --- Component State and Context ---
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect to handle window resizing for responsiveness
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Dynamic Styles ---
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 80px)', // Adjust height to account for navbar
            textAlign: 'center',
            padding: '20px',
            color: theme === 'dark' ? '#f8f9fa' : '#212529'
        },
        title: {
            fontSize: isMobile ? '2rem' : '2.5rem', // Smaller font size on mobile
            marginBottom: '1rem'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', // Stack buttons on mobile
            gap: '20px',
            marginTop: '20px'
        },
        button: {
            padding: '15px 30px',
            fontSize: '1.2rem',
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            width: isMobile ? '100%' : 'auto' // Full width buttons on mobile
        },
        secondaryButton: {
            backgroundColor: '#6c757d'
        }
    };

    // --- Component Render ---
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to SkillQuiz</h1>
            <p>What would you like to do today?</p>
            <div style={styles.buttonContainer}>
                <Link to="/quiz" style={styles.button} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Take a Quiz
                </Link>
                <Link to="/topics" style={{...styles.button, ...styles.secondaryButton}} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Browse Study Topics
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
