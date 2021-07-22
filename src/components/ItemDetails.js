import React, { useEffect, useState } from "react";
import {getItem} from "../redux/actions/ItemActions";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";


const ItemDetails = (props) => {

    let {match, getItem} = props;

    const item = useSelector((state) => state.items);
   
    useEffect(() => {
        let itemId = match.params.id;
        getItem(itemId)
    }, [match.params]);

    return(
        <div>
            <h1 className="text-center" style={{marginTop: 10, color: "#599219"}}>{item?.item?.username}'s {item?.item?.name}</h1>
            <p style={{fontSize:30, margin:50}}><i><strong>About item:  </strong></i>{item?.item?.info}</p>
            <p style={{fontSize:30, margin:50}}><i><strong>Price:  </strong></i>{item?.item?.price}</p>
            <div className="card mt-3">
          <ul className="list-group list-group-flush">
            { item?.item?.image.map((img, index) => (
                <li className="list-group-item" key={index}>
                     <img 
                        src={img}
                   alt="new"
                 />
                </li>
              ))}
          </ul>
        </div>

        </div>
    );
}


export default connect(null, { getItem })(withRouter(
    ItemDetails));