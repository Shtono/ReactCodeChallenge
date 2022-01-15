import { OPEN_PANEL, CLOSE_PANEL } from "./types"

export default (state, action) => {
  switch (action.type) {
    case OPEN_PANEL:
      return {
        ...state,
        sidePanelState: true,
        sidePanelData: action.payload,
      }
    case CLOSE_PANEL:
      return {
        ...state,
        sidePanelState: false,
        sidePanelData: {},
      }
    default:
      return state
  }
}
