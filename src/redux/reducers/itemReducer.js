export default function itemReducer(state = {}, action) {
    switch (action.type) {
        case "GETITEMS_SUCCESS":
            return { item: action.item };
        case "DELETEITEM_SUCCESS":
            return { item: action.item };
        case "ADDITEM_SUCCESS":
            return { ...state };
        case "UPDATEITEM_SUCCESS":
            return { item: action.item}
        case "GETITEM_SUCCESS":
            return { item: action.item };
        case "GETITEM_ERROR":
            return { error: action.error };
        case "CHANGE_SELECTED_ITEM":
            return {
                item: {
                    ...state.item,
                    ...action.updates,
                },
            };
        default:
            return state;
    }
}