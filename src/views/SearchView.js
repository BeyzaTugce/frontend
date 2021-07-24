import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
import Search from "../components/Search";
import { getItems, getItem } from "../redux/actions/ItemActions";
import Header from "../components/Header";
import store from "../redux/store";
import SearchItem from "../components/SearchItem";
import {getGarages} from "../redux/actions/GarageActions";

function SearchView(props) {
    //let {match, getItem, getItems} = props;
    const [searchTerm, setSearchTerm] = useState("");
    const items = useSelector((state) => state.items);
    const garage = useSelector((state) => state.garage);

    const [selectedGarages, setSelectedGarages] = React.useState([]);
    const [foundItems, setFoundItems] = React.useState([]);

    let selectedGarageIds = [];
    let foundItemsArray = [];

    let garageReached = false;
    let itemReached = false;


    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        setSearchTerm(params.get('term').toUpperCase());
        store.dispatch(getItems());
        store.dispatch(getGarages());
    }, [garageReached === false, itemReached === false]);

    useEffect(() => {
        if (garage.garages !== undefined && garage.garages !== null) {
            garageReached = true;
        }
        if (items.items !== undefined && items.items !== null) {
            itemReached = true;
        }
    }, [garage.garages, garageReached === false, items.items, itemReached === false]);

    const selectGarages = () => {
        garage?.garages?.garages?.map( g =>
        {
            if ( g.isPromoted){
                selectedGarageIds.push(g._id);
            }
        });
    }


    const filterItem = (item, searchTerm) => {
        const upperCaseTags = item.tags.map(tag => tag.toUpperCase())
        return item.name.toUpperCase().includes(searchTerm) || upperCaseTags.includes(searchTerm)
    };

    const findItems = () => {
        items?.items?.items.map(item => {
            if (filterItem(item,searchTerm)){
                foundItemsArray.push(
                    <SearchItem
                        key={item._id}
                        name={item.name}
                        info={item.info}
                        tags={item.tags}
                        price={item.price}
                        garageId={item.garageId}
                        image={item.image}
                    />);
            }
        });
    }

    useEffect(() => {
        if (garage.garages !== undefined && garage.garages !== null) {
            selectGarages();
            setSelectedGarages(selectedGarageIds);
        }
        if (items.items !== undefined && items.items !== null) {
            findItems();
            setFoundItems(foundItemsArray);
        }
    }, [garage.garages, garageReached, items.items, itemReached]);



    return (
        <div>
            <Header />
            <Search
                items={items}
                searchTerm={searchTerm}
                foundItems={foundItems}
                garage={garage.garages}
                selectedGarages={selectedGarages}
            />
        </div>
    );


}

export default connect(null, { getItem, getItems })(
    SearchView
);
