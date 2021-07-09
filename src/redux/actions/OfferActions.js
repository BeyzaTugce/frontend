//import BargainService from "../../services/BargainService";
import axios from 'axios';

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

export const makeOffer = (offer) => dispatch => {
    let id = 27;
    axios
        .post(`${baseURL}/${id}`, offer)
        .then(res => 
          dispatch({
            type: "MAKE_OFFER",
            payload: res.data
          }))
};

export const withdrawOffer = () => {
  return {
    type: "WITHDRAW_OFFER",
    // we need to send payload to reducer. (reducer needs that information to take care of WITHDRAW_OFFER operation)
    //payload: id,
  };
};

export const setOffersLoading = () => {
  return {
    type: "OFFERS_LOADING",
  };
};
