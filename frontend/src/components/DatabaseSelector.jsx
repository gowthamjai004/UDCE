import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function DatabaseSelector({
  databases,
  database,
  onDatabaseChange,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel>Database</InputLabel>

      <Select
        value={database}
        label="Database"
        onChange={onDatabaseChange}
      >
        <MenuItem value="">
          <em>Select Database</em>
        </MenuItem>

        {databases.map((db) => (
          <MenuItem key={db} value={db}>
            {db}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DatabaseSelector;