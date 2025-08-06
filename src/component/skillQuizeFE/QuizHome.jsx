import React, { useState, useEffect, useContext } from "react";
// 1. CHANGE: Import 'api' from our new config file
import api from '../../api/axiosConfig';
import { useSearchParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

function QuizHome() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [questionCount, setQuestionCount] = useState(5);
    const [hints, setHints] = useState({});
    const [usedHint, setUsedHint] = useState({});
    const [loadingHint, setLoadingHint] = useState(null);
    const [topic, setTopic] = useState(searchParams.get('topic') || "JavaScript");
    const [level, setLevel] = useState("easy");
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (searchParams.get('topic')) {
            handleFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const handleFetch = async () => {
        setLoading(true);
        setError(null);
        setQuestions([]);
        try {
            // 2. CHANGE: Use 'api.post' for the request
            const res = await api.post("/generate-quiz", { topic, level, questionCount });
            setQuestions(res.data.questions);
            setSelectedAnswers({});
            setSubmitted(false);
            setScore(0);
            setHints({});
            setUsedHint({});
        } catch (err) {
            setError("Failed to fetch questions. Is the backend server running?");
        } finally {
            setLoading(false);
        }
    };

    const handleGetHint = async (qIndex) => {
        setLoadingHint(qIndex);
        try {
            const currentQuestion = questions[qIndex];
            // 3. CHANGE: Use 'api.post' for the request
            const res = await api.post("/generate-hint", {
                question: currentQuestion.question,
                options: currentQuestion.options
            });
            setHints(prev => ({ ...prev, [qIndex]: res.data.hint }));
            setUsedHint(prev => ({ ...prev, [qIndex]: true }));
        } catch (err) {
            console.error("Failed to get hint:", err);
            setHints(prev => ({ ...prev, [qIndex]: "Could not load hint." }));
        } finally {
            setLoadingHint(null);
        }
    };

    const handleOptionChange = (qIndex, option) => {
        setSelectedAnswers(prev => ({ ...prev, [qIndex]: option }));
    };

    const handleSubmit = async () => {
        let newScore = 0;
        questions.forEach((q, idx) => {
            const correctAnswer = q.answer;
            const userAnswer = selectedAnswers[idx];
            const hintWasUsed = usedHint[idx];

            if (userAnswer === correctAnswer) {
                newScore += hintWasUsed ? 0.5 : 1;
            } else if (userAnswer !== undefined && userAnswer !== correctAnswer) {
                newScore += hintWasUsed ? -1 : 0;
            }
        });

        setScore(newScore);
        setSubmitted(true);

        try {
            // 4. CHANGE: Use 'api.post' for the request
            await api.post("/save-score", {
                topic: topic,
                score: newScore,
                total: questions.length
            });
        } catch (err) {
            console.error("Failed to save score:", err);
        }
    };
    
    const handleGoToDashboard = () => navigate('/dashboard');

    // (The styles object and JSX render are the same)
    const styles = {
        container: { padding: isMobile ? '15px' : '30px', maxWidth: '800px', margin: '20px auto', backgroundColor: theme === 'dark' ? '#212529' : '#f8f9fa', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, borderRadius: '8px' },
        input: { padding: '10px', backgroundColor: theme === 'dark' ? '#343a40' : '#fff', color: theme === 'dark' ? '#f8f9fa' : '#212529', border: `1px solid ${theme === 'dark' ? '#495057' : '#ced4da'}`, width: '100%', boxSizing: 'border-box', borderRadius: '5px' },
        button: { marginTop: '10px', padding: '10px 20px', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', width: '100%' },
        hintButton: { padding: '4px 8px', fontSize: '0.8rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' },
        disclaimer: { backgroundColor: theme === 'dark' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(255, 193, 7, 0.2)', borderLeft: `4px solid #ffc107`, padding: '10px', margin: '20px 0', fontSize: '0.9rem' },
        questionBlock: { marginBottom: '20px', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, padding: '15px', borderRadius: '8px' },
        optionLabel: { display: 'block', padding: '10px', border: `1px solid ${theme === 'dark' ? '#495057' : '#dee2e6'}`, borderRadius: '5px', marginBottom: '5px', cursor: 'pointer' },
        score: { fontSize: '24px', fontWeight: 'bold', marginTop: '20px' },
        correct: { color: '#28a745', fontWeight: 'bold' },
        wrong: { color: '#dc3545', fontWeight: 'bold' }
    };

    return (
        <div style={styles.container}>
            <h1>SkillQuiz</h1>
            {questions.length === 0 ? (
                <div>
                    <h2>Setup Your Quiz</h2>
                    <div style={styles.disclaimer}>
                        <strong>Scoring Rules:</strong> Correct (no hint) = <strong>+1 pt</strong> | Correct (with hint) = <strong>+0.5 pts</strong> | Incorrect (with hint) = <strong>-1 pt</strong> | Incorrect (no hint) = <strong>0 pts</strong>.
                    </div>
                    <div style={{ margin: '20px 0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px' }}>
                        <div style={{flex: 2}}>
                            <label style={{display: 'block', marginBottom: '5px'}}>Topic:</label>
                            <select style={styles.input} value={topic} onChange={(e) => setTopic(e.target.value)} disabled={searchParams.get('topic')}>
                                <option value="JavaScript">JavaScript</option>
                                <option value="React">React</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="SQL">SQL</option>
                                <option value="Python">Python</option>
                            </select>
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', marginBottom: '5px'}}>Level:</label>
                            <select style={styles.input} value={level} onChange={(e) => setLevel(e.target.value)}>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', marginBottom: '5px'}}>Questions:</label>
                            <input type="number" value={questionCount} onChange={(e) => setQuestionCount(Math.max(1, Math.min(10, e.target.value)))} style={styles.input} />
                        </div>
                    </div>
                    <button style={styles.button} onClick={handleFetch} disabled={loading}>
                        {loading ? 'Loading...' : 'Start Quiz'}
                    </button>
                    {error && <p style={{color: 'red', marginTop: '10px'}}>{error}</p>}
                </div>
            ) : (
                <div>
                    <h2>{topic} Quiz</h2>
                    {questions.map((q, idx) => (
                        <div key={idx} style={styles.questionBlock}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <strong>Q{idx + 1}. {q.question}</strong>
                                {!submitted && !hints[idx] && (
                                    <button style={styles.hintButton} onClick={() => handleGetHint(idx)} disabled={loadingHint === idx}>
                                        {loadingHint === idx ? '...' : 'Get Hint'}
                                    </button>
                                )}
                            </div>
                            {hints[idx] && <p style={{fontSize: '0.9rem', color: '#6c757d', borderLeft: '3px solid #6c757d', paddingLeft: '10px', margin: '10px 0'}}><em>Hint: {hints[idx]}</em></p>}
                            <div style={{marginTop: '10px'}}>
                                {q.options.map((opt) => (
                                    <label key={opt} style={{...styles.optionLabel, backgroundColor: selectedAnswers[idx] === opt ? (theme === 'dark' ? '#007bff40' : '#007bff20') : 'transparent'}}>
                                        <input type="radio" name={`question-${idx}`} value={opt} disabled={submitted} checked={selectedAnswers[idx] === opt} onChange={() => handleOptionChange(idx, opt)} style={{marginRight: '10px'}}/>
                                        {opt}
                                    </label>
                                ))}
                            </div>
                            {submitted && (
                                <p style={selectedAnswers[idx] === q.answer ? styles.correct : styles.wrong}>
                                    {selectedAnswers[idx] === q.answer ? `✓ Correct (+${usedHint[idx] ? 0.5 : 1} pts)` : `✗ Wrong (${usedHint[idx] ? '-1 pt' : '0 pts'}). Correct Answer: ${q.answer}`}
                                </p>
                            )}
                        </div>
                    ))}
                    {!submitted && (
                        <button style={{...styles.button, width: 'auto'}} onClick={handleSubmit}>Submit Quiz</button>
                    )}
                    {submitted && (
                        <div>
                            <h3 style={styles.score}>Your Final Score: {score}</h3>
                            <button style={styles.button} onClick={handleGoToDashboard}>View All Scores on Dashboard</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default QuizHome;
