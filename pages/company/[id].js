import * as React from "react"
import { useRouter } from "next/router"
import Management from "@/components/Management"
import { companyRelations } from "@/requests"

export default function Company() {
  const router = useRouter()
  const { id } = router.query

  const [relations, setRelations] = React.useState(null)

  React.useEffect(() => {
    if (id != null) {
      companyRelations({ id }).then((res) => {
        setRelations(res)
      })
    }
  }, [id])

  return <div>{relations ? <Management relations={relations} /> : null}</div>
}
