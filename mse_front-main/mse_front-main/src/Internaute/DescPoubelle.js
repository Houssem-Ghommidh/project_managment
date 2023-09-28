import { Grid } from '@mui/material'
import React from 'react'
function DescPoubelle() {
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
  <h2>TrashFill Sense</h2>
  <p>Transform a normal trash bin into a smart one. A combo reading from ultrasonic sensors placed on the lid of the trash bin and a weight sensor under the bottom panel is used to get an accurate measurement of the weight of the trash stored.

 

Get live notifications of filled bins and their locations</p>
  </Grid>
  )
}

export default DescPoubelle