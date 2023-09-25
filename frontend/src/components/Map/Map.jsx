import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './Map.css'
import Map from 'react-map-gl';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent = ({ trails, mapboxToken, centerLat, centerLng }) => {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: centerLat,
        longitude: centerLng,
        zoom: 6
    });

    const mapRef = useRef();

    // Replace the load event listener of mapbox-gl
    useEffect(() => {
        const map = mapRef.current.getMap();

        // Your map logic that was previously in map.on('load', () => {...})

    }, []);

    // const geoJSONData = {
    //     type: 'FeatureCollection',
    //     features: trails.map(trail => {
    //       let firstCoordinate;
    //       if (trail.geometry.type === 'LineString') {
    //         firstCoordinate = trail.geometry.coordinates[0];
    //       } else if (trail.geometry.type === 'MultiLineString') {
    //         firstCoordinate = trail.geometry.coordinates[0][0];
    //       } else if (trail.geometry.type === 'Point') {
    //         firstCoordinate = trail.geometry.coordinates;
    //       }
    //         return {
              
    //           type: 'Feature',
    //           properties: {
    //               ...trail.properties,
    //               lineGeometry: trail.geometry,
    //               id: trail.properties['@id'],
    //               uniqueId: trail._id,  
              
    //           },
    //           geometry: {
    //             type: 'Point',
    //             coordinates: firstCoordinate
    //           }
    //         };
    //       })
    //     };

  
  return (
    <Map
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        onViewportChange={setViewport}
    >
        {/* Add Sources and Layers here. For example: */}
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