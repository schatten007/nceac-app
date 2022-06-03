import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import form from '../api/form';
import exportFromJSON from 'export-from-json'  





export default function PageTable({forms, setCurrentForm}) {

  const navigate = useNavigate();


  const handleRowClick = (form) => {
    setCurrentForm({
      loaded: true,
      formData: form
    });
  }

  const handleViewClick = (formId) => {
    navigate(`/form/data/${formId}`);
  }

  const handleExportClick = async (formId) => {
    try{
      const response = await form.get(`/print/${formId}`);
      
      console.log(response);

      const data = response.data.res;
      
      const fileName = 'JsonData'  
      const exportType = 'xls'  

      exportFromJSON({ data, fileName, exportType });  

    } catch(e){
      console.log(e);
    }
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'URL', headerName: 'URL', width: 300, sortable:false },
    { field: 'createdAt', headerName: 'Creation Date', width: 150 },
    { field: 'openForm', headerName: 'Open', width: 70, sortable: false, 
    renderCell: (params) => (
        <Link onClick={() => handleRowClick(params.formattedValue)}>Open</Link>
    )},
    { field: 'viewData', headerName: 'View Entries', width: 120, sortable: false, 
    renderCell: (params) => (
        <Link onClick={ () => handleViewClick(params.row.id)} >View</Link>
    )},
    { field: 'exportEntries', headerName: 'Export (Excel)', width: 120, sortable: false, 
    renderCell: (params) => (
        <Link onClick={ () => handleExportClick(params.row.id)} >Export</Link>
    )},
];
    console.log(forms);
    const tableRows = [];
    forms.forEach( form => {
        tableRows.push({
            id: form._id,
            name: form.name,
            URL: form.url,
            createdAt: form.createdAt.slice(0,10),
            openForm: form,
        })
    });
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick={true}
        // checkboxSelection
      />
    </div>
  );
}
