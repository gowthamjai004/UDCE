import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------- Database ----------------

export const getDatabases = async () => {
  const response = await API.get("/databases");
  return response.data;
};

// ---------------- Collections ----------------

export const getCollections = async (database) => {
  const response = await API.get(`/collections/${database}`);
  return response.data;
};

// ---------------- Documents ----------------

export const getDocuments = async (database, collection) => {
  const response = await API.get(
    `/documents/${database}/${collection}`
  );
  return response.data;
};

// ---------------- Operations ----------------

export const getOperations = async () => {
  const response = await API.get("/operations");
  return response.data.operations;
};

// ---------------- Clean Data ----------------

export const cleanData = async (payload) => {
  const response = await API.post("/clean", payload);
  return response.data;
};

// ---------------- Columns ----------------

export const getColumns = async (database, collection) => {

    const response = await API.get(
        `/columns/${database}/${collection}`
    );

    return response.data;

};

// ---------------- Export JSON ----------------

export const exportJSON = async (data) => {

  const response = await API.post(
    "/export/json",
    { data },
    {
      responseType: "blob",
    }
  );

  return response.data;

};

// ---------------- Export CSV ----------------

export const exportCSV = async (data) => {

  const response = await API.post(
    "/export/csv",
    { data },
    {
      responseType: "blob",
    }
  );

  return response.data;

};

// ---------------- Export Excel ----------------

export const exportExcel = async (data) => {

  const response = await API.post(
    "/export/excel",
    { data },
    {
      responseType: "blob",
    }
  );

  return response.data;

};

// ---------------- Recovery ----------------

export const getBackups = async () => {

  const response = await API.get(
    "/recovery/backups"
  );

  return response.data;

};

// ---------------- Connect Database ----------------

export const connectDatabase = async (connection) => {

  const response = await API.post(
    "/connect",
    connection
  );

  return response.data;

};

// ---------------- Restore Backup ----------------

export const restoreBackup = async (backupId) => {

  const response = await API.post(
    `/recovery/restore/${backupId}`
  );

  return response.data;

};

// ---------------- Delete Backup ----------------

export const deleteBackup = async (backupId) => {

  const response = await API.delete(
    `/recovery/delete/${backupId}`
  );

  return response.data;

};

// ---------------- Current Database ----------------

export const getCurrentDatabase = async () => {

  const response = await API.get(
    "/current_database"
  );

  return response.data.database;

};
