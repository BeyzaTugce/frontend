//import BargainService from "../../services/BargainService";
import axios from 'axios';

const baseURL = "http://localhost:4000/bargain"

export const getOfferHistory = (id) => dispatch => {
    axios.get(`${baseURL}/${id}`)
        .then(res => 
            dispatch({
                type: "GET_OFFERHISTORY",
                payload: res.data
            })) 
};

export const makeOffer = data => {
  return {
    type: "MAKE_OFFER",
    payload: data,
  };
};

export const withdrawOffer = () => {
  return {
    type: "WITHDRAW_OFFER",
    // we need to send payload to reducer. (reducer needs that information to take care of WITHDRAW_OFFER operation)
    //payload: id,
  };
};
