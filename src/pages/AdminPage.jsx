import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { ThemeContext } from '../context/ThemeContext';

function AdminPage() {
    // This state will now hold the combined score and user data
    const [allScores, setAllScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to fetch the new combined data
    useEffect(() => {
        const fetchFullData = async () => {
            try {
                // Make a request to our new, more powerful admin endpoint
                const res = await api.get('/admin/full-data');
                setAllScores(res.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch data. Admin access required.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFullData();
    }, []);

    // (Styles are mostly the same, with minor adjustments)
    const styles = {
        container: { padding: isMobile ? '15px' : '30px', maxWidth: '1000px', margin: '20px auto', backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, borderRadius: '8px' },
        title: { borderBottom: `2px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, paddingBottom: '10px' },
        tableContainer: { overflowX: 'auto' },
        scoreTable: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', },
        tableHeader: { background: theme === 'dark' ? '#343a40' : '#e9ecef', padding: '10px', textAlign: 'left', whiteSpace: 'nowrap' },
        tableCell: { padding: '10px', borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, whiteSpace: 'nowrap' }
    };

    if (loading) return <div style={styles.container}>Loading all user data...</div>;
    if (error) return <div style={{...styles.container, color: 'red'}}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Dashboard: All User Scores</h2>
            
            <div style={styles.tableContainer}>
                <table style={styles.scoreTable}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Username</th>
                            <th style={styles.tableHeader}>Topic</th>
                            <th style={styles.tableHeader}>Score</th>
                            <th style={styles.tableHeader}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allScores.length > 0 ? allScores.map((item) => (
                            <tr key={item.id}>
                                <td style={styles.tableCell}>{item.username}</td>
                                <td style={styles.tableCell}>{item.topic}</td>
                                <td style={styles.tableCell}>{item.score} / {item.total}</td>
                                <td style={styles.tableCell}>{new Date(item.date).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{...styles.tableCell, textAlign: 'center'}}>No scores have been recorded yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;
