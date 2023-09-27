import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TrailDetailPage.css';
import TrailReviewStar from '../../components/Trails/TrailComponents/TrailReviewStar';
import TrailPhoto from '../../assets/images/trail-photo.png'
import RockImage from '../../assets/images/cropped.avif'
import CameraIcon from '../../assets/images/camera-icon.png'
import CarIcon from '../../assets/images/car-icon.png'
import ShareIcon from '../../assets/images/share-icon.png'
import PrinterIcon from '../../assets/images/printer-icon.png'
import TrailImage from '../../assets/images/trail3.jpeg'
import ReviewStar from '../../assets/images/reviewStar.png'
import Weather from '../../components/Weather/Weather';
import MiniMap from '../../components/Map/MiniMap/MiniMap';
import TrailCard from '../../components/Trails/TrailCard/TrailCard';

let trailTags = [
    "Dogs",
    "Backpacking",
    "Camping",
    "Hiking",
    "Forest",
    "River",
    "Views",
    "Waterfall",
    "Wildflowers",
    "Wildlife",
    "Rocky",
    "Mountain",
    "Beach",
    "Scenic",
    "Swimming",
    "Biking",
    "Birdwatching",
    "Steep",
    "Historical",
    "Accessible"
  ];
var randomTags = [];
while (randomTags.length < 4) {
  var randomIndex = Math.floor(Math.random() * trailTags.length);
  var randomTag = trailTags[randomIndex];
  if (!randomTags.includes(randomTag)) {
    randomTags.push(randomTag);
  }
}



