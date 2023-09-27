import React, { useRef } from 'react';
import Hero from '../../components/Home/Hero/Hero'
import useFetchTrails from '../../hooks/useFetchTrails';
import TrailCard from '../../components/Trails/TrailCard/TrailCard';
import './Home.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Home() {
  const { trailsData, loading, error } = useFetchTrails();
  const trails = trailsData && trailsData.trails ? trailsData.trails : [];
  const trailContainerRef = useRef(null);
  const scrollAmount = 300; // Adjust this value based on how much you want to scroll
  const scrollLeft = () => {
    if (trailContainerRef.current) {
        trailContainerRef.current.scrollLeft -= scrollAmount;
    }
  };

const scrollRight = () => {
    if (trailContainerRef.current) {
        trailContainerRef.current.scrollLeft += scrollAmount;
    }
};
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error} </p>;

  return (
    <>
    <Hero/>
    <div className="home-trail-carosel">
    <button className='carousel-btn' onClick={scrollLeft}><ArrowBackIosIcon fontSize='large'/></button>
    <div className="home-trail-container" ref={trailContainerRef}>
        {trails.map(trail => (
            <TrailCard key={trail.properties['@id']} trail={trail}/>
        ))}
    </div>
    <button className='carousel-btn' onClick={scrollRight}><ArrowForwardIosIcon fontSize='large'/></button>
    </div>
    </>
  )
}

export default Home