import MUIDataTable from "mui-datatables";

const DataTable = ( { title, columns, data } ) => {
    console.log(data);

    return(
        <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={{ isRowSelectable: false, selectableRows: false, print: false, download: false}}
        />
    );
}

export default DataTable;