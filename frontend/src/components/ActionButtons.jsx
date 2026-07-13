import { Box, Button } from "@mui/material";

function ActionButtons({
  onPreview,
  onClean,
  onExportJSON,
  onExportCSV,
  onExportExcel,
}) {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 3,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Button
        variant="contained"
        onClick={onPreview}
      >
        Preview Data
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={onClean}
      >
        Clean Data
      </Button>

      <Button
        variant="outlined"
        onClick={onExportJSON}
      >
        Export JSON
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={onExportCSV}
      >
        Export CSV
      </Button>

      <Button
        variant="outlined"
        color="warning"
        onClick={onExportExcel}
      >
        Export Excel
      </Button>
    </Box>
  );
}

export default ActionButtons;