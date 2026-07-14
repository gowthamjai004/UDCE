import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import CollectionSelector from "../components/CollectionSelector";
import OperationSelector from "../components/OperationSelector";
import DuplicateColumnSelector from "../components/DuplicateColumnSelector";
import SaveModeSelector from "../components/SaveModeSelector";
import ActionButtons from "../components/ActionButtons";
import DataTable from "../components/DataTable";
import Report from "../components/Report";

import {
  getCurrentDatabase,
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

  const navigate = useNavigate();

  const [currentDatabase, setCurrentDatabase] = useState("");

  const [collections, setCollections] = useState([]);

  const [collection, setCollection] = useState("");

  const [operations, setOperations] = useState([]);

  const [selectedOperations, setSelectedOperations] = useState([]);

  const [columns, setColumns] = useState([]);

  const [selectedColumns, setSelectedColumns] = useState([]);

  const [rows, setRows] = useState([]);

  const [report, setReport] = useState(null);

  const [saveMode, setSaveMode] = useState("new");

  const [outputCollection, setOutputCollection] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // -----------------------------------------------------
// Load Initial Data
// -----------------------------------------------------

useEffect(() => {

  const connection = localStorage.getItem("udce_connection");

  if (!connection) {

    navigate("/");

    return;

  }

  loadDashboard();

}, []);


// -----------------------------------------------------
// Load Dashboard
// -----------------------------------------------------

const loadDashboard = async () => {

  try {

    const db = await getCurrentDatabase();

    setCurrentDatabase(db);

    const collectionsData = await getCollections(db);

    setCollections(collectionsData);

    const operationsData = await getOperations();

    setOperations(operationsData);

  }

  catch (error) {

    console.error(error);

    showSnackbar(
      "Unable to load dashboard.",
      "error"
    );

  }

};


// -----------------------------------------------------
// Snackbar Helper
// -----------------------------------------------------

const showSnackbar = (

  message,

  severity = "success"

) => {

  setSnackbarMessage(message);

  setSnackbarSeverity(severity);

  setSnackbarOpen(true);

};


// -----------------------------------------------------
// Collection Changed
// -----------------------------------------------------

const handleCollectionChange = (event) => {

  const value = event.target.value;

  setCollection(value);

  setOutputCollection(
    value + "_cleaned"
  );

};


// -----------------------------------------------------
// Operation Selection
// -----------------------------------------------------

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


// -----------------------------------------------------
// Duplicate Column Selection
// -----------------------------------------------------

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


// -----------------------------------------------------
// Preview Data
// -----------------------------------------------------

const previewData = async () => {

  if (!collection) {

    showSnackbar(

      "Please select a collection.",

      "warning"

    );

    return;

  }

  try {

    const documents = await getDocuments(

      currentDatabase,

      collection

    );

    setRows(documents);

    const cols = await getColumns(

      currentDatabase,

      collection

    );

    setColumns(cols);

    setSelectedColumns(cols);

  }

  catch (error) {

    console.error(error);

    showSnackbar(

      "Unable to load data.",

      "error"

    );

  }

};


// -----------------------------------------------------
// Clean Data
// -----------------------------------------------------

const runCleaning = async () => {

  if (!collection) {

    showSnackbar(

      "Please select a collection.",

      "warning"

    );

    return;

  }

  if (selectedOperations.length === 0) {

    showSnackbar(

      "Select at least one operation.",

      "warning"

    );

    return;

  }

  if (saveMode === "overwrite") {

    const ok = window.confirm(

      `Overwrite "${collection}" ?`

    );

    if (!ok) return;

  }

  const payload = {

    database: currentDatabase,

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

        : outputCollection,

  };

  try {

    const result = await cleanData(

      payload

    );

    setRows(result.cleaned_data);

    setReport(result.report);

    showSnackbar(

      "Cleaning completed successfully."

    );

  }

  catch (error) {

    console.error(error);

    showSnackbar(

      "Cleaning failed.",

      "error"

    );

  }

};
// -----------------------------------------------------
// Export JSON
// -----------------------------------------------------

const handleExportJSON = async () => {

  if (rows.length === 0) {
    showSnackbar("No data available.", "warning");
    return;
  }

  try {

    const blob = await exportJSON(rows);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "cleaned_data.json";

    link.click();

    window.URL.revokeObjectURL(url);

  }

  catch {

    showSnackbar("JSON Export Failed.", "error");

  }

};

// -----------------------------------------------------
// Export CSV
// -----------------------------------------------------

const handleExportCSV = async () => {

  if (rows.length === 0) {
    showSnackbar("No data available.", "warning");
    return;
  }

  try {

    const blob = await exportCSV(rows);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "cleaned_data.csv";

    link.click();

    window.URL.revokeObjectURL(url);

  }

  catch {

    showSnackbar("CSV Export Failed.", "error");

  }

};

// -----------------------------------------------------
// Export Excel
// -----------------------------------------------------

const handleExportExcel = async () => {

  if (rows.length === 0) {
    showSnackbar("No data available.", "warning");
    return;
  }

  try {

    const blob = await exportExcel(rows);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "cleaned_data.xlsx";

    link.click();

    window.URL.revokeObjectURL(url);

  }

  catch {

    showSnackbar("Excel Export Failed.", "error");

  }

};

// -----------------------------------------------------

const databaseCount = currentDatabase ? 1 : 0;

const collectionCount = collections.length;

const recordCount = rows.length;

const operationCount = operations.length;
return (

<>

<Navbar />

<Box
sx={{
maxWidth:"1400px",
mx:"auto",
p:3
}}
>

<Paper
elevation={4}
sx={{
p:4,
borderRadius:3
}}
>

<Typography
variant="h4"
align="center"
fontWeight="bold"
gutterBottom
>

Universal Data Cleaning Engine

</Typography>

<Divider sx={{mb:3}}/>

<DashboardCards
databaseCount={databaseCount}
collectionCount={collectionCount}
recordCount={recordCount}
operationCount={operationCount}
/>

<Divider sx={{my:3}}/>

<Paper
elevation={1}
sx={{
p:2,
mb:3,
background:"#f8f9fa"
}}
>

<Typography variant="subtitle2">

Connected Database

</Typography>

<Typography
variant="h6"
color="primary"
fontWeight="bold"
>

{currentDatabase}

</Typography>

</Paper>

<CollectionSelector
collections={collections}
collection={collection}
onCollectionChange={handleCollectionChange}
/>

<Box sx={{mt:3}}>

<SaveModeSelector
saveMode={saveMode}
setSaveMode={setSaveMode}
outputCollection={outputCollection}
setOutputCollection={setOutputCollection}
/>

</Box>

<Box sx={{mt:3}}>

<OperationSelector
operations={operations}
selectedOperations={selectedOperations}
handleOperation={handleOperation}
/>

</Box>

<Box sx={{mt:3}}>

<DuplicateColumnSelector
columns={columns}
selectedColumns={selectedColumns}
handleColumnSelection={handleColumnSelection}
/>

</Box>

<Box sx={{mt:3}}>

<ActionButtons
onPreview={previewData}
onClean={runCleaning}
onExportJSON={handleExportJSON}
onExportCSV={handleExportCSV}
onExportExcel={handleExportExcel}
/>

</Box>

<Box sx={{mt:4}}>

<Typography
variant="h6"
gutterBottom
>

Preview

</Typography>

<DataTable rows={rows}/>

</Box>

<Box sx={{mt:4}}>

<Typography
variant="h6"
gutterBottom
>

Cleaning Report

</Typography>

<Report report={report}/>

</Box>

</Paper>

<Snackbar
open={snackbarOpen}
autoHideDuration={3000}
onClose={()=>setSnackbarOpen(false)}
anchorOrigin={{
vertical:"bottom",
horizontal:"right"
}}
>

<Alert
severity={snackbarSeverity}
variant="filled"
onClose={()=>setSnackbarOpen(false)}
>

{snackbarMessage}

</Alert>

</Snackbar>

</Box>

</>

);

}

export default Dashboard;