import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


import EditIcon from '@mui/icons-material/Edit';
const axios = require('axios').default;

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "team",
    headerName: "team",
    width: 150,
    editable: true,
  },
  {
    field: "taskDate",
    headerName: "Start date",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "Pizza order",
    team: "",
    taskDate: "11/04/2022",
    status: "New",
    priority: "",
  },
  {
    id: 2,
    name: "Pizza order",
    team: "",
    taskDate: "18/04/2022",
    status: "New",
    priority: "",
  },
  {
    id: 3,
    name: "Pizza order",
    team: "",
    taskDate: "20/04/2022",
    status: "New",
    priority: "",
  },
  {
    id: 4,
    name: "Pizza order",
    team: "",
    taskDate: "20/04/2022",
    status: "New",
    priority: "",
  },
];

export default function DataGridDemo() {
  const [details, setDeatils] = useState();
  const [entryClicked,setEntryClicked] = useState(false);

  const handleDoubleClick = (e) =>{
    setEntryClicked(true)
    console.log(e.id)
  }
  const handleEdit=()=>{

  }

  const handleAdd=()=>{
    
  }
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
     fetch(
      "http://localhost:8080/axelor-erp/ws/rest/com.axelor.team.db.TeamTask",
      {
       credentials: "include",
        mode: "no-cors",
        headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "X-CSRF-Token": "5016bb0f-b2c1-4d98-85d4-846e2180c2f9",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })

  }, []);
  return (
    <div >
      <Button variant="text"><AddIcon style={{color:"black"}} onClick={handleAdd}/></Button>
      <Button variant="text"><EditIcon style={{color:"black"}} onClick={handleEdit}/></Button>
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        className="data-grid"
        sx={{
          "& .css-17jjc08-MuiDataGrid-footerContainer , .css-i4bv87-MuiSvgIcon-root":
            {
              display: "none",
            },
        }}
        editMode=""
        rows={rows}
        onRowDoubleClick={handleDoubleClick}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        
        
      />
    </div>
    </div>
  );
}
