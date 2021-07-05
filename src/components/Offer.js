// import React, { Component, useState, useEffect } from "react";
// import {Button,Modal} from "react-bootstrap";
// import { connect } from "react-redux";
// import { getOfferHistory, makeOffer, withdrawOffer} from "../redux/actions/OfferActions";
// import Slider from "react-input-slider";
// import { v4 as uuid } from "uuid";
// import { withRouter } from "react-router-dom";
// import { PropTypes } from "prop-types";

// const OfferModal = (props) => {
//   const [show, setShow] = useState(false);
//   const [price, setPrice] = useState({ x: 10 });
//   const handleToggle = () => {setShow(!show)};
//   const defaultP = 10;
  
//   const handleOnClick = e => {
//     e.preventDefault();
//     const newItem = {price};
//     // Add item via addItem action
//     console.log(defaultP);
//     console.log(newItem);
//     makeOffer(defaultP);
//     // Close modal
//     handleToggle();
//   };

// //   useEffect(() => {
// //     getOfferHistory();
// //     makeOffer({price: 59});
// //   });

//   return (
//     //<React.Fragment> = <>
//     <>
//       <Button variant="primary" onClick={handleToggle}>
//         New Offer
//       </Button>

//       <Modal show={show} onHide={handleToggle}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             ({price.x})
//             {/* <Slider axis="x" x={state.x} onChange={setState} /> */}
//             <Slider
//               styles={{
//                 track: {
//                   backgroundColor: "blue",
//                 },
//                 active: {
//                   backgroundColor: "red",
//                 },
//                 thumb: {
//                   width: 20,
//                   height: 20,
//                 },
//                 disabled: {
//                   opacity: 0.5,
//                 },
//               }}
//               axis="x"
//               x={price.x}
//               xmin={20}
//               onChange={({ x }) => setPrice(price => ({ ...price, x }))}
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleToggle}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleOnClick}>
//             Make Offer
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// OfferModal.propTypes = {
//     getOfferHistory: PropTypes.func.isRequired,
//     makeOffer: PropTypes.func.isRequired,
//     offer: PropTypes.object.isRequired,
//   };
  
//   const mapStateToProps = (state) => ({
//     offer: state.offer,
//   });
  
//   //this.props.withdrawOffer, this.props.getOfferHistory, ...
//   export default connect(mapStateToProps, {
//     getOfferHistory,
//     makeOffer,
//     withdrawOffer,
//   })(withRouter(OfferModal));
  
// //export default connect()(withRouter(OfferModal));