import React, { useState } from 'react'
import './signup.css';
import axios from 'axios';

const SignUp = () => {
    //intailizing state 
    const [signUp,setSignUp] = useState(true);
    const [loginForm,setLoginForm]= useState({userName:"",password:""})
    const [sigInForm,setSignInForm]= useState({userName:"",password:"",email:""})
    
    //handling siginForm
    const ChangeSignUp = (e) => {
        const {name,value} = e.target;
        setSignInForm((prev) => {
            return{
            ...prev,
            [name]:value
            }
        }
     )
    }
    //handling LoginForm
    const ChangeLogin = (e) => {
        const {name,value} = e.target;
        setLoginForm((prev) => {
            return{
            ...prev,
            [name]:value
            }
        }
     )
    }

    //updateing siginform
     const updateSigUp = async(e) => {
        e.preventDefault();
        console.log(sigInForm);
     }

     //updateing login 
     const updateLogin = async (e) => {
        e.preventDefault();
        console.log(loginForm);
     }
  return (
    <div className='signUp-container'>
      <div className={signUp ? "container":"container right-panel-active"} id="container">
        <div className="form-container sign-up-container">
            <form method='POST' action="#">
                <h1 className='signup-h1'>Create Account</h1>
                <button type="button" className="login-with-google-btn" >
                     Sign in with Google
                </button>
                <div className="or">
                    <span>or</span>
              </div>                
              <input type="text" placeholder="Username" name="userName" value={sigInForm.userName} onChange={(e)=> ChangeSignUp(e)}/>
                <input type="email" placeholder="Email" name="email" value={sigInForm.email} onChange={(e)=> ChangeSignUp(e)}/>
                <input type="password" placeholder="Password" name='password' value={sigInForm.password }onChange={(e)=> ChangeSignUp(e)}/>
                <button className='signUp-btn' style={{marginTop:'10px'}} onClick={updateSigUp}>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#" method='POST'>
                <h1>Log In</h1>
                <button type="button" className="login-with-google-btn" >
                     connect with Google
                </button>
                <div className="or">
                    <span>or</span>
              </div>                    
                <input type="email" placeholder="Username" name="userName" value={loginForm.userName} onChange={(e) => ChangeLogin(e)} />
                <input type="password" placeholder="Password" name="password"  value={loginForm.password} onChange={(e) => ChangeLogin(e)}/>
                {/* <a href="#" style={{margin:'10px'}}>Forgot your password?</a> */}
                <button className='signUp-btn' style={{marginTop:'10px'}} onClick={updateLogin}>Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p className='signUp-para'> To keep connected with us please login with your personal info</p>
                    <button className="ghost signUp-btn" id="signIn" onClick={()=>setSignUp(!signUp)}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p className='signUp-para'> Enter your personal details and start journey with us</p>
                    <button className="ghost signUp-btn" id="signUp" onClick={()=>setSignUp(!signUp)}>Sign Up</button>
                </div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default SignUp