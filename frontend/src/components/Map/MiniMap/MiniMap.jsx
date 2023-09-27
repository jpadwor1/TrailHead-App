/* eslint-disable react/prop-types */
import React from 'react'
import './MiniMap.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import './MiniMap.css'
import Map, { Source, Layer, Popup } from 'react-map-gl';


const MiniMap = ({ trail }) => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const mapRef = useRef();
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '400px',
        latitude: trail.geometry.coordinates[0][1],
        longitude:  trail.geometry.coordinates[0][0],
        zoom: 13
    });

    const routeGeoJSONData = {
        type: 'FeatureCollection',
        features: trail.geometry.type === 'LineString'  
            ? [{
                type: 'Feature',
                properties: {
                    ...trail.properties,
                    lineGeometry: trail.geometry,
                    id: trail.properties['@id'],
                    uniqueId: trail._id,  
                },
                geometry: {
                    type: 'LineString', // Note: Ensure the 'L' in 'LineString' is capitalized
                    coordinates: trail.geometry.coordinates
                }
            }]
            : []
    };

    //Map style  
    const mapStyle = windowWidth <= 768 ? 
    { width: "100%", height: "400px" } : 
    { width: "100%", height: "400px" };

  return (
    <div className="show-map-container">
        <div className="show-map" id='mapShow' >
        <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={viewport}
      onViewportChange={setViewport}
      style={mapStyle}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      ref={mapRef}
    >
        <Source 
          id="currentLineSource" 
          type="geojson" 
          data={routeGeoJSONData}
          >
            <Layer
              id='current-route'
              type='line'
              paint={{
                'line-color': '#025464',
                'line-opacity': 1,
                'line-width': 3
              }}
              layout= {{
                'visibility': "visible" 
              }}
            />
            
          </Source>
    </Map>
        </div>
    </div>
  )
}

export default MiniMap
