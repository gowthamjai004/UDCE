import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Universal Data Cleaning Engine
        </Typography>

        <Button
          color="inherit"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          onClick={() => navigate("/recovery")}
        >
          Recovery Center
        </Button>

        <Button
          color="inherit"
          onClick={() => navigate("/")}
        >
          Disconnect
        </Button>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;