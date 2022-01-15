import Layout from "../components/Layout/Layout"
import ContextProvider from "@/context/context"

const globalStyles = () => {
  return (
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
      }
      .MuiTypography-displayBlock {
        padding-left: 5px;
      }
      .MuiListItemText-inset {
        padding-left: 25px;
      }
      .MuiList-padding {
        padding: 0;
      }
      input {
        text-align: center;
      }
    `}</style>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
        {globalStyles()}
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
