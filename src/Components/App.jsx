import React, { useState } from 'react'
import Task from './Task'
import Form from './Form';

 

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
    <div className='Container'>
      
        {edit?(<Form data={data} edit={edit} editId={data.id} handleAdd={handleAdd}/> ):(add?(<Form/>):(<Task editData={editData} handleEdit={handleEdit} handleAdd={handleAdd}/>))}
    </div>
  )
}
