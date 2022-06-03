import React from 'react'
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import userApi from '../api/user';
import { Box, Typography, Grid } from '@mui/material';
import Loader from '../components/Loader';


function Dashboard({ currentUser, setCurrentUser }) {
  
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(()=>{
    const authUser = async () => {

      setIsLoading(true);
      const token = localStorage.getItem('token');
      if(token){
        const userId = decodeToken(token).id;
        console.log(userId);
        if(!userId){
          localStorage.removeItem('token');
          setIsLoading(false);
          navigate('/login');      
        } else {
          const response = await userApi.post('/me', { id: userId});
          console.log(response.data);
          setCurrentUser(response.data);
          setIsLoading(false);
        }
      }else {
        setIsLoading(false);
        navigate('/login');
      }
    }

    authUser();
    
  }, [ navigate, setCurrentUser ]);

  return (
    <Container>
        <Sidebar />
          
          {
            (isLoading) ? 
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid item xs={3}>
                <Loader isLoading={isLoading} /> 
              </Grid>  
            </Grid> 
            :
            <Box sx={{m: 8}}>
            {
              (currentUser) ?
              <Grid container justify-content='flex-start' align-items='flex-start' row-spacing={3} column-spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h2">{currentUser.name}'s Profile</Typography> 
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">Email</Typography> 
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h5">{currentUser.email}</Typography> 
                </Grid>
              </Grid>
              : 
              <Typography variant="h2">Dashboard, User not found</Typography>  
            }
            </Box>
          }

        
    </Container>
  )
}


export default Dashboard