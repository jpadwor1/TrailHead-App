import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation'
import Home from './Pages/Home/Home'
import Layout from './components/Layout/Layout'
import Register from './Pages/Register/Register'
import SignIn from './Pages/SignIn/SignIn'
import Map from './components/Map/Map'
function App() {

  return (
    <Router>
          <MainNavigation />
          <Layout>
    <Routes>
        <Route exact path='/'  element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/map' element={<Map />} />
       
    </Routes>
    </Layout>

  </Router>

      
    
  )
}

export default App
