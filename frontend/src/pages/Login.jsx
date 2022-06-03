import React from 'react'
import { useState, useEffect } from 'react';
// MUI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import userApi from '../api/user';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';

// @Promise tracking microlib
// import { trackPromise } from 'react-promise-tracker';
import Loader from '../components/Loader';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/schatten007/nceac-app">
        NCEAC PROJECT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


function Login() {
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ alertText, setAlertText ] = useState('');
  const [ inputError, setInputError ] = useState(false);
  const [ helperEmail, setHelperEmail ] = useState('');


  useEffect(() => {
    setIsLoading(false);
  }, []);


  

  const handleSubmit = async (event) => {
    setInputError(false);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqData = ({
      email: data.get('email'),
      password: data.get('password'),
    });

    if(!validateEmail(reqData.email)){
      setInputError(true);
      setHelperEmail("Invalid format of email");
      return;
    }

    setIsLoading(true);

    try{
      const response = await userApi.post('/login', reqData);
    
      console.log(response);
      
      const myDecodedToken = decodeToken(response.data.token);
      
      console.log(myDecodedToken);
  
      if(myDecodedToken.id){
        localStorage.setItem('token',  response.data.token);
        // alert('Login Successful');
        navigate('/');
      }else{
        // alert('Login Failed');
      }
      setIsLoading(false);
    }
    catch(e){
      console.log(e);
      setIsLoading(false);
      setAlertText('Invalid Email or Password, please try again');
      setError(true);
    }

  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
    return (false)  
  }


  return (
    <Container>
      {(isLoading) ? 
      <Loader isLoading={isLoading}/>
      :
      <ThemeProvider theme={theme}> 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={inputError}
              helperText={helperEmail}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {error && <Alert severity='error'>{alertText}</Alert>}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>}
    </Container>
  )
}


export default Login