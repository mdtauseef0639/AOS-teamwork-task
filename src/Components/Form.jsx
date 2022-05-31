import React, { Children, PureComponent, useState } from "react";
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

import {
  priority,
  priorityLabel,
  status,
  statusLabel,
} from "../../src/test";


import { OverlayTrigger, Tooltip } from "react-bootstrap";


export default function Form(props) {
  const { getData } = props;
const [open,setOpen] = useState(false)
  const [back, setBack] = useState(false);

const [editData,setEditData] = useState(getData)
  const [currData, setCurrData] = useState();

  const [assign,setAssign] = useState({})
  const [team,setTeam] = useState({})

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
    setAssign(data.data)
  })
}

const displayTeam = ()=>{
  const url = "ws/rest/com.axelor.team.db.Team/search"
  const body={fields:[ "id","name", "code"]}
  
  service.post(url,body).then((data)=>{
    setTeam(data.data)
  })
}




  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((x) => {
      return { ...x, [name]: value };
    });
  };

  const handleSave = () => {
   if(inputDetails?.name ||getData?.name) {
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
            return x[1] !== getData[x[0]];
          })
          .forEach((x, i) => {
            updatedValue[x[0]] = x[1];
          });

        const body = {
          data: {
            ...updatedValue,
            id: getData.id,
            version: getData.version,
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

  

  const handleBack = () => {
    setBack(true);
  };

  
  const controlledValue = (propertyName, defaultValue) =>
    Object.keys(inputDetails).includes(propertyName) &&
    inputDetails[propertyName] !== ""
      ? inputDetails[propertyName]
      : Object.keys(getData?getData:{}).includes(propertyName) &&
        getData[propertyName] !== null &&
        inputDetails[propertyName] !== ""
      ? getData[propertyName]
      : defaultValue


      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      const handleFocus=(e)=>{
        console.log(e)
      }
     
  return (
    <>
      {back ? (
        <Task />
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
              
              <FormLabel htmlFor="component-error" id="name-label" onMous={handleFocus}>
                Name
              </FormLabel>  
              <Input
                id="component-error"
                style={{ height: "16px" }}
                onChange={handleChange}
                name="name"
                // value={inputDetails.name || getData?.name || ""}
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
                options={Object.entries(team).map((x,i)=>{
                  return x[1].name
                })}
                name="team"
                value={inputDetails?.team?.name || getData?.team?.name || ""}
                onChange={(event, newValue) => {
                  let formattedValue = team.find(
                    (v) => v.name === newValue
                  );
                  setInputDetails((prev) => ({
                    ...prev,
                    team: formattedValue,
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
                value={inputDetails?.priority || getData?.priority || "normal"}
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
                value={inputDetails?.status || getData?.status || "new"}
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
                value={inputDetails.taskDate || getData?.taskDate || today}
                name="taskDate"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="deadline">Task deadline</FormLabel>
              <Input
                type="date"
                onChange={handleChange}
                value={inputDetails.taskDeadline || getData?.taskDeadline || ""}
                name="taskDeadline"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="taskDuration">Task duration</FormLabel>
              <Input
                type="number"
                onChange={handleChange}
                value={inputDetails.taskDuration || getData?.taskDuration || ""}
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
                options={Object.entries(assign).map((x,i)=>{
                  return x[1].name
                })}
                name="assignedTo"
                value={
                  inputDetails.assignedTo?.fullName ||
                  getData?.assignedTo?.fullName ||
                  ""
                }
                onClick={displayAssignTo}
                onChange={(event, newValue) => {
                  let formattedValue = assign.find(
                    (v) => v.fullName === newValue
                  );
                  setInputDetails((prev) => ({
                    ...prev,
                    assignedTo: formattedValue,
                  }));
                  
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Search..."
                    onClick={displayAssignTo}
                  />
                )}
              />
            </FormControl>
            <FormLabel>Description</FormLabel>

            <TextareaAutosize
              className="text-area"
              name="description"
              style={{ height: "300px" }}
              value={inputDetails.description || getData?.description || ""}
              onChange={(e) => {
                setInputDetails((x) => {
                  return { ...x, description: e.target.value };
                });
              }}
            ></TextareaAutosize>
          </form>
         
        </div>
      )}
    </>
  );
}
