import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

// (SVG Icons are the same)
const SunIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> );
const MoonIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> );

function Navbar() {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // (All styles are the same)
    const navStyle = { background: theme === 'dark' ? '#212529' : '#e9ecef', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}` };
    const linkStyle = { color: theme === 'dark' ? '#f8f9fa' : '#212529', margin: '0 10px', textDecoration: 'none' };
    const logoutButtonStyle = { background: 'transparent', border: `1px solid ${theme === 'dark' ? '#f8f9fa' : '#212529'}`, color: theme === 'dark' ? '#f8f9fa' : '#212529', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', };
    const themeToggleContainer = { display: 'flex', alignItems: 'center', backgroundColor: theme === 'dark' ? '#343a40' : '#dee2e6', border: `1px solid ${theme === 'dark' ? '#495057' : '#ced4da'}`, borderRadius: '30px', padding: '4px', cursor: 'pointer', marginLeft: '20px' };
    const iconWrapper = { width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background-color 0.3s ease' };


    return (
        <nav style={navStyle}>
            <div>
                <Link to={isAuthenticated ? "/home" : "/"} style={{...linkStyle, fontSize: '1.5rem', fontWeight: 'bold'}}>
                    SkillQuiz
                </Link>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                {isAuthenticated ? (
                    <>
                        <span style={{marginRight: '15px'}}>Welcome, {user?.username}!</span>
                        <Link to="/topics" style={linkStyle}>Study Topics</Link>
                        <Link to="/quiz" style={linkStyle}>Take Quiz</Link>
                        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        {/* --- NEW: Conditionally render the Admin link --- */}
                        {user?.isAdmin && (
                            <Link to="/admin" style={{...linkStyle, color: '#ffc107'}}>Admin</Link>
                        )}
                        <button onClick={handleLogout} style={logoutButtonStyle}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                )}
                
                <div style={themeToggleContainer} onClick={toggleTheme} title="Toggle Theme">
                    <div style={{...iconWrapper, backgroundColor: theme === 'light' ? '#007bff' : 'transparent', color: theme === 'light' ? 'white' : '#6c757d' }}><SunIcon /></div>
                    <div style={{...iconWrapper, backgroundColor: theme === 'dark' ? '#007bff' : 'transparent', color: theme === 'dark' ? 'white' : '#6c757d' }}><MoonIcon /></div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
