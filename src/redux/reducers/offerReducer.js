const initialState = {
    offers: [],
    loading: false,
    buyer: null,
    seller: null
};
  
export default function offerReducer(state=initialState, action) {
  switch (action.type) {
    case "GET_OFFERHISTORY":
      //console.log(action.payload.offerHistory);
      if(action.payload)
        return { ...state, offers: action.payload};
      return { ...state, offers: []}
    case "MAKE_OFFER":
      //console.log(action.payload);
      return { ...state, offers: action.payload};
    case "WITHDRAW_OFFER":
      return { ...state, offers: []};
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
