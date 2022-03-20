import React from 'react'
import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { Button, TextField, Typography } from '@mui/material';
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
      } catch(error) {
        console.log(error); 
      }
    }
  }

  return (
    <Container>
        <Sidebar />
        <form>
          {/* <input type="text" onChange={(e)=> {setUrl(e.target.value)}} value={url}></input> */}
          <TextField id="outlined-basic" onChange={(e)=> {setUrl(e.target.value)}} value={url} label="Enter URL" variant="outlined" />
          <TextField id="outlined-basic" onChange={(e)=> {setFormName(e.target.value)}} value={formName} label="Enter Form Name" variant="outlined" />
          <Button variant="contained" onClick={submitHandler}>Submit</Button>
        </form>
        {
          inputs.length >= 0 && 
          <Typography>Form Loaded</Typography>
        }
    </Container>
  )
}

export default GetForm