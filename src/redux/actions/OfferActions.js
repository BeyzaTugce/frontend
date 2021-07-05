//import BargainService from "../../services/BargainService";

export const getOfferHistory = () => {
  return {
    type: "GET_OFFERHISTORY",
  };
}

export const makeOffer = data => {
  return {
    type: "MAKE_OFFER",
    payload: data,
  };
}

export const withdrawOffer = id => {
  return {
    type: "WITHDRAW_OFFER",
    // we need to send payload to reducer. (reducer needs that information to take care of WITHDRAW_OFFER operation)
    payload: id,
  };
};
