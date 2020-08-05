import React from 'react'
import { GoogleMapComponent } from './GoogleMapComponent'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  map: {
    
  }
}))

export const LocationList = () => {
  const classes = useStyles();
  return (
    <div>
      <GoogleMapComponent className={classes.map} />
    </div>
  )
}
