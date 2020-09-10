import React from 'react'
import { Explore } from './GoogleMaps/Explore'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  map: {
    
  }
}))

export const LocationList = () => {
  const classes = useStyles();
  return (
    <div>
      <Explore className={classes.map} />
    </div>
  )
}
