import React, { useEffect, useState, useContext } from "react"
import { appContext } from "@/context/context"
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  List,
  ListItem,
  Avatar,
  ListItemText,
  makeStyles,
  NoSsr,
} from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import ScoreIcon from "@material-ui/icons/Score"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import EmailIcon from "@material-ui/icons/Email"
import PeopleIcon from "@material-ui/icons/People"
import PhoneIcon from "@material-ui/icons/Phone"

const getAvatarColor = (company) => {
  if (company.risk_assessment?.toLowerCase() === "low") {
    return "green"
  }
  if (company.risk_assessment?.toLowerCase() === "medium") {
    return "blue"
  }
  if (company.risk_assessment?.toLowerCase() === "high") {
    return "red"
  }
  return "grey"
}

const getCompanyInfo = (company) => {
  return {
    name: company.company_name,
    country: company.local_organization_id.country,
    infoColumnLeft: [
      {
        label: "Score",
        icon: <ScoreIcon color="secondary" />,
        value: company.score ? company.score : "N/A",
      },
      {
        label: "Status",
        icon: <EqualizerIcon color="secondary" />,
        value: company.status ? company.status : "N/A",
      },
      {
        label: "Email",
        icon: <EmailIcon color="secondary" />,
        value:
          company.email.hidden || company.email.hidden === null
            ? "N/A"
            : company.email.email.toLowerCase(),
      },
    ],
    infoColumnRight: [
      {
        label: "Risk Assessment",
        icon: <PriorityHighIcon color="secondary" />,
        value: company.risk_assessment ? company.risk_assessment : "N/A",
      },
      {
        label: "Company Size",
        icon: <PeopleIcon color="secondary" />,
        value: company.number_of_employees.interval
          ? company.number_of_employees.interval
          : "N/A",
      },
      {
        label: "Phone",
        icon: <PhoneIcon color="secondary" />,
        value:
          company.phone.hidden || company.phone.hidden === null
            ? "N/A"
            : company.phone.phone_number,
      },
    ],
  }
}

const useStyles = makeStyles({
  cardContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  cardHeader: {
    background: "#53BDCB",
    color: "#fff",
  },
  flexItem: {
    width: "50%",
  },
  card: {
    flex: "0 1 30%",
  },
  listItem: {
    padding: 0,
  },
  item: {
    padding: 0,
  },
  avatar: {
    backgroundColor: (companyData) => getAvatarColor(companyData),
  },
  listItemGroup: {
    marginBottom: "10px",
  },
})

const CompanyCard = (props) => {
  const { companyData } = props
  const [companyInfo, setCompanyInfo] = useState(null)

  const classes = useStyles(companyData)

  const { openPanel } = useContext(appContext)

  useEffect(() => {
    if (companyData) {
      setCompanyInfo(getCompanyInfo(companyData))
    }
  }, [companyData])

  return (
    <NoSsr>
      {companyInfo && (
        <Card elevation={3} className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            action={
              <IconButton
                onClick={() =>
                  openPanel({
                    company_id: companyData.local_organization_id.id,
                  })
                }
              >
                <InfoIcon color="secondary" fontSize="large" />
              </IconButton>
            }
            avatar={
              <Avatar className={classes.avatar}>
                {companyInfo.name[0].toUpperCase()}
              </Avatar>
            }
            title={companyInfo.name}
            subheader={companyInfo.country}
          />
          <CardContent className={classes.cardContent}>
            <div className={classes.flexItem}>
              {companyInfo.infoColumnLeft.map((attribute) => (
                <List key={attribute.label}>
                  <div className={classes.listItemGroup}>
                    <ListItem className={classes.listItem}>
                      {attribute.icon}
                      <ListItemText secondary={attribute.label} />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemText inset primary={attribute.value} />
                    </ListItem>
                  </div>
                </List>
              ))}
            </div>
            <div className={classes.flexItem}>
              {companyInfo.infoColumnRight.map((attribute) => (
                <List key={attribute.label}>
                  <div className={classes.listItemGroup}>
                    <ListItem className={classes.listItem}>
                      {attribute.icon}
                      <ListItemText secondary={attribute.label} />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <ListItemText inset primary={attribute.value} />
                    </ListItem>
                  </div>
                </List>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </NoSsr>
  )
}

export default CompanyCard
