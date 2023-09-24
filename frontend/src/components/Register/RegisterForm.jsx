import React from 'react'
import { useState } from 'react'
import './RegisterForm.css'
import Register from '../../Pages/Register';
import axios from 'axios';

function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await axios.post('/api/register', {
                username: username,
                signupEmail: email,
                password: password
            });
            
            
            // Handle success, e.g., redirect to the home page
            console.log(response.data);
        } catch (error) {
            // Handle error, e.g., display an error message to the user
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
  return (
    <div class="register-form-container col-sm-6 col-sm-offset-3">
    
        <h1 className='register-heading'> Register</h1>
   
        <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label>Username</label>
                    <input 
                    className='register-input form-control' 
                    type="text" 
                    name="username" 
                    onChange={(e) => setUsername(e.target.value)}
                    required/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input 
                    className='register-input form-control'  
                    id="signupEmail" 
                    type="text"  
                    autocomplete="email" 
                    name="signupEmail" 
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>
                <div class="form-group password-form-group">
                    <label>Password</label>
                    <input  
                    className='register-input form-control' 
                    type="password" 
                    name="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                </div>
        
                <button type="submit" class="btn btn-lg signup-btn">Submit</button>
            </form>
        
            <hr/>
        
            <p>Already have an account? <a href="/login">Login</a>.</p>

        </div>
  )
}

export default RegisterForm