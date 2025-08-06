import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from '../context/ThemeContext';

function TopicDetailPage() {
    // --- Component State and Context ---
    const { topicName } = useParams(); // Get topic name from the URL, e.g., "JavaScript"
    const { theme } = useContext(ThemeContext);
    const [studyMaterial, setStudyMaterial] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Effect to handle window resizing for responsiveness
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect to fetch study material from the backend whenever the topic name changes
    useEffect(() => {
        const fetchMaterial = async () => {
            setLoading(true); // Show loading state before fetching
            try {
                const res = await axios.post('http://localhost:5000/generate-study-material', { topic: topicName });
                setStudyMaterial(res.data.studyMaterial);
            } catch (err) {
                setError('Failed to load study material. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false); // Hide loading state after fetching is complete
            }
        };
        fetchMaterial();
    }, [topicName]); // Dependency array ensures this effect re-runs if the URL's topicName changes

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
        content: { lineHeight: '1.6', marginTop: '20px' },
        quizButton: {
            display: 'inline-block',
            marginTop: '30px',
            padding: '10px 20px',
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#28a745',
            borderRadius: '5px',
            width: isMobile ? '100%' : 'auto', // Button is full-width on mobile
            textAlign: 'center',
            boxSizing: 'border-box'
        }
    };

    // Custom components to apply theme-aware styles to the markdown output
    const markdownComponents = {
        // The fix is here: explicitly passing the children prop resolves the accessibility warning.
        h2: ({ node, children, ...props }) => <h2 style={{ fontSize: '1.75rem', marginTop: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}` }} {...props}>{children}</h2>,
        pre: ({ node, ...props }) => <pre style={{ background: theme === 'dark' ? '#343a40' : '#e9ecef', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflowX: 'auto' }} {...props} />,
        code: ({ node, ...props }) => <code style={{ fontFamily: 'monospace', color: theme === 'dark' ? '#e83e8c' : '#d63384' }} {...props} />,
    };

    // --- Component Render ---
    if (loading) return <div style={styles.container}>Generating your study guide...</div>;
    if (error) return <div style={{...styles.container, color: 'red'}}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Study Guide for: {topicName}</h2>
            <div style={styles.content}>
                {/* ReactMarkdown component renders the text from the API as styled HTML */}
                <ReactMarkdown components={markdownComponents}>
                    {studyMaterial}
                </ReactMarkdown>
            </div>
            <Link to={`/quiz?topic=${topicName}`} style={styles.quizButton}>
                Ready? Take the Quiz on {topicName}!
            </Link>
        </div>
    );
}

export default TopicDetailPage;
