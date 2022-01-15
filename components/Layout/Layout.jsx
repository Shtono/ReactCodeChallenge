import React, { useState } from "react"
import SideNav from "./SideNav"
import SidePanel from "./SidePanel/SidePanel"
import { makeStyles, NoSsr } from "@material-ui/core"

const SIDEBAR_WIDTH = 200
const SIDEPANEL_WIDTH = 400

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      backgroundColor: "grey",
      height: "100vh",
    },
    content: {
      flexGrow: 1,
      backgroundColor: "#f3f3f3",
      padding: theme.spacing(3),
    },
    horizontalContainer: {
      display: "flex",
      height: "100%",
    },
  }
})

const Layout = (props) => {
  const { children } = props
  const classes = useStyles()

  return (
    <NoSsr>
      <div className={classes.page}>
        <div className={classes.horizontalContainer}>
          <SideNav sidebarWidth={SIDEBAR_WIDTH} />
          <div className={classes.content}>{children}</div>
          <SidePanel panelWidth={SIDEPANEL_WIDTH} />
        </div>
      </div>
    </NoSsr>
  )
}

export default Layout
