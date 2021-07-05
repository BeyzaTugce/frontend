import BargainComponent from "../components/Bargain";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
/**
 * For register new users
 * @param {props} props
 */
const BargainView = props => {
  return (
    <BargainComponent />
    );
}

// const mapStateToProps = (state) => ({
//     offer: state.offer
// });
export default connect()(withRouter(BargainView));
// export default connect(mapStateToProps, { getOfferHistory, makeOffer })(withRouter(BargainView));
