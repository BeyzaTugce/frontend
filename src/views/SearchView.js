import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
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
        setSearchTerm(params.get('term').toUpperCase());
        store.dispatch(getItems());
    }, []);

    const filterItem = (item, searchTerm) => {
        const upperCaseTags = item.tags.map(tag => tag.toUpperCase())
        return item.name.toUpperCase().includes(searchTerm) || upperCaseTags.includes(searchTerm)
    };

    const foundItems =
        items?.items?.items.map(item => {
            if (filterItem(item,searchTerm)){
                return (
                    <SearchItem
                        key={item._id}
                        name={item.name}
                        info={item.info}
                        tags={item.tags}
                        price={item.price}
                        garageId={item.garageId}
                    />);
            }
    });

    return (
        <div>
            <Header />
            <Search
                items={items}
                searchTerm={searchTerm}
                foundItems={foundItems}
            />
        </div>
    );


}

export default connect(null, { getItem, getItems })(
    SearchView
);
