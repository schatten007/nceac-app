import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container } from '../../components/styled/Container'
import { Grid, Button, Typography, Box, Tabs, Tab } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import Sidebar from '../../components/Sidebar'
import { decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import pdfMerge from "./pdfMerge";
import { BsDownload } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'



function TabPanel({ children, value, index }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function SubjectInfo() {
  const { subjectId } = useParams();
  const [ tabValue, setTabValue ] = useState(0);
  const [ subject, setSubject ]= useState();
  const [ columns, setColumns ] = useState();
  const [ data, setData ] = useState();

  const [ title, setTitle ] = useState('Quiz');
  let url  = 'quiz'

  const navigate = useNavigate();


  useEffect( () => {
    const fetchSubjectData = async ()=> {
      try{
          const response = await subject.get(`/${subjectId}`);
          console.log(response.data);
          setSubject(response.data);
        } catch (e) {
          console.log(e);
        }
  }
    const fetchRowData = async () => {
      try{
        const rowData = await fetchTableData(0);
        setData(rowData);
      } catch(e){
        console.log(e);
      }
  }
  fetchSubjectData();
  fetchRowData();
  setColumns(getColumns(0));
  }, [ subject, subjectId ]);


  const downloadRow = (arg) => {
    window.open(arg, '_blank');
  }

  const deleteRow = async (arg) => {
    console.log(url)
    try{
      const res = await axios.delete(`http://localhost:8000/api/${url}/${arg}`);
      console.log(res);
      // window.location.reload();
    } catch(e){
      console.log(e);
    }
  }

  const updateRow = (arg) => {
    navigate(`/subject/editquiz/${arg}`);
  }

  const fetchTableData = async (variant) => {
    let thisUrl = null;

    switch(variant){
      case 0:
        url = 'quiz'
        break;
      case 1:
        url = 'assignment'
        break;
      case 2:
        url = 'mid'
        break;
      case 3:
        url = 'final'
        break;
      case 4:
        url = 'lecturenotes'
        break;
      case 5:
        url = 'ms'
        break;
      default:
        return;  
    }

    try{
    const response = await axios.get(`http://localhost:8000/api/${url}/${subjectId}`);
    console.log(response.data);
    return response.data;
    }
    catch (e) {
      console.log(e);
    }
  }

  const mergeHandler = () => {
    const paths = [];

    data.forEach( item => {
      paths.push({
        question: item.questionurl,
        best: item.besturl,
        average: item.averageurl,
        worst: item.worsturl
      })
    })

    pdfMerge(paths);
  }


  const getColumns = (value) => {
    let columns = [];

    if(value >= 0 && value <= 3){
    columns = [
      {
        name: '#',
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
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'questionurl',
      label: 'Question',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <Button variant='text' color='success' onClick={() => downloadRow(value) }>
              <BsDownload size={20}/>
            </Button>
          )
        }
      }
    },
    {
      name: 'besturl',
      label: 'Best',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <Button variant='text' color='success' onClick={() => downloadRow(value) }>
              <BsDownload size={20}/>
            </Button>
          )
        }
      }
    },
    {
      name: 'averageurl',
      label: 'Average',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <Button variant='text' color='success' onClick={() => downloadRow(value) }>
              <BsDownload size={20}/>     
            </Button>
          )
        }
      }
    },
    {
      name: 'worsturl',
      label: 'Worst',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
            <Button variant='text' color='success' onClick={() => downloadRow(value) }>
              <BsDownload size={20}/>
            </Button>
          )
        }
      }
    },
    {
      name: '_id',
      label: 'Delete',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
                <Button variant='text' color='error' onClick={() => deleteRow(value) }>
                  <RiDeleteBin6Line size={20}/>
                </Button>
          )
      }
    }
    },
    {
      name: '_id',
      label: 'Update',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return(
                <Button disabled variant='contained' color='primary' onClick={() => updateRow(value) }>
                  Update
                </Button>
          )
        }
      }
    }
    ]} else {
      columns = [
        {
          name: '#',
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
        name: 'title',
        label: 'Title'
      },
      {
        name: 'description',
        label: 'Description'
      },
      {
        name: 'url',
        label: 'Download',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                  <Button variant='text' color='primary' onClick={() => downloadRow(value) }>
                    <BsDownload size={20}/>
                  </Button> 
            )
        }
      }
      },
      {
        name: '_id',
        label: 'Delete',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                  <Button variant='text' color='error' onClick={() => deleteRow(value) }>
                    <RiDeleteBin6Line size={20}/>
                  </Button> 
            )
        }
      }
      }
      ]
    }

    return columns;
  }

