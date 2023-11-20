import React from "react";
import DevImage from "../img/dog.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function DevList({
  onDeleteDev,
  onDetailsDev,
  onDevsList,
  onDevDetails,
}) {
  const onChosenDev = (dev) => {
    onDetailsDev(dev._id);
  };
  const date = new Date(onDevDetails.birth_date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const handleDeleteDev = (dev) => {
    if (window.confirm("Are you sure?")) onDeleteDev(dev._id);
  };

  function Dev({ dev }) {
    return (
      <div className="cenas">
        <Card sx={{ maxWidth: 345 }}>
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
            {onDevDetails && onDevDetails._id === dev._id ? (
              <>
                <Typography variant="body1" color="text.secondary">
                  {onDevDetails.nickname}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {onDevDetails.stack}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {formattedDate}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => onChosenDev(dev)}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  return (
    <>
      {onDevsList?.map((dev) => (
        <Dev dev={dev} key={dev._id} />
      ))}
    </>
  );
}
