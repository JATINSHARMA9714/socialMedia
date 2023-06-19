import React from 'react'

import '../App.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
function Login() {
  return (
    <div className="App">
      <div className="form-box">
        <div className="form">
          <form action="">
            <h2>Login</h2>
            <div className="input">
              <span className="icon"><MailOutlineIcon fontSize='large'/></span>
            <input type="email" required/>
            <label htmlFor="">Email</label>
            </div>
            <div className="input">
            <span className="icon"><KeyIcon fontSize='large'/></span>
            <input type="password" required/>
            <label htmlFor="">Password</label>
            </div>
            <div className="remember">
              <label htmlFor="check"><input type="checkbox" id='check'/>Remember Me</label>
            </div>
            <button>Log In</button>
            <div className="register">
              <p>Don't Have An Account?<a href='/register'>Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
