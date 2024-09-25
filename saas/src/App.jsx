import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './userContext/AuthContext';
import Layout from './componets/Layout';
import Login from './componets/Login';
import SignUp from './componets/SignUp';
import ResetPassword1 from './componets/Reset';
import LandingPage from './componets/LandingPage';
import AudioPage from './componets/AudioPage';
import RichEditorText from './componets/RichEditorText';
import Dashboard from './componets/Dashboard';
import PrivateRoute from './componets/PrivateRoutes';
import PricingCard from './componets/Pricing';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<LandingPage />} />
        <Route path="/edit" element={<RichEditorText />} />
        <Route path="/pricing" element={<PricingCard />} />

        {isAuthenticated ? (
          <>

            <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/main" element={<AudioPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            {/* Non-authenticated Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetPassword" element={<ResetPassword1 />} />
            <Route path="/main" element={<Navigate to="/login" />} />
            <Route path="/dashboard/*" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}
export default App;
