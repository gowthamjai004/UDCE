import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";

function SaveModeSelector({
  saveMode,
  setSaveMode,
  outputCollection,
  setOutputCollection,
}) {
  return (
    <Box sx={{ mt: 4 }}>

      <FormControl>

        <FormLabel>

          Save Options

        </FormLabel>

        <RadioGroup
          value={saveMode}
          onChange={(e) => setSaveMode(e.target.value)}
        >

          <FormControlLabel
            value="new"
            control={<Radio />}
            label="Save as New Collection"
          />

          <FormControlLabel
            value="overwrite"
            control={<Radio />}
            label="Update Existing Collection"
          />

          <FormControlLabel
            value="download"
            control={<Radio />}
            label="Download Only"
          />

        </RadioGroup>

      </FormControl>

      {saveMode === "new" && (

        <TextField
          fullWidth
          margin="normal"
          label="Output Collection"
          value={outputCollection}
          onChange={(e) =>
            setOutputCollection(e.target.value)
          }
        />

      )}

    </Box>
  );
}

export default SaveModeSelector;