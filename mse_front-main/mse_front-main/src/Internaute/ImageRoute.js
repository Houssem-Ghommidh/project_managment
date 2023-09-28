import { Grid } from '@mui/material'
import React from 'react'
import dataAnalytics from '../assests/images/DataAnalytics.jpg';
import routeOptimization from '../assests/images/RouteOptimization.jpg';
import smartDashboard from '../assests/images/smartDashboard.jpg';
import smartMap from '../assests/images/smartMap.jpg';
import trashFillSense from '../assests/images/TrashFillSense.jpg';
import truckFillSense from '../assests/images/TruckFillSense.jpg';
function ImageRoute() {
  return (
    <Grid item xs={12} md={6}>
        <img  width='100%' src={routeOptimization}/>
    </Grid>
  )
}

export default ImageRoute