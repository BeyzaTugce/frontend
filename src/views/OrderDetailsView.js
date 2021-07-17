import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import OrderDetails from "../components/OrderDetails";
import { getOrder, getSeller, getItems } from "../redux/actions/OrderActions";
import Header from "../components/Header";

function OrderDetailsView(props) {
    let {match, getOrder, getSeller, getItems} = props;

    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const items = useSelector((state) => state.items);

    useEffect(() => {
        let orderId = match.params.id;
        console.log("user: " + user);
        console.log("order: " + order);
        getOrder(orderId);
        getSeller(orderId);
        //getItems(orderId);
    }, [match.params]);

    return (
        <div>
            <Header/>
            <OrderDetails
                order={order.order}
                user={user.user}
                seller= {order.seller}
                items={order.items}
                isLoggedIn={!!user.user}
            />
        </div>
    );
}

export default connect(null, { getOrder, getSeller, getItems })(
    OrderDetailsView
);