import OfferComponent from "../components/Offer";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

/**
 * For register new users
 * @param {props} props
 */
 function BargainView(props) {
     return(
         <OfferComponent />
     )
 }

 export default connect()(withRouter(BargainView));