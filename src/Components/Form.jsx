import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SaveIcon from '@mui/icons-material/Save';
import FormLabel from "@mui/material/FormLabel";
import AddIcon from '@mui/icons-material/Add';
import FormControl from "@mui/material/FormControl";

import TextareaAutosize from "@mui/material/TextareaAutosize"

export default function Form() {
  
 const [teamValue,setTeamValue] = useState();
 const [priorityValue,setPriorityValue] = useState();
 const [statusValue,setStatusValue] = useState();
 const [assignValue,setAssignValue] = useState();

 const [teamInputValue,setTeamInputValue] = useState();
 const [priorityInputValue,setPriorityInputValue] = useState();
 const [statusInputValue,setStatusInputValue] = useState();
 const [assignInputValue,setAssignInputValue] = useState()
const d = new Date()
const today = d.getFullYear() + "-" + "0"+ d.getMonth() + "-" + d.getDate()
console.log(today)
 const [add,setAdd] = useState(false)
const [save,setSave] = useState(false)
 const handleAdd=()=>{
     setAdd(true)
 }

 const handleSave=()=>{
   setSave(true)
 }


  const [inputDetails, setInputDetails] = useState({ name: "", sdate: "",deadline:"",taskDuration:"" });
  const handleChange = (e) => {
    const { name, value } = e.target;
      setInputDetails(x=>{
        return({...x,[name]:value})
      })
  };
  const teams = ["General", "IDF-Exp", "North" ,"South"];
  const priority = ["Low", "Normal", "High" , "Urgent"];
  const status = ["New", "In Progress", "Closed" ,"Cancelled"];
  return (
    <>
    <Button variant="text"><AddIcon style={{color:"black"}} onClick={handleAdd}/></Button>
    <Button variant="text"><SaveIcon style={{color:"black"}} onClick={handleSave}/></Button>
    <form action="" method="post" className="form">
      <FormControl error variant="standard">
        <FormLabel htmlFor="component-error" id="name-label">
          Name
        </FormLabel>
        <Input
          id="component-error"
          style={{ height: "16px" }}
          onChange={handleChange}
          name="name"
        />
      </FormControl>
      <FormControl className="teamInput" variant="standard">
        <FormLabel htmlFor="size-small-standard">
          Team
        </FormLabel>
        <Autocomplete
        className="auto"
          id="size-small-standard"
          size={"500px"}
          options={teams}
          name="team"
          value={teamInputValue}
        onChange={(event, newValue) => {
          setTeamValue(newValue);
        }}
        
        onInputChange={(event, newInputValue) => {
          setTeamInputValue(newInputValue);
        }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" placeholder="Search..." />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="tags-standard">
          Priority
        </FormLabel>
        <Autocomplete
        className="auto"
          id="tags-standard"
          options={priority}
          value={priorityInputValue}
        onChange={(event, newValue) => {
          setPriorityValue(newValue);
        }}
        defaultValue="Normal"
        
        onInputChange={(event, newInputValue) => {
          setPriorityInputValue(newInputValue);
        }}
          
          renderInput={(params) => (
            <TextField {...params} variant="standard"/>
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="status">
          Status
        </FormLabel>
        <Autocomplete
        className="auto"
          id="tags-standard status "
          options={status}
          value={statusInputValue}
        onChange={(event, newValue) => {
          setStatusValue(newValue);
        }}
        defaultValue="New"
        
        onInputChange={(event, newInputValue) => {
          setStatusInputValue(newInputValue);
        }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" placeholder="Favorites" />
          )}
        />
      </FormControl>
      <FormControl>
      <FormLabel htmlFor="sdate">
          State date
        </FormLabel>
        <Input type="date" onChange={handleChange} value={today} name="sdate" style={{ height: "16px",paddingBottom:"10px" }} defaultValue={new Date().getDate()}></Input>
      </FormControl>
      <FormControl>
      <FormLabel htmlFor="deadline" >
          Task deadline
        </FormLabel>
        <Input type="date" onChange={handleChange} name="deadline" style={{ height: "16px",paddingBottom:"10px" }}></Input>
      </FormControl>
      <FormControl>
      <FormLabel htmlFor="taskDuration">
          Task duration
        </FormLabel>
        <Input type="number" onChange={handleChange} name="taskDuration" style={{ height: "16px" }}></Input>
      </FormControl>
      <FormControl className="teamInput" variant="standard">
        <FormLabel htmlFor="assign">
          Assigned to
        </FormLabel>
        <Autocomplete
        className="auto"
          id="size-small-standard"
          size={"500px"}
          options={teams}
          name="assign"
          value={assignInputValue}
        onChange={(event, newValue) => {
          setAssignValue(newValue);
        }}
        
        onInputChange={(event, newInputValue) => {
          setAssignInputValue(newInputValue);
        }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" placeholder="Search..." />
          )}
        />
      </FormControl>
      <FormLabel>Description</FormLabel>
      <TextareaAutosize className="text-area" style={{height:"300px"}}>
          
      </TextareaAutosize>
    </form>
    </>
  );
}
