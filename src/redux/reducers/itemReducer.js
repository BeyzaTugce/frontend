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
        case "GETITEM_SUCCESS":
            return { item: action.item };
        case "GETITEM_ERROR":
            return { error: action.error };
        case "CHANGE_SELECTED_ITEM":
            return {
                movie: {
                    ...state.item,
                    ...action.updates,
                },
            };
        default:
            return state;
    }
}