const initialState = {
  purchase: null,
  purchases: null,
  buyer: null,
  seller: null
};

export default function purchaseReducer(state=initialState, action) {
    switch (action.type) {
      case "GETPURCHASES_SUCCESS":
      return {...state, purchases: action.purchases };
      case "GETPURCHASE_SUCCESS":
        return {...state, purchase: action.purchase };
      case "GETPURCHASE_ERROR":
        return { error: action.error };
      case "DELETEPURCHASE_SUCCESS":
        return {  purchase: action.purchase};
      case "ADDPURCHASE_SUCCESS":
        return { ...state, purchase: action.purchase };
      case "UPDATEPURCHASE_SUCCESS":
        return {  purchase: {
          ...state.purchase,
          ...action.updates,
      },};
      case "LOAD_BUYER":
        return { ...state, buyer: action.payload}
      case "LOAD_SELLER":
        return { ...state, seller: action.payload}
      case "GETSELLER_SUCCESS":
        return { ...state, seller: action.seller };
      case "GETBUYER_SUCCESS":
        return { ...state, buyer: action.buyer };
      default:
        return state;
    }
  }
  