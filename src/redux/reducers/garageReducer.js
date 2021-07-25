export default function garage(state = {}, action) {
  switch (action.type) {
    case "GETGARAGES_SUCCESS":
      return { ...state, garages: action.garages };
    case "GETGARAGEITEMS_SUCCESS":
      return { ...state, garageItems: action.garageItems };
    case "GETSELLER_SUCCESS":
        return { ...state, seller: action.seller };
    case "GETGARAGE_SUCCESS":
      return { ...state, garage: action.garage };
    case "DELETEGARAGE_SUCCESS":
      return { garages: action.garages };
    case "ADDGARAGE_SUCCESS":
      return { ...state };
    case "ADDITEM_SUCCESS":
      return { ...state };
    case "UPDATEGARAGE_SUCCESS":
      return { garage: action.garage };
    default:
      return { garage: action.garage };
  }
}