import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation'
import Home from './Pages/Home'
import Layout from './components/Layout/Layout'
import Register from './Pages/Register'

function App() {

  return (
    <Router>
          <MainNavigation />
          <Layout>
    <Routes>
        <Route exact path='/'  element={<Home />} />
        <Route path='/register' element={<Register />} />
       
    </Routes>
    </Layout>

  </Router>

      
    
  )
}

export default App
