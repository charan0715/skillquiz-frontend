import React, { useState, useEffect, useContext } from 'react';
// 1. CHANGE: Import 'api' instead of 'axios'
import api from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

function Dashboard() {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                // 2. CHANGE: Use 'api.get' instead of 'axios.get'
                const res = await api.get('/my-scores');
                setScores(res.data);
            } catch (err) {
                setError('Failed to fetch scores.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchScores();
    }, []);

    // (The styles object and JSX render are the same)
    const styles = {
        container: { padding: isMobile ? '15px' : '30px', maxWidth: '800px', margin: '20px auto', backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, borderRadius: '8px' },
        title: { borderBottom: `2px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, paddingBottom: '10px' },
        tableContainer: { overflowX: isMobile ? 'auto' : 'visible' },
        scoreTable: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', },
        tableHeader: { background: theme === 'dark' ? '#343a40' : '#e9ecef', padding: '10px', textAlign: 'left' },
        tableCell: { padding: '10px', borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, whiteSpace: 'nowrap' }
    };

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
