import React, { useState } from 'react'
import Task from './Task'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit"
import Form from './Form';
import { Container } from '@mui/material';
 

export default function App() {
    const [add,setAdd] = useState(false)
    const [data,setData] = useState()
    const [edit,setEdit] = useState(false)

    const handleAdd=()=>{
        setAdd(true)
    }

    const editData=(x)=>{
      setData(x["row"])
    }
    
    const handleEdit=(x)=>{
      
      setEdit(x)
    }
  
  return (
    <Container fluid="true">
      <Button variant="text"><AddIcon style={{color:"black"}} onClick={handleAdd}/></Button>
        {edit?(<Form data={data} edit={edit} editId={data.id}/> ):(add?(<Form/>):(<Task editData={editData} handleEdit={handleEdit}/>))}
    </Container>
  )
}
