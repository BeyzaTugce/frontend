import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
//import { reducer as searchReducer, reduxSearch } from "redux-search";
import Search from "../components/Search";
import { getItems, getItem } from "../redux/actions/ItemActions";
import Header from "../components/Header";
import SearchItem from "../components/SearchItem";

function SearchView(props) {
    //let {match, getItem, getItems} = props;
    const [searchTerm, setSearchTerm] = useState("");
    //const items = useSelector((state) => state.items);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        setSearchTerm(params.get('term'));
    }, []);

    /*
    useEffect(() => {
        items.map(item => {
            let itemId = match.params.id;
            getItem(itemId);
        });
    }, [match.params]);

    const filterItems = (item, searchTerm) => {
        return item.name.includes(searchTerm) || item.tags.map((tag) => {
            tag.includes(searchTerm)
        })
    };

    const chosenItems = items.filter(filterItems(searchTerm)).map(item => {
        return (
            <SearchItem
            name={item.name}
            info={item.info}
            tags={item.tags}
            price={item.price}
            user={item.garageId.user}
            endDate={item.garageId.dateCreated}
            />)
    });
     */

    return (
        <div>
            <Header />
            <Search
                searchTerm={searchTerm}
            />
        </div>
    );


}

export default connect(null, { getItem, getItems })(
    SearchView
);
