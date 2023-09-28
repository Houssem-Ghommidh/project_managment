import { Grid } from '@mui/material'
import React from 'react'
function DescDashboard() {
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
  <h2 >SmartFetch efficient Waste Management dashboard</h2>
  <p>Get all the pertinent information like the number of Empty & Full Bins,

their locations together with the weight and fill level of each bin with our Waste Management solutions.</p>
  </Grid>
  )
}

export default DescDashboard