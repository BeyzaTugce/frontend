//import BargainService from "../../services/BargainService";

export function getOfferHistory() {
  return {
    type: "GET_OFFERHISTORY",
  };
}

export function makeOffer() {
  return {
    type: "MAKE_OFFER",
  };
}

export const withdrawOffer = (id) => {
  return {
    type: "WITHDRAW_OFFER",
    // we need to send payload to reducer. (reducer needs that information to take care of WITHDRAW_OFFER operation)
    payload: id,
  };
};
