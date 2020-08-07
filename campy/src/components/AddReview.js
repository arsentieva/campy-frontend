import React, { useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Rating from '@material-ui/lab/Rating';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'


const useStyles = makeStyles((theme) => ({
  background: {
    background: '#22577A',
    height: '100vh',
    width: '100vw',
    'margin-top': '75px',
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const AddReview = () => {
  
  const classes = useStyles();
  const [rate, setRate] = useState('FREE!')
  const [daysStayed, setDaysStayed] = useState(0)
  const [overallRating, setOverallRating] = useState(0)
  const [noise, setNoise] = useState(0)
  const [safety, setSafety] = useState(0)
  const [cleanliness, setCleanliness] = useState(0)
  const [access, setAccess] = useState(0)
  const [siteQuality, setSiteQuality] = useState(0)
  const [comments, setComments] = useState('')

  const handleChangeRate = e => {
    setRate(e.target.value)
  }
  const handleChangeDaysStayed = e => {
    setDaysStayed(e.target.value)
  }
  const handleChangeComments = e => {
    setComments(e.target.value)
  }

  return (
    <Box className={classes.background}>
      <Grid 
        container 
        spacing={0} 
        direction='column' 
        justify='center' 
        align='center'
        style={{ minHeight: '100vh' }}>
        <Grid item>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Overall Rating</Typography>
            <Rating
              value={overallRating}
              onChange={(event, newValue) => {
                setOverallRating(newValue);
              }} />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Noise</Typography>
            <Rating
              value={noise}
              onChange={(event, newValue) => {
                setNoise(newValue);
              }} />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Safety</Typography>
            <Rating
              value={safety}
              onChange={(event, newValue) => {
                setSafety(newValue);
              }} />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Cleanliness</Typography>
            <Rating
              value={cleanliness}
              onChange={(event, newValue) => {
                setCleanliness(newValue);
              }} />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Access</Typography>
            <Rating
              value={access}
              onChange={(event, newValue) => {
                setAccess(newValue);
              }} />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Site Quality</Typography>
            <Rating
              value={siteQuality}
              onChange={(event, newValue) => {
                setAccess(newValue);
              }} />
          </Box>  
        </Grid>
        <Grid item>
          <TextField
            label='Daily Rate'
            onChange={handleChangeRate}
            value={rate}>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label='Days Stayed'
            onChange={handleChangeDaysStayed}
            value={daysStayed}>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label='Comments'
            multiline
            rows={8}
            variant='outlined'
            onChange={handleChangeComments}
            value={comments}>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  )
}
