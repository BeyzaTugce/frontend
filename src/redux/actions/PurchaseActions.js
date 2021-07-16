import PurchaseService from "../../services/PurchaseService";

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
