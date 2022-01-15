import { setManagementData } from "./utils/setManagementData"
const managementRoles = [
  "MANAGEMENT",
  "ADMINISTRATION",
  "CHIEF EXECUTIVE OFFICER",
  "BOARD OF DIRECTORS",
  "CHAIRMAN",
  "DEPUTY CHAIRMAN",
  "DEPUTY",
  "STAKEHOLDER",
]
import { withStyles, makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import PageTitle from "../Layout/PageTitle"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const Management = ({ relations }) => {
  const { management, boardOfDirectors } = relations
  const classes = useStyles()

  const managementData = setManagementData(managementRoles, [
    ...management,
    ...boardOfDirectors,
  ])

  return (
    <div>
      <PageTitle title="Company Relations" />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Position</StyledTableCell>
              <StyledTableCell align="right">From date</StyledTableCell>
              <StyledTableCell align="right">Seniority</StyledTableCell>
              <StyledTableCell align="right">Seniority order</StyledTableCell>
              <StyledTableCell align="right">Function Real</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managementData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.position}</StyledTableCell>
                <StyledTableCell align="right">{row.from}</StyledTableCell>
                <StyledTableCell align="right">{row.seniority}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.seniorityOrder}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.functionReal}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Management