const TrailDetailPage = () => {
    const { id } = useParams(); // Get the id from the URL
    const [trailData, setTrailData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [truncate, setTruncate] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const [nearbyTrails, setNearbyTrails] = useState(null);

    const antiTruncate = () => {
        setTruncate(false);
        setShowButton(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/api/trails/${id}`);
                setTrailData(response.data);
                setNearbyTrails(response.data.nearbyTrails);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching the trails data:", err);
                setError(err);
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    const FormattedTime = ( timestamp ) => {
        // Check if the timestamp is 7 digits long and adjust if necessary
    const adjustedTimestamp = String(timestamp).length === 7 ? timestamp * 1000 : timestamp;

    // Convert the adjusted Unix timestamp to a JavaScript Date object
    const date = new Date(adjustedTimestamp * 1000);

        // Format the date in the 'MMM/DD/YYYY' format
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    
        return formattedDate;
    }
    
    const ReviewStars = ( rating ) => {
        // Round the rating to the nearest whole number
        const roundedRating = Math.round(rating);
    
        // Create an array of size roundedRating filled with the ReviewStar image
        const stars = Array(roundedRating).fill(null).map((_, index) => (
            <img key={index} src={ReviewStar} alt="review star" className="show-review-star"/>
        ));
    
        return (
            <div className="show-review-stars">
                {stars}
            </div>
        );
    }

    const determineRouteType = (coordinates) => {
        const seen = new Set();
    
        for (const coord of coordinates) {
            const coordStr = `${coord[0]},${coord[1]}`;
            if (seen.has(coordStr)) {
                return "Loop";
            }
            seen.add(coordStr);
        }
        return "Out & Back";
    }

    if (loading) return <p>Loading...</p>;
    const Latitude = trailData.trail.geometry.coordinates[0][1];
    const Longitude = trailData.trail.geometry.coordinates[0][0];
    const cleanReviews = trailData.trail.properties.reviews.filter(review => review.rating !== null && review.rating !== undefined);

    console.log(trailData.trail);
    return (
        <>
<div className="show-page-container">

<div className="show-header-container">
  <img src={TrailPhoto} alt="trail photo" className="header-image"/>
  <div className="header-overlay"></div>
  <div className="trail-details">
    <div className="header-title">{trailData.trail.properties.name} </div>
    <div className="trail-reviews">
    <p className="trail-difficulty">Easy</p>
    <p>•</p>
    <TrailReviewStar trail={trailData.trail}/>
    </div>
  </div>
</div>
<div className="button-wrapper">
  <img className="rock-image" src={RockImage} alt="rock texture"/>
  <ul className="show-button-container">
    <li className="button-module">
      <a className="module-link" href="/trails/<%= trails._id %>/photos" target="_blank">
        <div className="icon-container">
          <img src={CameraIcon} alt="Camera Icon" className="camera-icon"/>
          
        </div>
        <p>Photos</p>
        </a>
    </li>
    
    <li className="button-module">
      <a className="module-link" href={`https://www.google.com/maps/dir/Current+Location/${Latitude},${Longitude}`} target="_blank" rel="noreferrer">
        <div className="icon-container">
          <img src={CarIcon} alt="Car Icon" className="camera-icon"/>
        
        </div>
        <p>Directions</p>
      </a>
    </li>

    <li className="button-module">
      <a className="module-link" href="https://www.facebook.com/sharer/sharer.php?u=<%= encodeURIComponent('https://localhost:3000/trails/' + trails._id) %>" target="_blank" rel="noreferrer">
        <div className="icon-container">
          <img src={ShareIcon} alt="Share Icon" className="camera-icon"/>
          
        </div>
        <p>Share</p>
      </a>
    </li>

    <li className="button-module">
      <a className="module-link" href="/trails/<%= trails._id %>/photos" target="_blank">
        <div className="icon-container">
          <img src={PrinterIcon} alt="Printer Icon" className="camera-icon"/>
          
        </div>
        <p>Print Map</p>
      </a>
    </li>

    
  </ul>
</div>
<div className="container">
  <div className="trail-module-trail-info row">
    <div className="trail-info-module col-lg-7 col-md-12">
      <div className="trail-specs">
        <ul className="specs">
          <li className="trail-spec-item">
            <h3>Length</h3>
            <p>12.1 mi</p>
          </li>
          <li className="trail-spec-item">
            <h3>Elevation Gain</h3>
            <p>5,492 ft</p>
          </li>
          <li className="trail-spec-item">
            <h3>Route Type</h3>
            <p>{determineRouteType(trailData.trail.geometry.coordinates)}</p>
          </li>
        </ul>

        <div className="trail-description">
          <p id="trailDescription" className={truncate ? 'truncate' : ''}> Hikers, walkers, sightseers, and runners alike flock to Piestewa Peak like moths to your camping lantern, drawn here in part because of its proximity to the Phoenix metropolitan area. Despite the crowds, this mountain can still be a lot of fun, offering a short but taxing climb and many great views of the Sonoran desert along the way. The parking lot is off Piestewa Peak Drive and leads to many more hiking trails in the Phoenix Mountains Preserve. The route starts on a short connector trail and then goes straight up to the summit. If you are looking for a great workout, this summit hike is the perfect trail. Some notable views from the summit include Camelback Mountain, the Dreamy Draw Recreation Area, and the city of Phoenix. The Piestewa Peak Summit Trail is especially great for a sunset hike to end your day.</p><a id="seeMoreBtn" className={`trail-description-btn ${showButton ? 'none' : ''}`} href="#" onClick={antiTruncate}>See More</a>

        </div>

        <div className="trail-module-divider"></div>

        <div className="tags-section">
            {randomTags.map((tag, index) => (
                <span key={index} className="trail-tag">{tag}</span>
            ))}
        </div>

        <div className="trail-module-divider"></div>
      
        <Weather apiKey={import.meta.env.VITE_WEATHER_API_KEY} trail={trailData.trail}/>

        
    
          

        
      </div>
      <div className="trail-module-divider"></div>

      <div className="review-container">
         
         
<div id="reviewModal" className="modal">
<div className="modal-content">
  <span className="close">&times;</span>
  <img src={TrailImage} alt={trailData.trail.properties.name} className="add-review-image"/>
  <h2 className="review-heading">How'd you like {trailData.trail.properties.name}</h2>
  <form id="reviewForm" >
    <input className="review-name" type="text" name="authorName" placeholder="Your Name" required/>
    <input className="review-rating" type="number" name="rating" min="1" max="5" placeholder="Rating" required/>
    <textarea className="add-review-body" name="reviewText" placeholder="Write your review..." required/>
    <button className="modal-submit-btn btn" type="submit">Submit</button>
  </form>
</div>
</div>
        {/* Add conditional rendering for reviews */}

          <div className="add-review-container">
            <button id="addReviewBtn" className="add-review-button" data-trail-id="<%= trails._id %>">Leave a Review</button>
          </div>

          {cleanReviews.map((review, index) => (
            <div className="review" key={index}>
          <div className="profile-heading">
            <div className="review-image">
              <img src={review.profile_photo_url} alt="profile_pic" referrerPolicy="no-referrer"/>
            </div>
            <div className="profile-info">
              <p className="review-author"> {review.author_name} </p>
              <p className="review-date"> {FormattedTime(review.time)} </p>
            </div>
          </div>
            <div className="show-review-stars">
                {ReviewStars(review.rating ? review.rating : 4.7)}
            </div>
            <div className="review-body">
              <p> {review.text} </p>
            </div>
            </div>
        ))}
        
      </div>

    </div>
    <div className="trail-info-aside col-lg-5">
     
      <MiniMap trail={trailData.trail} />

      {/* Nearby Trails tags-section */}
      <div className="nearby-trails-wrapper">

        <div className="nearby-trails-header">
          <p>Nearby Trails</p>
          <form action="/trails/search/nearby" method="POST">
          <button type="submit" name="nearbyTrails" value="<%= trails.properties.city%>">Show More</button>
          </form>
        </div>
        
       
      
       {nearbyTrails.map((trail, index) => (
            <div className="nearby-trail" key={index}>
                <TrailCard trail={trail}/>
            </div>
        ))}
      </div>
    </div>
  </div>
</div>
</div>
        </>
    );
}

export default TrailDetailPage;
