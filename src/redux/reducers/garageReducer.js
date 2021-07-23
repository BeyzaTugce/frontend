export default function garage(state = {}, action) {
  switch (action.type) {
    case "GETGARAGES_SUCCESS":
      return { garages: action.garages };
    case "GETITEMS_SUCCESS":
      return { ...state, items: action.items };
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