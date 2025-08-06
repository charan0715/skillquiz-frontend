import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import TopicsPage from './pages/TopicsPage';
import TopicDetailPage from './pages/TopicDetailPage';
import AdminPage from './pages/AdminPage'; // Import AdminPage
import QuizHome from './component/skillQuizeFE/QuizHome';
import Navbar from './component/Navbar';
import ProtectedRoute from './component/ProtectedRoute';
import AdminProtectedRoute from './component/AdminProtectedRoute'; // Import AdminProtectedRoute

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content" style={{ paddingTop: '80px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* Standard Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/topic/:topicName" element={<TopicDetailPage />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<QuizHome />} />
          </Route>

          {/* --- NEW: Admin-Only Protected Route --- */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
