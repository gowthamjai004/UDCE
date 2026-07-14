import { Grid, Paper, Typography } from "@mui/material";

function StatisticsCards({
  databases,
  collections,
  records,
  operations,
}) {
  const cards = [
    {
      title: "Databases",
      value: databases,
    },
    {
      title: "Collections",
      value: collections,
    },
    {
      title: "Records",
      value: records,
    },
    {
      title: "Operations",
      value: operations,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {cards.map((card) => (
        <Grid item xs={12} md={3} key={card.title}>
          <Paper
            elevation={4}
            sx={{
              p: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              color="primary"
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default StatisticsCards;