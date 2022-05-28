import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import service from "../service";
import Form from "./Form";
import { priority, priorityLabel, status, statusLabel } from "../test";

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

export default function Task() {
  const [data, setData] = useState([]);
  const [entryClicked, setEntryClicked] = useState(false);
  const [clickedData, setClickedData] = useState();
  const [refresh, setRefresh] = useState(0);

  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleDoubleClick = (e) => {
    setEntryClicked(true);
    setEdit(true);
    const url =
      "/ws/rest/com.axelor.team.db.TeamTask/" + e["row"].id + "/fetch";
    getEditData(url);
  };

  const getEditData = (url) => {
    service.post(url).then((data) => {
      const fetchData = data.data[0];

      setClickedData(fetchData);
    });
  };

  const handleClick = (e) => {
    setEntryClicked(true);

    setClickedData(e);
  };

  const handleDelete = () => {
    const url = "ws/rest/com.axelor.team.db.TeamTask/removeAll";
    const body = { records: [{ id: clickedData.id }] };
    service.post(url, body);
    setRefresh(refresh + 1);
  };

  const rows = (data || []).map((x) => {
    if (x.team === null) {
      return {
        id: x.id,
        name: x.name,
        team: "",
        taskDate: x.taskDate,
        status: statusLabel[status.indexOf(x.status)],
        priority: priorityLabel[priority.indexOf(x.priority)],
      };
    } else {
      return {
        id: x.id,
        name: x.name,
        team: x.team.name,
        taskDate: x.taskDate,
        status: statusLabel[status.indexOf(x.status)],
        priority: priorityLabel[priority.indexOf(x.priority)],
      };
    }
  });

  useEffect(() => {
    const url = "ws/rest/com.axelor.team.db.TeamTask/search";
    service.post(url).then((data) => {
      setData(data.data);
    });
  }, []);

  useEffect(() => {
    const url = "ws/rest/com.axelor.team.db.TeamTask/search";
    service.post(url).then((data) => {
      setData(data.data);
    });
  }, [refresh]);
  return add ? (
    <Form />
  ) : edit ? (
    <Form
      getData={clickedData}
      edit={entryClicked}
      editId={clickedData.id}
      getEditData={getEditData}
    />
  ) : (
    <div className="task-container">
      <div className="task-button-container">
        <Button>
          <AddIcon
            style={{ color: "black" }}
            onClick={() => {
              setAdd(true);
            }}
          />
        </Button>

        <Button disabled={!entryClicked} variant="text">
          <DeleteIcon
            style={entryClicked ? { color: "black" } : { color: "silver" }}
            onClick={handleDelete}
          />
        </Button>
      </div>

      <div style={{ height: "50em", width: "48em" }}>
        <DataGrid
          className="data-grid"
          sx={{
            "& .css-17jjc08-MuiDataGrid-footerContainer , .css-i4bv87-MuiSvgIcon-root":
              {
                display: "none",
              },
          }}
          rows={rows || [""]}
          onRowDoubleClick={handleDoubleClick}
          onRowClick={handleClick}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          multipleSelection={true}
        />
      </div>
    </div>
  );
}
