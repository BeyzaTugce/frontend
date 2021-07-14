import React, { useEffect } from "react";
import {
    Button,
    FormGroup, FormLabel,
    ListGroup,
} from "react-bootstrap";
import "./Search.css";
import GarageItem from "./GarageItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import user from "../redux/reducers/userReducer";
import {Clock, Star, StarFill} from "react-bootstrap-icons";

const Search = (props) => {
    /*
    const [sellerName, setSellerName] = React.useState(" ");

    const extractOrder = () => {
        if (!props.order ) {
            return;
        }

        setStatus(props.order.enum);
    }

    useEffect(() => {
        extractOrder();
    }, [props.order] );

    const renderedList = items.map((garageItem) => {
        return (
            <GarageItem
                name={garageItem.name}
                info={garageItem.info}
                tags={garageItem.tags}
                price={garageItem.price}
                image={garageItem.image}
            />
        );
    });
     */

    return (
        <div className="OrderDetails">
          <span>
              <div className="d-flex">
                  <div className="p-2 flex-shrink-1">
                      <div className="d-inline-block text-center">
                          <FormGroup style={{ marginTop: 20 }}>
                              <div className="filterOptions">
                                  <FormLabel className="label-filter">Filter</FormLabel>
                                  <div>
                                      <label className="d-inline-flex text-nowrap">
                                          Min Price
                                          <input className="ml-2"
                                                 name="min-price"
                                                 onChange={""} />
                                      </label>
                                  </div>
                                  <div>
                                      <label className="d-inline-flex text-nowrap">
                                          Max Price
                                          <input className="ml-2"
                                                 name="max-price"
                                                 onChange={""} />
                                      </label>
                                  </div>
                                  <div style={{marginBottom:-20}}>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="4-stars"
                                                  onChange={""}
                                                  variant="contained"
                                                  color="primary">
                                              <StarFill />
                                              <StarFill />
                                              <StarFill />
                                              <StarFill />
                                              <Star />
                                          </Button>
                                      </label>
                                  </div>
                                  <div style={{marginBottom:-20}}>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="3-stars"
                                                  onChange={""}
                                                  variant="contained"
                                                  color="primary">
                                              <StarFill />
                                              <StarFill />
                                              <StarFill />
                                              <Star />
                                              <Star />
                                          </Button>
                                      </label>
                                  </div>
                                  <div style={{marginBottom:-20}}>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="2-stars"
                                                  onChange={""}
                                                  variant="contained"
                                                  color="primary">
                                              <StarFill />
                                              <StarFill />
                                              <Star />
                                              <Star />
                                              <Star />
                                          </Button>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="1-star"
                                                  onChange={""}
                                                  variant="contained"
                                                  color="primary">
                                              <StarFill />
                                              <Star />
                                              <Star />
                                              <Star />
                                              <Star />
                                          </Button>
                                      </label>
                                  </div>
                              </div>
                          </FormGroup>
                          <FormLabel className="label-sort">Sort</FormLabel>
                              <div className="SortOptions">
                                  <div>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="garage-deadline-button"
                                                  onChange={""}>
                                              Garage Deadline
                                          </Button>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="price-button"
                                                  onChange={""}>
                                              Price
                                          </Button>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          <Button className="ml-2 "
                                                  name="rating-button"
                                                  onChange={""}>
                                              Rating
                                          </Button>
                                      </label>
                                  </div>
                              </div>
                      </div>
                  </div>
                  <div className="vertical-line" style={{height:"auto", width:1, backgroundColor: '#909090'}}/>
                  <div className="list-whole w-100" style={{ paddingInline: 50, paddingTop:30 }}>
                      <ListGroup>{}</ListGroup>
                  </div>
              </div>
          </span>
        </div>
    );
};

Search.propTypes = {
    order: PropTypes.object,
    seller: PropTypes.object,
    user: PropTypes.object,
    items: PropTypes.object,
};

export default withRouter(Search);
