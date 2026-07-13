import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

function ConnectionForm({ onConnect }) {
  const [form, setForm] = useState({
    database_type: "mongodb",
    host: "localhost",
    port: 27017,
    username: "",
    password: "",
    database: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    onConnect(form);
  };

  return (
    <Paper
      elevation={5}
      sx={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Universal Data Cleaning Engine
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Database Connection
      </Typography>

      <TextField
        select
        fullWidth
        margin="normal"
        name="database_type"
        label="Database Type"
        value={form.database_type}
        onChange={handleChange}
      >
        <MenuItem value="mongodb">MongoDB</MenuItem>
      </TextField>

      <TextField
        fullWidth
        margin="normal"
        name="host"
        label="Host"
        value={form.host}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        name="port"
        label="Port"
        value={form.port}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        name="username"
        label="Username"
        value={form.username}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        name="password"
        type="password"
        label="Password"
        value={form.password}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        name="database"
        label="Default Database (Optional)"
        value={form.database}
        onChange={handleChange}
      />

      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Connect
        </Button>
      </Box>
    </Paper>
  );
}

export default ConnectionForm;