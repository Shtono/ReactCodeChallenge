import React from "react"
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  title: {
    backgroundColor: "#0b373d",
    color: "#fff",
    padding: "20px",
    borderRadius: "7px",
  },
})

const PageTitle = ({ title }) => {
  const classes = useStyles()
  return (
    <Typography variant="h2" align="center" className={classes.title}>
      {title}
    </Typography>
  )
}

export default PageTitle
