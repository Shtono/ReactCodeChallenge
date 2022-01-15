import React, { useContext, useEffect } from "react"
import { appContext } from "@/context/context"
import PageTitle from "@/components/Layout/PageTitle"
import { Typography, makeStyles } from "@material-ui/core"

const introduction = [
  "To search for a company click Search on the left nav and you will be redirected to the search page.",
  "On the search page you will find an input which has live search functionality. You will need to type at least 3 characters for the search to kick in.",
  "Each result will render a card component with basic info for each company.",
  "The avatar color of each company is bound to the Risk Assessment.Green-Blue-Red low-medium-high.",
  "At the top right corner of the card component you can click on the info icon which will open a side panel.",
  "In the side panel you can see General company information as well as a few tabs at the bottom.",
  "From the tabs in the side panel you can navigate to Highlights and Relations for the selected company.",
  "Highlights are sorted by classification in the order negative-positive-neutral from top to bottom and each classification category is sorted by weight.Lower weight values(higher priority) come ot top.",
  "In the relations page all the info is rendered in a material ui table. Seniority time is converted to years.Less than 12 months shows in months otherwise in years.",
  "If relations table does not render for a company that means the company status is either 'Ceased' or 'Under bankrupcy'.",
]

const useStyles = makeStyles({
  content: {
    marginTop: "75px",
  },
  info: {
    marginTop: "50px",
  },
  textItem: {
    marginBottom: "10px",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "7px",
  },
})

export default function Home() {
  const { closePanel } = useContext(appContext)

  const classes = useStyles()

  useEffect(() => {
    closePanel()
  }, [])

  return (
    <div>
      <PageTitle title="Welcome" />
      <div className={classes.content}>
        <Typography variant="h3" align="center">
          Quick Introduction
        </Typography>
        <div className={classes.info}>
          {introduction.map((text, index) => (
            <Typography
              key={index}
              className={classes.textItem}
              variant="h5"
              align="justify"
            >
              {text}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  )
}
