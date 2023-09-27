/* eslint-disable react/prop-types */
import React from 'react'
import TrailReviewStar from '../TrailComponents/TrailReviewStar'
import './TrailCard.css'
import TrailImage from '../../../assets/images/trail2.jpeg'
const TrailCard = ({ trail }) => {
  return (
    <div key={trail.properties['@id']} className="trail-card-container">
      <a className='trail-card-wrapper' href={`/trail/${trail._id}`}>  
        <img loading="lazy" className="nearby-trail-image" src={TrailImage} alt={trail.properties.name} />
    
        <div className="nearby-trail-body">
            <div className="nearby-trail-reviews">
                <TrailReviewStar trail={trail} />
            </div>
                
            <div className="nearby-trail-details">
                <h3 className='all-trails-name'>{trail.properties.name}</h3>

                
                <p className="city_state">{trail.properties.city}, {trail.properties.state}</p>
            </div>
        </div>
      </a>

    </div>
      
    

   
  )
}

export default TrailCard
