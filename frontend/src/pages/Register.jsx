import React, { useState, useEffect } from 'react'
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
import { Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userApi from '../api/user';
import { useNavigate } from 'react-router-dom';


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




function Register() {

  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ alertText, setAlertText ] = useState('');

  useEffect(() => {
    setIsLoading(false);
  }, []); 

  const handleSubmit = async (event) => {
    setError(false);
    event.preventDefault();
  
    const data = new FormData(event.currentTarget);
    const email = data.get('email')   
    const password = data.get('password')
    const name = data.get('name')

    console.log(email, password, name);

    if(!password || !email || !name){
      setError(true);
      setAlertText('Please Fill all the fields with valid information');
      return;
    } 

    if(!validateEmail(email)){
      setError(true);
      setAlertText("Invalid format of email");
      return;
    }

    if(name.length<5 || name.length>12){
      setError(true);
      setAlertText("Username must contain between 5 to 12 characters.")
      return;
    }

    if(!validatePassword(password)){
      setError(true);
      setAlertText('Password must contain between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
      return;
    }



    const reqData = ({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      role: 'user'
    });
    

    try{
      setIsLoading(true);
      const response = await userApi.post('/', reqData);

      console.log(response);

      setIsLoading(false);
      // Redirect Code Here
      navigate('/login');
    } catch(e){
      console.log(e);
      setAlertText(e.response.data.message);
      setError(true);
      setIsLoading(false);
    }
    
  };

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
    return (false)  
  }

  const validatePassword = (password) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password))
    {
      return (true)
    }
    return (false) 
  }

  return (
    <>
    {
    (isLoading) ? 
    <Loader isLoading={isLoading} /> 
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
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="User Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              { (error) && <Grid item xs={12}>
                <Alert severity='error'>{alertText}</Alert>
              </Grid>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    }
    </>
  )
}

export default Register