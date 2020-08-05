import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles((theme) => ({
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

  const handleChangeRate = (event) => {
    setRate(event.target.value);
  };
  const handleChangeDaysStayed = (event) => {
    setDaysStayed(event.target.value);
  };
  const handleChangeOverallRating = (event) => {
    setOverallRating(event.target.value);
  };
  const handleChangeNoise = (event) => {
    setNoise(event.target.value);
  };
  const handleChangeSafety = (event) => {
    setSafety(event.target.value);
  };
  const handleChangeCleanliness = (event) => {
    setCleanliness(event.target.value);
  };
  const handleChangeAccess = (event) => {
    setAccess(event.target.value);
  };
  const handleChangeSiteQuality = (event) => {
    setSiteQuality(event.target.value);
  };
  const handleChangeComments = (event) => {
    setComments(event.target.value);
  };

  return (
    <>
      <Grid 
        container 
        spacing={0} 
        direction='column' 
        justify='center' 
        align='center'
        style={{ minHeight: '100vh' }}>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel>Overall Rating</InputLabel>
            <Select
              value={overallRating}
              onChange={handleChangeOverallRating}>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Noise</InputLabel>
            <Select
              value={noise}
              onChange={handleChangeNoise}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Safety</InputLabel>
            <Select
              value={safety}
              onChange={handleChangeSafety}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>    
          <FormControl className={classes.formControl}>
            <InputLabel>Cleanliness</InputLabel>
            <Select
              value={cleanliness}
              onChange={handleChangeCleanliness}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>    
          <FormControl className={classes.formControl}>
            <InputLabel>Access</InputLabel>
            <Select
              value={access}
              onChange={handleChangeAccess}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>    
          <FormControl className={classes.formControl}>
            <InputLabel>Site Quality</InputLabel>
            <Select
              value={siteQuality}
              onChange={handleChangeSiteQuality}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>    
        </Grid>
        <Grid item>
          <TextField
            label='Daily Rate'
            onchange={handleChangeRate}
            value={rate}>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label='Days Stayed'
            onchange={handleChangeDaysStayed}
            value={daysStayed}>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label='Comments'
            onchange={handleChangeComments}
            value={comments}>
          </TextField>
        </Grid>
      </Grid>
    </>
  )
}
