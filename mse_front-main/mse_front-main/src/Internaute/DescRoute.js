import { Grid } from '@mui/material'
import React from 'react'
function DescRoute() {
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
  <h2>Route Optimization</h2>
  <p>The system determines the best routes for the garbage trucks to take wherein they come across only filled containers.
Save valuable time and fuel.</p>
  </Grid>
  )
}

export default DescRoute