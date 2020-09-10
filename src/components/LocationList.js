import React from 'react'
import { Map } from './GoogleMaps/Map'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  map: {
    
  }
}))

export const LocationList = () => {
  const classes = useStyles();
  return (
    <div>
      <Map className={classes.map} />
    </div>
  )
}
