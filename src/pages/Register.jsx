import React, { useState, useContext, useEffect } from 'react';
// 1. CHANGE: Import 'api' instead of 'axios'
import api from '../api/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Register() {
    // --- Component State and Context ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    // State to manage responsiveness
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect to handle window resizing
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Event Handlers ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic password validation
        if (password.length < 4) {
            setError("Password must be at least 4 characters long.");
            return;
        }
        try {
            // 2. CHANGE: Use 'api.post' instead of 'axios.post'
            await api.post('/register', { username, password });
            setSuccess('Registration successful! Redirecting to login...');
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        }
    };

    // --- Dynamic Styles ---
    const styles = {
        container: {
            padding: isMobile ? '20px' : '30px',
            maxWidth: '400px',
            margin: '40px auto',
            backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa',
            border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`,
            borderRadius: '8px'
        },
        input: {
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
            backgroundColor: theme === 'dark' ? '#343a40' : '#fff',
            color: theme === 'dark' ? '#f8f9fa' : '#212529',
            border: `1px solid ${theme === 'dark' ? '#495057' : '#ced4da'}`,
            borderRadius: '5px'
        },
        button: {
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            width: '100%', // Full width button for better mobile UX
            marginTop: '10px'
        },
        link: {
            color: theme === 'dark' ? '#61dafb' : '#007bff'
        }
    };

    // --- Component Render ---
    return (
        <div style={styles.container}>
            <h2 style={{textAlign: 'center'}}>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{display: 'block', marginBottom: '5px'}}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{display: 'block', marginBottom: '5px'}}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                <button type="submit" style={styles.button}>Register</button>
            </form>
             <p style={{marginTop: '20px', textAlign: 'center'}}>
                Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
            </p>
        </div>
    );
}

export default Register;
