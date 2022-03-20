import React from 'react'
import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { Button, TextField, Grid, Typography, Box } from '@mui/material';
import formApi from '../api/form';

function GetForm() {
  const [ url, setUrl ] = useState();
  const [ formName, setFormName ] = useState();
  const [ inputs, setInputs ] = useState([]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if(url && url.length>0)
    {
      console.log(url);
      const dat = {
        url: url,  
        name: formName
      }
      try{
        const response = await formApi.post('/', dat);
       
        console.log(response);
        setInputs(response.data.inputs);
        alert('Form Loaded');
      } catch(error) {
        console.log(error); 
      }
    }
  }

  return (
    <Container>
        <Sidebar />
        <Box sx={{m: 8, width: '75%'}}>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12}>  
              <Typography align="center" variant="h3">Duplicate Form</Typography>
            </Grid>
            <Grid item xs={12}>  
              <TextField sx={{width: '50%'}} id="outlined-basic" onChange={(e)=> {setUrl(e.target.value)}} value={url} label="Enter URL" variant="outlined" />
            </Grid>
            <Grid item xs={12}>    
              <TextField sx={{width: '50%'}} id="outlined-basic" onChange={(e)=> {setFormName(e.target.value)}} value={formName} label="Enter Form Name" variant="outlined" />
            </Grid>  
            <Grid item xs={12}>
              <Button sx={{width: '20%'}} variant="contained" onClick={submitHandler}>Submit</Button>
            </Grid>
          </Grid>
        </form>
        </Box>
        {/* {
          inputs.length >= 0 && 
          <Typography>Form Loaded</Typography>
        } */}

    </Container>
  )
}

export default GetForm