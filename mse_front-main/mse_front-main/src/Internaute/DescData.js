import { Grid } from '@mui/material'
import React from 'react'
function DescData() {
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
  <h2>Data & Analytics</h2>
  <p>Learn of residents waste disposal trends and habits, which can be used to further enhance the operational efficiency of the system. Reducing time-to-pick-up and gain the ability to predict filling trends. This helps minimize bin overfill and maintain healthy conditions around the garbage bins.</p>
  </Grid>
  )
}

export default DescData