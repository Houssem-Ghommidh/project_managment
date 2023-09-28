import { Grid } from '@mui/material'
import React from 'react'

function DescTruck() {
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
    <h2>TruckFill Sense</h2>
    <p>Smart Waste Management to take better care of your truck assets with our sensor technology that notifies the operator and driver once the truck has reached its maximum load capacity.</p>
    </Grid>
  )
}

export default DescTruck