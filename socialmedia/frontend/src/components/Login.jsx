import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import {
  Link
} from "react-router-dom";

import '../css/login.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline.js';
import KeyIcon from '@mui/icons-material/Key.js';
function Login() {
  const navigate=useNavigate();
  const host="http://localhost:8000"
  const [credentials,setCredentials]=useState({email:"",password:""});
  const handleLogin=async(e)=>{
    e.preventDefault();
    //fetching using api
    const response=await fetch(`${host}/api/user/login`,{
      method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json=await response.json();
    if(json.success){
      localStorage.setItem("token",json.data);
      console.log("logined");
      navigate('/');
    }
    else{
      //invalid credential   code to write
    }
  }
  const updateData=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className="App">
    <div className="wrapper">
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
      <div><span className="dot"></span></div>
    </div>
      <div className="form-box">
        <div className="form">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="input">
              <span className="icon"><MailOutlineIcon fontSize='large'/></span>
            <input type="email" id='email' name='email' onChange={updateData} required/>
            <label htmlFor="email">Email</label>
            </div>
            <div className="input">
            <span className="icon"><KeyIcon fontSize='large'/></span>
            <input type="password" id='password' name='password' minLength={5}  onChange={updateData}required/>
            <label htmlFor="">Password</label>
            </div>
            <div className="remember">
              <label htmlFor="check"><input type="checkbox" id='check'/>Remember Me</label>
            </div>
            <button type='submit'>Log In</button>
            <div className="register">
              <p>Don't Have An Account?<Link to='/register'>Register</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
