import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const History = () => {
  const histPath =
    "http://localhost:8080/demorest/api/v1/phone-numbers/autocomplete/history";

  //? State to hold user input
  const [inputText, setInputText] = useState("");
  //? State to hold HISTORY
  const [history, setHistory] = useState([]);

  const fetchHistory = async (textIn) => {
    try {
      const response = await axios.get(histPath + `?query=${textIn}`);

      response.status === 200 && setHistory(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    inputText.length === 0 ? setHistory([]) : fetchHistory(inputText);
  }, [inputText]);

  const columns = [
    { field: "idqueryHistory", headerName: "ID", width: 70 },
    { field: "queryDate", headerName: "Query Date", width: 130 },
    { field: "queryPath", headerName: "Query Path", width: 550 },
    {
      field: "queryTime",
      headerName: "Query Time",
      width: 90,
    },
    {
      field: "queryParams",
      headerName: "Query Params",
      width: 120,
    },
  ];

  return (
    <>
      <div className="up">
        <h4>Search query history by name</h4>
        <input
          type="text"
          placeholder="Person name"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="down">
        <DataGrid
          getRowId={(row) => row.idqueryHistory}
          rows={history}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default History;
