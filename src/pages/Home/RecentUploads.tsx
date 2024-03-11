import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import phonesCat from "../../assets/images/phonesCategory.jpg";
import laptopsCat from "../../assets/images/laptopCategory.jpg";
import furnitureCat from "../../assets/images/furnitureCategory.jpeg";

const imageStyling = { width: "80%", margin: "auto" };

export default function RecentUploads() {
  return (
    <>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <img
              height={140}
              width={180}
              src={phonesCat}
              alt={"Product Name TODO"}
              style={imageStyling}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                New One Plus 10
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                ea cum, maxime laborum autem voluptatum laudantium assumenda
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Detail</Button>
              <Button size="small" color="success" variant="contained">
                Bid
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <img
              height={140}
              width={180}
              src={laptopsCat}
              style={imageStyling}
              alt={"Product Name TODO"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Mac Book Pro
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                ea cum, maxime laborum autem voluptatum laudantium assumenda
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Detail</Button>
              <Button size="small" color="success" variant="contained">
                Bid
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <img height={140} src={furnitureCat} alt={"Product Name TODO"}  style={imageStyling}/>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cot
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                ea cum, maxime laborum autem voluptatum laudantium assumenda
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Detail</Button>
              <Button size="small" color="success" variant="contained">
                Bid
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
