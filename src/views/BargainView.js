import React, { useEffect } from "react";
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
import Purchase from "../components/TrackPurchase";
/**
 * For register new users
 * @param {props} props
 */

const BargainView = props => {

  useEffect(() => {
    props.getOfferHistory(props.match.params.id);
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


export default connect(mapStateToProps, {
  getOfferHistory,
  makeOffer,
  withdrawOffer,
  setOffersLoading,
})(withRouter(BargainView));
