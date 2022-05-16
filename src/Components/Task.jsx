import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';


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
    headerName: "Team",
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

export default function Task(onEdit) {
  const [data, setData] = useState([]);
  const [entryClicked,setEntryClicked] = useState(false);
  const [clickedId,setClickedId] = useState();

  const handleDoubleClick = (e) =>{
    setEntryClicked(true)
    console.log(e.id)
  }
  const handleEdit=()=>{

  }

  

  const handleClick=(e)=>{
    setEntryClicked(true)
    setClickedId(e.id)
  }

  const handleDelete=()=>{
    fetch(
      "http://localhost:3000/axelor-erp/ws/rest/com.axelor.team.db.TeamTask/removeAll",
      {
       credentials: "include",
       method:"POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "X-CSRF-Token": "0779fdf4-0894-4952-b016-7c4b81d69f4c",
        },
        body:JSON.stringify({records:[{id:clickedId}]})
      }
    )
  }

 

  

  const rows = data.map((x)=>{
    if(x.team===null)
    return{id:x.id,name:x.name,team:"",taskDate:x.taskDate,status:x.status,priority:x.priority}
    else
  return{id:x.id,name:x.name,team:x.team.name,taskDate:x.taskDate,status:x.status,priority:x.priority}
  })
  
  // const rows = data.map((x,index)=>{
  //   return{id:index,name:data[index].name,team:data.team.name}
  // })
  // console.log(rows)
  const handleReload=()=>{
    setEntryClicked(false)
    fetch(
      "http://localhost:3000/axelor-erp/ws/rest/com.axelor.team.db.TeamTask/search",
      {
       credentials: "include",
       method:"POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "X-CSRF-Token": "0779fdf4-0894-4952-b016-7c4b81d69f4c",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data)
      })
  }
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
     fetch(
      "http://localhost:3000/axelor-erp/ws/rest/com.axelor.team.db.TeamTask/search",
      {
       credentials: "include",
       method:"POST",
        mode: "cors",
        headers: {
          "Accept": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
          "X-Request-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "X-CSRF-Token": "0779fdf4-0894-4952-b016-7c4b81d69f4c",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data)
      })

  }, []);

  useEffect(()=>{
    
  },[data])
  
  return (
    <>
    
      
      <Button disabled={!entryClicked} variant="text"><DeleteIcon  style={entryClicked?{color:"black"}:{color:"silver"}} onClick={handleDelete} /></Button>
      <Button variant="text" disabled={!entryClicked}><EditIcon style={entryClicked?{color:"black"}:{color:"silver"}} onClick={()=>{onEdit()}} /></Button>
      <Button variant="text"><CachedIcon  style={{color:"black"}} onClick={handleReload} /></Button>
      
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
        onRowClick={handleClick}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </>
    
  );
}

