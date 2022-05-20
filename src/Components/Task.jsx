import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CachedIcon from '@mui/icons-material/Cached';



import EditIcon from '@mui/icons-material/Edit';
import service from "../service";



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



export default function Task({editData,handleEdit}) {
  const [data, setData] = useState([]);
  const [entryClicked,setEntryClicked] = useState(false);
  const [clickedData,setClickedData] = useState();

  const handleDoubleClick = (e) =>{
    setEntryClicked(true)
  } 

  

  const handleClick=(e)=>{
    setEntryClicked(true)
    setClickedData(e)
  }

  const handleDelete=()=>{
    const url = "ws/rest/com.axelor.team.db.TeamTask/removeAll"
    const body = {records:[{id:clickedData.id}]}
    service.post(url,body)
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
    const url = "ws/rest/com.axelor.team.db.TeamTask/search"
    service.post(url).then(data=>{
      setData(data.data)
    })
    
  }
  useEffect(() => {
      const url = "ws/rest/com.axelor.team.db.TeamTask/search"
      service.post(url).then(data=>{
        setData(data.data)
      })

  }, []);
 

  useEffect(()=>{
    handleReload()
  },[])
  
  return (
    <>
    
      
      <Button disabled={!entryClicked} variant="text"><DeleteIcon  style={entryClicked?{color:"black"}:{color:"silver"}} onClick={handleDelete} /></Button>
      <Button variant="text" disabled={!entryClicked}><EditIcon style={entryClicked?{color:"black"}:{color:"silver"}} onClick={()=>{editData(clickedData)
      handleEdit(entryClicked)}} /></Button>
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

