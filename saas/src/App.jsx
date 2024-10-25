import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuth } from './userContext/AuthContext';
import { useState } from 'react';

import Layout from './componets/Layout';
import Login from './componets/Login';
import LandingPage from './componets/LandingPage';
import PricingCard from './componets/Pricing';
import TermsAndConditions from './componets/TermsAndCondition';
import Pri from './componets/Pri';
import PrivateRoute from './componets/PrivateRoutes';
import SignUp from './componets/SignUp';
import AccountVerify from './componets/VerifyAccount';
import { NotifyFalse } from './componets/NotifyToast';


const Password = lazy(() => import('./componets/util/Password'))


const ResetPassword1 = lazy(() => import('./componets/Reset'));
const AudioPage = lazy(() => import('./componets/AudioPage'));
const RichEditorText = lazy(() => import('./componets/RichEditorText'));
const Dashboard = lazy(() => import('./componets/Dashboard'));

function App() {
  const { isAuthenticated, isGoogle, isAvialbleCreatePost, isVerified } = useAuth();
  const [showNotification, setShowNotification] = useState(false);



  return (
    <Routes>
      <Route element={<Layout />}>

        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingCard />} />
        <Route path="/terms-condition" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<Pri />} />
        <Route
          path="/verify"
          element={
            isAuthenticated ? (
              !isVerified ? <AccountVerify /> : <Navigate to="/main" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path='/user/password'
          element=<Suspense fallback={<div>Loading Sign Up...</div>}>
            {isAuthenticated && !isGoogle ? <Password /> : <Navigate to='/' />}
          </Suspense>
        />


        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <PrivateRoute element={<Dashboard />} />
            </Suspense>
          }
        />

        <Route
          path="/main"
          element={
            <Suspense fallback={<div>Loading Audio Page...</div>}>
              {isAuthenticated ? (
                isVerified ? (
                  isAvialbleCreatePost > 0 ? (
                    <AudioPage />
                  ) : (
                    <>
                      NotifyFalse("You need to upgrade/buy plan to create posts!")

                      <Navigate to="/pricing" />
                    </>
                  )
                ) : (
                  <Navigate to="/verify" />  // Redirect to verification page
                )
              ) : (
                <Navigate to="/login" />  // Redirect to login page if not authenticated
              )}
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

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Route>
    </Routes>
  );
}

export default App;
