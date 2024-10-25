import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './userContext/AuthContext.jsx'
import { ToastContainer, toast } from 'react-toastify';



import 'react-toastify/dist/ReactToastify.css';
import UserProfileWithProvider from './componets/dashBoard/UserProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>



      <BrowserRouter>
        <App />
        <ToastContainer position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>

    </AuthProvider>






  </StrictMode>,
)
