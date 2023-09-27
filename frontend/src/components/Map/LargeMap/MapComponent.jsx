import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import './MapComponent.css'
import Map, { Source, Layer, Popup } from 'react-map-gl';
import useFetchTrails from '../../../hooks/useFetchTrails';

const MapComponent = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [cursor, setCursor] = useState('auto');
    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    const mapRef = useRef();
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const [currentLine, setCurrentLine] = useState(null);
    const [visibility, setVisibility] = useState('none');
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '400px',
        latitude: 39.944829,
        longitude:  -115.046811,
        zoom: 5
    });
    //Get Trail data from API
    const { trailsData, loading, error } = useFetchTrails();
    const trails = trailsData.trails || [];
    const interactiveLayerIds = ["current-route", "route", `route${currentId}`, "clusters", "unclustered-point"];

    

    //Route display and Ant trail animation
    const routeGeoJSONData = {
        type: 'FeatureCollection',
        features: trails.map(trail => {
            if (trail.geometry.type === 'LineString' && trail.properties["@id"] === currentId) {
                return {
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
                };
            }
        }).filter(Boolean) // This will filter out any undefined items
    };

    //Cluster and Point Display
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

    //Enable line animation
    const enableLineAnimation = useCallback((layerId) => {
      const dashArraySeq = [
          [0, 4, 3],
          [0.5, 4, 2.5],
          [1, 4, 2],
          [1.5, 4, 1.5],
          [2, 4, 1],
          [2.5, 4, 0.5],
          [3, 4, 0],
          [0, 0.5, 3, 3.5],
          [0, 1, 3, 3],
          [0, 1.5, 3, 2.5],
          [0, 2, 3, 2],
          [0, 2.5, 3, 1.5],
          [0, 3, 3, 1],
          [0, 3.5, 3, 0.5]
      ];
  
      let step = 0;
  
      function animateDashArray(timestamp) {
          const newStep = Math.floor(timestamp / 100) % dashArraySeq.length;
  
          if (newStep !== step) {
              if (mapRef.current) {
                  const map = mapRef.current.getMap();
                  map.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step]);
              }
              step = newStep;
          }
  
          // Request the next frame of the animation.
          requestAnimationFrame(animateDashArray);
      }
  
      // Start the animation
      animateDashArray(1);
  
      // Return a cleanup function to stop the animation when the component is unmounted.
      return () => {
          // Cancel the animation frame request
          cancelAnimationFrame(animateDashArray);
      };
  
    }, [mapRef]);// The dependency array for useCallback
       
    // Cluster click and zoom, and point click and popup
    const onMapClick = (event) => {
      if (!mapRef.current) return;
  
      const map = mapRef.current.getMap();
      
      // First check for clusters:
      const clusters = map.queryRenderedFeatures(event.point, {
          layers: ['clusters']
      });
  
      if (clusters.length) {
          const clickedCluster = clusters[0];
          const clusterId = clickedCluster.properties.cluster_id;
          map.getSource('points').getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
  
              mapRef.current.easeTo({
                  center: clickedCluster.geometry.coordinates,
                  zoom,
                  duration: 500
              });
          });
      } else {
          // Check for individual points:
          const points = map.queryRenderedFeatures(event.point, {
              layers: ['unclustered-point']  
          });
  
          if (points.length) {
              setSelectedPoint(points[0]);
          } else {
              setSelectedPoint(null);
          }
      }
    };

    //Mouse enter and leave
    const onMouseEnter = useCallback(event => {

      const feature = event.features && event.features[0];

      if (feature) {
          setCursor('pointer');
          setCurrentId(feature.properties["@id"]);
          setVisibility("visible");
          enableLineAnimation('route-ant-trail');
      }
    }, []);
    
    const onMouseLeave = useCallback(() => {
        setCursor('auto');
        setCurrentLine(null);
        setVisibility("none");

    }, []);
    
    //Resize window
    useEffect(() => {
      const handleResize = () => {
          setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
          window.removeEventListener('resize', handleResize);
      };
    }, []);

    //Map style  
    const mapStyle = windowWidth <= 768 ? 
    { width: "100%", height: "75vh" } : 
    { width: "100%", height: "100vh" };

    //Loading
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="map-container">

      <Map
      mapboxAccessToken={mapboxToken}
      initialViewState={viewport}
      onViewportChange={setViewport}
      style={mapStyle}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      cursor={cursor}
      ref={mapRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onMapClick}
      interactiveLayerIds={interactiveLayerIds}
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
                 
             {selectedPoint && (
              <Popup
                  className='trail-popup'
                  longitude={selectedPoint.geometry.coordinates[0]}
                  latitude={selectedPoint.geometry.coordinates[1]}
                  onClose={() => setSelectedPoint(null)}
                  closeOnClick={true}
                  tipSize={5}
              >
                  {/* Display the point's information */}
                  <div>
                      <h5 className='trail-popup-heading'>{selectedPoint.properties.name}</h5>
                      <p>
                          {/* Display any relevant data from the point's properties here */}
                           {selectedPoint.properties.city}, {selectedPoint.properties.state}
                      </p>
                  </div>
              </Popup>
        )}
        </Source>

        
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
                        'line-opacity': 0.4,
                        'line-width': 3
                      }}
                      layout= {{
                        
                        'visibility': visibility 
                      }}
                    />
                    <Layer
                    id='route-ant-trail'
                    type='line'
                    layout={{
                      
                      'visibility': visibility          
                    }}
                    paint= {{
                      'line-color': '#025464', // Set a different color for the ant trail
                      'line-width': 6, // Adjust the width of the ant trail line
                      'line-dasharray': [0, 4, 3], // Use a dashed line for the ant trail effect
                    }}
                    before= 'current-route'
                    />
                  </Source>
        
        </Map>
        </div>
  )
}

export default MapComponent