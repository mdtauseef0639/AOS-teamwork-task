import React, { useState } from 'react'
import Task from './Task'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form';
import { Container } from '@mui/material';

export default function App() {
    const [add,setAdd] = useState(false)

    const handleAdd=()=>{
        setAdd(true)
    }
  return (
    <Container fluid="true">
        {add?(<Form/>):(<Task/>)}
    </Container>
  )
}
