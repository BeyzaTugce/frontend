import React, { useState, useEffect } from "react";
import BargainComponent from "../components/Bargain";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
} from "../redux/actions/OfferActions";
import Header from "../components/Header";
/**
 * For register new users
 * @param {props} props
 */

const BargainView = props => {
  //const { offers } = prop.offer
  useEffect(() => {
    //console.log(offersArray);
    props.getOfferHistory(props.match.params.id);
    //lastOffer = offers.offerHistory[offers.offerHistory.length - 1];
  }, [props.offer.offers]);
  
  return (
      <div>
        <Header/>
        <BargainComponent />
      </div>
    );
}

BargainView.propTypes = {
  getOfferHistory: PropTypes.func.isRequired,
  makeOffer: PropTypes.func.isRequired,
  withdrawOffer: PropTypes.func.isRequired,
  setOffersLoading: PropTypes.func.isRequired,
  offer: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  offer: state.offer,
  loading: state.loading
});


// const mapStateToProps = (state) => ({
//     offer: state.offer
// });
export default connect(mapStateToProps, {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
})(withRouter(BargainView));
// export default connect(mapStateToProps, { getOfferHistory, makeOffer })(withRouter(BargainView));
