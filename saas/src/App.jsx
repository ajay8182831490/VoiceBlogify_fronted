

import './App.css'

import Header from "./componets/Header"
import Login from './componets/Login'

import SignUp from './componets/SignUp'
import { Route, Routes } from 'react-router-dom'
import ResetPassword from './componets/ResetPassword'
import ResetPassword1 from './componets/Reset'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Header />} />


        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/resetPassword' element={<ResetPassword1 />} />

      </Routes>
    </>
  )
}

export default App
