export default function itemReducer(state = {}, action) {
    switch (action.type) {
        case "GETITEMS_SUCCESS":
            return { items: action.items };
        case "DELETEITEM_SUCCESS":
            return { items: action.items };
        case "ADDITEM_SUCCESS":
            return { ...state };
        case "UPDATEITEM_SUCCESS":
            return { items: action.items}
        default:
            return state;
    }
}