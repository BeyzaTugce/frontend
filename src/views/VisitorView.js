import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";


/**
 * For register new users
 * @param {props} props
 */
function VisitorView(props) {

  const history = useHistory();

  const onSignUp = () => {
    history.push("/signup");
  };

  return (
      <div>
          <Header/>
          <div style={{textAlign: "center"}}>
              <h1 style={{marginTop: 100 }}>
                  <i>Don't you still have a garage ? <br/><br/> Time to create a garage </i>
              </h1>
              <Button style={{top: 50, marginTop: 50}} onClick={onSignUp}> Sign up</Button>
          </div>
      </div>
  );
}

export default connect()(withRouter(VisitorView));
