import React, { useEffect } from "react";
import {
    Button,
    FormGroup, FormLabel,
    ListGroup, Navbar,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import {ArrowDown, ArrowUp, Clock, Star, StarFill} from "react-bootstrap-icons";
import SearchItem from "./SearchItem";

const Search = (props) => {
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(99999);
    const [minStars, setMinStars] = React.useState(0);

    /*

    const extractOrder = () => {
        if (!props.order ) {
            return;
        }

        setStatus(props.order.enum);
    }

    useEffect(() => {
        extractOrder();
    }, [props.order] );
     */

    const filtering =
        props.foundItems?.map(item => {
            if (item?.key != null &&
                item.props.price>=minPrice && item.props.price<=maxPrice){
                return (
                    <SearchItem
                        name={item.props.name}
                        info={item.props.info}
                        tags={item.props.tags}
                        price={item.props.price}
                        garageId={item.props.garageId}
                    />);
            }
        });

    const onChangeMinPrice = (e) => {
        const timerId = setTimeout(() => {
            setMinPrice(e.target.value);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    };

    const onChangeMaxPrice = (e) => {
        const timerId = setTimeout(() => {
            setMaxPrice(e.target.value);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    };

    const onClick4Stars = (e) => {
        setMinStars(4);
    };

    const onClick3Stars = (e) => {
        setMinStars(3);
    };

    const onClick2Stars = (e) => {
        setMinStars(2);
    };

    const onClick1Star = (e) => {
        setMinStars(1);
    };

    const onClickGarageDeadlineUp = (e) => {
        //sorting function
    };

    const onClickGarageDeadlineDown = (e) => {
        //sorting function
    };

    const onClickPriceUp = (e) => {
        props.foundItems
            .sort((a, b) => a.props.price > b.props.price ? 1 : -1)

        //sorting function
    };

    const onClickPriceDown = (e) => {
        //sorting function
    };

    const onClickRatingUp = (e) => {
        //sorting function
    };

    const onClickRatingDown = (e) => {
        //sorting function
    };

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
                                      <label className="text-nowrap">
                                          €
                                          <input
                                                 name="min-price"
                                                 type="Number"
                                                 onChange={onChangeMinPrice}
                                                 style={{width:60}}
                                          />
                                      </label>
                                      <label className="text-nowrap">
                                          -€
                                          <input
                                                 name="max-price"
                                                 type="Number"
                                                 onChange={onChangeMaxPrice}
                                                 style={{width:60}}
                                          />
                                      </label>
                                  </div>
                                  <div>
                                  </div>
                                  <div style={{marginBottom:-20}}>
                                      <label>
                                          <div>
                                              <Button className="ml-2 "
                                                      name="4-stars"
                                                      onClick={onClick4Stars}
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
                                                      onClick={onClick3Stars}
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
                                                      onClick={onClick2Stars}
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
                                                      onClick={onClick1Star}
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
                              <div className="SortOptions text-nowrap">
                                  <div>
                                      <label>
                                          Garage Deadline
                                          <Button className="ml-2 "
                                                  name="garage-deadline-button-up"
                                                  onClick={onClickGarageDeadlineUp}>
                                              <ArrowUp/>
                                          </Button>
                                          <Button className="ml-2 "
                                                  name="garage-deadline-button-down"
                                                  onClick={onClickGarageDeadlineDown}>
                                              <ArrowDown/>
                                          </Button>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          Price
                                          <Button className="ml-2 "
                                                  name="price-button-up"
                                                  onChange={onClickPriceUp}>
                                              <ArrowUp/>
                                          </Button>
                                          <Button className="ml-2 "
                                                  name="price-button-down"
                                                  onChange={onClickPriceDown}>
                                              <ArrowDown/>
                                          </Button>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          Rating
                                          <Button className="ml-2 "
                                                  name="rating-button-up"
                                                  onChange={onClickRatingUp}>
                                              <ArrowUp/>
                                          </Button>
                                          <Button className="ml-2 "
                                                  name="rating-button-down"
                                                  onChange={onClickRatingDown}>
                                              <ArrowDown/>
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
                              {filtering}
                          </ListGroup>
                      </div>
                  </div>
              </div>
          </span>
        </div>
    );
};

export default withRouter(Search);
