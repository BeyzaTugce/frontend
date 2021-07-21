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
    const [filtered, setFiltered] = React.useState([]);
    const [showFiltered, setShowFiltered] = React.useState(false);


    let filtering =
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
                        username={item.props.username}
                    />);
            }
        });

    const onChangeMinPrice = (e) => {
        setMinPrice(e.target.value);
    };
    const onChangeMaxPrice = (e) => {
        setMaxPrice(e.target.value);

        if (e.target.value === '') {
            setMaxPrice(99999);
        }
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

    const onClickPriceUp = () => {
        setFiltered(filtering.slice(0).sort((a, b) => a.props.price > b.props.price ? 1 : -1));
        setShowFiltered(true);
        console.log(filtered);
    };

    const onClickPriceDown = () => {
        setFiltered(filtering.slice(0).sort((a, b) => a.props.price < b.props.price ? 1 : -1));
        setShowFiltered(true);
        console.log(filtered);
    };

    const onClickRatingUp = (e) => {
        //sorting function
        setFiltered(filtering.slice(0).sort((a, b) => a.props.rating > b.props.rating ? 1 : -1));
        setShowFiltered(true);
        console.log(filtered);
    };

    const onClickRatingDown = (e) => {
        //sorting function
        setFiltered(filtering.slice(0).sort((a, b) => a.props.rating < b.props.rating ? 1 : -1));
        setShowFiltered(true);
        console.log(filtered);
    };

    return (
        <div>
          <span>
              <div className="d-flex">
                  <div className="p-2 flex-shrink-1 " style={{backgroundColor: '#F8F8F8'}}>
                      <div className="d-inline-block">
                          <FormGroup style={{ marginTop: 20 }}>
                              <div className="filterOptions text-center">
                                  <FormLabel className="label-filter font-weight-bold">Filter</FormLabel>
                                  <div>
                                      <label className="text-nowrap">
                                          €
                                          <input
                                                 name="min-price"
                                                 type="Number"
                                                 onChange={onChangeMinPrice}
                                                 style={{width:60}}
                                                 min="0"
                                          />
                                      </label>
                                      <label className="text-nowrap">
                                          -€
                                          <input
                                                 name="max-price"
                                                 min="0"
                                                 type="Number"
                                                 onChange={onChangeMaxPrice}
                                                 style={{width:60}}
                                          />
                                      </label>
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
                          <div className="label-sort text-center font-weight-bold">Sort</div>
                              <div className="SortOptions text-nowrap text-right">
                                  <div>
                                      <label>
                                          Garage Deadline
                                          <Button className="ml-2 "
                                                  name="garage-deadline-button-up"
                                                  variant="contained"
                                                  color="primary"
                                                  onClick={onClickGarageDeadlineUp}>
                                              <ArrowUp/>
                                          </Button>
                                          <Button className="ml-2 "
                                                  variant="contained"
                                                  color="primary"
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
                                                  variant="contained"
                                                  color="primary"
                                                  name="price-button-up"
                                                  onClick={onClickPriceUp}>
                                              <ArrowUp/>
                                          </Button>
                                          <Button className="ml-2 "
                                                  variant="contained"
                                                  color="primary"
                                                  name="price-button-down"
                                                  onClick={onClickPriceDown}>
                                              <ArrowDown/>
                                          </Button>
                                      </label>
                                  </div>
                                  <div>
                                      <label>
                                          Rating
                                          <Button className="ml-2 "
                                                  variant="contained"
                                                  color="primary"
                                                  name="rating-button-up"
                                                  onClick={onClickRatingUp}>
                                              <ArrowUp/>
                                          </Button>
                                          <Button className="ml-2 "
                                                  variant="contained"
                                                  color="primary"
                                                  name="rating-button-down"
                                                  onClick={onClickRatingDown}>
                                              <ArrowDown/>
                                          </Button>
                                      </label>
                                  </div>
                              </div>
                      </div>
                  </div>
                  <div className="w-100">
                      <Navbar className="results-for w-100" style={{backgroundColor: '#F8F8F8'}}>Results for "{props.searchTerm}"</Navbar>
                      <div className="list-whole" style={{ paddingInline: 30, paddingTop:30 }}>
                          <ListGroup className="d-inline-block">
                            {showFiltered ?
                             filtered : filtering}
                              {/* {filtered} */}
                          </ListGroup>
                      </div>
                  </div>
              </div>
          </span>
        </div>
    );
};

export default withRouter(Search);
