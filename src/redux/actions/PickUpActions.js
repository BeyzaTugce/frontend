import PickUpService from "../../services/PickUpService";

export function addPickUp(pickup) {
  function onSuccess() {
    return { type: "ADDPICKUP_SUCCESS" };
  }
  function onFailure(error) {
    console.log("add pickUp failure", error);
  }

  return async (dispatch) => {
    try {
      await PickUpService.createPickUp(pickup);
      dispatch(onSuccess());
    } catch (e) {
      onFailure(e);
    }
  };
}


export const getPickUp = (id) => {
  function onSuccess(pickup) {
    return { type: "GETPICKUP_SUCCESS", pickup: pickup };
  }
  function onFailure(error) {
    console.log("failed to load a pickup", error);
  }

  return async (dispatch, getState) => {
    try {
      let pickup = await PickUpService.getPickUp(id);
      dispatch(onSuccess(pickup));
    } catch (e) {
      onFailure(e);
    }
  };
};
