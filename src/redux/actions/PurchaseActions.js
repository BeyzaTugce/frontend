import PurchaseService from "../../services/PurchaseService";
import axios from 'axios';
import GarageService from "../../services/GarageService";

const otherURL = "http://localhost:4000/auth"

export function addPurchase(purchase) {
  function onSuccess(returnedPurchase) {
  
    return { type: "ADDPURCHASE_SUCCESS" , purchase: returnedPurchase };
  }
  function onFailure(error) {
    console.log("add purchase failure", error);
  }

  return async (dispatch) => {
    try {
      let returnedPurchase = await PurchaseService.createPurchase(purchase);
      dispatch(onSuccess(returnedPurchase));
    } catch (e) {
      onFailure(e);
    }
  };
}


export const getPurchase = (id) => {
  function onSuccess(purchase) {
    return { type: "GETPURCHASE_SUCCESS", purchase: purchase };
  }
  function onFailure(error) {
    console.log("failed to load a purchase", error);
  }

  return async (dispatch, getState) => {
    try {
      let purchase = await PurchaseService.getPurchase(id);
      dispatch(onSuccess(purchase));
    } catch (e) {
      onFailure(e);
    }
  };
};


export function getPurchases() {
  function onSuccess(purchases) {
    return { type: "GETPURCHASES_SUCCESS", purchases: purchases };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the purchases", error);
  }
  return async (dispatch) => {
    try {
      let purchases = await PurchaseService.getPurchases();
      dispatch(onSuccess(purchases));
    } catch (e) {
      onFailure(e);
    }
  };
}
export function changePurchase(changedPurchase) {
 
    function onSuccess(purchase) {
      console.log(changedPurchase);       
        return { type: "UPDATEPURCHASE_SUCCESS", purchase: purchase };
    }
    function onFailure(error) {
        console.log("change purchase failure", error);
    }

    return async (dispatch) => {
        try {
            let purchase = await PurchaseService.updatePurchase(changedPurchase);
            dispatch(onSuccess(purchase));
        } catch (e) {
          //console.log("2");
            onFailure(e);
        }
    };
}

export const getPurchaseSeller = (id) => {
    function onSuccess(seller) {
        // document.write(seller.firstname);
        return { type: "GETSELLER_SUCCESS", seller: seller };
    }
    function onFailure(error) {
        console.log("failed to load a seller", error);
    }

    return async (dispatch) => {
        try {
            // let garage = await GarageService.getGarage(id);
            let seller = await PurchaseService.readSeller(id);
            console.log("SELLER ACTION:"+seller);
            dispatch(onSuccess(seller));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getPurchaseBuyer = (id) => {
    function onSuccess(buyer) {
        // document.write(seller.firstname);
        return { type: "GETBUYER_SUCCESS", buyer: buyer };
    }
    function onFailure(error) {
        console.log("failed to load a buyer", error);
    }

    return async (dispatch) => {
        try {
            // let garage = await GarageService.getGarage(id);
            let buyer = await PurchaseService.readBuyer(id);
            console.log("BUYER ACTION:"+buyer);
            dispatch(onSuccess(buyer));
        } catch (e) {
            onFailure(e);
        }
    };
};




export const loadBuyer = id => dispatch => {
  axios
      .get(`${otherURL}/buyerseller/${id}`)
      .then(res => dispatch({
          type: "LOAD_BUYER",
          payload: res.data
        })
      )
}

export const loadSeller = id => dispatch => {
  axios
    .get(`${otherURL}/buyerseller/${id}`)
    .then(res => dispatch({
        type: "LOAD_SELLER",
        payload: res.data
      })
    )
}
