const initialState = {
  offers: [
    {
      price: 575,
    },
    {
      price: 576,
    },
    {
      price: 577,
    },
    {
      price: 579,
    },
  ],
};

export default function offerReducer(state=initialState, action) {
  switch (action.type) {
    case "GET_OFFERHISTORY":
      return { ...state };
    case "MAKE_OFFER":
      return { ...state, offers: [action.payload, ...state.offers]};
    case "WITHDRAW_OFFER":
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.id !== action.payload),
      };
    default:
      return state;
  }
}
