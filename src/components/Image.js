import React, { useState } from "react";
import UploadComponent from "./Upload";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./styles.css";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

const Image = (props) => {

    const [state, setState] = useState({
        upload: {
          pictures: [],
          maxFileSize: 	100000,
          imgExtension: [".jpg", ".png", ".jpeg"],
          fileSizeError: "File is too big",
          defaultImages: [
          ]
        }
      });


  const handleChange = files => {
    const { pictures } = state.upload;
    console.warn({ pictures, files });

    setState(
      {
        state,
        upload: {
          ...state.upload,
          pictures: [...files]
        }
      },
      () => {
        console.warn("It was added!");
      }
    );
  };

  const confirmUpload = () => {
    const { pictures, defaultImages } = state.upload;
    console.warn("Confirm Upload =>", []);
    props.onChangeItemImage(pictures);
  };

    return (
      <div className="App">
        <hr />
        <UploadComponent
          {...state.upload}
          handleChange={handleChange}
        />
        <Button className="btn-purple" onClick={confirmUpload}>Confirm upload</Button>
      </div>
    );
  
}

Image.prototypes = {
  onChangeItemImage: PropTypes.func.isRequired,
};

export default connect( null)(withRouter(Image));