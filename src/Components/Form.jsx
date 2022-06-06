import React, {useEffect, useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate,useParams } from "react-router-dom";


import TextareaAutosize from "@mui/material/TextareaAutosize";
import service from "../service";

import {
  priority,
  priorityLabel,
  status,
  statusLabel,
} from "../../src/test";



import Snack from "./Snackbar";

export default function Form(props) {
  const[editData,setEditData] = useState()

const [open,setOpen] = useState(false)
 
const {id} =useParams()

  const [currData, setCurrData] = useState();

  const [users,setUsers] = useState([])
  const [teams,setTeams] = useState([])

  const navigate = useNavigate()

  const d = new Date();
  const today = d.getFullYear() + "-" + "0" + d.getMonth() + "-" + d.getDate();

  const [inputDetails, setInputDetails] = useState({
    taskDuration: 0,
    priority: "normal",
    status: "new",
    taskDate: "",
  });
const displayAssignTo =()=>{
  const url = "/ws/rest/com.axelor.auth.db.User/search"
  const body={fields:[ "id", "fullName", "partner", "name", "code" ]}
  
  service.post(url,body).then((data)=>{
    setUsers(data.data)
  })
}

const displayTeam = ()=>{
  const url = "ws/rest/com.axelor.team.db.Team/search"
  const body={fields:[ "id","name", "code"]}
  
  service.post(url,body).then((data)=>{
    setTeams(data.data)
  })
}



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((x) => {
      return { ...x, [name]: value };
    });
  };

  const handleSave = () => {
   if(inputDetails?.name ||editData?.name) {
      const url = "/ws/rest/com.axelor.team.db.TeamTask";

      let details = {
        ...inputDetails,
      };
      if (details.taskDuration === "") {
        details = {
          ...details,
          taskDuration: 0,
        };
      }
      if (details.taskDeadline === "") {
        details = {
          ...details,
          taskDeadline: null,
        };
      }
      if (details.description === null) {
        details = {
          ...details,
          description: "",
        };
      }
      if (editData) {
        const updatedValue = {};
        Object.entries(details)
          .filter((x, i) => {
            return x[1] !== editData[x[0]];
          })
          .forEach((x, i) => {
            updatedValue[x[0]] = x[1];
          });

        const body = {
          data: {
            ...updatedValue,
            id: editData.id,
            version: editData.version,
          },
        };

        service.post(url, body).then((data) => {
          setCurrData(data.data[0]);
          setEditData();
        });
      } else if (currData) {
        const updatedValue = {};
        Object.entries(details)
          .filter((x, i) => {
            return x[1] !== currData[x[0]];
          })
          .forEach((x, i) => {
            updatedValue[x[0]] = x[1];
          });

        const body = {
          data: {
            ...updatedValue,
            id: currData.id,
            version: currData.version,
          },
        };

        service.post(url, body).then((data) => {
          setCurrData(data.data[0])
          
        });
      } else {
        const body = { data: { ...details } };
        service.post(url, body).then((data) => {
          setCurrData(data.data[0]);
          
          
        })
        
      }
      
    }
    else{
      setOpen(true)
    }
    
  };

  



  
  const controlledValue = (propertyName, defaultValue) =>
    Object.keys(inputDetails).includes(propertyName) &&
    inputDetails[propertyName] !== ""
      ? inputDetails[propertyName]
      : Object.keys(editData?editData:{}).includes(propertyName) &&
        editData[propertyName] !== null &&
        inputDetails[propertyName] !== ""
      ? editData[propertyName]
      : defaultValue


      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
     
      useEffect(()=>{
        if(id){const url =
      "/ws/rest/com.axelor.team.db.TeamTask/" + id + "/fetch";
      service.post(url).then((data)=>{
        setEditData(data?.data[0])
      })}
      },[id])
     
  return (
    <div className="Container">
        <div className="form-conatiner">
          <div className="form-button-container">
            <Button variant="text">
              <ArrowBackIcon style={{ color: "black" }} onClick={()=>{
                navigate("..")
              }} />
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
                // value={inputDetails.name || editData?.name || ""}
                value={ 
                  
                  controlledValue("name","")}
                
              />
            </FormControl>
            <FormControl className="teamInput" variant="standard">
              <FormLabel htmlFor="size-small-standard">Team</FormLabel>
              <Autocomplete
                className="auto"
                id="size-small-standard"
                size={"500px"}
                options={teams}
                getOptionLabel={(options) =>
                  typeof options.name === "string" ||
                  options.name instanceof String
                    ? options.name:""
                }
                name="team"
                value={inputDetails?.team || editData?.team || ""}
                onChange={(event, newValue) => {
                  
                  setInputDetails((prev) => ({
                    ...prev,
                    team: newValue,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                  onSelect={displayTeam}
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
                value={inputDetails?.priority || editData?.priority || "normal"}
                getOptionLabel={(option) =>
                  typeof priorityLabel[priority.indexOf(option)] === "string" ||
                  priorityLabel[priority.indexOf(option)] instanceof String
                    ? priorityLabel[priority.indexOf(option)]
                    : "Normal"
                }
                defaultValue={"normal"}

                
                
                onChange={(event, newValue) => {
                  setInputDetails((x) => {
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
                value={inputDetails?.status || editData?.status || "new"}
                getOptionLabel={(option) =>
                  typeof statusLabel[status.indexOf(option)] === "string" ||
                  statusLabel[status.indexOf(option)] instanceof String
                    ? statusLabel[status.indexOf(option)]
                    : "New"
                }
                defaultValue={"new"}
                onChange={(event, newValue) => {
                  setInputDetails((x) => {
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
                value={inputDetails.taskDate || editData?.taskDate || today}
                name="taskDate"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="deadline">Task deadline</FormLabel>
              <Input
                type="date"
                onChange={handleChange}
                value={inputDetails.taskDeadline || editData?.taskDeadline || ""}
                name="taskDeadline"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="taskDuration">Task duration</FormLabel>
              <Input
                type="number"
                onChange={handleChange}
                value={inputDetails.taskDuration || editData?.taskDuration || ""}
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
                options={users}
                getOptionLabel={(options) =>
                  typeof options.fullName === "string" ||
                  options.fullName instanceof String
                    ? options.fullName
                    : ""
                }
                name="assignedTo"
                value={editData?.assignedTo ||inputDetails?.assignedTo ||   ""}
                onChange={(event, newValue) => {
                  
                  setInputDetails((prev) => ({
                    ...prev,
                    assignedTo: newValue,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                  onSelect={displayAssignTo}
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
              value={inputDetails.description || editData?.description || ""}
              onChange={(e) => {
                setInputDetails((x) => {
                  return { ...x, description: e.target.value };
                });
              }}
            ></TextareaAutosize>
          </form>
         <Snack message={<><p><b>The following fields are invalid:</b></p>
         <ul><li>Name</li></ul></>} handleClose={handleClose} handleOpen={open}/>
        </div>
        </div>
     
  );
}
