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


        <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />

        <Route path="/main" element={isAuthenticated ? <AudioPage /> : <Navigate to="/login" />} />


        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/resetPassword"
          element={isAuthenticated ? <Navigate to="/" /> : <ResetPassword1 />}
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Route>
    </Routes>
  );
}

export default App;
