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

function App() {
  const { isAuthenticated } = useAuth(); // Accessing authentication status
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
        <Route path='/' element={<LandingPage />} />


        {!isAuthenticated ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/resetPassword' element={<ResetPassword1 />} />
            {/* Redirect to the login page if the user is not authenticated and tries to access the main page */}
            <Route path='/main' element={<Navigate to='/login' />} />
            {/* Redirect to the landing page for any other path */}
            <Route path='*' element={<Navigate to='/' />} />
          </>
        ) : (
          // Routes available when authenticated
          <>
            <Route path='/main' element={<AudioPage />} />

            <Route path='/login' element={<Navigate to='/' />} />
            <Route path='/signup' element={<Navigate to='/' />} />
            <Route path='/resetPassword' element={<Navigate to='/' />} />
            <Route path='*' element={<LandingPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
