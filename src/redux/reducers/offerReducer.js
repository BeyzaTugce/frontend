const initialState = {
    offers: [
        { buyerUserName: "a", sellerUserName: "b", price: 575, bargainOffer: [45, 55] },
    ],
}

export default function offerReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_OFFERHISTORY":
            return { ...state };
        case "MAKE_OFFER":
            return { ...state };
        case "WITHDRAW_OFFER":
            return { ...state };
        default:
            return state;
    }
}