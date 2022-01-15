import React from "react"
import { Typography, makeStyles } from "@material-ui/core"
import MoodIcon from "@material-ui/icons/Mood"
import MoodBadIcon from "@material-ui/icons/MoodBad"
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied"
import PageTitle from "../Layout/PageTitle"

const classificationType = (type, classes) => {
  switch (type) {
    case "positive":
      return {
        icon: <MoodIcon fontSize="large" className={classes.iconPositive} />,
        className: classes.bgPositive,
      }
    case "negative":
      return {
        icon: <MoodBadIcon fontSize="large" className={classes.iconNegative} />,
        className: classes.bgNegative,
      }
    case "neutral":
      return {
        icon: (
          <SentimentSatisfiedIcon
            fontSize="large"
            className={classes.iconNeutral}
          />
        ),
        className: classes.bgNeutral,
      }
    default:
      return null
  }
}

const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  flexContainer: {
    display: "flex",
    border: "#f2f2f2 solid 3px",
    borderRadius: "7px",
    padding: "15px",
  },
  bgNegative: {
    backgroundColor: "#d1baba",
  },
  bgPositive: {
    backgroundColor: "#b7cfb2",
  },
  bgNeutral: {
    backgroundColor: "#cfcabe",
  },
  classification: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  weight: {
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: { width: "80%" },
  title: {},
  description: {},
  message: {},
  iconPositive: { color: "green", fontSize: "100px" },
  iconNegative: { color: "red", fontSize: "100px" },
  iconNeutral: { color: "orange", fontSize: "100px" },
})

const sortByClassification = (data) => {
  let sortedData = []

  const compare = (a, b) => {
    if (a.weight > b.weight) {
      return 1
    }
    if (a.weight < b.weight) {
      return -1
    }
    return 0
  }

  const extract = (obj, value) => {
    return Object.values(obj)
      .map((val) => val)
      .filter((item) => item.classification === value)
      .sort(compare)
  }

  const values = ["negative", "positive", "neutral"]
  values.forEach((val) => (sortedData = [...sortedData, ...extract(data, val)]))

  return sortedData
}

const CompanyHighlights = (props) => {
  const { data } = props

  const classes = useStyles()

  return (
    <div>
      <PageTitle title="Company Highlights" />
      <div className={classes.mainContainer}>
        {data &&
          sortByClassification(data).map((item) => (
            <div
              key={item.title}
              className={`${classes.flexContainer} ${
                classificationType(item.classification, classes).className
              }`}
            >
              <div className={classes.classification}>
                {classificationType(item.classification, classes).icon}
              </div>
              <div className={classes.mainContent}>
                <Typography align="center" variant="h4">
                  {item.title}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  {item.description}
                </Typography>
                <Typography variant="h5" align="center">
                  {item.message}
                </Typography>
              </div>
              <div className={classes.weight}>
                <Typography variant="h2">{item.weight}</Typography>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CompanyHighlights
