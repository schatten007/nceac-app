import React from 'react'
import { useState } from 'react';
import formData from '../api/formData';
import form from '../api/form';
import { useNavigate } from 'react-router-dom';
import exportFromJSON from 'export-from-json'  
import { decodeToken } from "react-jwt";
import { Button, TextField, Grid, Typography, Box } from '@mui/material';


// import styled from 'styled-components';

function Form({inputs, formID}) {
  const [ values, setValues ] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login');      
    }

    const userId = decodeToken(token).id;
    console.log(userId);
    

    try{
      const reqData = {
        id: formID,
        values: values,
        createdBy: userId //Test User ID
      }
      
      const response = await formData.post('/', reqData);
      console.log(response);
      
    } catch(e) {
      console.log(e);
    }
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


  return (
    <form>
        {
            inputs.map(input => {
                console.log(input);
                return(
                    <>
                    {input.name && (input.type !== "hidden") && (input.type!== "submit") && (input.type!=="button") && <label for={input.id}>{input.name}</label>}
                    {
                    (input.type.toString() === "button" || input.type.toString() === "submit") ?
                    <Button variant="contained">{input.name}</Button>
                    : 
                    <input onChange={handleChange} name={input.name} type={input.type} id={(input.id !== "undefined") ? input.id : ""} placeholder={input.placeholder} value={values.name}></input>
                    }
                    <br />
                    </>
                )
            })
        }
        <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color="warning" onClick={() => navigate(`/form/data/${formID}`)}>View</Button>
        <Button variant="contained" color="error" onClick={handleSourceSubmit}>Export to Excel</Button>
    </form>
  );
}


export default Form;