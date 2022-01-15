import React from "react"
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  listItem: {
    padding: 0,
  },
  listItemGroup: {
    marginBottom: "10px",
  },
  textItem: {
    fontSize: "2px",
  },
})

const Attributes = (props) => {
  const { item } = props
  const classes = useStyles()
  return (
    <List>
      <div className={classes.listItemGroup}>
        <ListItem className={classes.listItem}>
          <ListItemText secondary={item.label} className={classes.textItem} />
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText
            inset
            primary={item.value}
            className={classes.textItem}
            fontSize="small"
          />
        </ListItem>
      </div>
    </List>
  )
}

export default Attributes
