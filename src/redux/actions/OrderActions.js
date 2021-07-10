import OrderService from "../../services/OrderService";
import order from "../reducers/orderReducer";

export function getOrders() {
    function onSuccess(orders) {
        return { type: "GETORDERS_SUCCESS", orders: orders };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get the orders", error);
    }
    return async (dispatch) => {
        try {
            let orders = await OrderService.getOrders();
            dispatch(onSuccess(orders));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function deleteOrder(item) {
    function onSuccess(orders) {
        return { type: "DELETEORDER_SUCCESS", orders: orders };
    }
    function onFailure(error) {
        console.log("delete order failure", error);
    }

    return async (dispatch) => {
        try {
            await OrderService.deleteOrder(item);
            let orders = await OrderService.getOrders();
            dispatch(onSuccess(orders));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function addOrder(order) {
    function onSuccess() {
        return { type: "ADDORDER_SUCCESS" };
    }
    function onFailure(error) {
        console.log("add order failure", error);
    }

    return async (dispatch) => {
        try {
            await OrderService.createOrder(order);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function changeOrder(changedOrder) {
    function onSuccess(order) {
        return { type: "UPDATEORDER_SUCCESS", order: order };
    }
    function onFailure(error) {
        console.log("change order failure", error);
    }

    return async (dispatch) => {
        try {
            let order = await OrderService.updateOrder(changedOrder);
            dispatch(onSuccess(order));
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getOrder = (id) => {
    function onSuccess(order) {
        return { type: "GETORDER_SUCCESS", order: order };
    }
    function onFailure(error) {
        console.log("failed to load a order", error);
    }

    return async (dispatch, getState) => {
        try {
            let order = await OrderService.getOrder(id);
            dispatch(onSuccess(order));
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
        console.log("failed to load a order", error);
    }

    return async (dispatch, getState) => {
        try {
            // let order = await OrderService.getOrder(id);
            let seller = await OrderService.readSeller(id);
            dispatch(onSuccess(seller));
        } catch (e) {
            onFailure(e);
        }
    };
};

export function getItems(id) {
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
            let items = await OrderService.readItems(id);
            dispatch(onSuccess(items));
        } catch (e) {
            onFailure(e);
        }
    };
}