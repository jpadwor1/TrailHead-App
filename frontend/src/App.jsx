import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation'
import Home from './Pages/Home/Home'
import Layout from './components/Layout/Layout'
import Register from './Pages/Register/Register'
import SignIn from './Pages/SignIn/SignIn'
import MapComponent from './components/Map/LargeMap/MapComponent'
import AllTrails from './Pages/AllTrails/AllTrails'
import TrailDetailPage from './Pages/TrailDetailPage/TrailDetailPage'

function App() {

  return (
    <Router>
          <MainNavigation />
          <Layout>
    <Routes>
        <Route exact path='/'  element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/alltrails' element={<AllTrails />} />
        <Route path='/trail/:id' element={<TrailDetailPage />} />
       
    </Routes>
    </Layout>

  </Router>

      
    
  )
}

export default App
