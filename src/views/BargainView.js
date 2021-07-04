import OfferComponent from "../components/Offer";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import { getOfferHistory, makeOffer, withdrawOffer } from "../redux/actions/OfferActions";
import { PropTypes } from "prop-types";

/**
 * For register new users
 * @param {props} props
 */
 function BargainView(props) {
     return(
         <OfferComponent />
     )
 }
 
// const mapStateToProps = (state) => ({
//     offer: state.offer
// });
export default BargainView;
// export default connect(mapStateToProps, { getOfferHistory, makeOffer })(withRouter(BargainView));