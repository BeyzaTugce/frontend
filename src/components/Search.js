import React, { useEffect } from "react";
import {
    Button,
    FormGroup, FormLabel,
    ListGroup, Navbar,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import {ArrowDown, ArrowUp, Star, StarFill} from "react-bootstrap-icons";
import SearchItem from "./SearchItem";


const Search = (props) => {
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(99999);
    const [minStars, setMinStars] = React.useState(0);
    const [filtered, setFiltered] = React.useState([]);
    const [promoted, setPromoted] = React.useState([]);
    const [filtering, setFiltering] = React.useState(false);

    let filteredArray = [];
    let promotedArray = [];

    let itemsFound = false;
    let garagesSelected = false;
    let ratedUsersFound = false;

    const filterArray = () => {
        props.foundItems?.map(item =>
        {
            if ( !props.selectedGarages.includes(item.props.garageId)){
                if (item?.key != null &&
                    item.props.price >= minPrice && item.props.price <= maxPrice) {
                    filteredArray.push(
                        <SearchItem
                            name={item.props.name}
                            info={item.props.info}
                            tags={item.props.tags}
                            price={item.props.price}
                            garageId={item.props.garageId}
                            username={item.props.username}
                            image={item.props.image}
                        />);
                }
            }
        });
    }

    const promoteArray = () => {
        props.foundItems?.map(item =>
        {
            if (props.selectedGarages.includes(item.props.garageId)){
                if (item?.key != null &&
                    item.props.price >= minPrice && item.props.price <= maxPrice) {
                    promotedArray.push(
                        <SearchItem
                            name={item.props.name}
                            info={item.props.info}
                            tags={item.props.tags}
                            price={item.props.price}
                            garageId={item.props.garageId}
                            username={item.props.username}
                            image={item.props.image}
                        />);
                }
            }
        });
    }

    const ratedUserByItem = (item) => {
        props.ratedItemUsers.map( u => {
            if (u._id === item.userId)
                return u.avgRating;
        })
    }

    useEffect(() => {
        if (props.selectedGarages !== undefined && props.selectedGarage !== null) {
            garagesSelected = true;
        }
        if (props.foundItems !== undefined && props.foundItems !== null) {
            itemsFound = true;
        }
        if (props.ratedItemUsers !== undefined && props.ratedItemUsers !== null) {
            ratedUsersFound = true;
        }
    }, [props.selectedGarages, garagesSelected === false, props.foundItems, itemsFound === false, props.ratedItemUsers, ratedUsersFound === false]);

    useEffect(() => {
        if (props.foundItems !== undefined && props.foundItems !== null && props.selectedGarages !== undefined && props.selectedGarages !== null) {
            promoteArray();
            setPromoted(promotedArray);
            filterArray();
            setFiltered(filteredArray);
        }
    }, [props.selectedGarages, garagesSelected, props.foundItems, itemsFound, filtering]);


    const onChangeMinPrice = (e) => {
        setMinPrice(e.target.value);
        setFiltering(!filtering);
    };

    const onChangeMaxPrice = (e) => {
        setMaxPrice(e.target.value);
        setFiltering(!filtering);
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

    const onClickGarageDeadlineUp = () => {
        setPromoted(promoted.slice(0).sort((a, b) => a.props.deadline < b.props.deadline ? 1 : -1));
        setFiltered(filtered.slice(0).sort((a, b) => a.props.deadline < b.props.deadline ? 1 : -1));
    };

    const onClickGarageDeadlineDown = () => {
        setPromoted(promoted.slice(0).sort((a, b) => a.props.deadline > b.props.deadline ? 1 : -1));
        setFiltered(filtered.slice(0).sort((a, b) => a.props.deadline > b.props.deadline ? 1 : -1));
    };

    const onClickPriceUp = () => {
        setPromoted(promoted.slice(0).sort((a, b) => a.props.price > b.props.price ? 1 : -1));
        setFiltered(filtered.slice(0).sort((a, b) => a.props.price > b.props.price ? 1 : -1));
    };

    const onClickPriceDown = () => {
        setPromoted(promoted.slice(0).sort((a, b) => a.props.price < b.props.price ? 1 : -1));
        setFiltered(filtered.slice(0).sort((a, b) => a.props.price < b.props.price ? 1 : -1));
    };

    const onClickRatingUp = () => {
        setPromoted(promoted.slice(0).sort((a, b) => ratedUserByItem(a) > ratedUserByItem(b) ? 1 : -1));
        setFiltered(filtered.slice(0).sort((a, b) => ratedUserByItem(a) > ratedUserByItem(b) ? 1 : -1));
    };

    const onClickRatingDown = () => {
        setPromoted(promoted.slice(0).sort((a, b) => ratedUserByItem(a) < ratedUserByItem(b) ? 1 : -1));
        setFiltered(filtered.slice(0).sort((a, b) => ratedUserByItem(a) < ratedUserByItem(b) ? 1 : -1));
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
                      <Navbar className="results-for w-100" style={{backgroundColor: '#F8F8F8'}}>RESULTS FOR "{props.searchTerm}"</Navbar>
                      <div className="list-whole" style={{ paddingInline: 30, paddingTop:30 }}>
                          <ListGroup className="d-inline-block">
                              <div>
                                  {promoted}
                                  <br/><br/>
                                  {filtered}
                              </div>
                          </ListGroup>
                      </div>
                  </div>
              </div>
          </span>
        </div>
    );
};


export default withRouter(Search);
