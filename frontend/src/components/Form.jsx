import React from 'react'
import { useState, useEffect } from 'react';
import formData from '../api/formData';
import form from '../api/form';
import { useNavigate } from 'react-router-dom';
import exportFromJSON from 'export-from-json'  
import { decodeToken } from "react-jwt";
import { Button,  Grid, Typography, Box, Alert } from '@mui/material';
import styled from '@emotion/styled'
import userApi from '../api/user';
import { FiDelete } from 'react-icons/fi'

// import styled from 'styled-components';

function Form({inputs, formID}) {
  const [ values, setValues ] = useState([]);
  const [ alert, setAlert ] = useState(null)
  const [ user, setUser ] = useState();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = user.id;
    console.log(userId, ' Attempting to submit data');

    try{
      const reqData = {
        id: formID,
        values: values,
        createdBy: userId //Test User ID
      }
      
      const response = await formData.post('/', reqData);
      setAlert({text: 'Form Submitted Successfully', severity: 'success'});
      
    } catch(e) {
      setAlert({text: 'Something went wrong', severity: 'error'});
    }
  }

  const getUser = async () => {
      const token = localStorage.getItem('token');
      if(!token){
          navigate('/login');      
      }

      const userId = decodeToken(token).id;
      console.log(userId);
      
      const response = await userApi.post('/me', { id: userId});
      
      return response.data;
  }

  const handleSourceSubmit = async () => {
    try{
      const response = await form.get(`/print/${formID}`);
      
      console.log(response);

      const data = response.data.res;
      
      const fileName = 'JsonData'  
      const exportType = 'xls'  

      exportFromJSON({ data, fileName, exportType });  

    } catch(e){
      console.log(e);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name] : value
    });
  }

  const handleInputDelete = async (input) => {
    // console.log(input);
    // console.log(inputs);

    const updatedInputs = inputs.filter(arrInput => arrInput._id !== input._id);

    const response = await form.patch(`/${formID}`, {
      updatedInputs
    });

    console.log(response.data);

    window.location.reload();
  }

  useEffect(() => {
    getUser().then(user => {
      setUser(user);
    })
  }, []);


  return (
    <Box>
    <Typography variant="h4" sx={{mb: 2}}>Form</Typography>
    <form>
        <Grid container spacing={2}>
        {  
          user &&
            inputs.map(input => {
                console.log(input);
                return(
                    <Grid item xs={12}>
                    {input.name && (input.type !== "hidden") && (input.type!== "submit") && (input.type!=="button") && <Grid item xs={6}><label for={input.id}>{input.name}</label></Grid>}
                    {
                    (input.type.toString() === "button" || input.type.toString() === "submit") ?
                    console.log(<Grid item xs={6}><Button variant="contained">{input.name}</Button></Grid>)
                    : 
                    <Grid item xs={6} sx={{display: 'flex', padding: '0 0', height: '70%', width: '100%'}}>
                      <StyledInput onChange={handleChange} name={input.name} type={input.type} id={(input.id !== "undefined") ? input.id : ""} placeholder={input.placeholder} value={values.name} />
                      {(user.role==='admin') && <Button onClick={() => handleInputDelete(input)} variant='text' color='error' sx={{height: '40%', mt: 5, mb: 1, width: '5px'}}><FiDelete /></Button>}
                    </Grid>
                    }
                    </Grid>
                )
            })
        }
        <Grid item xs={12}>
          {
            (alert!==null) &&
            <Alert severity={alert.severity}>{alert.text}</Alert>
          }
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
        </Grid>
        </Grid>
    </form>
    </Box>
  );
}

const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  height: 60%;
  margin: 10% 0;
`

export default Form;