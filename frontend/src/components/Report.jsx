import {

    Paper,
    Typography,
    Divider,
    Grid,
    Card,
    CardContent

} from "@mui/material";

function Report({ report }) {

    if (!report) return null;

    return (

        <Paper sx={{ mt: 4, p: 3 }}>

            <Typography variant="h5">

                Cleaning Report

            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography>

                                Records Before

                            </Typography>

                            <Typography variant="h4">

                                {report.records_before}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography>

                                Records After

                            </Typography>

                            <Typography variant="h4">

                                {report.records_after}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Card>

                        <CardContent>

                            <Typography>

                                Duplicates Removed

                            </Typography>

                            <Typography variant="h4">

                                {report.duplicates_removed}

                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Paper>

    );

}

export default Report;