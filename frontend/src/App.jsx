import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation'
import Layout from './components/Layout/Layout'
import Home from './Pages/Home/Home'
import AllTrails from './Pages/AllTrails/AllTrails'
import TrailDetailPage from './Pages/TrailDetailPage/TrailDetailPage'
import SignIn from './Pages/SignIn/SignIn';
import Signup from './Pages/Signup/Signup';
import  { AuthContextProvider }  from './context/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';
import { AuthContext } from './context/AuthContext';
import AppRoutes from './AppRoutes';
function App() {


  return (
    <AuthContextProvider>
      <AppRoutes />
    </AuthContextProvider>
      
    
  )
}

export default App
