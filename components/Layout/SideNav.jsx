import React from "react"
import {
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  makeStyles,
  NoSsr,
} from "@material-ui/core"
import { SearchOutlined, HomeOutlined } from "@material-ui/icons"
import { useRouter } from "next/router"

const sidebarLinks = [
  {
    text: "Home",
    icon: <HomeOutlined color="secondary" fontSize="large" />,
    path: "/",
  },
  {
    text: "Search",
    icon: <SearchOutlined color="secondary" fontSize="large" />,
    path: "/search",
  },
]

const useStyles = makeStyles({
  drawer: {
    width: (sidebarWidth) => sidebarWidth,
  },
  drawerPaper: {
    width: (sidebarWidth) => sidebarWidth,
  },
  active: {
    backgroundColor: "#53BDCB",
  },
})

const SideNav = (props) => {
  const { sidebarWidth } = props

  const classes = useStyles(sidebarWidth)

  const router = useRouter()

  return (
    <NoSsr>
      <Drawer
        className={classes.drawer}
        anchor="left"
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
      >
        {sidebarLinks.map((link) => (
          <List key={link.text}>
            <ListItem
              button
              className={router.route === link.path ? classes.active : null}
              onClick={() => router.push(link.path)}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          </List>
        ))}
      </Drawer>
    </NoSsr>
  )
}

export default SideNav
