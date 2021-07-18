import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
//import { reducer as searchReducer, reduxSearch } from "redux-search";
import Search from "../components/Search";
import { getItems, getItem } from "../redux/actions/ItemActions";
import Header from "../components/Header";
import store from "../redux/store";
import SearchItem from "../components/SearchItem";

function SearchView(props) {
    //let {match, getItem, getItems} = props;
    const [searchTerm, setSearchTerm] = useState("");
    const items = useSelector((state) => state.items);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        setSearchTerm(params.get('term'));
        store.dispatch(getItems());
    }, []);

    const filterItem = (item, searchTerm) => {
        return item.name.includes(searchTerm) || item.tags.includes(searchTerm)
    };

    const foundItems =
        items?.items?.items.map(item => {
            if (filterItem(item,searchTerm)){
                return (
                    <SearchItem
                        name={item.name}
                        info={item.info}
                        tags={item.tags}
                        price={item.price}
                        garageId={item.garageId}
                    />)
            }
    });

    return (
        <div>
            <Header />
            <Search
                searchTerm={searchTerm}
                foundItems={foundItems}
            />
        </div>
    );


}

export default connect(null, { getItem, getItems })(
    SearchView
);
