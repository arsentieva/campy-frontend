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
    padding: "20px 20px 100px 20px",
    background: "#f7fafc",
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
  bottomHalf: {
    marginTop: "10px",
  },
  techStackBackFrontEndSection: {
    display: "flex",
    flexDirection: "column",
  },
  techStackIconName: {
    display: "flex",
    flexDirection: "column",
    color: "#4a5568"
  },
  techStackIcon: {
    display: "flex", 
    justifyContent: "center",
  },
  techStackName: {
    textAlign: "center",
    color: "#4a5568"
  },
  card: {
    maxWidth: 345,
    margin: 0,
    padding: 0,
  },
  cardName: {
    textAlign: "center",
    color: "#4a5568"
  },
  media: {
    height: 200,
  },
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

  function openNewWindow(url) {
    window.open(url, "_blank", "noopener")
  }

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
            <Typography variant="body2" className={classes.info} style={{ color: "#4a5568" }}>
              <b>Campy</b> is a platform that enables users to share their
              outside property for weary travelers. In a similar way to how you
              would rent an AirBNB. Campy enables you to find and check for
              available locations and schedule a time where you can camp out on
              private property without fear of being hassled. On the flip side,
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
            <Typography variant="body2" className={classes.info} style={{ color: "#4a5568" }} >
              AirBNB took the hotel industry by storm, travelers who previously
              would depend on motels or hotels were able to utilize a home
              sharing service similar to uber. With the onset of COVID-19, the
              home sharing industry crashed, but the thirst for adventure
              remains!
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container className={classes.bottomHalf}>
        <Grid item container xs={6} justify="center">
          <Typography variant="h6">Tech Stack Used</Typography>
          <Grid container item xs={12} className={classes.techStackBackFrontEndSection}>
            <Typography variant="subtitle2" style={{ textAlign: "center" }}>Back End</Typography>
            <List style={{ display: "flex" }}>
              {techStackBack.map((listitem, key) => (
                <ListItem key={key} className={classes.techStackIconName}>
                  <ListItemAvatar className={classes.techStackIcon}>
                    <Avatar
                      alt={listitem.text}
                      src={require(`../assets/techStack/${listitem.image}`)}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={listitem.text} className={classes.techStackName} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item className={classes.techStackBackFrontEndSection}>
            <Typography variant="subtitle2" style={{ textAlign: "center" }}>Front End</Typography>
            <List style={{ display: "flex" }}>
              {techStackFront.map((listitem, key) => (
                <ListItem key={key} className={classes.techStackIconName}>
                  <ListItemAvatar className={classes.techStackIcon}>
                    <Avatar
                      alt={listitem.text}
                      src={require(`../assets/techStack/${listitem.image}`)}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={listitem.text} className={classes.techStackName} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item className={classes.techStackBackFrontEndSection}>
            <Typography variant="subtitle2" style={{ textAlign: "center" }}>Front and Backends</Typography>
            <List style={{ display: "flex" }}>
              <ListItem className={classes.techStackIconName}>
                <ListItemAvatar className={classes.techStackIcon}>
                  <GitHub />
                </ListItemAvatar>
                <ListItemText primary="GitHub Version Control" className={classes.techStackName} />
              </ListItem>
              <ListItem className={classes.techStackIconName}>
                <ListItemAvatar className={classes.techStackIcon}>
                  <Avatar src={require("../assets/techStack/heroku.png")} />
                </ListItemAvatar>
                <ListItemText primary="Heroku hosting" className={classes.techStackName} />
              </ListItem>
              <ListItem className={classes.techStackIconName}>
                <ListItemAvatar className={classes.techStackIcon}>
                  <Avatar src={require("../assets/techStack/vscode.png")} />
                </ListItemAvatar>
                <ListItemText primary="VSCode" className={classes.techStackName} />
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
          <Grid container item xs={12}>
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
                  <CardActionArea style={{ cursor: "unset" }}>
                    <CardMedia
                      className={classes.media}
                      image={aaron}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.cardName}>
                        Aaron Bruce
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://github.com/AaronTheBruce')}>
                      GitHub
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://aaronthebruce.github.io/')}>
                      Portfolio
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://www.linkedin.com/in/aaronbruce555/')}>
                      LinkedIn
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item container justify="center">
                <Card className={classes.card}>
                  <CardActionArea style={{ cursor: "unset" }}>
                    <CardMedia
                      className={classes.media}
                      image={anna}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.cardName}>
                        Anna Arsentieva
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://github.com/arsentieva')}>
                      GitHub
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://arsentieva.github.io/profile/')}>
                      Portfolio
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://www.linkedin.com/in/annaarsentieva/')}>
                      LinkedIn
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
                  <CardActionArea style={{ cursor: "unset" }}>
                    <CardMedia
                      className={classes.media}
                      image={arom}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.cardName}>
                        Arom Jhee
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://github.com/aromjhee')}>
                      GitHub
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://aromjhee.github.io/')}>
                      Portfolio
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://www.linkedin.com/in/arom-jhee/')}>
                      LinkedIn
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item container justify="center">
                <Card className={classes.card}>
                  <CardActionArea style={{ cursor: "unset" }}>
                    <CardMedia
                      className={classes.media}
                      image={kristen}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.cardName}>
                        Kristen Chauncey
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://github.com/chaunceykm')}>
                      GitHub
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('http://www.kristenchauncey.com/')}>
                      Portfolio
                    </Button>
                    <Button size="small" color="primary" onClick={() => openNewWindow('https://www.linkedin.com/in/kristen-chauncey-2b971a179/')}>
                      LinkedIn
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
