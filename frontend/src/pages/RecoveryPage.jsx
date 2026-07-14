import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import RestoreIcon from "@mui/icons-material/Restore";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";


import {
  getBackups,
  restoreBackup,
  deleteBackup,
} from "../services/api";

function RecoveryPage() {

  const [backups, setBackups] = useState([]);

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {

    try {

      const data = await getBackups();

      setBackups(data);

    }

    catch (error) {

      console.error(error);

    }

  };

  const handleRestore = async (id) => {

    const ok = window.confirm(

      "Restore this backup?\n\nCurrent collection will be overwritten."

    );

    if (!ok) return;

    try {

      const result = await restoreBackup(id);

      alert(result.message);

      loadBackups();

    }

    catch (error) {

      console.error(error);

      alert("Restore failed.");

    }

  };

  const handleView = (backup) => {

    alert(

      JSON.stringify(

        backup,

        null,

        2

      )

    );

  };

  const handleDownload = (backup) => {

    const blob = new Blob(

      [

        JSON.stringify(

          backup.data,

          null,

          2

        )

      ],

      {

        type: "application/json"

      }

    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = backup.backup_name + ".json";

    a.click();

    window.URL.revokeObjectURL(url);

  };

const handleDelete = async (id) => {

  const ok = window.confirm(
    "Delete this backup permanently?"
  );

  if (!ok) return;

  try {

    const result = await deleteBackup(id);

    alert(result.message);

    loadBackups();

  }

  catch (error) {

    console.error(error);

    alert("Delete failed.");

  }

};

  return (

    <>

      <Navbar />

      <Box sx={{ p: 4 }}>

        <Typography

          variant="h4"

          align="center"

          gutterBottom

        >

          Recovery Center

        </Typography>

        <TableContainer

          component={Paper}

        >

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>

                  Backup Name

                </TableCell>

                <TableCell>

                  Collection

                </TableCell>

                <TableCell>

                  Records

                </TableCell>

                <TableCell>

                  Created At

                </TableCell>

                <TableCell align="center">

                  Actions

                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {

                backups.map((backup) => (

                  <TableRow key={backup._id}>

                    <TableCell>

                      {backup.backup_name || "-"}

                    </TableCell>

                    <TableCell>

                      {backup.original_collection}

                    </TableCell>

                    <TableCell>

                      {backup.records}

                    </TableCell>

                    <TableCell>

                      {

                        new Date(

                          backup.created_at

                        ).toLocaleString()

                      }

                    </TableCell>

                    <TableCell align="center">

                      <Tooltip title="View">

                        <IconButton

                          color="primary"

                          onClick={() =>

                            handleView(backup)

                          }

                        >

                          <VisibilityIcon />

                        </IconButton>

                      </Tooltip>

                      <Tooltip title="Restore">

                        <IconButton

                          color="warning"

                          onClick={() =>

                            handleRestore(

                              backup._id

                            )

                          }

                        >

                          <RestoreIcon />

                        </IconButton>

                      </Tooltip>

                      <Tooltip title="Download">

                        <IconButton

                          color="success"

                          onClick={() =>

                            handleDownload(

                              backup

                            )

                          }

                        >

                          <DownloadIcon />

                        </IconButton>

                      </Tooltip>

                      <Tooltip title="Delete">

                        <IconButton

                          color="error"

                          onClick={() => handleDelete(backup._id)}

                        >

                          <DeleteIcon />

                        </IconButton>

                      </Tooltip>

                    </TableCell>

                  </TableRow>

                ))

              }

            </TableBody>

          </Table>

        </TableContainer>

      </Box>

    </>

  );

}

export default RecoveryPage;