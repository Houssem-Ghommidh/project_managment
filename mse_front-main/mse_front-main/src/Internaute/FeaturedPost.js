import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import dataAnalytics from '../assests/images/DataAnalytics.jpg';
import routeOptimization from '../assests/images/RouteOptimization.jpg';
import smartDashboard from '../assests/images/smartDashboard.jpg';
import smartMap from '../assests/images/smartMap.jpg';
import trashFillSense from '../assests/images/TrashFillSense.jpg';
import truckFillSense from '../assests/images/TruckFillSense.jpg';
import { Box } from '@mui/material';
function FeaturedPost(props) {
  const { post } = props;
const imageList= [trashFillSense,truckFillSense,smartMap,smartDashboard,routeOptimization,dataAnalytics];
  return (
   <Grid container spacing={4}>
    {imageList.map(e=><Grid item xs={12} md={12}>

<CardActionArea component="a" href="#">
  <Card sx={{ display: 'flex' }}>
    <CardContent sx={{ flex: 1 }}>
      <Typography component="h2" variant="h5">
      TruckFill Sense
      </Typography>
      
      <Typography variant="subtitle1" paragraph>
      Smart Waste Management to take better care of your truck assets with our sensor technology that notifies the operator and driver once the truck has reached its maximum load capacity.
      </Typography>
      <Typography variant="subtitle1" color="primary">
        Continue reading...
      </Typography>
    </CardContent>
    <CardMedia
      component="img"
      sx={{ width: 500, display: { xs: 'none', sm: 'block' } }}
      image={e}
      alt={e}
    />
  </Card>
</CardActionArea>
</Grid>)}
</Grid>    
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;