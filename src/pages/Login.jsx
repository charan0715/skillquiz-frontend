import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    // --- Component State and Context ---
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
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
        try {
            // Post login credentials to the backend
            const res = await axios.post('http://localhost:5000/login', { username, password });
            // If successful, update the auth context with the new token
            login(res.data.token);
            // Redirect user to the home page
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed.');
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
            <h2 style={{textAlign: 'center'}}>Login</h2>
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
                <button type="submit" style={styles.button}>Login</button>
            </form>
            <p style={{marginTop: '20px', textAlign: 'center'}}>
                Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
            </p>
        </div>
    );
}

export default Login;
