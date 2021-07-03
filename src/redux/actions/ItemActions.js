import ItemService from "../../services/ItemService";

export function getItems(){

    function onSuccess(items) {
        return { type: "GETITEMS_SUCCESS", items: items };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get the items", error);
    }
    return async (dispatch) => {
        try {
            let items = await ItemService.getItems();
            dispatch(onSuccess(items));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function deleteItem(item) {
    function onSuccess(items) {
        return { type: "DELETEITEM_SUCCESS", items: items };
    }
    function onFailure(error) {
        console.log("delete item failure", error);
    }

    return async (dispatch) => {
        try {
            await ItemService.deleteItem(item);
            let items = await ItemService.getItems();
            dispatch(onSuccess(items));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function addItem(item) {
    function onSuccess() {
        return { type: "ADDITEM_SUCCESS" };
    }
    function onFailure(error) {
        console.log("add item failure", error);
    }

    return async (dispatch) => {
        try {
            await ItemService.createGarage(item);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function changeItem(changedItem) {
    function onSuccess(item) {
        return { type: "UPDATEITEM_SUCCESS", item: item };
    }
    function onFailure(error) {
        console.log("change item failure", error);
    }

    return async (dispatch) => {
        try {
            let item = await ItemService.updateItem(changedItem);
            dispatch(onSuccess(item));
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getItem = (id) => {
    function onSuccess(item) {
        return { type: "GETITEM_SUCCESS", item: item };
    }
    function onFailure(error) {
        console.log("failed to load a item", error);
    }

    return async (dispatch, getState) => {
        try {
            let item = await ItemService.getItem(id);
            dispatch(onSuccess(item));
        } catch (e) {
            onFailure(e);
        }
    };
};