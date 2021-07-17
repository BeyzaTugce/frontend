import React, { useState, useEffect } from "react";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerCalendar } from "react-nice-dates";
import { connect, useSelector } from "react-redux";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import { useDateInput } from "react-nice-dates";
import InputGroup from "react-bootstrap/InputGroup";
import { getPurchase, changePurchase } from "../redux/actions/PurchaseActions";
import store from '../redux/store';
import { withRouter } from "react-router-dom";

const Delivery = (props) => {
  let { match, getPurchase } = props;
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.auth.user);
  const [date, setDate] = useState(new Date());
  const [pickUpError, setPickUpError] = React.useState("");
  const [location, setLocation] = React.useState("");
  const purchase = useSelector((state) => state.purchase);
  const [buyerId, setBuyerId] = useState(0);
  const [sellerId, setSellerId] = useState(0);

  const timeInputProps = useDateInput({
    date,
    format: "HH:mm",
    locale: enGB,
    onDateChange: setDate,
  });
  //const [newDate, setNewDate] = useState();
  const [newDate, setNewDate] = useState([]);

  const addDate = (input) => {
    //setNewDate(input);
    
    if (!newDate.includes(input)) {
      setNewDate([...newDate, input]);
    }
  };
  // for extracting the attributes of the given garage to the appropriate state variables
  const extractPickUp = () => {
    if (!props.pickup) {
      return;
    }
    setLocation(props.pickup.availableDates);
    setNewDate(props.pickup.pickupLocation);
  };
  useEffect(() => {
    if (!props.new) {
      //extractUser();
      extractPickUp();
    }
  }, [props.user, props.pickup, props.new]);

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
   
    
  }, [match.params]);

  const packPurchase = () => {
    let back = {
      ...props.purchase,
    };
    back._id =purchase.purchase._id;
    back.creationDate = purchase.purchase.creationDate;
    back.buyer = purchase.purchase.buyer;
    back.seller = purchase.purchase.seller;
    back.garageId = purchase.purchase.garageId;
    back.price =purchase.purchase.price;
    back.selectedItemList = purchase.purchase.selectedItemList;
    back.method = purchase.purchase.method;
    back.purchaseStatus= purchase.purchase.purchaseStatus;
    back.pickUpAddress = location;
   // back.pickUpDate = selectedDate;
    return back;
  };


  // creating a object with all relevant data to update or create a changed garage
  const packPickUp = () => {
    let back = {
      ...props.pickup,
    };
   // back.purchaseId =  match.params.id;
    back.availableDates = newDate;
    back.pickupLocation = location;

    return back;
  };

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
    setPickUpError("");
  };
  const onRemovePickUp = (pickup) => {
    pickup.preventDefault();
  };

  const addPickUp = (e) => {
    e.preventDefault();
    props.onCreate(packPickUp());
    store.dispatch(changePurchase(packPurchase()));
    history.push(`../order/${purchase.purchase._id}`)
    
  };

  return (
    <div className="Delivery">
     
      <div>
        <Container
          className="contact-content debug-border"
          style={{ display: "align-items-middle" }}
        >
          <Row>
            <Col>
              <div className="input-container">
                <div>
                  <h4>Please select available dates and times for pick-up</h4>
                  <DatePickerCalendar
                    date={date}
                    onDateChange={setDate}
                    locale={enGB}
                    format="dd/MM/yyyy"
                  >
                    {({ inputProps, focused }) => (
                      <input
                        className={"input" + (focused ? " -focused" : "")}
                        style={{ width: 150 }}
                        {...inputProps}
                      />
                    )}
                  </DatePickerCalendar>
                  <input
                    className="input"
                    style={{ marginLeft: 16, width: 80 }}
                    {...timeInputProps}
                  />
                  <Button
                    className="btn border-0"
                    variant="dark"
                    style={{ backgroundColor: "#A282A5", marginRight: 8 }}
                    onClick={() => {
                      addDate(date);
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Col>
            <Col>
              <h4>Selected Dates</h4>
              <p>
                {newDate.map((item) => {
                  return (
                    <li>
                      {item
                        ? format(item, "dd MMM yyyy HH:mm", { locale: enGB })
                        : ""}
                    </li>
                  );
                })}
              </p>
            </Col>
          </Row>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Location</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="Enter pick-up location"
              fullWidth
              value={location}
              onChange={onChangeLocation}
              //error={pickUpError !== ""}
              required
            />
          </InputGroup>
        </Container>
        </div>

      <div className="buttons d-flex align-items-center justify-content-center">
        <Button
          className="btn border-0"
          variant="dark"
          style={{ backgroundColor: "#A282A5", marginRight: 8 }}
        >
          Go Back
        </Button>
        <Button
          className="btn border-0 text-white"
          variant="light"
          style={{ backgroundColor: "#85A582" }}
          onClick={addPickUp}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  purchase: state.purchase,
});
export default connect(mapStateToProps, {
  getPurchase,
  changePurchase,
})(withRouter(Delivery));
