import DevImage from "../img/dog.jpg";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DetailsCards({
  onDeleteDev,
  onDetailsDev,
  onDevDetails,
}) {
  const date = new Date(onDevDetails.birth_date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  return (
    <Card sx={{ width: 310, position: "absolute", right: 155 }}>
      <CardMedia sx={{ height: 140 }} image={DevImage} title="dev details" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {onDevDetails.name}
        </Typography>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"🥸 " + onDevDetails.nickname}
            sx={{ paddingLeft: 0 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={"💻 " + onDevDetails.stack}
            sx={{ textAlign: 0 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary={"📅 " + formattedDate} sx={{ textAlign: 0 }} />
        </ListItem>
      </CardContent>
    </Card>
  );
}
