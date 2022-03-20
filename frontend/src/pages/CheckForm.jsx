import React from 'react'
import Sidebar from '../components/Sidebar'
import { Container } from '../components/styled/Container'
import { useState, useEffect } from 'react';
import formApi from '../api/form';
import PageTable from '../components/PageTable';
import BasicModal from '../components/Modal';

function CheckForm() {
  const [ formList, setFormList ] = useState([]);
  const [ currentForm, setCurrentForm ] = useState({
    loaded: false,
    formData: {}
  });

  useEffect(() => {
    const loadForms = async () => {
    try {
      const response = await formApi.get('/');
      console.log(response);
      setFormList(response.data);
    } catch(e){
      console.log(e);
    }
  }
    loadForms();
  }, []);

  return (
    <Container>
        <Sidebar />
        {
          (formList.length>=0) && 
          <PageTable forms={formList} setCurrentForm={setCurrentForm}/>
        }
        <BasicModal currentForm={currentForm} setCurrentForm={setCurrentForm}/>
    </Container>
  )
}

export default CheckForm