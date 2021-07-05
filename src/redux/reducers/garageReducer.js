export default function garage(state = {}, action) {
  switch (action.type) {
    case "GETGARAGES_SUCCESS":
      return { garages: action.garages };
    case "GETGARAGE_SUCCESS":
      return { garage: action.garage };
    case "DELETEGARAGE_SUCCESS":
      return { garages: action.garages };
    case "ADDGARAGE_SUCCESS":
      return { ...state };
    case "UPDATEGARAGE_SUCCESS":
      return { garage: action.garage };
    default:
      return { garage: action.garage };
  }
}