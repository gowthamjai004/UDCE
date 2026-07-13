import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Button,
} from "@mui/material";

import DatabaseSelector from "../components/DatabaseSelector";
import CollectionSelector from "../components/CollectionSelector";
import OperationSelector from "../components/OperationSelector";
import DuplicateColumnSelector from "../components/DuplicateColumnSelector";
import DataTable from "../components/DataTable";
import Report from "../components/Report";
import ActionButtons from "../components/ActionButtons";
import DashboardCards from "../components/DashboardCards";
import SaveModeSelector from "../components/SaveModeSelector";

import {
  getDatabases,
  getCollections,
  getOperations,
  getDocuments,
  getColumns,
  cleanData,
  exportJSON,
  exportCSV,
  exportExcel,
} from "../services/api";

function Dashboard() {

  // -----------------------------
  // State Variables
  // -----------------------------

  const [databases, setDatabases] = useState([]);
  const [collections, setCollections] = useState([]);
  const [operations, setOperations] = useState([]);

  const [database, setDatabase] = useState("");
  const [collection, setCollection] = useState("");

  const [rows, setRows] = useState([]);

  const [columns, setColumns] = useState([]);

  const [selectedColumns, setSelectedColumns] = useState([]);

  const [selectedOperations, setSelectedOperations] = useState([]);

  const [report, setReport] = useState(null);

  const navigate = useNavigate();

  const [saveMode, setSaveMode] = useState("new");

const [outputCollection, setOutputCollection] = useState("");

  // -----------------------------
  // Load Initial Data
  // -----------------------------

useEffect(() => {

  const connection = localStorage.getItem(
    "udce_connection"
  );

  if (!connection) {

    navigate("/");

    return;

  }

  loadDatabases();

  loadOperations();

}, []);

  // -----------------------------
  // Load Databases
  // -----------------------------

  const loadDatabases = async () => {

    try {

      const data = await getDatabases();

      setDatabases(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // -----------------------------
  // Load Operations
  // -----------------------------

  const loadOperations = async () => {

    try {

      const data = await getOperations();

      setOperations(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // -----------------------------
  // Database Changed
  // -----------------------------

  const handleDatabaseChange = async (event) => {

    const db = event.target.value;

    setDatabase(db);

    setCollection("");

    setRows([]);

    setColumns([]);

    const cols = await getCollections(db);

    setCollections(cols);

  };

  // -----------------------------
  // Collection Changed
  // -----------------------------

const handleCollectionChange = (event) => {

  setCollection(event.target.value);

  setOutputCollection(
    event.target.value + "_cleaned"
  );

};

  // -----------------------------
  // Operation Selection
  // -----------------------------

  const handleOperation = (operation) => {

    if (selectedOperations.includes(operation)) {

      setSelectedOperations(

        selectedOperations.filter(

          op => op !== operation

        )

      );

    }

    else {

      setSelectedOperations(

        [...selectedOperations, operation]

      );

    }

  };

  // -----------------------------
  // Duplicate Column Selection
  // -----------------------------

  const handleColumnSelection = (column) => {

    if (selectedColumns.includes(column)) {

      setSelectedColumns(

        selectedColumns.filter(

          c => c !== column

        )

      );

    }

    else {

      setSelectedColumns(

        [...selectedColumns, column]

      );

    }

  };

  // -----------------------------
  // Preview Data
  // -----------------------------

  const previewData = async () => {

    if (!database || !collection) {

      alert("Please select Database and Collection");

      return;

    }

    try {

      const documents = await getDocuments(
        database,
        collection
      );

      setRows(documents);

      const cols = await getColumns(
        database,
        collection
      );

      setColumns(cols);

      setSelectedColumns(cols);

    }

    catch (error) {

      console.log(error);

      alert("Unable to load documents.");

    }

  };

    // -----------------------------
  // Run Cleaning
  // -----------------------------

  const runCleaning = async () => {

    if (!database || !collection) {

      alert("Please select Database and Collection");

      return;

    }

    if (selectedOperations.length === 0) {

      alert("Please select at least one cleaning operation");

      return;

    }
      if (saveMode === "overwrite") {

    const confirmed = window.confirm(
      `This will permanently replace all data in "${collection}".\n\nDo you want to continue?`
    );

    if (!confirmed) {

      return;

    }

  }


    const payload = {

  database,

  collection,

  operations: selectedOperations,

  duplicate_columns: selectedColumns,

  sort_column: "salary",

  ascending: true,

  save_mode: saveMode,

  save_output: saveMode !== "download",

  output_collection:
    saveMode === "overwrite"
      ? collection
      : outputCollection

};

    try {

        console.log(payload);

      const result = await cleanData(payload);

      setRows(result.cleaned_data);

      setReport(result.report);

      alert("Cleaning completed successfully.");

    }

    catch (error) {

      console.error(error);

      alert("Cleaning failed.");

    }

  };


  const logout = () => {

  localStorage.removeItem("udce_connection");

  navigate("/");

};


  // -----------------------------
// Export JSON
// -----------------------------

const handleExportJSON = async () => {

    if (rows.length === 0) {

        alert("No data available.");

        return;

    }

    try {

        const blob = await exportJSON(rows);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "cleaned_data.json";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    }

    catch (error) {

        console.log(error);

        alert("Export failed.");

    }

};

const handleExportCSV = async () => {

  if (rows.length === 0) {

    alert("No data available.");

    return;

  }

  try {

    const blob = await exportCSV(rows);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "cleaned_data.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert("CSV export failed.");

  }

};

const handleExportExcel = async () => {

  if (rows.length === 0) {

    alert("No data available.");

    return;

  }

  try {

    const blob = await exportExcel(rows);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "cleaned_data.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {

    console.error(error);

    alert("Excel export failed.");

  }

};

const databaseCount = databases.length;

const collectionCount = collections.length;

const recordCount = rows.length;

const operationCount = operations.length;

  // -----------------------------
  // Return UI
  // -----------------------------

  return (

    <Box sx={{ p: 3 }}>

      <Paper
        elevation={4}
        sx={{ p: 4 }}
      >

        <Typography
          variant="h4"
          gutterBottom
        >

          Universal Data Cleaning Engine

        </Typography>
        <SaveModeSelector

    saveMode={saveMode}

    setSaveMode={setSaveMode}

    outputCollection={outputCollection}

    setOutputCollection={setOutputCollection}

/>
        
        <Button
  variant="outlined"
  color="error"
  onClick={logout}
  sx={{ float: "right" }}
>
  Disconnect
</Button>

        <DashboardCards

    databaseCount={databaseCount}

    collectionCount={collectionCount}

    recordCount={recordCount}

    operationCount={operationCount}

/>

        <Divider sx={{ mb: 3 }} />

        <Grid
          container
          spacing={3}
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <DatabaseSelector

              databases={databases}

              database={database}

              onDatabaseChange={handleDatabaseChange}

            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <CollectionSelector

              collections={collections}

              collection={collection}

              onCollectionChange={handleCollectionChange}

            />

          </Grid>

        </Grid>

        <OperationSelector

          operations={operations}

          selectedOperations={selectedOperations}

          handleOperation={handleOperation}

        />

        <DuplicateColumnSelector

          columns={columns}

          selectedColumns={selectedColumns}

          handleColumnSelection={handleColumnSelection}

        />

      <ActionButtons
  onPreview={previewData}
  onClean={runCleaning}
  onExportJSON={handleExportJSON}
  onExportCSV={handleExportCSV}
  onExportExcel={handleExportExcel}
/>

                <DataTable rows={rows} />

        <Report report={report} />

      </Paper>

    </Box>

  );

}

export default Dashboard;