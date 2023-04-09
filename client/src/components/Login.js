import React, { useState } from 'react';
import '../../src/css/login.css'
import { Navigate } from 'react-router-dom';

export function Login() {
    const [name, setName] = useState('');
    const [redirectToPosts, setRedirectToPosts] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        // do something with the name, like sending it to the server
        setRedirectToPosts(true);
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }
    
    if (redirectToPosts) {
      return <Navigate to="/posts" />;
    }

    return (
    <>
 
      <div className="full-screen-container">
        <div className="login-container">
          <h1 className="login-title">Welcome to ChatRoomba</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group success">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={name} onChange={handleChange} />
              <span className="msg">Valid name</span>
            </div>

            {/* <div className="input-group error">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
              <span className="msg">Incorrect password</span>
            </div> */}

            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>

    </>
  );
}