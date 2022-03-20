import React from 'react'
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import userApi from '../api/user';


function Dashboard() {
  
  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(()=>{
    const authUser = async () => {
      const token = localStorage.getItem('token');
      if(token){
        const userId = decodeToken(token).id;
        console.log(userId);
        if(!userId){
          localStorage.removeItem('token');
          navigate('/login');      
        } else {
          const response = await userApi.post('/me', { id: userId});
          console.log(response);
          setCurrentUser(response.data.name);
        }
    }
    }

    authUser();
  }, []);

  return (
    <Container>
        <Sidebar />
        {
          (currentUser) ? <h1>Welcome {currentUser}</h1> : <h1>Dashboard</h1>  
        }
    </Container>
  )
}

export default Dashboard