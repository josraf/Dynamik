import React from "react";
import DevImage from "../img/dog.jpg";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
            {onDevDetails && onDevDetails._id === dev._id ? (
              <>
                <Divider />{" "}
                <ListItem>
                  <ListItemText primary={"🥸 " + onDevDetails.nickname} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"💻 " + onDevDetails.stack} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={"📅 " + formattedDate} />
                </ListItem>
              </>
            ) : (
              <></>
            )}
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
      {onDevsList?.map((dev) => (
        <Dev dev={dev} key={dev._id} />
      ))}
    </>
  );
}
