import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';
import { ThemeContext } from '../context/ThemeContext';

function AdminPage() {
    // --- Component State and Context ---
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect to handle window resizing
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to fetch the list of all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Make a request to our new, secure admin endpoint
                const res = await api.get('/admin/users');
                setUsers(res.data);
            } catch (err) {
                // If the request fails, it's likely because the user is not an admin
                setError(err.response?.data?.error || 'Failed to fetch user data. Admin access required.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []); // Empty dependency array ensures this runs only once

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
        tableContainer: {
            overflowX: isMobile ? 'auto' : 'visible'
        },
        userTable: {
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
            whiteSpace: 'nowrap'
        }
    };

    // --- Component Render ---
    if (loading) return <div style={styles.container}>Loading user data...</div>;
    
    // If there was an error (e.g., user is not an admin), show the error message.
    if (error) return <div style={{...styles.container, color: 'red'}}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Dashboard: All Users</h2>
            
            <div style={styles.tableContainer}>
                <table style={styles.userTable}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>User ID</th>
                            <th style={styles.tableHeader}>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td style={styles.tableCell}>{user.id}</td>
                                <td style={styles.tableCell}>{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminPage;
