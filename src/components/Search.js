import React, { useEffect } from "react";
import {
    Button,
    FormGroup, FormLabel,
    ListGroup, Navbar,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import {Clock, Star, StarFill} from "react-bootstrap-icons";
import SearchItem from "./SearchItem";

const Search = (props) => {
    /*
    const [items, setItems] = React.useState([]);

    const extractOrder = () => {
        if (!props.order ) {
            return;
        }

        setStatus(props.order.enum);
    }

    useEffect(() => {
        extractOrder();
    }, [props.order] );

    const renderedList = items.map((item) => {
        return (
            <SearchItem
                name={item.name}
                info={item.info}
                tags={item.tags}
                price={item.price}
                image={item.image}
                seller={item.garage.seller}
                endDate={item.garage.endDate}
            />
        );
    });
     */

    return (
        <div>
          <span>
              <div className="d-flex">
                  <div className="p-2 flex-shrink-1 " style={{backgroundColor: '#F8F8F8'}}>
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
                                          <div>
                                              <Button className="ml-2 "
                                                      name="4-stars"
                                                      onChange={""}
                                                      variant="contained"
                                                      color="primary">
                                                  <StarFill />
                                                  <StarFill />
                                                  <StarFill />
                                                  <StarFill />
                                                  <Star /> & Up
                                              </Button>
                                          </div>
                                      </label>
                                  </div>
                                  <div style={{marginBottom:-20}}>
                                      <label>
                                          <div>
                                              <Button className="ml-2 "
                                                      name="4-stars"
                                                      onChange={""}
                                                      variant="contained"
                                                      color="primary">
                                                  <StarFill />
                                                  <StarFill />
                                                  <StarFill />
                                                  <Star />
                                                  <Star /> & Up
                                              </Button>
                                          </div>
                                      </label>
                                  </div>
                                  <div style={{marginBottom:-20}}>
                                      <label>
                                          <div>
                                              <Button className="ml-2 "
                                                      name="4-stars"
                                                      onChange={""}
                                                      variant="contained"
                                                      color="primary">
                                                  <StarFill />
                                                  <StarFill />
                                                  <Star />
                                                  <Star />
                                                  <Star /> & Up
                                              </Button>
                                          </div>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          <div>
                                              <Button className="ml-2 "
                                                      name="4-stars"
                                                      onChange={""}
                                                      variant="contained"
                                                      color="primary">
                                                  <StarFill />
                                                  <Star />
                                                  <Star />
                                                  <Star />
                                                  <Star /> & Up
                                              </Button>
                                          </div>
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
                  <div className="w-100">
                      <Navbar className="results-for w-100" style={{backgroundColor: '#F8F8F8'}}>Results for {props.searchTerm}</Navbar>
                      <div className="list-whole" style={{ paddingInline: 30, paddingTop:30 }}>
                          <ListGroup className="d-inline-block">
                              {props.foundItems}
                          </ListGroup>
                      </div>
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
