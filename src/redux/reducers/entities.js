export default function entities(state = {}, action) {
    switch (action.type) {
        case "GETGARAGES_SUCCESS":
            return { garages: action.garages };
        case "DELETEGARAGE_SUCCESS":
            return { garages: action.garages };
        case "ADDGARAGE_SUCCESS":
            return { ...state };
        case "UPDATEGARAGE_SUCCESS":
            return { garages: action.garages}
        default:
            return state;
    }
}