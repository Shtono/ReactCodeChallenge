import React, { useState, useContext, useEffect } from "react"
import { appContext } from "@/context/context"
import {
  Button,
  Typography,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  makeStyles,
  NoSsr,
} from "@material-ui/core"
import Attributes from "./Attributes"
import InfoIcon from "@material-ui/icons/Info"
import StarOutlineIcon from "@material-ui/icons/StarOutline"
import LinkIcon from "@material-ui/icons/Link"
import { useRouter } from "next/router"

const sidePanelTabs = [
  {
    text: "General Information",
    icon: <InfoIcon color="secondary" fontSize="large" />,
    path: () => `/search`,
  },
  {
    text: "Highlights",
    icon: <StarOutlineIcon color="secondary" fontSize="large" />,
    path: (id) => `/highlights/${id}`,
  },
  {
    text: "Relations",
    icon: <LinkIcon color="secondary" fontSize="large" />,
    path: (id) => `/company/${id}`,
  },
]

// Get Attributes from the response
const getAttributes = (response) => {
  const getSecondaryNames = (arr) => {
    if (arr) {
      const names = arr.map((item) => item.name)
      return names.join(", ")
    }
    return "N/A"
  }

  const company = response.data
  if (company) {
    return [
      {
        label: "Vat",
        value: company.vat ? "Yes" : "No",
      },
      {
        label: "Email",
        value:
          company.email.hidden || company.email.hidden === null
            ? "N/A"
            : company.email.email.toLowerCase(),
      },
      {
        label: "Phone",
        value:
          company.phone.hidden || company.phone.hidden === null
            ? "N/A"
            : company.phone.phone_number,
      },
      {
        label: "Score",
        value: company.score || "N/A",
      },
      {
        label: "Address",
        value: `${company.address.zipcode} ${company.address.street} ${company.address.number} ${company.address.city} ${company.address.country}`,
      },
      {
        label: "Status",
        value: company.status,
      },
      {
        label: "Company Name",
        value: company.company_name,
      },
      {
        label: "Company Type",
        value: company.company_type.short,
      },
      {
        label: "Main Industry Code",
        value: company.main_industry_code.code,
      },
      {
        label: "registered_capital",
        value: ` ${company.registered_capital.value} ${company.registered_capital.currency}`,
      },
      {
        label: "Date of Incorporation",
        value: company.date_of_incorporation,
      },
      {
        label: "Local Organisation ID",
        value: company.local_organization_id.id || "N/A",
      },
      {
        label: "Secondary names",
        value: getSecondaryNames(company.company_secondary_names),
      },
      {
        label: "Risk Assessment",
        value: company.risk_assessment || "N/A",
      },
    ]
  }
  return null
}

const useStyles = makeStyles({
  drawer: {
    width: (panelWidth) => panelWidth,
    display: "flex",
    flexDirection: "column",
    padding: "18px",
  },
  drawerPaper: {
    width: (panelWidth) => panelWidth,
  },
  title: { backgroundColor: "#0b373d", color: "#fff", padding: "20px" },
  active: {
    backgroundColor: "white",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
  },
  attributeContainer: {
    overflow: "scroll",
    padding: "18px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  tabsContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    borderTop: "5px solid #ccc",
    paddingTop: "10px",
  },
})

const SidePanel = (props) => {
  const { panelWidth } = props

  const [attributesData, setAttributesData] = useState([])
  const [companyData, setCompanyData] = useState(null)

  const { sidePanelState, closePanel, sidePanelData } = useContext(appContext)

  const classes = useStyles(panelWidth)

  const router = useRouter()

  // Fetch Company Data when id comes from context
  useEffect(() => {
    if (sidePanelData) {
      fetch(
        `http://localhost:3000/api/company/basics/${sidePanelData.company_id}`,
      )
        .then((res) => res.json())
        .then((data) => setCompanyData(data))
        .catch((err) => console.log(err.message))
    }
  }, [sidePanelData])

  // Set Attributes
  useEffect(() => {
    if (companyData) {
      setAttributesData(getAttributes(companyData))
    }
  }, [companyData])

  const isActive = (pathName) => {
    return router.asPath === pathName ? classes.active : null
  }

  return (
    <NoSsr>
      {sidePanelState && (
        <div>
          <Drawer
            className={classes.drawer}
            anchor="right"
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div>
              <Typography variant="h5" align="center" className={classes.title}>
                {companyData && companyData.data?.company_name}
              </Typography>
            </div>
            <div className={classes.attributeContainer}>
              {attributesData &&
                attributesData.map((item) => (
                  <Attributes key={item.label} item={item} />
                ))}
            </div>
            <div className={classes.tabsContainer}>
              {sidePanelTabs.map((tab) => (
                <List key={tab.text}>
                  <ListItem
                    button
                    className={
                      companyData &&
                      isActive(
                        tab.path(companyData.data?.local_organization_id.id),
                      )
                    }
                    onClick={() =>
                      router.push(
                        tab.path(companyData.data?.local_organization_id.id),
                      )
                    }
                  >
                    <ListItemIcon>{tab.icon}</ListItemIcon>
                    <ListItemText primary={tab.text} />
                  </ListItem>
                </List>
              ))}
            </div>
            <Button variant="contained" onClick={() => closePanel()}>
              Close
            </Button>
          </Drawer>
        </div>
      )}
    </NoSsr>
  )
}

export default SidePanel
