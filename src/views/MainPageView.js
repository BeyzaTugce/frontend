import React, {useEffect, useState} from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Header from "../components/Header";
import store from "../redux/store";
import {getItems} from "../redux/actions/ItemActions";
import GarageItem from "../components/GarageItem";
import {Button} from "react-bootstrap";


function MainPageView(props) {

   /* const item = useSelector((state) => state.item);
    const [garageItems, setGarageItems] = useState([]);


    useEffect(() => {
        props.dispatch(getItems());
        //setGarageItems(item.items)
    }, [] );


    const onReadAllItems = () => {
        setGarageItems(item.items)
        console.log("items:"+item.items.items);
    }
    const renderedListBuyer = garageItems.map((garageItem) => {
        return (
            <GarageItem
                name={garageItem.name}
                info={garageItem.info}
                tags={garageItem.tags}
                price={garageItem.price}
                button1Name={"Buy"}
                button2Name={"Bargain"}
                condition={true}
                userView={false}
                //image={garageItem.image}
            />
        );
    });*/




    return (
        <div>
            <Header/>
        </div>
    );
}



export default connect()(withRouter(MainPageView));
