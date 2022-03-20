import React from 'react'
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import userApi from '../api/user';
import { Box, Typography } from '@mui/material';

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
  }, [ navigate ]);

  return (
    <Container>
        <Sidebar />
        <Box sx={{m: 8}}>
        {
          (currentUser) ? <Typography variant="h2">Welcome {currentUser}</Typography> : <Typography variant="h2">Dashboard, User not found</Typography>  
        }
        </Box>
    </Container>
  )
}

export default Dashboard