import React, { useReducer, createContext } from "react"
import reducer from "./reducer"
import { OPEN_PANEL, CLOSE_PANEL } from "./types"

export const appContext = createContext()

const ContextProvider = (props) => {
  const initialState = {
    sidePanelState: false,
    sidePanelData: null,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const openPanel = (data) => {
    dispatch({ type: OPEN_PANEL, payload: data })
  }
  const closePanel = () => {
    dispatch({ type: CLOSE_PANEL })
  }

  return (
    <appContext.Provider
      value={{
        sidePanelState: state.sidePanelState,
        sidePanelData: state.sidePanelData,
        openPanel,
        closePanel,
      }}
    >
      {props.children}
    </appContext.Provider>
  )
}

export default ContextProvider
