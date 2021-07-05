export default function pickupReducer(state = {}, action) {
  switch (action.type) {
    case "GETPICKUP_SUCCESS":
      return { pickup: action.pickup };
    case "DELETEPICKUP_SUCCESS":
      return { pickup: action.pickup };
    case "ADDPICKUP_SUCCESS":
      return { ...state };
    case "UPDATEPICKUP_SUCCESS":
      return { pickup: action.pickup };
    default:
      return state;
  }
}
