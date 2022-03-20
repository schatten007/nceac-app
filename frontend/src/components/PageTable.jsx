import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from '@mui/material';


export default function PageTable({forms, setCurrentForm}) {
  const handleRowClick = (form) => {
    setCurrentForm({
      loaded: true,
      formData: form
    });
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'URL', headerName: 'URL', width: 300, sortable:false },
    { field: 'createdAt', headerName: 'Creation Date', width: 250 },
    { field: 'openForm', headerName: 'Open', width: 70, sortable: false, 
    renderCell: (params) => (
        <Link onClick={() => handleRowClick(params.formattedValue)}>Open</Link>
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
