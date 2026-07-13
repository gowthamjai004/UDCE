import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography } from "@mui/material";

function DataTable({ rows }) {

  if (!rows || rows.length === 0) {
    return (
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography>No data available</Typography>
      </Paper>
    );
  }

  const columns = Object.keys(rows[0]).map((key) => ({
    field: key,
    headerName: key.toUpperCase(),
    flex: 1,
    minWidth: 150,
  }));

  const tableRows = rows.map((row, index) => ({
    id: row._id || index,
    ...row,
  }));

  return (
    <Paper sx={{ mt: 4, height: 500 }}>
      <DataGrid
        rows={tableRows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
      />
    </Paper>
  );
}

export default DataTable;