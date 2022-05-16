import React, { useState } from 'react'
import Task from './Task'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit"
import Form from './Form';
import { Container } from '@mui/material';
 

export default function App() {
    const [add,setAdd] = useState(false)

    const handleAdd=()=>{
        setAdd(true)
    }
    const handleEdit=()=>{

    }
  return (
    <Container fluid="true">
      <Button variant="text"><AddIcon style={{color:"black"}} onClick={handleAdd}/></Button>
        {add?(<Form/>):(<Task/>)}
    </Container>
  )
}
