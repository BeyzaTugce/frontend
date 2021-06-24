
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerCalendar } from "react-nice-dates";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import "react-nice-dates/build/style.css";
import { useDateInput } from "react-nice-dates";

function Delivery() {
  const [date, setDate] = useState(new Date());
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
    setNewDate([...newDate, input]);
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
      </Container>
      <Button
        className="btn border-0"
        variant="dark"
        style={{ backgroundColor: "#A282A5", marginRight: 8 }}
      >
        Confirm
      </Button>
    </div>
  );
}
export default Delivery;