import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Search from "../components/Search";
import { getItem, getItems } from "../redux/actions/ItemActions";

function SearchView(props) {
    let {match, getItem, getItems} = props;

    const item = useSelector((state) => state.item);

    useEffect(() => {
        let itemId = match.params.id;
        getItem(itemId);
        getItems();
    }, [match.params]);

    return (
        <Search
            item={item.item}
        />
    );


}

export default connect(null, { getItem, getItems })(
    SearchView
);
