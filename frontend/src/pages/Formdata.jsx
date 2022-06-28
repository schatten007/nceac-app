import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import formData from '../api/formData';
import { useParams } from 'react-router-dom';
// MUI 
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';


function GetForm() {
    const { formID } = useParams();
    const [ formValues, setFormValues ] = useState();
    const [ selectedRow, setSelectedRow ] = useState('none');


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


    useEffect(() => {
        const fetchFormData = async ()=> {
            try{
                console.log(formID);
                const response = await formData.get(`/${formID}`);
                console.log(response.data.response);
                setFormValues(response.data.response);
              } catch (e) {
                console.log(e);
              }
        }
        fetchFormData();
    }, []);

    
  return (
    <Container>
        <Sidebar />
        <Box sx={{m:4, width: '100%'}}>
          <Typography variant='h4' sx={{m: 4}}>Form Data</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Entered By</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formValues && formValues.map((row, i) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{++i }</TableCell>
                    <TableCell onClick={() => setSelectedRow(row.data)}><Link color="primary">View Data</Link></TableCell>
                    <TableCell>{row.createdBy.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
              <Modal
                  open={(selectedRow !== 'none')}
                  onClose={() => setSelectedRow('none')}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                  {
                    (selectedRow!=='none') && selectedRow.map( (dataIndex) => {
                      if(dataIndex.value==='') return <></>;
                      return(
                        <div>
                          <Typography variant="body1" align="left">{dataIndex.name}:</Typography>
                          <Typography variant="body2" align="right">{dataIndex.value}</Typography>
                        </div>
                      )
                    })
                  }
                </Box>
              </Modal>
              
            </Table>
      </TableContainer>
    </Box>
    </Container>
  )
}

export default GetForm