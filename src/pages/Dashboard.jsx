import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

function Dashboard() {
    // --- Component State and Context ---
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect to handle window resizing for responsiveness
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to fetch the user's scores when the component first loads
    useEffect(() => {
        const fetchScores = async () => {
            try {
                // The auth token is automatically sent thanks to our global setup in AuthContext
                const res = await axios.get('http://localhost:5000/my-scores');
                setScores(res.data);
            } catch (err) {
                setError('Failed to fetch scores.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchScores();
    }, []); // Empty dependency array ensures this runs only once on mount

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
        // This container allows the table to scroll horizontally on small screens
        tableContainer: {
            overflowX: isMobile ? 'auto' : 'visible'
        },
        scoreTable: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        tableHeader: {
            background: theme === 'dark' ? '#343a40' : '#e9ecef',
            padding: '10px',
            textAlign: 'left'
        },
        tableCell: {
            padding: '10px',
            borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`,
            // Prevents text from wrapping, which works well with horizontal scrolling
            whiteSpace: 'nowrap'
        }
    };

    // --- Component Render ---
    if (loading) return <div style={styles.container}>Loading your scores...</div>;
    if (error) return <div style={{...styles.container, color: 'red'}}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome to your Dashboard, {user?.username}!</h2>
            
            <h3>Your Past Quiz Scores</h3>
            {scores.length === 0 ? (
                <p>You haven't taken any quizzes yet. Go take one!</p>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.scoreTable}>
                        <thead>
                            <tr>
                                <th style={styles.tableHeader}>Topic</th>
                                <th style={styles.tableHeader}>Score</th>
                                <th style={styles.tableHeader}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Sort scores to show the most recent ones first */}
                            {scores.sort((a, b) => new Date(b.date) - new Date(a.date)).map((s, index) => (
                                <tr key={index}>
                                    <td style={styles.tableCell}>{s.topic}</td>
                                    <td style={styles.tableCell}>{s.score} / {s.total}</td>
                                    <td style={styles.tableCell}>{new Date(s.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
