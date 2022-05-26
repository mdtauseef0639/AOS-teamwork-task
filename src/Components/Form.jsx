import React, { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Task from "./Task";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import service from "../service";
import { useEffect } from "react";

import {assignData,teamsData,priority,priorityLabel,status,statusLabel} from "../../src/test"

export default function Form(props) {
  const { getData } = props;
  
  
// const editData = {
//   name: getData.name,
//     taskDate:getData.taskDate,
//     taskDeadline:getData.taskDeadline,
//     taskDuration:getData.taskDuration,
//     team: getData.team,
//     priority: getData.priority,
//     status: getData.status,
//     assignedTo: getData.assignedTo,
//     description: getData.description
// }


  const [back, setBack] = useState(false);
  const [edit, setEdit] = useState(true);
  const d = new Date();
  const today = d.getFullYear() + "-" + "0" + d.getMonth() + "-" + d.getDate();

  const assignOption = assignData.map((x,i,assign)=>{
    return assign[i].name
  })

const assignCode = assignData.map((x,i,assign)=>{
  return assign[i].code
}) 

const assignId = assignData.map((x,i,assign)=>{
  return assign[i].partner.id
})


  const [inputDetails, setInputDetails] = useState({

  });
  const [inputAutoDetails, setInputAutoDetails] = useState({
    team: getData?.team||"",
    priority: getData?.priority || "normal",
    status: getData?.status || "new",
    assignedTo: getData?.assignedTo|| "",
    description: getData?.description || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((x) => {
      
      return { ...x, [name]: value };
      
    });
    
  };

const teamsName = teamsData.map((x,i,team)=>{
  return team[i].name
})

  const handleSave = () => {
    var autoDetails={}
    if (!inputDetails.name) {
    } else {
      
      const url = "/ws/rest/com.axelor.team.db.TeamTask";
      if(inputAutoDetails.team===""){
        delete inputAutoDetails.team
      }
      else if(inputAutoDetails.assignedTo==="")
      {
        delete inputAutoDetails.assignedTo
      }
     else if(inputAutoDetails.description==="")
     {
       autoDetails={...inputAutoDetails,description:null}
     }
      else{
        
         autoDetails = {
          ...inputAutoDetails,
          team: {
            id: teamsData[teamsName.indexOf(inputAutoDetails.team)].id,
            name: inputAutoDetails.team,
            code: teamsData[teamsName.indexOf(inputAutoDetails.team)].code
          },
        assignedTo:{
          id:assignId[assignOption.indexOf(inputAutoDetails.assignedTo)],
          fullName:inputAutoDetails.assignedTo,
          code:assignCode[assignOption.indexOf(inputAutoDetails.assignedTo)]
        }}
        
      }
      console.log(autoDetails)
      
      let details = {
        ...inputDetails,
        ...autoDetails,
      };

      if(details.taskDuration==="")
      {
        details={
            ...details,taskDuration:0
        }
      }
      if(details.taskDeadline==="")
      {
        details={
            ...details,taskDeadline:null
        }
      }
      if(details.description===null)
      {
        details={
          ...details,description:""
        }
      }
      
      if (getData) {
        // console.log("getData:",getData)
        // console.log("details:",details)  
        const updatedValue={}
        Object.entries(details).filter((x,i)=>{
          return x[1]!==getData[x[0]]
      }).forEach(
          (x,i)=>{
              updatedValue[x[0]]=x[1]
          })

          
          
         
          

        const body = {
          data: { ...getData,...updatedValue},
        };
        service.post(url, body);
      } else {
        const body = { data: { ...details } };
        service.post(url, body);
      }
      
      
      
    }
   
  };

  
  
useEffect(()=>{
  setInputDetails(
    {
      name: getData?.name|| "",
      taskDate:getData?.taskDate || today,
      taskDeadline:getData?.taskDeadline || "",
      taskDuration:getData?.taskDuration || "",
    }
  )

  setInputAutoDetails(
    {
      team: getData?.team||"",
      priority: getData?.priority||"normal",
      status: getData?.status||"new",
      assignedTo: getData?.assignedTo||"",
      description: getData?.description||"",
    }
  )
},[getData])


  const handleBack = () => {
    setBack(true);
  };

  return (
    <>
      {back ? (
        <Task handleAdd={props.handleAdd} />
      ) : (
        <div className="form-conatiner">
          <div className="form-button-container">
            <Button variant="text">
              <ArrowBackIcon style={{ color: "black" }} onClick={handleBack} />
            </Button>
            <Button variant="text">
              <SaveIcon style={{ color: "black" }} onClick={handleSave} />
            </Button>
          </div>
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
                value={inputDetails.name||getData?.name}
              />
            </FormControl>
            <FormControl className="teamInput" variant="standard">
              <FormLabel htmlFor="size-small-standard">Team</FormLabel>
              <Autocomplete
                className="auto"
                id="size-small-standard"
                size={"500px"}
                options={teamsData.map((x,i,teams)=>{
                  return teams[i].name
                })}
                name="team"
                value={inputAutoDetails.team}
                onChange={(event, newValue) => {
                  setInputAutoDetails((x) => {
                    return { ...x, team: newValue };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Search..."
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tags-standard">Priority</FormLabel>
              <Autocomplete
                className="auto"
                id="tags-standard"
                options={priority}
                value={inputAutoDetails.priority}
                getOptionLabel={(option) =>
                  typeof priorityLabel[priority.indexOf(option)] === "string" ||
                  priorityLabel[priority.indexOf(option)] instanceof String
                    ? priorityLabel[priority.indexOf(option)]
                    : "Normal"
                }
                defaultValue={"normal"}
               
                onChange={(event, newValue) => {
                  setInputAutoDetails((x) => {
                    return { ...x, priority: newValue };
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Autocomplete
                className="auto"
                id="tags-standard status"
                options={status}
                value={inputAutoDetails.status}
                getOptionLabel={(option) =>
                  typeof statusLabel[status.indexOf(option)] === "string" ||
                  statusLabel[status.indexOf(option)] instanceof String
                    ? statusLabel[status.indexOf(option)]
                    : "New"
                }
                defaultValue={"new"}
                onChange={(event, newValue) => {
                  setInputAutoDetails((x) => {
                    return { ...x, status: newValue };
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="sdate">State date</FormLabel>
              <Input
                type="date"
                onChange={handleChange}
                value={inputDetails.taskDate|| getData?.taskDate || today}
                name="taskDate"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="deadline">Task deadline</FormLabel>
              <Input
                type="date"
                onChange={handleChange}
                value={inputDetails.taskDeadline || getData?.taskDeadline || null}
                name="taskDeadline"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="taskDuration">Task duration</FormLabel>
              <Input
                type="number"
                onChange={handleChange}
                value={inputDetails.taskDuration || getData?.taskDuration || null}
                name="taskDuration"
                style={{ height: "16px" }}
              ></Input>
            </FormControl>
            <FormControl className="teamInput" variant="standard">
              <FormLabel htmlFor="assignedTo">Assigned to</FormLabel>
              <Autocomplete
                className="auto"
                id="size-small-standard"
                size={"500px"}
                options={assignOption}
                name="assignedTo"
                value={inputAutoDetails.assignedTo}
                
                onChange={(event, newValue) => {
                  setInputAutoDetails((x) => {
                    return { ...x, assignedTo: newValue };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Search..."
                  />
                )}
              />
            </FormControl>
            <FormLabel>Description</FormLabel>

            <TextareaAutosize
              className="text-area"
              name="description"
              style={{ height: "300px" }}
              value={inputAutoDetails.description}
              onChange={(e) => {
                setInputAutoDetails((x) => {
                  return { ...x, description: e.target.value};
                });
              }}
            ></TextareaAutosize>
          </form>
        </div>
      )}
    </>
  );
}
