import PurchaseService from "../../services/PurchaseService";

export function addPurchase(purchase) {
  function onSuccess() {
    return { type: "ADDPURCHASE_SUCCESS" };
  }
  function onFailure(error) {
    console.log("add purchase failure", error);
  }

  return async (dispatch) => {
    try {
      
      await PurchaseService.createPurchase(purchase);
      dispatch(onSuccess());
    } catch (e) {
      onFailure(e);
    }
  };
}
