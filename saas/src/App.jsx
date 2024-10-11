import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from './userContext/AuthContext';


import Layout from './componets/Layout';
import Login from './componets/Login';
import LandingPage from './componets/LandingPage';
import PricingCard from './componets/Pricing';
import TermsAndConditions from './componets/TermsAndCondition';
import Pri from './componets/Pri';
import PrivateRoute from './componets/PrivateRoutes';
import SignUp from './componets/SignUp';
import AccountVerify from './componets/VerifyAccount';


const ResetPassword1 = lazy(() => import('./componets/Reset'));
const AudioPage = lazy(() => import('./componets/AudioPage'));
const RichEditorText = lazy(() => import('./componets/RichEditorText'));
const Dashboard = lazy(() => import('./componets/Dashboard'));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingCard />} />
        <Route path="/terms-condition" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<Pri />} />
        <Route path="/verify" element={isAuthenticated ? <AccountVerify /> : <Navigate to='/login' />} />

        {/* Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <PrivateRoute element={<Dashboard />} />
            </Suspense>
          }
        />

        {/* Conditional Authenticated Routes */}
        <Route
          path="/main"
          element={
            <Suspense fallback={<div>Loading Audio Page...</div>}>
              {isAuthenticated ? <AudioPage /> : <Navigate to="/login" />}
            </Suspense>
          }
        />


        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading Sign Up...</div>}>
              {isAuthenticated ? <Navigate to="/" /> : <SignUp />}
            </Suspense>
          }
        />

        <Route
          path="/resetPassword"
          element={
            <Suspense fallback={<div>Loading Reset Password...</div>}>
              {isAuthenticated ? <Navigate to="/" /> : <ResetPassword1 />}
            </Suspense>
          }
        />

        {/* Redirect Unknown Paths */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Route>
    </Routes>
  );
}

export default App;
