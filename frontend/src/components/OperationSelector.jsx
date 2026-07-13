import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function OperationSelector({
  operations,
  selectedOperations,
  handleOperation,
}) {
  return (
    <>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Cleaning Operations
      </Typography>

      <FormGroup>
        {operations.map((operation) => (
          <FormControlLabel
            key={operation}
            control={
              <Checkbox
                checked={selectedOperations.includes(operation)}
                onChange={() => handleOperation(operation)}
              />
            }
            label={operation.replaceAll("_", " ")}
          />
        ))}
      </FormGroup>
    </>
  );
}

export default OperationSelector;