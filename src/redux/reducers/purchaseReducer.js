export default function purchaseReducer(state = {}, action) {
    switch (action.type) {
      case "GETPURCHASE_SUCCESS":
        return { purchase: action.purchase };
      case "DELETEPURCHASE_SUCCESS":
        return { purchase: action.purchase };
      case "ADDPURCHASE_SUCCESS":
        return { ...state };
      case "UPDATEPURCHASE_SUCCESS":
        return { purchase: action.purchase };
      default:
        return state;
    }
  }
  