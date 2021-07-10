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

export const makeOffer = (id, offer) => dispatch => {
    axios
        .post(`${baseURL}/${id}`, offer)
        .then(res => 
          dispatch({
            type: "MAKE_OFFER",
            payload: res.data
          }))
};

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
