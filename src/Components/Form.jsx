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

export default function Form(props) {
  const { data } = props;
  const [back, setBack] = useState(false);
  const [editData, setEditData] = useState({ id: 0, version: 0 });
  const d = new Date();
  const today = d.getFullYear() + "-" + "0" + d.getMonth() + "-" + d.getDate();

  const [inputDetails, setInputDetails] = useState({
    name: data?.name,
    taskDate: today || data.taskDate,
    deadline: data?.deadline || "",
    taskDuration: data?.taskDuration || "",
  });
  const [inputAutoDetails, setInputAutoDetails] = useState({
    team: data?.team || "",
    priority: data?.priority || "",
    status: data?.status || "",
    assign: data?.assign || "",
    desc: data?.desc || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputDetails((x) => {
      return { ...x, [name]: value };
    });
  };

  const teams = ["North", "South", "IDF-EXP", "General"];
  const code = ["NTH", "STH", "EXP", "GNL"];
  const priority = ["low", "normal", "high", "urgent"];
  const priorityLabel = ["Low", "Normal", "High", "Urgent"];
  const status = ["new", "in-progress", "closed", "canceled"];
  const statusLabel = ["New", "In Progress", "Closed", "Canceled"];

  const handleSave = () => {
    if (inputDetails.name === "" || inputDetails.name === null) {
    } else {
      const url = "/ws/rest/com.axelor.team.db.TeamTask";
      const autoDetails = {
        ...inputAutoDetails,
        team: {
          code: code[teams.indexOf(inputAutoDetails.team)],
          name: inputAutoDetails.team,
          id: teams.indexOf(inputAutoDetails.team) + 1,
        },
      };

      const details = {
        ...inputDetails,
        ...autoDetails,
      };

      if (props.edit) {
        const body = {
          data: { ...details, id: editData.id, version: editData.version },
        };
        service.post(url, body);
      } else {
        const body = { data: { ...details } };
        service.post(url, body);
      }
    }
  };
  const handleUpdate = () => {
    const fetchUrl =
      "ws/rest/com.axelor.team.db.TeamTask/" + props.editId + "/fetch";
    if (props.edit) {
      service.post(fetchUrl).then((data) => {
        setEditData({ id: data.data[0].id, version: data.data[0].version });
      });
    }
  };
  useEffect(() => {
    handleUpdate();
  }, []);

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
                value={inputDetails.name}
              />
            </FormControl>
            <FormControl className="teamInput" variant="standard">
              <FormLabel htmlFor="size-small-standard">Team</FormLabel>
              <Autocomplete
                className="auto"
                id="size-small-standard"
                size={"500px"}
                options={teams}
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
                // priorityLabel[priority.indexOf(option)]
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
                value={inputDetails.taskDate}
                name="sdate"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="deadline">Task deadline</FormLabel>
              <Input
                type="date"
                onChange={handleChange}
                value={inputDetails.deadline}
                name="deadline"
                style={{ height: "16px", paddingBottom: "10px" }}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="taskDuration">Task duration</FormLabel>
              <Input
                type="number"
                onChange={handleChange}
                name="taskDuration"
                style={{ height: "16px" }}
              ></Input>
            </FormControl>
            <FormControl className="teamInput" variant="standard">
              <FormLabel htmlFor="assign">Assigned to</FormLabel>
              <Autocomplete
                className="auto"
                id="size-small-standard"
                size={"500px"}
                options={teams}
                name="assign"
                value={inputAutoDetails.assign}
                onChange={(event, newValue) => {
                  setInputAutoDetails((x) => {
                    return { ...x, assign: newValue };
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
              style={{ height: "300px" }}
              onChange={(event, newValue) => {
                setInputAutoDetails((x) => {
                  return { ...x, desc: newValue };
                });
              }}
            ></TextareaAutosize>
          </form>
        </div>
      )}
    </>
  );
}
