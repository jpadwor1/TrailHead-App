/* eslint-disable react/prop-types */
import React from 'react'
import TrailReviewStar from '../TrailComponents/TrailReviewStar'
import './TrailCard.css'
// Importing all the images
import TrailImage1 from '../../../assets/images/trail4.jpeg';
import TrailImage2 from '../../../assets/images/trail5.jpeg';
import TrailImage3 from '../../../assets/images/trail6.jpg';
import TrailImage4 from '../../../assets/images/trail7.jpg';
import TrailImage5 from '../../../assets/images/trail8.jpg';
import TrailImage6 from '../../../assets/images/trail9.jpeg';
import TrailImage7 from '../../../assets/images/trail10.jpg';
import TrailImage8 from '../../../assets/images/trail12.jpeg';
import TrailImage9 from '../../../assets/images/trail13.jpeg';
import TrailImage10 from '../../../assets/images/trail14.jpg';
import TrailImage11 from '../../../assets/images/trail15.jpg';

const TrailCard = ({ trail }) => {

  const getRandomTrailImage = () => {
    const trailImages = [
        TrailImage1,
        TrailImage2,
        TrailImage3,
        TrailImage4,
        TrailImage5,
        TrailImage6,
        TrailImage7,
        TrailImage8,
        TrailImage9,
        TrailImage10,
        TrailImage4,
        TrailImage5,
        TrailImage6,
        TrailImage7,
        TrailImage8,
        TrailImage9,
        TrailImage10,
        TrailImage11
    ];

    const randomIndex = Math.floor(Math.random() * trailImages.length);
    return trailImages[randomIndex];
  }

// Usage:
const randomImageSrc = getRandomTrailImage();
  return (
    <div key={trail.properties['@id']} className="trail-card-container">
      <a className='trail-card-wrapper' href={`/trail/${trail._id}`}>  
        <img className="nearby-trail-image" src={randomImageSrc} alt={trail.properties.name} />
    
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
