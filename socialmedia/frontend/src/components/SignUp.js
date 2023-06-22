import React, { useState } from 'react'
import {
    Link, useNavigate
} from "react-router-dom";
import '../css/signup.css';
//icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

function SignUp() {
    const navigate = useNavigate();
    const host = "http://localhost:8000";
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/user/signup`, {
            method: 'POST',
            encType:'multipart/form-data',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
                    <form onSubmit={handleSignup} >
                        <h2>SignUp</h2>
                        <div className="input">
                            <span className="icon"><PersonIcon fontSize='large' /></span>
                            <input type="text" id='text' name='name' onChange={handleChange} required />
                            <label htmlFor='name'>Name</label>
                        </div>
                        <div className="input">
                            <span className="icon"><MailOutlineIcon fontSize='large' /></span>
                            <input type="email" id='email' name='email' onChange={handleChange} required />
                            <label htmlFor='email'>Email</label>
                        </div>
                        <div className="input">
                            <span className="icon"><KeyIcon fontSize='large' /></span>
                            <input type="password" id='password' name='password' onChange={handleChange} required />
                            <label htmlFor='password'>Password</label>
                        </div>
                        <div className="input">
                            <span className="icon"><InsertPhotoOutlinedIcon fontSize='large' /></span>
                            <input type="file" id='image' alt='image' name='imageUrl' required />
                        </div>
                        <button>Sign Up</button>
                        <div className="login">
                            <p>Already Have An Account?<Link to='/login'>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
