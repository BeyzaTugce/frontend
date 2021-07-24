//import BargainService from "../../services/BargainService";
import axios from 'axios';
import OfferService from "../../services/OfferService";

const baseURL = "http://localhost:4000/bargain"
//const otherURL = "http://localhost:4000/auth"

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

/*export const getOfferHistory = id => dispatch =>{
  dispatch(setOffersLoading());
  function onSuccess(offer) {
    return { type: "GET_OFFERHISTORY",
    loading: false, offer: offer };
  }
  function onFailure(error) {
    console.log("failed to load a offer", error);
  }

  return async (dispatch, getState) => {
    try {
      console.log("denemeler");
      let offer = await OfferService.getOffer(id);
      console.log("denemelewqr");
      dispatch(onSuccess(offer));
    } catch (e) {
      onFailure(e);
    }
  };
};*/
/*

export const makeOffer = (id, offer) => dispatch => {
    axios
        .post(`${baseURL}/${id}`, offer)
        .then(res => 
          dispatch({
            type: "MAKE_OFFER",
            payload: res.data
          }))
};*/
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

// export const loadBuyer = id => dispatch => {
//     axios
//         .get(`${otherURL}/buyerseller/${id}`)
//         .then(res => dispatch({
//             type: "LOAD_BUYER",
//             payload: res.data
//           })
//         )
// }

// export const loadSeller = id => dispatch => {
//   axios
//       .get(`${otherURL}/buyerseller/${id}`)
//       .then(res => dispatch({
//           type: "LOAD_SELLER",
//           payload: res.data
//         })
//       )
// }

export const setOffersLoading = () => {
  return {
    type: "OFFERS_LOADING",
  };
};
