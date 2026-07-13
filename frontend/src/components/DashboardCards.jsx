import { Grid, Card, CardContent, Typography } from "@mui/material";

function DashboardCards({
  databaseCount,
  collectionCount,
  recordCount,
  operationCount,
}) {
  const cards = [
    { title: "Databases", value: databaseCount },
    { title: "Collections", value: collectionCount },
    { title: "Records", value: recordCount },
    { title: "Operations", value: operationCount },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid key={card.title} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={5}>
            <CardContent>
              <Typography variant="subtitle1">
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{ mt: 1 }}
              >
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;