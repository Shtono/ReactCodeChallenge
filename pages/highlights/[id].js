import * as React from "react"
import { useRouter } from "next/router"
import { companyHighlights } from "@/requests"
import CompanyHighlights from "@/components/Highlights/CompanyHighlights"

export default function Highlights() {
  const [companyData, setCompanyData] = React.useState(null)
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    if (id != null) {
      companyHighlights({ id }).then((res) => {
        setCompanyData(res)
      })
    }
  }, [id])

  return companyData ? <CompanyHighlights data={companyData} /> : null
}
