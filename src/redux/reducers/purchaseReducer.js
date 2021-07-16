export default function purchaseReducer(state = {}, action) {
    switch (action.type) {
      case "GETPURCHASES_SUCCESS":
      return { purchases: action.purchases };
      case "GETPURCHASE_SUCCESS":
        return { purchase: action.purchase };
      case "DELETEPURCHASE_SUCCESS":
        return {  purchase: action.purchase};
      case "ADDPURCHASE_SUCCESS":
        return { ...state, purchase: action.purchase };
      case "UPDATEPURCHASE_SUCCESS":
        return { purchase: action.purchase };
      default:
        return state;
    }
  }
  