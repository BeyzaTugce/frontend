export default function garage(state = {}, action) {
  switch (action.type) {
    case "GETGARAGES_SUCCESS":
      return { garages: action.garages };
    case "GETITEMS_SUCCESS":
      return { items: action.items };
    case "GETSELLER_SUCCESS":
        return { seller: action.seller };
    case "GETGARAGE_SUCCESS":
      return { garage: action.garage };
    case "DELETEGARAGE_SUCCESS":
      return { garages: action.garages };
    case "ADDGARAGE_SUCCESS":
      return { ...state };
    case "ADDITEM_SUCCESS":
      return { ...state };
    case "UPDATEGARAGE_SUCCESS":
      return { garage: action.garage };
    /*case "ADDPURCHASE_SUCCESS":
        return { ...state, purchase: action.purchase };*/
    default:
      return { garage: action.garage };
  }
}