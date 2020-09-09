import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Axios from "axios"
import url from '../../config';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  background: {
    background: '#22577A',
    height: '100vh',
    width: '100vw',
    margin: '75px 0px 0px 0px',
    paddingTop: '100px',
    color: 'white',
    '& > *': {
      margin: '10px',
      color: 'white'
    },
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  whiteFontColor: {
    '& *': {
      color: 'white',
    },
  },
  detailsInfo: {
    '& p': {
      color: 'white'
    },
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '5px 150px 5px 150px',
    width: '100%',
    fontWeight: 'bold',
    background: '#22577A',
  },
  detailsImage: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '300px',
    maxHeight: '300px',
    width: '100%',
    '& > div': {
      margin: '0px 10px'
    }
  },
  ratingNComments: {
    padding: '5px 200px 5px 200px',
  },
  button: {
    margin: '40px 0px 0px 40px'
  }
}));

export const AddReview = () => {

  const classes = useStyles();
  const [rate, setRate] = useState('FREE!')
  const [daysStayed, setDaysStayed] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [noise, setNoise] = useState(0)
  const [safety, setSafety] = useState(0)
  const [cleanliness, setCleanliness] = useState(0)
  const [access, setAccess] = useState(0)
  const [siteQuality, setSiteQuality] = useState(0)
  const [comments, setComments] = useState('')
  const [location, setLocation] = useState({ image_urls: [] })

  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem("tokens"))
  const { user_id } = token
  const history = useHistory()

  const handleChangeRate = e => {
    setRate(e.target.value)
  }
  const handleChangeDaysStayed = e => {
    setDaysStayed(e.target.value)
  }
  const handleChangeComments = e => {
    setComments(e.target.value)
  }
  const handleSubmit = async () => {
    const data = {
      'overall_rating': overallRating,
      noise,
      safety,
      cleanliness,
      access,
      'site_quality': siteQuality,
      comments,
      user_id,
      'location_id': id
    }
    try {
      const res = await fetch(`${url}locations/${id}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (res.ok) {
        history.push(`/location-detail/${id}`)
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async function fetchLocation() {
      const res = await fetch(`${url}/locations/${id}`)
      const json = await res.json()
      setLocation(json.location)
    })(); // semi-colon is needed for IIFE to work
  })

  return (
    <Box className={classes.background}>
      <Box className={classes.detailsImage}>
        {
          location.image_urls ? (location.image_urls.map((x, i) =>
            <Paper key={i} elevation={5}>
              <img src={x[i]} alt={`location-pic-${i}`} />
            </Paper>
          )) : 'Pictures Here'
        }
      </Box>
      <List className={classes.detailsInfo}>
        <ListItem>
          <ListItemText primary='Address:' secondary={location.address || 'Loading...'} />
          <ListItemText primary='City:' secondary={location.city || 'Loading...'} />
          <ListItemText primary='State:' secondary={location.state || 'Loading...'} />
          <ListItemText primary='GPS Coordinates:' secondary={location.gps_coords || 'Loading...'} />
          <ListItemText primary='Website:' secondary={location.website ? location.website : 'None'} />
        </ListItem>
      </List>
      <Grid container spacing={0} className={classes.ratingNComments}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Overall Rating</Typography>
            <Rating
              value={overallRating}
              name='overall-rating'
              size='small'
              onChange={(event, newValue) => {
                setOverallRating(newValue);
              }} />
            <Typography component="legend">Noise</Typography>
            <Rating
              value={noise}
              name='noise'
              size='small'
              onChange={(event, newValue) => {
                setNoise(newValue);
              }} />
            <Typography component="legend">Safety</Typography>
            <Rating
              value={safety}
              name='safety'
              size='small'
              onChange={(event, newValue) => {
                setSafety(newValue);
              }} />
            <Typography component="legend">Cleanliness</Typography>
            <Rating
              value={cleanliness}
              name='cleanliness'
              size='small'
              onChange={(event, newValue) => {
                setCleanliness(newValue);
              }} />
            <Typography component="legend">Access</Typography>
            <Rating
              value={access}
              name='access'
              size='small'
              onChange={(event, newValue) => {
                setAccess(newValue);
              }} />
            <Typography component="legend">Site Quality</Typography>
            <Rating
              value={siteQuality}
              name='siteQuality'
              size='small'
              onChange={(event, newValue) => {
                setSiteQuality(newValue);
              }} />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Grid item className={classes.whiteFontColor} xs>
            <TextField
              label='Daily Rate'
              onChange={handleChangeRate}
              value={rate} />
          </Grid>
          <Grid item className={classes.whiteFontColor} xs>
            <TextField
              label='Days Stayed'
              onChange={handleChangeDaysStayed}
              value={daysStayed}
              placeholder='Enter a Number' />
          </Grid>
          <Grid item className={classes.whiteFontColor} xs>
            <TextField
              label='Comments'
              multiline
              onChange={handleChangeComments}
              value={comments}
              placeholder='Enter Comments' />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant='outlined'
              color='secondary'
              onClick={handleSubmit}>
                Submit</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
