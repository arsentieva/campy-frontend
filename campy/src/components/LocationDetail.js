import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import CircleChecked from '@material-ui/icons/CheckCircleOutline'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'


const useStyles = makeStyles((theme) => ({
  background: {
    background: '#22577A',
    height: '100vh',
    width: '100vw',
    'margin-top': '75px',
  },
  details: {
    '& ul': {
      'list-style-type': 'none',
      padding: '0px 5px',
    },
    '& > *': {
      margin: '10px',
      color: 'white'
    },
    background: '#22577A',
    display: 'flex',
    'align-items': 'flex-start',
    'flex-wrap': 'wrap',
  },
  detailsImage: {
    display: 'flex',
    'flex-direction': 'row',
    'max-width': '300px',
    'max-height': '300px',
    width: '100%',
    '& > div': {
      margin: '0px 10px'
    }
  },
  detailsInfo: {
    '& p': {
      color: 'white'
    },
    display: 'flex',
    padding: '5px',
    width: '100%',
    'font-weight': 'bold',
    background: '#22577A',
  },
  checkbox1: {
    'font-weight': 'bold',
    'max-width': '50%',
    background: '#22577A',
    height: '450px',
  },
  checkbox2: {
    'font-weight': 'bold',
    background: '#22577A',
    height: '450px',
  },
  review: {
    'font-weight': 'bold',
    background: '#22577A',
    height: '450px',
    padding: '5px'
  },
  calendar: {
    display: 'flex',
    'flex-grow': 1,
    'font-weight': 'bold',
    background: '#22577A',
    'min-height': '450px',
    'min-width': '300px',
    padding: '5px'
  }
}));

export const LocationDetail = (props) => {
  const classes = useStyles();
  // const { location } = props
  const location = {
    'address': '10880 Malibu Point',
    'city': 'Malibu',
    'state': 'CA',
    'gps_coords': '34.000872,-118.806839',
    'image_urls': ['image1.jpg', 'image2.jpg'],
    'website': null,
    'description': 'It overlooks the Pacific Ocean with an amazing view. It was once destroyed from a very unfortunate happening, but now rebuilt like it never happened. Might find some interesting things down the basement.',
    'host_notes': 'Have fun and then get out. Also, don\'t touch things without permission.',
    'amenity': {
      'electric_hookup': true,
      'water_hookup': true,
      'septic_hookup': false,
      'assigned_parking': false,
      'tow_vehicle_parking': true,
      'trash_removal': false,
      'water_front': true,
      'pets_allowed': true,
      'internet_access': false,
    },
    'necessity': {
      'rv_compatible': true,
      'generators_allowed': true,
      'fires_allowed': true,
      'max_days': 2,
      'pad_type': 'grass'
    },
    'review': {
      'overall_rating': 4,
      'noise': 5,
      'safety': 4,
      'cleanliness': 5,
      'access': 1,
      'site_quality': 5,
    }
  }

  return (
    <Box className={classes.background}>
      <div className={classes.details}>
        <div className={classes.detailsImage}>
          {
            location.image_urls.map((x, i) => 
              <Paper elevation={5}>
                <img src={x[i]} alt={`product-image-${i}`} />
              </Paper>
            )
          }
        </div>
        <Paper elevation={5} className={classes.detailsInfo}>
          <List>
            <ListItem>
              <ListItemText primary='Address:' secondary={location.address} />
              <ListItemText primary='City:' secondary={location.city} />
              <ListItemText primary='State:' secondary={location.state} />
              <ListItemText primary='GPS Coordinates:' secondary={location.gps_coords} />
              <ListItemText primary='Website:' secondary={location.website ? location.website : 'None'} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText primary='Max Days:' secondary={location.necessity.max_days} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText primary='Pad Type:' secondary={location.necessity.pad_type} />
            </ListItem>
            <Divider variant="inset" component="li" />  
            <ListItem>
              <ListItemText primary='Description:' secondary={location.description} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemText primary='Host Notes:' secondary={location.host_notes} />
            </ListItem>          
          </List>
        </Paper>
        <Paper elevation={5} className={classes.review}>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Overall Rating</Typography>
            <Rating value={location.review.overall_rating} readOnly />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Noise</Typography>
            <Rating value={location.review.noise} readOnly />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Safety</Typography>
            <Rating value={location.review.safety} readOnly />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Cleanliness</Typography>
            <Rating value={location.review.cleanliness} readOnly />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Access</Typography>
            <Rating value={location.review.access} readOnly />
          </Box>
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend">Site Quality</Typography>
            <Rating value={location.review.site_quality} readOnly />
          </Box>
        </Paper>
        <Paper elevation={5} className={classes.checkbox1}>
          <List>
            <ListItem>
              <ListItemText primary='Electric Hookup:' />
              <Checkbox
                disabled
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />}
                checked={location.amenity.electric_hookup} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Water Hookup:' />
              <Checkbox 
                disabled 
                checked={location.amenity.electric_hookup}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Septic Hookup:' />
              <Checkbox 
                disabled 
                checked={location.amenity.septic_hookup}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Assigned Parking:' />
              <Checkbox 
                disabled 
                checked={location.amenity.assigned_parking}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Tow Vehicle Parking:' />
              <Checkbox 
                disabled 
                checked={location.amenity.tow_vehicle_parking}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Trash Removal:' />
              <Checkbox 
                disabled 
                checked={location.amenity.trash_removal}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>     
          </List>
        </Paper>
        <Paper elevation={5} className={classes.checkbox2}>
          <List>
            <ListItem>
              <ListItemText primary='Water Front:' />
              <Checkbox
                disabled
                checked={location.amenity.water_front}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>  
            <ListItem>
              <ListItemText primary='Pets Allowed:' />
              <Checkbox
                disabled
                checked={location.amenity.pets_allowed}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Internet Access:' />
              <Checkbox
                disabled
                checked={location.amenity.internet_access}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='RV Compatible:' />
              <Checkbox
                disabled
                checked={location.necessity.rv_compatible}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Generators Allowed:' />
              <Checkbox
                disabled
                checked={location.necessity.generators_allowed}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
            <ListItem>
              <ListItemText primary='Fires Allowed:' />
              <Checkbox
                disabled
                checked={location.necessity.fires_allowed}
                icon={<CircleUnchecked />}
                checkedIcon={<CircleChecked />} />
            </ListItem>
          </List>
        </Paper>
        <Paper elevation={5} className={classes.calendar}>
          <List>
            <ListItem>
              <ListItemText primary='Put Calendar Here' />
            </ListItem>
          </List>
        </Paper>
      </div>
    </Box>
  )
}
