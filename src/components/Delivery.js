
import React, { useState,useEffect } from "react";
import { Container, Row, Col, Jumbotron, Form, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerCalendar } from "react-nice-dates";
import { format } from "date-fns";
import { useHistory } from 'react-router-dom';
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import { useDateInput } from "react-nice-dates";
import InputGroup from 'react-bootstrap/InputGroup'

const Delivery = (props) => {
    const history = useHistory();
const [date, setDate] = useState(new Date());
  const [pickUpError, setPickUpError] = React.useState("");
  const [location, setLocation] = React.useState("");

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
    if(!newDate.includes(input)){
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

    // creating a object with all relevant data to update or create a changed garage
    const packPickUp = () => {
        let back = {
            ...props.pickup,
        };

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
    history.push("/signup");
  };

  return (
    <div className="Delivery">
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
              {newDate.map(item => {
                return <li>{item
                    ? format(item, "dd MMM yyyy HH:mm", { locale: enGB })
                    : ""}</li>;
              })}
            </p>
          </Col>
        </Row>
        <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>Location</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control as="textarea" aria-label="With textarea" 
                    placeholder="Enter pick-up location"
                    fullWidth
                    value={location}
                    onChange={onChangeLocation}
                    //error={pickUpError !== ""}
                    required
                    />
                </InputGroup>
      </Container>
      <div className="buttons d-flex align-items-center justify-content-center">
                        <Button
                            className='btn border-0'
                            variant="dark"
                            style={{backgroundColor: "#A282A5", marginRight:8}}
                        >
                           Go Back
                        </Button>
                        <Button
                            className='btn border-0 text-white'
                            variant="light"
                            style={{backgroundColor: "#85A582"}}
                            onClick={addPickUp}
                        >
                            Confirm
                        </Button>
                    </div>
    </div>
  );
}



export default Delivery;