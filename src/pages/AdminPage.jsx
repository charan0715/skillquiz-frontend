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
    const [searchTerm, setSearchTerm] = useState(''); // New state for the search term

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

    // Filter scores based on the search term
    const filteredScores = allScores.filter(score =>
        score.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // (Styles are mostly the same, with minor adjustments)
    const styles = {
        container: { padding: isMobile ? '15px' : '30px', maxWidth: '1000px', margin: '20px auto', backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, borderRadius: '8px' },
        title: { borderBottom: `2px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, paddingBottom: '10px' },
        tableContainer: { overflowX: 'auto' },
        scoreTable: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', },
        tableHeader: { background: theme === 'dark' ? '#343a40' : '#e9ecef', padding: '10px', textAlign: 'left', whiteSpace: 'nowrap' },
        tableCell: { padding: '10px', borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, whiteSpace: 'nowrap' },
        searchInput: {
            width: '100%',
            maxWidth: '400px',
            padding: '8px 12px',
            margin: '20px 0',
            borderRadius: '5px',
            border: `1px solid ${theme === 'dark' ? '#495057' : '#ced4da'}`,
            backgroundColor: theme === 'dark' ? '#343a40' : '#fff',
            color: theme === 'dark' ? '#f8f9fa' : '#212529'
        }
    };

    if (loading) return <div style={styles.container}>Loading all user data...</div>;
    if (error) return <div style={{...styles.container, color: 'red'}}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Dashboard: All User Scores</h2>
            
            <input
                type="text"
                placeholder="Search by username..."
                style={styles.searchInput}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

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
                        {filteredScores.length > 0 ? filteredScores.map((item) => (
                            <tr key={item.id}>
                                <td style={styles.tableCell}>{item.username}</td>
                                <td style={styles.tableCell}>{item.topic}</td>
                                <td style={styles.tableCell}>{item.score} / {item.total}</td>
                                <td style={styles.tableCell}>{new Date(item.date).toLocaleDateString()}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{...styles.tableCell, textAlign: 'center'}}>No scores found for this user.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;
