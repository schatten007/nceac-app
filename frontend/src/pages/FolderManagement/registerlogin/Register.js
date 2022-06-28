import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  // App = Register Codedamn
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  async function registerUser(event) {
      event.preventDefault()
    const response = await fetch("http://localhost:8003/register", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json()
    if(data.status === 'ok'){
      alert("Successfully Created User.")
       navigate('/login')
    }
  else{
    alert("Email already exists.")
  }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <br></br>
        <br></br>
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
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}

export default Register;
