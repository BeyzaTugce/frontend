import axios from 'axios';
import OfferService from "../../services/OfferService";

const baseURL = "http://localhost:4000/bargain"

export const getOfferHistory = id => dispatch => {
    dispatch(setOffersLoading());
    axios
        .get(`${baseURL}/${id}`)
        .then(res => 
          dispatch({
            type: "GET_OFFERHISTORY",
            payload: res.data,
            loading: false
          })) 
};


export function makeOffer(id, offer) {

  function onSuccess() {
    return { type: "MAKE_OFFER" };
  }
  function onFailure(error) {
    console.log("add offer failure", error);
  }

  return async (dispatch) => {
    try {
      await OfferService.createOffer(id, offer);
      dispatch(onSuccess());
    } catch (e) {
      onFailure(e);
    }
  };
}


export const withdrawOffer = id => dispatch => {
    axios
        .delete(`${baseURL}/${id}`)
        .then(res =>
          dispatch({
            type: "WITHDRAW_OFFER",
            payload: res.id
          }))
};


export const setOffersLoading = () => {
  return {
    type: "OFFERS_LOADING",
  };
};
