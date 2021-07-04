//import BargainService from "../../services/BargainService";

export function getOfferHistory () {
    return {
        type: "GET_OFFERHISTORY"
    };
};

export function makeOffer () {
    return {
        type: "MAKE_OFFER"
    };
};

export function withdrawOffer () {
    return {
        type: "WITHDRAW_OFFER"
    };
};