import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

// A static list of topics offered for study.
const topics = [
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Python",
    "SQL",
    "Node.js",
    "Express.js"
];

function TopicsPage() {
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
            padding: isMobile ? '15px' : '30px',
            maxWidth: '800px',
            margin: '20px auto',
            backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa',
            border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`,
            borderRadius: '8px'
        },
        title: {
            borderBottom: `2px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`,
            paddingBottom: '10px'
        },
        list: {
            listStyle: 'none',
            padding: 0,
            marginTop: '20px'
        },
        listItem: {
            background: theme === 'dark' ? '#343a40' : '#fff',
            border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`,
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '5px',
            transition: 'transform 0.2s, box-shadow 0.2s',
        },
        link: {
            textDecoration: 'none',
            color: theme === 'dark' ? '#61dafb' : '#007BFF',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            display: 'block' // Make the entire area clickable
        }
    };

    // --- Component Render ---
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Browse Study Topics</h2>
            <p>Select a topic to view the study guide.</p>
            <ul style={styles.list}>
                {topics.map(topic => (
                    <li 
                        key={topic} 
                        style={styles.listItem} 
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                        }} 
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <Link to={`/topic/${topic}`} style={styles.link}>
                            {topic}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopicsPage;
