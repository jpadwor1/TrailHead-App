import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './MapComponent.css'
import Map, { Source, Layer } from 'react-map-gl';
import axios from 'axios';

const MapComponent = () => {
    const [loading, setLoading] = useState(true);
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const [trailsData, setTrailsData] = useState([]);
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '400px',
        latitude: 39.944829,
        longitude:  -115.046811,
        zoom: 5
    });
    const mapRef = useRef();
    const trails = trailsData.trails || [];

    useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/trails');
        setTrailsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the trails data:", error);
        setLoading(false);
      }
    }
    
    fetchData();
}, []);


const handleMapLoad = (event) => {
  const map = event.target; // This should give you the underlying map instance
  // Your map logic that was previously in map.on('load', () => {...})
};

    const geoJSONData = {
        type: 'FeatureCollection',
        features: trails.map(trail => {
          let firstCoordinate;
          if (trail.geometry.type === 'LineString') {
            firstCoordinate = trail.geometry.coordinates[0];
          } else if (trail.geometry.type === 'MultiLineString') {
            firstCoordinate = trail.geometry.coordinates[0][0];
          } else if (trail.geometry.type === 'Point') {
            firstCoordinate = trail.geometry.coordinates;
          }
            return {
              
              type: 'Feature',
              properties: {
                  ...trail.properties,
                  lineGeometry: trail.geometry,
                  id: trail.properties['@id'],
                  uniqueId: trail._id,  
              
              },
              geometry: {
                type: 'Point',
                coordinates: firstCoordinate
              }
            };
          })
        };

        if (loading) {
          return <div>Loading...</div>;
      }
  return (
    <Map
    mapboxAccessToken={mapboxToken}
    initialViewState={viewport}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Source
                id="points"
                type="geojson"
                data={geoJSONData}
                cluster={true}
                clusterMaxZoom={12}
                clusterRadius={50}
            >
                <Layer
                    id="clusters"
                    type="circle"
                    filter={['has', 'point_count']}
                    paint={{
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#51bbd6',
                            10,
                            '#f1f075',
                            16,
                            '#f28cb1'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40
                        ]
                    }}
                />

                <Layer
                    id="cluster-count"
                    type="symbol"
                    filter={['has', 'point_count']}
                    layout={{
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }}
                />

                <Layer
                    id="unclustered-point"
                    type="circle"
                    filter={['!', ['has', 'point_count']]}
                    paint={{
                        'circle-color': '#42f548',
                        'circle-radius': 6,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#fff'
                    }}
                />
        </Source>
        </Map>
  )
}

export default MapComponent