const selectTitle = (variant) => {
  switch(variant){
    case 0:
      setTitle('Quiz')
      break;
    case 1:
      setTitle('Assignment')
      break
    case 2:
      setTitle('Mids')
      break;
    case 3: 
      setTitle('Finals')
      break;
    case 4:
      setTitle('Lecture Notes')
      break
    case 5:
      setTitle('Mark Sheet')
      break
    default:
      setTitle('Title Not Found')
  }
}

  const handleTabChange  =  (e, val) => {
    // Quiz, Assignment, Mid, Final
    // [ #, Title, Best, Average, Worst, Action ]
    // Course Content
    // [ #, Title, Description, Action ]
    const columns = getColumns(val);

    fetchTableData(val).then(response => setData(response));
    setColumns(columns);
    selectTitle(val);
    setTabValue(val);
  }

  return (
    <Container>
      <Sidebar />
      <Box sx={{m: 0,  background: '#F6F6F6'}}>
      <Box sx={{m: 4}}>
      <Grid container>
      <Grid item xs={12}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Quiz" />
          <Tab label="Assignment" />
          <Tab label="Mid" />
          <Tab label="Final" />
          <Tab label="Lecture Notes" />
          {/* <Tab label="Mark Sheet" /> */}
        </Tabs>
      </Box>
      </Grid>
{
      ( columns && title && data ) &&
      <Grid item xs={12}>
      
      <TabPanel value={tabValue} index={0}>
        <Grid item xs={12} >
          <Button color='success' sx={{ m: 2}} variant="contained" onClick={() => navigate(`/subject/${subjectId}/addquiz`)}>Add Quiz</Button>
        </Grid>
        <Grid item xs={12} >
          <MUIDataTable title={title} data={data} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}}/>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid item xs={12} >
          <Button color='success' sx={{ m: 2}} variant="contained" onClick={() => navigate(`/subject/${subjectId}/addassignment`)}>Add Assignment</Button>
        </Grid>
        <Grid item xs={12} >
          <MUIDataTable title={title} data={data} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}}/>
        </Grid>
      </TabPanel>
     
      <TabPanel value={tabValue} index={2}>
        <Grid item xs={12} >
          <Button color='success' sx={{ m: 2}} variant="contained" onClick={() => navigate(`/subject/${subjectId}/addmid`)}>Add Mid</Button>
        </Grid>
        <Grid item xs={12} >
          <MUIDataTable title={title} data={data} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}}/>
        </Grid>
      </TabPanel>
     
      <TabPanel value={tabValue} index={3}>
        <Grid item xs={12} >
          <Button color='success' sx={{ m: 2}} variant="contained" onClick={() => navigate(`/subject/${subjectId}/addfinal`)}>Add Final</Button>
        </Grid>
        <Grid item xs={12} >
          <MUIDataTable title={title} data={data} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}}/>
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={4}>
        <Grid item xs={12} >
          <Button color='success' sx={{ m: 2}} variant="contained" onClick={() => navigate(`/subject/${subjectId}/addlecturenotes`)}>Add Lecture Note</Button>
        </Grid>
        <Grid item xs={12} >
          <MUIDataTable title={title} data={data} columns={columns} options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}}/>
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={5}>
        Mark Sheet
      </TabPanel>
      
      </Grid>
    }
      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={mergeHandler}>Merge and Download</Button>
      </Grid>
      </Grid>
      </Box>
      </Box>
    </Container>
  );
}

export default SubjectInfo;
