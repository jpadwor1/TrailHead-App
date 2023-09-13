function getRandomFloat(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // ES6 array destructuring syntax to swap elements
  }
  return array;
}

let closestState;
function findClosestState(latitude, longitude) {
  // Define your states and their corresponding coordinates
  const states = [
    
    { name: 'Alaska', latitude: 61.370716, longitude: -152.404419 },
    { name: 'Arizona', latitude: 33.729759, longitude: -111.431221 },
    { name: 'Arkansas', latitude: 34.969704, longitude: -92.373123 },
    { name: 'California', latitude: 36.116203, longitude: -119.681564 },
    { name: 'Alabama', latitude: 32.806671, longitude: -86.79113 },
    { name: 'Colorado', latitude: 39.059811, longitude: -105.311104 },
    { name: 'Connecticut', latitude: 41.597782, longitude: -72.755371 },
    { name: 'Delaware', latitude: 39.318523, longitude: -75.507141 },
    { name: 'Florida', latitude: 27.766279, longitude: -81.686783 },
    { name: 'Georgia', latitude: 33.040619, longitude: -83.643074 },
    // Add more states and their coordinates
  ];
  // Convert latitude and longitude to numbers
  
  const targetCoords = {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };

  // Calculate the distances between the user's location and the states' coordinates
  const distances = states.map(state => ({
    state: state.name,
    distance: geolib.getDistance(targetCoords, {
      latitude: Number(state.latitude),
      longitude: Number(state.longitude)
    }),
  }));

  // Sort the distances in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Return the name of the closest state
  return closestState= distances[0].state;
}

module.exports = {findClosestState, getRandomFloat, shuffleArray};