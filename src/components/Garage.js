import React, { useEffect } from "react";
import {
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";
import "./Garage.css";
import GarageItem from "./GarageItem";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
const Garage = (props) => {

  const [userName, setUserName] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [city, setCity] = React.useState("");
  const [garageEndDate, setGarageEndDate] = React.useState("");
  const [garageItems, setGarageItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [numSelectedItems, setNumSelectedItems] = React.useState(0);
  const [discount, setDiscount] = React.useState(false);
  const [saving, setSaving] = React.useState(0);
  const [amountToPay, setAmountToPay] = React.useState(0);


  const extractGarage = () => {
    if (!props.garage ) {
      return;
    }
    //will change the date later.
    setGarageEndDate(props.garage.dateCreated)
    setDiscount(props.garage.discount)
  }

  const extractSeller = () => {
    if (!props.seller ) {
      return;
    }
    setUserName(props.seller.firstname)
    setPostcode(props.seller.postcode)
    setDistrict(props.seller.district)
    setCity(props.seller.city)
  }

  const extractItems = () => {
    if (!props.items ) {
      return;
    }
    setGarageItems(props.items.items);
  }

  useEffect(() => {
    extractGarage();
  }, [props.garage] );

  useEffect(() => {
    extractSeller();
  }, [props.seller] );

  useEffect(() => {
    extractItems();
  }, [props.items] );

  useEffect(() => {
    if(numSelectedItems>1 & discount){
      setSaving(totalPrice/5);
    } else {
      setSaving(0);
    }
    setAmountToPay(totalPrice-saving);
  }, );

  const renderedList = garageItems.map((garageItem) => {
    return (
      <GarageItem
        name={garageItem.name}
        info={garageItem.info}
        tags={garageItem.tags}
        price={garageItem.price}
        button1Name={"Buy"}
        button2Name={"Bargain"}
        //image={garageItem.image}
        onClickSelect={() =>
         {
           setTotalPrice(totalPrice+garageItem.price);
           setNumSelectedItems(numSelectedItems+1);
         }
        }
        onClickDeselect={() =>
        {
          setTotalPrice(totalPrice-garageItem.price);
          setNumSelectedItems(numSelectedItems-1);
        }}
      />
    );
  });


  //TODO: "Select All" button color
  //TODO: Bargain and buy buttons do not light up when clicked.
  return (
    <div className="Garage">
      <span>
        <div
          className="jumbotron jumbotron-fluid bg-white"
          style={{ marginBottom: -10 }}
        >
          {props.seller === props.user ?
              <h1 className="display-5 text-center">My Garage</h1> :
              <h1 className="display-5 text-center">{userName}'s Garage</h1>
          }
          <em>
            <p
              className="lead text-black-50 text-sm-center"
              style={{ fontSize: 17 }}
            >
              {postcode} {district} {city} <br />
              until {garageEndDate}
            </p>
          </em>
        </div>
        <div>
          <div className="select-all-button-field" style={{ paddingInline: 50 }}>
            <Button
                className="btn select-all-button"
                variant="light"
                style={{ color: "black", borderColor: "lightgray" }}
            >
              <div style={{ fontSize: 14 }}>Select all</div>
            </Button>
          </div>
          <div className="list-whole w-100" style={{ paddingInline: 50 }}>
            <ListGroup>{renderedList}</ListGroup>

            <div
                className="price-info-text text-center"
                style={{ marginTop: 25, marginBottom: 25 }}
            >
              <div className="total-price-text">Total price: €{totalPrice}</div>
              {discount ? <div className="saving-text">Saving: €{saving}</div> : ""}
              <div className="amount-to-pay-text">Amount to Pay: €{amountToPay}</div>
              <div className="promotional-sentence-text text-danger">
                You can save up to 10% by choosing 1 more item!
              </div>
            </div>
            <div className="bargain-buy-buttons d-flex align-items-center justify-content-center">
              <Button
                  className="btn border-0"
                  variant="dark"
                  style={{ backgroundColor: "#A282A5", marginRight: 8 }}
              >
                Bargain for Selected Items
              </Button>
              <Button
                  className="btn border-0 text-white"
                  variant="light"
                  style={{ backgroundColor: "#85A582" }}
              >
                Buy Selected Items
              </Button>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

/*
might be useful for GarageItem
<ListGroupItem className="d-inline-flex align-items-center justify-content-between">
                            <FormCheck
                                type="checkbox"
                                id="item-checkbox"
                                style={{marginInline:17, marginRight:30}}
                            />
                            <div
                                className="img-container d-flex align-items-center"
                                style={{width:100, height:100, textAlign:"center", marginRight:30}}
                            >
                                <Image
                                    className="item-image"
                                    src={logo}
                                    fluid
                                />
                            </div>
                            <div className="name-and-tags flex-fill">
                                <div className="item-name">Some Item</div>
                                <div className="item-tags text-black-50" style={{fontSize:14}}>#all #tags #here</div>
                            </div>
                            <div className="justify-content-end d-inline-flex align-items-center justify-content-end">
                                <div className="item-price" style={{marginRight:15}}>€30</div>
                                <Button
                                    className='btn border-0'
                                    variant="dark"
                                    style={{backgroundColor: "#A282A5", marginRight:8}}
                                >
                                    Bargain
                                </Button>
                                <Button
                                    className='btn border-0 text-white'
                                    variant="light"
                                    style={{backgroundColor: "#85A582"}}
                                >
                                    Buy
                                </Button>
                            </div>
                        </ListGroupItem>
 */

Garage.propTypes = {
  garage: PropTypes.object,
  seller: PropTypes.object,
  user: PropTypes.object,
  items: PropTypes.object,
};

export default withRouter(Garage);
