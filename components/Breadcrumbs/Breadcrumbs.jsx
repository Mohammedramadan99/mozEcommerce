import { Box,Breadcrumbs,Link } from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNextRounded'
import React from "react"
function MuiBreadcrumbs({items}) {
  return (
    <Box m="2">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon />}
        maxItems={3}
      >
        {items?.map(item => (
          <Link key={item.title} href={`${item.link}`}> {item.title} </Link>
        ))}
      </Breadcrumbs>
    </Box>
  )
}

export default MuiBreadcrumbs