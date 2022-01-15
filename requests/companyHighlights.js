const companyHighlights = ({ id }) => {
  return fetch(`/api/company/highlights/${id}`)
    .then((data) => data.json())
    .then(({ data }) => data)
    .catch((err) => err)
}

export default companyHighlights
