import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'LOGIN', payload: data });
                navigate('/');
                console.log(data) // or wherever you want to redirect the user after login
            } else {
                setError(data.message || 'Failed to login.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return { login, error };
};