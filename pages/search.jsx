import React, { useState, useEffect } from "react"
import PageTitle from "@/components/Layout/PageTitle"
import { makeStyles, Input, NoSsr, Typography } from "@material-ui/core"
import CompanyCard from "@/components/Card/CompanyCard"

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {},
    inputContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "55px",
    },
    cardContainer: {
      marginTop: theme.spacing(10),
      padding: theme.spacing(3),
      backgroundColor: "#0b373d",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      flexWrap: "wrap",
    },
    input: {
      fontSize: "24px",
    },
    noResults: { color: "#fff" },
  }
})

const Search = () => {
  const [userInput, setUserInput] = useState("")
  const [responseData, setResponseData] = useState(null)

  const classes = useStyles()

  useEffect(() => {
    if (userInput.length > 2) {
      fetch(`http://localhost:3000/api/search?query=${userInput}`)
        .then((res) => res.json())
        .then((data) => setResponseData(data))
        .catch((err) => console.log(err.message))
    } else {
      setResponseData(null)
    }
  }, [userInput])

  return (
    <NoSsr>
      <div className={classes.pageContainer}>
        <PageTitle title="Type Company Name / Local Organisation ID" />
        <div className={classes.inputContainer}>
          <Input
            contained
            align="center"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className={classes.input}
          />
        </div>
        {responseData && (
          <div className={classes.cardContainer}>
            {responseData.data.length ? (
              responseData.data.map((company) => (
                <CompanyCard key={company.company_name} companyData={company} />
              ))
            ) : (
              <Typography className={classes.noResults} variant="h4">
                No Results...
              </Typography>
            )}
          </div>
        )}
      </div>
    </NoSsr>
  )
}

export default Search
