import React from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

function Login() {
  // App = Register Codedamn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
      event.preventDefault()
    const response = await fetch("http://localhost:8003/login", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json()

    if(data.user){
      localStorage.setItem('token',data.user)
      alert("Login Successful!")
      navigate('/dashboard')
    }
    else{
      alert("Please check your Username and Password.")
    }

    console.log(data)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
       
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br></br>
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br></br>
        <br></br>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;
