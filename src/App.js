import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import TopicDetailPage from './pages/TopicDetailPage';
import QuizHome from './component/skillQuizeFE/QuizHome';
import Navbar from './component/Navbar';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      {/* This style adds padding to the top of our content area,
          so it doesn't get hidden behind the fixed navbar.
          A value of 80px is a safe estimate for the navbar's height. */}
      <div className="main-content" style={{ paddingTop: '80px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topic/:topicName" element={<TopicDetailPage />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<QuizHome />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
