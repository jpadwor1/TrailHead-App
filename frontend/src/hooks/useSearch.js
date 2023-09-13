import React from 'react';
import axios from 'axios'; 

function useSearch() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [foundTrails, setFoundTrails] = React.useState([]);
  const [filteredTrails, setFilteredTrails] = React.useState([]);
  const [error, setError] = React.useState(null);

  const findTrails = async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/trails/search`, { searchBar: searchTerm.toLowerCase() });
      
      setFoundTrails(response.data.foundTrails);
      setFilteredTrails(response.data.filteredTrails);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, foundTrails, filteredTrails, error, findTrails };
}

export default useSearch;