import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
// 1. CHANGE: Import 'api' instead of 'axios'
import api from '../api/axiosConfig';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from '../context/ThemeContext';

function TopicDetailPage() {
    const { topicName } = useParams();
    const { theme } = useContext(ThemeContext);
    const [studyMaterial, setStudyMaterial] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchMaterial = async () => {
            setLoading(true);
            try {
                // 2. CHANGE: Use 'api.post' instead of 'axios.post'
                const res = await api.post('/generate-study-material', { topic: topicName });
                setStudyMaterial(res.data.studyMaterial);
            } catch (err) {
                setError('Failed to load study material. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMaterial();
    }, [topicName]);

    // (The styles object and JSX render are the same)
    const styles = {
        container: { padding: isMobile ? '15px' : '30px', maxWidth: '800px', margin: '20px auto', backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, borderRadius: '8px' },
        title: { borderBottom: `2px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, paddingBottom: '10px' },
        content: { lineHeight: '1.6', marginTop: '20px' },
        quizButton: { display: 'inline-block', marginTop: '30px', padding: '10px 20px', textDecoration: 'none', color: 'white', backgroundColor: '#28a745', borderRadius: '5px', width: isMobile ? '100%' : 'auto', textAlign: 'center', boxSizing: 'border-box' }
    };

    const markdownComponents = {
        h2: ({ node, children, ...props }) => <h2 style={{ fontSize: '1.75rem', marginTop: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}` }} {...props}>{children}</h2>,
        pre: ({ node, ...props }) => <pre style={{ background: theme === 'dark' ? '#343a40' : '#e9ecef', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', overflowX: 'auto' }} {...props} />,
        code: ({ node, ...props }) => <code style={{ fontFamily: 'monospace', color: theme === 'dark' ? '#e83e8c' : '#d63384' }} {...props} />,
    };

    if (loading) return <div style={styles.container}>Generating your study guide...</div>;
    if (error) return <div style={{...styles.container, color: 'red'}}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Study Guide for: {topicName}</h2>
            <div style={styles.content}>
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
