import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import "../assets/techStack/axios.png";
import "../assets/techStack/firebase.png";
import "../assets/techStack/flask.png";
import "../assets/techStack/flastRestX.png";
import "../assets/techStack/googleMaps.png";
import "../assets/techStack/materialUI.png";
import "../assets/techStack/postgresql.png";
import "../assets/techStack/python.png";
import "../assets/techStack/react.png";
import "../assets/techStack/SQLAlchemy.png";
import "../assets/techStack/heroku.png";
import "../assets/techStack/vscode.png";
import logo from "../assets/darkLogo.png";
import kristen from "../assets/team/kristen.jpg";
import aaron from "../assets/team/aaron.jpeg";
import anna from "../assets/team/anna.jpeg";
import arom from "../assets/team/arom.png";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "75px",
    padding: "20px",
    background: "#f0eace",
    width: "100%",
  },
  logo: {
    maxHeight: "65px",
    marginTop: "20px",
    marginBottom: 0,
  },
  info: {
    width: "90%",
    margin: 0,
    padding: 0,
    textAlign: "center",
    fontSize: "1.2rem",
  },
  heading: {
    textAlign: "center",
    fontSize: "1.3rem",
  },
  textStack: {
    justifyContent: "center",
    alignContent: "center",
  },
  card: { maxWidth: 345, margin: 0, padding: 0 },
  media: { height: 140 },
  teamColumn: {
    margin: 0,
    padding: 0,
  },
}));

const techStackFront = [
  {
    image: "react.png",
    text: "ReactJS",
  },
  {
    image: "materialUI.png",
    text: "Material-UI",
  },
  {
    image: "googleMaps.png",
    text: "Google Maps",
  },
  {
    image: "firebase.png",
    text: "Google Firebase Storage",
  },
  {
    image: "axios.png",
    text: "axios HTTP requesting",
  },
];
const techStackBack = [
  {
    image: "python.png",
    text: "Python",
  },
  {
    image: "postgresql.png",
    text: "PostgreSQL",
  },
  {
    image: "SQLAlchemy.png",
    text: "SQLAlchemy",
  },
  {
    image: "flask.png",
    text: "Flask",
  },
  {
    image: "flastRestX.png",
    text: "Flask-RESTX",
  },
];

export const About = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item container>
        <Grid item container justify="center" alignItems="center" xs={12}>
          <img className={classes.logo} src={logo} alt="campy logo" />
        </Grid>
        <Grid container item justify="space-around" alignContent="center">
          <Grid container justify="center" alignContent="center" item xs={4}>
            <Typography variant="subtitle2" className={classes.heading}>
              What is Campy?
            </Typography>
            <Typography variant="body2" className={classes.info}>
              <b>Campy</b> is a platform that enables users to share their
              outside property for weary travelers. In a similar way to how you
              would rent an AirBNB. Campy enables you to find and check for
              available locations and schedule a time where you can camp out on
              private property without fear of being hasseled. On the flip side,
              Campy empowers users to share their yards and driveways to service
              people who find themselves displaced or just passing through and
              in need for a temporary place to camp. Campy is great for
              homeowners or campgrounds.
            </Typography>
          </Grid>
          <Grid container alignContent="center" direction="column" item xs={4}>
            <Typography className={classes.heading} variant="subtitle2">
              Inspiration
            </Typography>
            <Typography variant="body2" className={classes.info}>
              AirBNB took the hotel industry by storm, travelers who previously
              would depend on motels or hotels were able to utilize a home
              sharing service similar to uber. With the onset of Covid-19, the
              home sharing industry crashed, but the thirst for adventure
              remains!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container>
        <Grid
          className={classes.techStack}
          item
          container
          direction="column"
          alignContent="center"
          spacing={3}
          xs={6}
        >
          <Typography variant="h6">Tech Stack Used</Typography>
          <Grid item>
            <Typography variant="subtitle2">Back End</Typography>

            <Grid item>
              <List style={{ display: "inline-flex" }}>
                {techStackBack.map((listitem, key) => (
                  <ListItem key={key}>
                    <ListItemAvatar>
                      <Avatar
                        alt={listitem.text}
                        src={require(`../assets/techStack/${listitem.image}`)}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={listitem.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Front End</Typography>

            <Grid item>
              <List style={{ display: "inline-flex" }}>
                {techStackFront.map((listitem, key) => (
                  <ListItem key={key}>
                    <ListItemAvatar>
                      <Avatar
                        alt={listitem.text}
                        src={require(`../assets/techStack/${listitem.image}`)}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={listitem.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">Front and Backends</Typography>
            <List style={{ display: "inline-flex" }}>
              <ListItem>
                <ListItemAvatar>
                  <GitHub />
                </ListItemAvatar>
                <ListItemText primary="GitHub Version Control" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={require("../assets/techStack/heroku.png")} />
                </ListItemAvatar>
                <ListItemText primary="Heroku hosting" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={require("../assets/techStack/vscode.png")} />
                </ListItemAvatar>
                <ListItemText primary="VSCode" />
              </ListItem>
            </List>
          </Grid>
          <Typography variant="body2">
            Some tech stack related icons were procured from
            <a href="https://icons8.com"> Icons8</a>.
          </Typography>
        </Grid>
        <Grid item container xs={6} justify="center">
          <Typography variant="h6"> Meet the Team</Typography>
          <Grid container xs={12} item>
            <Grid
              className={classes.teamColumn}
              item
              xs={6}
              container
              justify="space-between"
              alignContent="flex-start"
              direction="column"
              spacing={3}
            >
              <Grid item container justify="center">
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={aaron}
                      style={{ height: 0, paddingTop: "56.25%" }}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Aaron Bruce
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      GitHub
                    </Button>
                    <Button size="small" color="primary">
                      Portfolio
                    </Button>
                    <Button size="small" color="primary">
                      Email
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item container justify="center">
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      style={{ height: 0, paddingTop: "56.25%" }}
                      image={anna}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Anna Arsentieva
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      GitHub
                    </Button>
                    <Button size="small" color="primary">
                      Portfolio
                    </Button>
                    <Button size="small" color="primary">
                      Email
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Grid
              className={classes.teamColumn}
              item
              xs={6}
              container
              direction="column"
              spacing={3}
            >
              <Grid item container justify="center">
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      style={{ height: 0, paddingTop: "56.25%" }}
                      image={arom}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Arom Jhee
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      GitHub
                    </Button>
                    <Button size="small" color="primary">
                      Portfolio
                    </Button>
                    <Button size="small" color="primary">
                      Email
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item container justify="center">
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      style={{ height: 0, paddingTop: "56.25%" }}
                      image={kristen}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Kristen Chauncey
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      GitHub
                    </Button>
                    <Button size="small" color="primary">
                      Portfolio
                    </Button>
                    <Button size="small" color="primary">
                      Email
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <br />
    </Grid>
  );
};
