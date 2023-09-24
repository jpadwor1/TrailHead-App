import React from 'react'
import './Hero.css'
import SearchForm from '../SearchForm/SearchForm'

function Hero() {
  return (
    <>
    <div className="home-container">
        <SearchForm />
    </div>
    <div className="home-trail-heading">
        <h1>Explore Trails</h1>
        <div className="break"></div>
    </div>
  
    </>
  )
}

export default Hero