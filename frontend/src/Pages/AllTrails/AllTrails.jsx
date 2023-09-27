import React from 'react'
import useFetchTrails from '../../hooks/useFetchTrails';
import TrailCard from '../../components/Trails/TrailCard/TrailCard';
import MapComponent from '../../components/Map/LargeMap/MapComponent';
import './AllTrails.css'

const AllTrails = () => {

    const { trailsData, loading, error } = useFetchTrails();
    const trails = trailsData && trailsData.trails ? trailsData.trails : [];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error} </p>;

    return (
      <div className='all-trails-container'>
      
      <div className='trail-list-wrapper'>
        {trails.map(trail => (
          <TrailCard key={trail.properties['@id']} trail={trail}/>
        ))}
      </div>

      <MapComponent />

    </div>
  )
}

export default AllTrails
