const initialState = {
  purchase: null,
  buyer: null,
  seller: null
};

export default function purchaseReducer(state=initialState, action) {
    switch (action.type) {
      case "GETPURCHASES_SUCCESS":
      return { purchases: action.purchases };
      case "GETPURCHASE_SUCCESS":
        return { ...state, purchase: action.purchase };
      case "DELETEPURCHASE_SUCCESS":
        return {  purchase: action.purchase};
      case "ADDPURCHASE_SUCCESS":
        return { ...state, purchase: action.purchase };
      case "UPDATEPURCHASE_SUCCESS":
        return { purchase: action.purchase };
      case "LOAD_BUYER":
        return { ...state, buyer: action.payload}
      case "LOAD_SELLER":
        return { ...state, seller: action.payload}
      default:
        return state;
    }
  }
  