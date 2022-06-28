import React from 'react'
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { useState, useEffect } from 'react';
import formApi from '../api/form';
import PageTable from '../components/PageTable';
import BasicModal from '../components/Modal';
import { Typography, Grid } from '@mui/material'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import userApi from '../api/user';


function CheckForm({ currentUser, setCurrentUser }) {
  const [ formList, setFormList ] = useState([]);
  const [ currentForm, setCurrentForm ] = useState({
    loaded: false,
    formData: {}
  });
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);


  useEffect(() => {
    const loadForms = async () => {
    try {
      const response = await formApi.get('/');
      console.log(response);
      setFormList(response.data);
    } catch(e){
      console.log(e);
    }
  }

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
        
        loadForms();
        setIsLoading(false);
      }
    }else {
      setIsLoading(false);
      navigate('/login');
    }
  }
  
  if(!currentUser){
    authUser();
  } else{
    loadForms();
  }
  }, []);

  return (
    <Container>
        <Sidebar />
        <Grid container justify-content='flex-start' align-items='flex-start' direction='row'>
          <Grid sx={{m: 4}} item xs={12}>
            <Typography variant='h4'>Forms</Typography>
          </Grid>
          <Grid sx={{m: 5}} item xs={12}>
          {
            (formList.length>=0 && currentUser) &&
            <PageTable forms={formList} setCurrentForm={setCurrentForm} currentUser={currentUser}/>
          }
          </Grid>
          <Grid item xs={12}>
            <BasicModal currentForm={currentForm} setCurrentForm={setCurrentForm}/>
          </Grid>
        </Grid>
    </Container>
  )
}

export default CheckForm