import React from 'react'
import './RegisterForm.css'

function RegisterForm() {
  return (
    <div class="register-form-container col-sm-6 col-sm-offset-3">
    
        <h1 className='register-heading'> Register</h1>
   
        <form action="/register" method="post">
                <div class="form-group">
                    <label>Username</label>
                    <input className='register-input form-control' type="text" name="username" required/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input className='register-input form-control'  id="signupEmail" type="text"  autocomplete="email" name="signupEmail" required/>
                </div>
                <div class="form-group password-form-group">
                    <label>Password</label>
                    <input  className='register-input form-control' type="password" name="password" required/>
                </div>
        
                <button type="submit" class="btn btn-lg signup-btn">Submit</button>
            </form>
        
            <hr/>
        
            <p>Already have an account? <a href="/login">Login</a>.</p>

        </div>
  )
}

export default RegisterForm