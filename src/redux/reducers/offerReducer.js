const initialState = {
    offers: []
};
  
export default function offerReducer(state=initialState, action) {
  switch (action.type) {
    case "GET_OFFERHISTORY":
      return { ...state, offers: action.payload};
    case "MAKE_OFFER":
      return { ...state.offers.offer , offers: [...state.offers, action.payload]};
    case "WITHDRAW_OFFER":
      return { ...state, offers: []};
    default:
      return state;
  }
}
