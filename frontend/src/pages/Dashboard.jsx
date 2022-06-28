import React from 'react'
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { useState, useEffect } from 'react';
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import userApi from '../api/user';
import { Box, Typography, Grid, Card, CardHeader, CardContent, CardActions, Paper, Button, Modal, TextField, MenuItem, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import Loader from '../components/Loader';
import Donut from '../components/Donut';
import styled from '@emotion/styled'
import MUIDataTable from "mui-datatables";
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineUserSwitch } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { GiRadarSweep } from 'react-icons/gi'
import axios from 'axios';


const UserDashboard = ({ currentUser }) => {
  return(
    <Grid container justify-content='center' align-items='flex-start' row-spacing={2} column-spacing={0} direction='row'>
                <Grid sx={{m: 2}} item xs={12}>
                  <Paper>
                    <Grid sx={{m: 2}} item xs={12} md={12}>
                      <Typography variant="h2">{currentUser.name}'s Dashboard</Typography> 
                    </Grid>        
                  </Paper>
                </Grid>

                {
                (currentUser.userSubject.length>0) &&
                <Grid sx={{m: 2}} xs={12} md={12}>
                  <Typography variant='h3'>Subjects</Typography>
                </Grid>
                }

                <Grid sx={{m: 2}} item xs={12}>

                {currentUser.userSubject.map( subject => {
                  return(
                      <Paper>
                        <Typography sx={{m: 2}} variant='h4'>
                          {subject.subjectName}
                        </Typography>
                        
                          <Row>
                            <Column>
                            <Card>
                              <CardHeader title={'Quiz'}/> 
                              <CardContent>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Uploaded:   ${subject.completion.quiz.current}`}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Remaining:   ${subject.completion.quiz.total - subject.completion.quiz.current}`}
                                </Typography>
                                <Donut data={subject.completion.quiz} />
                              </CardContent>
                            </Card>
                            </Column>
                            <Column>
                            <Card>
                              <CardHeader title={'Assignment'}/> 
                              <CardContent>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Uploaded:   ${subject.completion.assignment.current}`}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Remaining:   ${subject.completion.assignment.total - subject.completion.assignment.current}`}
                                </Typography>
                                <Donut data={subject.completion.assignment} />
                              </CardContent>
                            </Card>
                            </Column>
                          </Row>

                          <Row>
                            <Column>
                            <Card>
                              <CardHeader title={'Mids'}/> 
                              <CardContent>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Uploaded:   ${subject.completion.mid.current}`}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Remaining:   ${subject.completion.mid.total - subject.completion.mid.current}`}
                                </Typography>
                                <Donut data={subject.completion.mid} />
                              </CardContent>
                            </Card>
                            </Column>
                            <Column>
                            <Card>
                              <CardHeader title={'Finals'}/> 
                              <CardContent>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Uploaded:   ${subject.completion.final.current}`}
                                </Typography>
                                <Typography variant='body2' color='text.secondary'>
                                  {`Remaining:   ${subject.completion.final.total - subject.completion.final.current}`}
                                </Typography>
                                <Donut data={subject.completion.final} />
                              </CardContent>
                            </Card>
                            </Column>
                          </Row>
                        </Paper>
                  )
                })
                }
                </Grid>
    </Grid>
  )
}

const AdminDashboard = ( { currentUser } ) => {
  const [ modalDisplayed, setModalDisplayed ] = useState(false);
  const [ modalContent, setModalContent ] = useState(); //1. AddUser 2. ManageUsers 3.  


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
  };
  

  const handleModal = (state, content) => {
    setModalContent(content);
    setModalDisplayed(state);
  }

  return(
    <Grid container justify-content='center' align-items='flex-start' rowSpacing={7} columnSpacing={10} direction='row'>
      <Grid item xs={12}>
        <Typography variant='h4'>Admin Console</Typography>
      </Grid>
      <Grid item xs={5}>
        <Card sx={{p: 5, boxShadow: 3 }}>
          {/* <CardHeader title='Users'/> */}
          <CardContent>
            <AiOutlineUser size={40} style={{margin: '1rem', color: '#1976D2'}}/>
            <Typography variant='body2'>Add Users or manage user data and roles plus delete users.</Typography>
          </CardContent>
          <CardActions>
          <Button size='small' onClick={() => handleModal(true, 'AddUser')} >Add</Button>
          <Button size='small' onClick={() => handleModal(true, 'ManageUser')} >Manage</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={5}>
        <Card sx={{p: 5, boxShadow: 3 }}>
          {/* <CardHeader title='Tracking'/> */}
          <CardContent>
            <GiRadarSweep size={40} style={{margin: '1rem', color: '#1976D2'}}/>
            <Typography variant='body2'>Track subjects assigned to user, check their completion status.</Typography>
          </CardContent>
          <CardActions>
          <Button size='small' onClick={() => handleModal(true, 'TrackUsers')} >Track</Button>
          </CardActions>
        </Card>
      </Grid>
      <Modal
        open={modalDisplayed}
        onClose={() => handleModal(false)}
      >
        <Box sx={modalStyle}>
          {
            (modalContent==='AddUser') && <AddUser />
          }
          {  
            (modalContent==='ManageUser') && <ManageUsers currentUser={currentUser} />
          }
          {
            (modalContent==='TrackUsers') && <TrackUsers currentUser={currentUser} />
          }
        </Box>
      </Modal>
    </Grid>
  );
}

const TrackUsers = ({ currentUser }) => {
  const [ users, setUsers ] = useState();
  const [ childModal, setChildModal ] = useState(null);
  const [ selectedUser, setSelectedUser ] = useState(null);

  const childModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    overflow: 'scroll', 
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: '80vh'
  };
  
  
  useEffect( () => {
    userApi.post(`/list/${currentUser.id}`).then(response => {
      setUsers(response.data.userList);
    })
  }, []);

  const columns = [
    {
      name: 'index',
      label: '#',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
              tableMeta.rowIndex + 1
          );
      }
    }
    },
    {
      name: 'name',
      label: 'Username'
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: '_id',
      label: 'Track',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
                <Button variant='text' color='primary' onClick={() => checkSubjectHandler(value) }>
                  <GiRadarSweep size={20}/>
                </Button> 
          )
      }
    }
    }
  ]

  const checkSubjectHandler = async (val) => {
    console.log(val)
    setSelectedUser(val);
    setChildModal('UserSubject');
  }
  
  return(
    <>
      <MUIDataTable title={'Users'} data={users} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}} />
      <Modal
        hideBackdrop
        open={(childModal!==null)}
        onClose={() => setChildModal(null)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={childModalStyle}>
          {
            (childModal==='UserSubject' && selectedUser!==null) && <UserSubject userId={selectedUser}/>
          }
          <Button sx={ { m: 5}} onClick={() => setChildModal(null)}>Close</Button>
        </Box>
      </Modal>
    </>
  )
}

const UserSubject = ({ userId }) => {
  const [ subjects, setSubjects ] = useState(null);

  useEffect(() => {
    userApi.post('/me', {
      id: userId
    }).then(response => setSubjects(response.data.userSubject))

  }, []);
  return(
    <Grid container justify-content='center' align-items='flex-start' rowSpacing={5} columnSpacing={10} direction='row'>
      <Grid sx={{m : 5}} item xs={12}>
        <Typography variant='h3'>User Subjects</Typography>
      </Grid>
      {
        subjects && subjects.map(subject => {
          return(
            <Grid container item xs={12}>
              <Paper sx={{ p: 5 , minWidth: '40%'}}>
                <Grid item xs={12}>
                  <Typography variant='h4'>{subject.subjectName}</Typography>
                </Grid>
                <Grid item xs={12} justifySelf='right'>
                  <Typography variant='h6'>Session Year: {subject.sessionYear}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>Department: {subject.department}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>Section: {subject.section}</Typography>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Completion</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Quiz: {subject.completion.quiz.current} out of {subject.completion.quiz.total}  
                      {
                        (subject.completion.quiz.current===subject.completion.quiz.total) ? <BsFillHandThumbsUpFill color='green'/> : <BsFillHandThumbsDownFill color='red' />
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Assignment: {subject.completion.assignment.current} out of {subject.completion.assignment.total}
                      {
                        (subject.completion.assignment.current===subject.completion.assignment.total) ? <BsFillHandThumbsUpFill color='green'/> : <BsFillHandThumbsDownFill color='red' />
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Mid: {subject.completion.mid.current} out of {subject.completion.mid.total}
                      {
                        (subject.completion.mid.current===subject.completion.mid.total) ? <BsFillHandThumbsUpFill color='green'/> : <BsFillHandThumbsDownFill color='red' />
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body1'>
                      Final: {subject.completion.final.current} out of {subject.completion.final.total}
                      {
                        (subject.completion.final.current===subject.completion.final.total) ? <BsFillHandThumbsUpFill color='green'/> : <BsFillHandThumbsDownFill color='red' />
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )
        })
      }
    </Grid>
  );
}

const AddUser = () => {
  const [ inputValues, setInputValues ] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [ role, setRole ] = useState('user');
  const [ alert, setAlert ] = useState();

  const handleChange = (e) => {
    setInputValues({
      ...inputValues, [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async () => {
    const { username, email, password } = inputValues;
    if(username.length<5){
      setAlert({text: 'Username must be min 5 characters', severity: 'error'});
      return;
    }
    if(!validateEmail(email)){
      setAlert({text: 'Email not in correct format', severity: 'error'});
      return;
    }
    if(!validatePassword(password)){
      setAlert({text: 'Password not in correct format', severity: 'error'});
      return;
    }
    setAlert({text: 'All is Good, Please Wait', severity: 'success'});

    const reqData = ({
      email,
      name: username,
      password,
      role
    });

    try{
      const response = await userApi.post('/', reqData);

      console.log(response);
      setAlert({text: 'User Added', severity: 'success'});

      // Redirect Code Here
      window.location.reload();
    } catch(e){
      console.log(e);
      setAlert({text: e.response.data.message, severity: 'error'});
    }
  }

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

  return(
    <>
        <Grid container justify-content='flex-start' align-items='flex-start' rowSpacing={2} direction='row'>
          <Grid item xs={12}>
            <Typography variant='h5'>Add User</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField helperText='Minimum Length: 5 Characters' label='Username' id='username' value={inputValues.username} size='small' onChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField helperText='ex: user1@gmail.com' label='Email' id='email' value={inputValues.email} size='small' onChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField helperText='between 6 to 20 characters, at least one numeric digit, one uppercase and one lowercase letter' label='Password' id='password' value={inputValues.password} size='small' onChange={handleChange}/>
          </Grid>
          <Grid item xs={12}>
            <TextField select label='Role' id='role' value={role} size='small' onChange={(e) => setRole(e.target.value)}>
              <MenuItem  key='admin' value='admin'>
                Admin
              </MenuItem>
              <MenuItem  key='user' value='user'>
                User
              </MenuItem>
            </TextField>
          </Grid>
          { 
          (alert) &&
            <Grid item xs={12}>
              <Alert severity={alert.severity}>{alert.text}</Alert>
            </Grid>
          }
          <Grid item xs={12}>
            <Button onClick={handleSubmit} variant='contained' color='primary'>Submit</Button> 
          </Grid>
        </Grid>
    </>
  )
}

const ManageUsers = ({ currentUser }) => {
  const [ users, setUsers ] = useState();
  const [ alert, setAlert ] = useState(null);
  const [ childModal, setChildModal ] = useState(null);
  const [ selectedUser, setSelectedUser ] = useState(null);

  const childModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    overflow: 'scroll', 
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    height: '80vh'
  };
  
  useEffect( () => {
    userApi.post(`/list/${currentUser.id}`).then(response => {
      setUsers(response.data.userList);
    })
  }, []);

  const columns = [
    {
      name: 'index',
      label: '#',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          return (
              tableMeta.rowIndex + 1
          );
      }
    }
    },
    {
      name: 'name',
      label: 'Username'
    },
    {
      name: 'email',
      label: 'Email'
    },
    {
      name: 'role',
      label: 'Role'
    },
    {
      name: '_id',
      label: 'Switch Role',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
                <Button variant='text' color='warning' onClick={() => changeRoleHandler(value) }>
                  <AiOutlineUserSwitch size={20}/>
                </Button> 
          )
      }
    }
    },
    {
      name: '_id',
      label: 'Delete User',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
                <Button  variant='text' color='error' onClick={() => deleteUserHandler(value) }>
                  <RiDeleteBin6Line size={20}/>
                </Button> 
          )
      }
    }
    },
    {
      name: '_id',
      label: 'Assign Subject',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
                <Button variant='text' color='primary' onClick={() => assignSubjectHandler(value) }>
                  <MdOutlineAssignmentReturn size={20}/>
                </Button> 
          )
      }
    }
    }
  ]

  const changeRoleHandler = async (val) => {
    try {
      const updatedUser = await userApi.patch(`/${currentUser.id}`, {
      userId: val,
    })
    console.log(updatedUser);
    window.location.reload();
  } catch(e){
    setAlert(e.response.data.message)
  }
  }

  const deleteUserHandler = async (val) => {
    try{
      const deletedUser = await userApi.delete(`/${currentUser.id}/${val}`);
      console.log(deletedUser);
      window.location.reload();
    } catch(e) {
      setAlert(e.response.data.message);
    }
  }

  const assignSubjectHandler = (val) => {
    setSelectedUser(val);
    setChildModal('AssignSubject');
  }


    return(
      <>
        {
          (users) && 
          <>
          <MUIDataTable title={'User List'} data={users} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}} />
          <Dialog
              open={(alert!==null)}
              onClose={() => setAlert(null)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Error"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Alert severity='error'>{alert}</Alert>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAlert(null)} autoFocus>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>

            <Modal
              hideBackdrop
              open={(childModal!==null)}
              onClose={() => setChildModal(null)}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={childModalStyle}>
                {
                  (childModal==='AssignSubject' && selectedUser!==null) && <AssignSubject userId={selectedUser}/>
                }
                <Button sx={ { m: 5}} onClick={() => setChildModal(null)}>Close</Button>
              </Box>
            </Modal>
          </>
        }
      </>
    )
}

const AssignSubject = ({ userId }) => {
  const [ inputValues, setInputValues ] = useState({
    name: '',
    department: '',
    section: '',
    session: ''
  });

  const [ alert, setAlert ] = useState();

  const handleChange = (e) => {
    setInputValues({
      ...inputValues, [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async () => {
    try{
      const { name, department, section, session } = inputValues;
      if(!name || !department || !section || !session){
        setAlert({ text: 'Please fill all the fields', severity: 'error'});
        console.log(userId)
      }

      if(!userId){
        setAlert({ text: 'Invalid User', severity: 'error'});
      }

      const reqBody = {
        subjectName: name,
        department,
        section,
        sessionYear: session,
        assignedTo: userId
      }

      const res = axios.post('http://localhost:8000/api/subject/add', reqBody);

      if (res.status === 422) {
        setAlert({ text: 'Oops, something went wrong', severity: 'error'});
      } else {
        // window.location.reload();
        setAlert({ text: 'Subject Assigned Successfully', severity: 'success'});
      }
    } catch(e){
      setAlert({text: e.response.data.message, severity: 'error'});
    }
  }

  return(
    <>
      <Grid container justify-content='flex-start' align-items='flex-start' rowSpacing={2} direction='row'>
        <Grid item xs={12}>
          <Typography variant='h5'>Assign Subject</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label='Subject Name' id='name' value={inputValues.name} size='small' onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField  label='Department' id='department' value={inputValues.department} size='small' onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField label='Section' id='section' value={inputValues.section} size='small' onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}>
          <TextField label='Session' id='session' value={inputValues.session} size='small' onChange={handleChange}/>
        </Grid>
        { 
        (alert) &&
          <Grid item xs={12}>
            <Alert severity={alert.severity}>{alert.text}</Alert>
          </Grid>
        }
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant='contained' color='primary'>Submit</Button> 
        </Grid>
      </Grid>
    </>
  )
}

function Dashboard({ currentUser, setCurrentUser }) {
  
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(false);
  // Chart Data Format 
  // [{name: 'name', value: 'val'}, .....]

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
            <Box sx={{m: 0,  background: '#F6F6F6'}}>
              <Box sx={{m: 4}}>
            {
              (currentUser) ?
              (currentUser.role==='user') ?
              <UserDashboard currentUser={currentUser}/> 
              :
              <AdminDashboard currentUser={currentUser}/>
              : 
              <Typography variant="h2">Dashboard, User not found</Typography> 
            }
              </Box>
            </Box>
          }

        
    </Container>
  )
}

const Row = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`
const Column = styled.div`
  padding: 1rem 0;
  margin: 1rem;
  flex: 1;
`

export default Dashboard