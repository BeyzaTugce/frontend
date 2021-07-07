import GarageService from "../../services/GarageService";

export function getGarages() {
  function onSuccess(garages) {
    return { type: "GETGARAGES_SUCCESS", garages: garages };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the garages", error);
  }
  return async (dispatch) => {
    try {
      let garages = await GarageService.getGarages();
      dispatch(onSuccess(garages));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function deleteGarage(item) {
  function onSuccess(garages) {
    return { type: "DELETEGARAGE_SUCCESS", garages: garages };
  }
  function onFailure(error) {
    console.log("delete garage failure", error);
  }

  return async (dispatch) => {
    try {
      await GarageService.deleteGarage(item);
      let garages = await GarageService.getGarages();
      dispatch(onSuccess(garages));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function addGarage(garage) {
  function onSuccess() {
    return { type: "ADDGARAGE_SUCCESS" };
  }
  function onFailure(error) {
    console.log("add garage failure", error);
  }

  return async (dispatch) => {
    try {
      await GarageService.createGarage(garage);
      dispatch(onSuccess());
    } catch (e) {
      onFailure(e);
    }
  };
}

export function changeGarage(changedGarage) {
  function onSuccess(garage) {
    return { type: "UPDATEGARAGE_SUCCESS", garage: garage };
  }
  function onFailure(error) {
    console.log("change garage failure", error);
  }

  return async (dispatch) => {
    try {
      let garage = await GarageService.updateGarage(changedGarage);
      dispatch(onSuccess(garage));
    } catch (e) {
      onFailure(e);
    }
  };
}

export const getGarage = (id) => {
  function onSuccess(garage) {
    return { type: "GETGARAGE_SUCCESS", garage: garage };
  }
  function onFailure(error) {
    console.log("failed to load a garage", error);
  }

  return async (dispatch, getState) => {
    try {
      let garage = await GarageService.getGarage(id);
      dispatch(onSuccess(garage));
    } catch (e) {
      onFailure(e);
    }
  };
};

export const getSeller = (id) => {
  function onSuccess(seller) {
   // document.write(seller.firstname);
    return { type: "GETSELLER_SUCCESS", seller: seller };
  }
  function onFailure(error) {
    console.log("failed to load a garage", error);
  }

  return async (dispatch, getState) => {
    try {
     // let garage = await GarageService.getGarage(id);
      let seller = await GarageService.getSeller(id);
      dispatch(onSuccess(seller));
    } catch (e) {
      onFailure(e);
    }
  };
};

export function getItems(id) {
  function onSuccess(items) {
    return { type: "GETITEMSS_SUCCESS", items: items };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the items", error);
  }
  return async (dispatch) => {
    try {
      let items = await GarageService.getItems(id);
      console.log("action:"+items);
      dispatch(onSuccess(items));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function addItem(garageId, item) {
  function onSuccess() {
    return { type: "ADDITEM_SUCCESS" };
  }
  function onFailure(error) {
    console.log("add item failure", error);
  }

  return async (dispatch) => {
    try {
      await GarageService.addItem(garageId, item);
      dispatch(onSuccess());
    } catch (e) {
      onFailure(e);
    }
  };
}

