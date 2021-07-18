import React, {useEffect, useState} from "react";
import { connect, useSelector } from "react-redux";
import Search from "../components/Search";
import { getItem, getItems } from "../redux/actions/ItemActions";
import Header from "../components/Header";

function SearchView(props) {
    const [searchTerm, setSearchTerm] = useState("trial");

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        setSearchTerm(params.get('term'));
    }, []);

    return (
        <div>
            <Header />
            <Search searchTerm={searchTerm} />
        </div>
    );


}

export default connect(null, { getItem, getItems })(
    SearchView
);
