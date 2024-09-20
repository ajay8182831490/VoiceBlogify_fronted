import './App.css';
import Header from './componets/Header';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
import ResetPassword1 from './componets/Reset';
import LandingPage from './componets/LandingPage';
import AudioPage from './componets/AudioPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './userContext/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyAudioRecordingComponent from './componets/AudioTest';
import RichEditorText from './componets/RichEditorText';
import Dashboard from './componets/DashBoard';
import PrivateRoute from './componets/PrivateRoutes';

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/edit" element={<RichEditorText />} />
        <Route path="/dashboard/*" element={<Dashboard />} />


        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetPassword" element={<ResetPassword1 />} />
            <Route path="/main" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="dashboard/*" element={<Navigate to="/" />} />

          </>
        ) : (
          <>
            <Route path="/main" element={<AudioPage />} />
            {<Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />}
            {<Route path="*" element={<Navigate to="/dashboard/user-posts" />} />}
          </>
        )}
      </Routes>
    </>
  );
}
export default App;
