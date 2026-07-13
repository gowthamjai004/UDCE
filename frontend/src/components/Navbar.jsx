import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip
} from "@mui/material";

import StorageIcon from "@mui/icons-material/Storage";

function Navbar() {

  return (

    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300
      }}
    >

      <Toolbar>

        <StorageIcon sx={{ mr: 2 }} />

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >

          UDCE - Universal Data Cleaning Engine

        </Typography>

        <Chip
          label="MongoDB Connected"
          color="success"
        />

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;