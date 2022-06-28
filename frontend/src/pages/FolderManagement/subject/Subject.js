import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from '../../../components/Sidebar'
import { Container } from '../../../components/styled/Container'
import { Grid, Button, Typography, Box } from '@mui/material';
import DataTable from '../../../components/DataTable';
import { decodeToken } from "react-jwt";
import userApi from '../../../api/user';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineFolderOpen } from 'react-icons/ai'


function Subject( { currentUser, setCurrentUser } ) {
  const [getsubjectdata, setSubjectData] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const navigate = useNavigate();

  const getdata = async (user) => {
    console.log(user)
    const { role, id } = user;

      const res = await fetch(`http://localhost:8000/api/subject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: id, role})
      });
      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        alert("Something Went Wrong");
        console.log("error");
      } else {
        // setSubjectData(dataFilter(data));
        
        const filteredData = data.filter( val => val.assignedTo = val.assignedTo.name);
        setSubjectData(filteredData);
        console.log("Get Data.");
      }
  };

  useEffect(() => {

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
          return response.data;
        }
      }else {
        setIsLoading(false);
        navigate('/login');
      }
    }

    authUser().then(user => getdata(user));

  }, [ navigate, setCurrentUser ]);

  // Delete Course Material

  const deletesubject = async (id) => {
    const res2 = await fetch(
      `http://localhost:8000/api/subject/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("Error");
    } else {
      console.log("Subject Deleted");
      alert("Subject Deleted");
      //setDltdata(deletedata)
      getdata();
    }
  };

  const columns = 
    [ 
    {
      name: '#',
      label: '#',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          return (
              tableMeta.rowIndex + 1
          );
      }
      }
    }, 
    {
      name: 'subjectName',
      label: 'Subject Name'
    }, 
    {
      name: 'department',
      label: 'Department'
    }, 
    {
      name: 'section',
      label: 'Section',
    },
    {
      name: 'sessionYear',
      label: 'Session/Year'
    }, 
    {
      name: 'assignedTo',
      label: 'Assigned To'
    },
    {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
              <Button variant='text' color='error' onClick={() => deletesubject(value) }>
                  <RiDeleteBin6Line size={20}/>
              </Button>
          )
      }
    }
    },
    {
      name: '_id',
      label: 'Open',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
              <Button variant='text' color='success' onClick={() => navigate(`/subject/${value}`) }>
                  <AiOutlineFolderOpen size={20}/>
              </Button>
          )
      }
    }
    },
];


  return (
    <Container>
      <Sidebar />
      <Box sx={{m: 0,  background: '#F6F6F6'}}>
      <Box sx={{m: 4}}>
        <Grid container justify-content='flex-start' align-items='flex-start' rowSpacing={2} direction='row'>
          <Grid sx={{m: 5}} item xs={12}>
            <Typography variant="h4">Subjects</Typography>
          </Grid>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Button variant='contained' sx={{padding: '10px 20px', textAlign: 'center',  margin: '4px 2px 0 50px', borderRadius: '16px'}}>
              <NavLink to="/addsubject" className="btn btn-primary child" style={{color: 'white'}}>
                Add Subject
              </NavLink>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataTable title='Subjects' columns={columns} data={getsubjectdata} />
          </Grid>           
        </Grid>
      </Box>
      </Box>
    </Container>
  );
}

export default Subject;
