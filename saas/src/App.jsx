

import './App.css'

import Header from "./componets/Header"
import Login from './componets/Login'

import SignUp from './componets/SignUp'
import { Route, Routes } from 'react-router-dom'



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Header />} />


        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

      </Routes>
    </>
  )
}

export default App
