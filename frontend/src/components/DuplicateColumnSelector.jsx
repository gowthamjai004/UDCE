import {
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel
} from "@mui/material";

function DuplicateColumnSelector({

    columns,
    selectedColumns,
    handleColumnSelection

}) {

    return (

        <>

            <Typography
                variant="h6"
                sx={{ mt: 4 }}
            >

                Duplicate Detection Columns

            </Typography>

            <FormGroup>

                {

                    columns.map(column => (

                        <FormControlLabel

                            key={column}

                            control={

                                <Checkbox

                                    checked={selectedColumns.includes(column)}

                                    onChange={() => handleColumnSelection(column)}

                                />

                            }

                            label={column}

                        />

                    ))

                }

            </FormGroup>

        </>

    );

}

export default DuplicateColumnSelector;