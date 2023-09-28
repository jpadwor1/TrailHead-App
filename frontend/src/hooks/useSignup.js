import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    const navigate = useNavigate();

    const signup = async ( email, password) => {

        try {
            const response = await axios.post(`${API_BASE_URL}/api/register`, {
                email: email,
                password: password
            });

            // Assuming the server responds with a success field
            if (response.data.success) {
              navigate('/');
                // Handle successful registration, e.g., redirect to login page
                // You can also set some state here if needed
            } else {
                // If the server responds with an error message
                setError(response.data.message || 'Registration failed');
            }
        } catch (err) {
            // Handle other errors, e.g., network errors or validation errors
            setError(err.message || 'An error occurred during registration');
        }
    };

    return {
        error,
        signup
    };
};