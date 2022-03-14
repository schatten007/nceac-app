import React from 'react'
import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import formApi from '../api/form';
import Form from '../components/Form';
import axios from 'axios';

function GetForm() {
  const [ url, setUrl ] = useState();
  const [ inputs, setInputs ] = useState([]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if(url && url.length>0)
    {
      console.log(url);
      const dat = {
        url: url,  
        name: 'dk'
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
          <label>Enter URL
          <input type="text" onChange={(e)=> {setUrl(e.target.value)}} value={url}></input>
          </label>
          <input type="button" onClick={submitHandler} value="Ok" />
        </form>
        {
          inputs.length >= 0 && 
          <Form inputs={inputs}/>
        }
    </Container>
  )
}

export default GetForm