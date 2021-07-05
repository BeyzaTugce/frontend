import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "react-bootstrap";
import { connect } from "react-redux";
import { makeOffer } from "../redux/actions/OfferActions";
import Slider from "react-input-slider";

const OfferModal = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({ x: 10 });

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const toggle = () => {
    setShow(!show);
  };
  // state = {
  //     modal: false,
  //     name: ''
  // }

  // toggle = () => {
  //     this.setState({
  //         modal: !this.state.modal
  //     });
  // }

  return (
    //<React.Fragment> = <>
    <>
      <Button variant="primary" onClick={toggle}>
        New Offer
      </Button>

      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            ({state.x})
            {/* <Slider axis="x" x={state.x} onChange={setState} /> */}
            <Slider
              styles={{
                track: {
                  backgroundColor: "blue",
                },
                active: {
                  backgroundColor: "red",
                },
                thumb: {
                  width: 20,
                  height: 20,
                },
                disabled: {
                  opacity: 0.5,
                },
              }}
              axis="x"
              x={state.x}
              xmin={20}
              onChange={({ x }) => setState((state) => ({ ...state, x }))}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary" onClick={toggle}>
            Make Offer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OfferModal;
