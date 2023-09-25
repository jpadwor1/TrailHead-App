import React from 'react'
import './SignInForm.css'
import TwitterIcon from '../../assets/images/twitterIcon.png'
import FacebookIcon from '../../assets/images/fbIcon.png'

function SignInForm() {
  return (
   
    <div className="signin-form-container col-sm-6 col-sm-offset-3">
        
            <h1> Login</h1>

            
            <div className="social-logins">

            <a href="/auth/facebook" id="FaceBookSignInWrapper">
                <div id="customBtn" className="customTwitterSignIn">
                <span className="Twitter-icon"></span>
                <span className="buttonText">Twitter</span>
                </div>
            </a>

            <a href="/auth/twitter" id="FaceBookSignInWrapper">
                <div id="customBtn" className="customFBSignIn">
                <span className="FB-icon"></span>
                <span className="FBbuttonText">Facebook</span>
                </div>
            </a>

            <a href="/auth/google" id="gSignInWrapper">
                <div id="customBtn" className="customGPlusSignIn">
                <span className="Gicon"></span>
                <span className="buttonText">Google</span>
                </div>
            </a>
            </div>
            <form className="login-form" action="/login" method="post">
                <div className="form-group">
                    <label className='signin-label'>Email</label>
                    <input type="text" className="signin-input form-control" name="email"/>
                </div>
                <div className="form-group password-form-group">
                    <label className='signin-label'>Password</label>
                    <input type="password" className="signin-input form-control" name="password"/>
                </div>
        
                <button type="submit" className="btn btn-lg signin-btn">Login</button>
            </form>
        
            <hr/>
        
            <p>Already have an account? <a href="/login">Login</a>.</p>

        
        
        
    </div>

  )
}

export default SignInForm