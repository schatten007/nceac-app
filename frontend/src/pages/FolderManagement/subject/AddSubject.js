import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from '../../../components/styled/Container'
import { Grid, Button, Typography, TextField, FormControl } from '@mui/material';
import Sidebar from '../../../components/Sidebar'
import { decodeToken } from "react-jwt";



function AddSubject() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    subjectName: "",
    department: "",
    section: "",
    sessionYear: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputValue((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    var { subjectName, department, section, sessionYear } = inputValue;

    const token = localStorage.getItem('token');
    if(!token){
        navigate('/login');      
    }

    const userId = decodeToken(token).id;
    console.log(userId);

    const res = await fetch("http://localhost:8000/api/subject/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subjectName,
        department,
        section,
        sessionYear,
        assignedTo: userId
      })
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Error");
      console.log("error");
    } else {
      // setCMData(data)
      navigate("/subject");
      console.log("Subject has been added.");
    }
  };

  return (
    <Container>
      <Sidebar />
      <Grid container flex justifyContent='center' alignItems='center'>
        <Grid item xs={12}>
          <Typography variant="h3"><NavLink to="/subject">Subjects</NavLink></Typography>
        </Grid>
        <Grid item xs={12} >
        <FormControl className="mt-2">
          <Grid item xs={12}>
            <TextField 
            id="outlined-basic" 
            label="Subject Name" 
            variant="outlined" 
            value={inputValue.subjectName } 
            onChange={setdata} 
            name="subjectName"/>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            id="outlined-basic" 
            label="Department Name" 
            variant="outlined" 
            value={inputValue.department} 
            onChange={setdata} 
            name="department"/>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            id="outlined-basic" 
            label="Section Name" 
            variant="outlined" 
            value={inputValue.section} 
            onChange={setdata} 
            name="section"/>
          </Grid>
          <Grid item xs={12}>
            <TextField 
            id="outlined-basic" 
            label="Session Year" 
            variant="outlined" 
            value={inputValue.sessionYear} 
            onChange={setdata} 
            name="sessionYear"/>
          </Grid>
          <Grid item xs={12}>
            <Button color='success' variant="contained" type="submit" onClick={addinpdata}>Submit</Button>
          </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddSubject;
