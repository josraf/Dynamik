import React from "react";
import DevImage from "../img/dog.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function DevList({ onDeleteDev, onDetailsDev, onDevsList }) {
  const onChosenDev = (dev) => {
    onDetailsDev(dev._id);
  };

  const handleDeleteDev = (dev) => {
    if (window.confirm("Are you sure?")) onDeleteDev(dev._id);
  };

  function Dev({ dev }) {
    return (
      <div className="main-content">
        <Card sx={{ maxWidth: 345, mb: 1, mt: 1 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={DevImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {dev.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => onChosenDev(dev)}>
              Learn More
            </Button>
            <Button
              size="small"
              color="error"
              onClick={() => handleDeleteDev(dev)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
        {onDevsList?.map((dev) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={dev._id}>
            <Dev dev={dev} key={dev._id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
