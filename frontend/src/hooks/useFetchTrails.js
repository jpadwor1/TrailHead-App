import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchTrails() {
    const [trailsData, setTrailsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/trails');
                setTrailsData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching the trails data:", err);
                setError(err);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { trailsData, loading, error, setLoading };
}

export default useFetchTrails;