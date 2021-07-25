import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FormGroup, FormLabel } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerCalendar } from "react-nice-dates";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import { useDateInput } from "react-nice-dates";
import InputGroup from "react-bootstrap/InputGroup";
import { getPurchase, changePurchase } from "../redux/actions/PurchaseActions";
import { getGarage } from "../redux/actions/GarageActions";
import store from "../redux/store";
import { connect, useSelector } from "react-redux";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Delivery = (props) => {
  let { match, getPurchase } = props;

  const history = useHistory();

  const loggedInUser = useSelector((state) => state.auth.user);
  const purchase = useSelector((state) => state.purchase);

  const [date, setDate] = useState(new Date());
  const [pickUpError, setPickUpError] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [userType, setUserType] = useState("Unknown");
  const [methodType, setMethodType] = useState("Unknown");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newDate, setNewDate] = useState([]);
  const timeInputProps = useDateInput({
    date,
    format: "HH:mm",
    locale: enGB,
    onDateChange: setDate,
  });
  let purchaseReached = false;

  useEffect(() => {
    let purchaseId = match.params.id;
    getPurchase(purchaseId);
  }, [match.params, purchaseReached === false]);

  useEffect(() => {
    if (purchase.purchase !== undefined && purchase.purchase !== null) {
      purchaseReached = true;
    }
  }, [purchase.purchase, purchaseReached === false]);

  useEffect(() => {
    console.log("second use effect " + purchaseReached);
    if (purchase.purchase !== undefined && purchase.purchase !== null) {
      checkUser();
      checkMethod();
      //checkStatus();
      let garageId = purchase?.purchase?.garageId;
      getGarage(garageId);
    }
  }, [purchase.purchase, purchaseReached]);

  const checkUser = () => {
    if (loggedInUser !== null) {
      if (loggedInUser?._id === purchase?.purchase?.seller) {
        setUserType("Seller");
      } else if (loggedInUser._id === purchase?.purchase?.buyer) {
        setUserType("Buyer");
      }
    }
  };

  const checkMethod = () => {
    if (purchase.purchase !== undefined) {
      setMethodType(purchase?.purchase?.method);
    }
  };

  /* const checkStatus = () => {
    if (purchase?.purchase?.purchaseStatus != "DeliveryScheduling" || ) {
      if (userType == "Seller") {
        history.push(`../order/${purchase.purchase._id}`);
      } else if (userType == "Buyer") {
        history.push(`../delivery/${purchase.purchase._id}`);
      }
    }
  };*/

  const packPurchase = () => {
    let back = {
      ...props.purchase,
    };
    back._id = purchase.purchase._id;
    back.creationDate = purchase.purchase.creationDate;
    back.buyer = purchase.purchase.buyer;
    back.seller = purchase.purchase.seller;
    back.garageId = purchase.purchase.garageId;
    back.price = purchase.purchase.price;
    back.selectedItemList = purchase.purchase.selectedItemList;
    if (userType == "Seller") back.purchaseStatus = "DeliveryScheduled";
    else if (userType == "Buyer") back.purchaseStatus = "Payment";

    if (userType == "Seller") {
      back.availableDates = newDate;
      back.pickupLocation = location;
    } else if (userType == "Buyer") {
      back.pickUpDate = selectedDate;
      back.method = methodType;
    }
    return back;
  };

  const addDate = (input) => {
    if (!newDate.includes(input)) {
      setNewDate([...newDate, input]);
    }
  };

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
    setPickUpError("");
  };

  const addPickUp = (e) => {
    e.preventDefault();
    //   props.onCreate(packPickUp());
    store.dispatch(changePurchase(packPurchase()));
    if (userType == "Seller") {
      history.push(`../order/${purchase.purchase._id}`);
    } else if (userType == "Buyer") {
      history.push(`../payment/${purchase.purchase._id}`);
    }
  };

  return (
    <div className="Delivery">
      {userType == "Seller" ? (
        <div>
          <Container
            className="contact-content debug-border"
            style={{ display: "align-items-middle" }}
          >
            <Row>
              <Col>
                <div className="input-container">
                  <div>
                    <div
                        className="jumbotron jumbotron-fluid bg-white"
                        style={{ marginBottom: -10 }}
                    >
                      <h4 className="display-5 text-center">Please select available dates and times for pick-up</h4>
                    </div>
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
                    <div className="d-flex justify-content-center mt-3 mb-3">
                      <input
                          className="input"
                          style={{ marginLeft: 16, width: 80 }}
                          {...timeInputProps}
                      />
                      <Button
                          className="btn-purple"
                          variant="light"
                          onClick={() => {
                            addDate(date);
                          }}
                      >
                        Add
                      </Button></div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                    className="jumbotron jumbotron-fluid bg-white"
                    style={{ marginBottom: -10 }}
                >
                  <h4 className="display-5 text-center">Selected Dates</h4>
                </div>
                <p>
                  {newDate.map((item) => {
                    return (
                      <li className="text-center">
                        {item
                          ? new Date(item).toLocaleDateString()
                          : ""}
                      </li>
                    );
                  })}
                </p>
              </Col>
            </Row>
            <InputGroup className="mb-3">
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
                required
              />
            </InputGroup>
          </Container>
        </div>
      ) : userType == "Buyer" ? (
        <div>
          <Container
            className="contact-content debug-border"
          >
            <Row>
              <Col>
                <div
                    className="jumbotron jumbotron-fluid bg-white"
                >
                  <h4 className="display-5 text-center">Please Select A Date</h4>
                  <p className="text-center">
                    <ButtonGroup
                        vertical={true}
                    >
                      {purchase?.purchase?.availableDates.map((item) => (
                          <td>
                            <ToggleButton
                                type="radio"
                                variant="light"
                                className="mr-2"
                                //name={item}
                                value={item}
                                checked={selectedDate === item}
                                onChange={(e) =>
                                    setSelectedDate(e.currentTarget.value)
                                }
                            >
                              {new Date(item).toLocaleDateString()}
                            </ToggleButton>
                          </td>
                      ))}
                    </ButtonGroup>
                  </p>
                </div>
              </Col>

              {methodType == "Both" ? (
                <Col>
                  <div
                      className="jumbotron jumbotron-fluid bg-white"
                      style={{ marginBottom: -10 }}
                  >
                    <h4 className="display-5 text-center">Please Select a Delivery Method</h4>
                    <p>
                      <FormGroup>
                        <div className="deliveryOptions text-center">
                          <div>
                            <label>
                              <ToggleButton
                                  className="mr-2"
                                  name="Shipment"
                                  variant="light"
                                  value="Shipment"
                                  type="radio"
                                  onChange={(e) =>
                                      setMethodType(e.currentTarget.value)
                                  }
                              >
                              Shipment
                              </ToggleButton>
                            </label>
                          </div>
                          <div>
                            <label>
                              <ToggleButton
                                  className="mr-2"
                                  name="PickUp"
                                  variant="light"
                                  value="PickUp"
                                  type="radio"
                                  onChange={(e) =>
                                      setMethodType(e.currentTarget.value)
                                  }
                              >
                                Pick-up
                              </ToggleButton>
                            </label>
                          </div>
                        </div>
                      </FormGroup>
                    </p>
                  </div>
                </Col>
              ) : (
                  <div
                      className="jumbotron jumbotron-fluid bg-white"
                      style={{ marginBottom: -10 }}
                  >
                    <h4 className="display-5 text-center">Delivery will be {methodType}</h4>
                  </div>
              )}
            </Row>
          </Container>
        </div>
      ) : (
          <div
              className="jumbotron jumbotron-fluid bg-white"
              style={{ marginBottom: -10 }}
          >
            <h4 className="display-5 text-center">Delivery will be {methodType}</h4>
          </div>
      )}

      <div className="buttons d-flex align-items-center justify-content-center mb-5">
        <Button
          className="btn-purple"
          variant="light"
          style={{ marginRight: 8 }}
        >
          Go Back
        </Button>
        <Button
          className="btn-green"
          variant="light"
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
