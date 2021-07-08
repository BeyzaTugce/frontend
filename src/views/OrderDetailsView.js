import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import OrderDetails from "../components/OrderDetails";
import { getOrder, getSeller, getItems } from "../redux/actions/OrderActions";

function OrderDetailsView(props) {
    let {match, getOrder, getSeller, getItems} = props;

    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    //const items = useSelector((state) => state.items);

    useEffect(() => {
        let orderId = match.params.id;
        getOrder(orderId);
        //getSeller(orderId);
    }, [match.params]);

    useEffect(() => {
        let orderId = match.params.id;
        getSeller(orderId);
        //document.write(seller.seller.firstname);
    }, [match.params]);

    useEffect(() => {
        let orderId = match.params.id;
        getItems(orderId);
        //document.write(seller.seller.firstname);
    }, [match.params]);

    return (
        <OrderDetails
            order={order}
            //seller= {order.seller}
            //items={order.items}
            //isLoggedIn={!!user.user}
        />
    );
}

export default connect(null, { getOrder, getSeller, getItems })(
    OrderDetailsView
);