import GarageService from "../../services/GarageService";

export function getGarages(){

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