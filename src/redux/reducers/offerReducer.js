const initialState = {
    offers: [],
    loading: false,
    buyer: null,
    seller: null
};
  
export default function offerReducer(state = {}, action) {
  switch (action.type) {
    case "GET_OFFERHISTORY":
      //console.log(action.payload.offerHistory);
      if(action.payload)
        return { ...state, offer: action.payload};
      return { ...state, offer: []}
    case "MAKE_OFFER":
      //console.log(action.payload);
      return { ...state, offer: action.payload};
    case "WITHDRAW_OFFER":
      return { ...state, offer: []};
    case "OFFERS_LOADING":
      return { ...state, loading: true}
    case "LOAD_BUYER":
      return { ...state, buyer: action.payload}
    case "LOAD_SELLER":
      return { ...state, seller: action.payload}
    default:
      return state;
  }
}
