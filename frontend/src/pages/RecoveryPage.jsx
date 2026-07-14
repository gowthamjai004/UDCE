import { useEffect, useState } from "react";

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

import {
  getBackups,
  restoreBackup
} from "../services/api";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RestoreIcon from "@mui/icons-material/Restore";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

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

      console.log(error);

    }

  };
  

  return (

    <div style={{ padding: 30 }}>

      <Typography
        variant="h4"
        gutterBottom
      >

        Recovery Center

      </Typography>

      <TableContainer component={Paper}>

        <Table>

          <TableHead>
  <TableRow>
    <TableCell>Backup Name</TableCell>
    <TableCell>Collection</TableCell>
    <TableCell>Records</TableCell>
    <TableCell>Created At</TableCell>
    <TableCell>Actions</TableCell>
  </TableRow>
</TableHead>

          <TableBody>

            {

              backups.map((backup) => (

                <TableRow key={backup._id}>

    <TableCell>
        {backup.backup_name}
    </TableCell>

    <TableCell>
        {backup.original_collection}
    </TableCell>

    <TableCell>
        {backup.records}
    </TableCell>

    <TableCell>
        {new Date(
            backup.created_at
        ).toLocaleString()}
    </TableCell>

    <TableCell>

        <TableCell>

    <Tooltip title="View Backup">

        <IconButton color="primary">

            <VisibilityIcon />

        </IconButton>

    </Tooltip>

    <Tooltip title="Restore">

        <IconButton
            color="warning"
            onClick={() => handleRestore(backup._id)}
        >

            <RestoreIcon />

        </IconButton>

    </Tooltip>

    <Tooltip title="Download">

        <IconButton color="success">

            <DownloadIcon />

        </IconButton>

    </Tooltip>

    <Tooltip title="Delete">

        <IconButton color="error">

            <DeleteIcon />

        </IconButton>

    </Tooltip>

</TableCell>

    </TableCell>

</TableRow>

              ))

            }

          </TableBody>

        </Table>

      </TableContainer>

    </div>

  );

}

export default RecoveryPage;