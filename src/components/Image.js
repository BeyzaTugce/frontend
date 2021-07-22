import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UploadComponent from "./Upload";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import "./styles.css";
import PropTypes from "prop-types";

const Image = (props) => {
    const [state, setState] = useState({
        upload: {
          pictures: [],
          maxFileSize: 5242880,
          imgExtension: [".jpg", ".png"],
          defaultImages: [
          ]
        }
      });
     
  

  const handleChange = files => {
    const { pictures } =state.upload;
    console.warn({ pictures, files });

    setState(
      {
        ...state,
        upload: {
          ...state.upload,
          pictures: [...pictures, ...files]
        }
      },
      () => {
        console.warn("It was added!");
      }
    );
  };

  const confirmUpload = () => {
    const { pictures, defaultImages } = state.upload;
    console.warn("Confirm Upload =>", [...pictures]);
    {pictures &&
      pictures.map((img, index) => (console.log(img)))}
      props.onChangeItemImage(pictures);
    
  };

    return (
      <div className="App">
        <hr />

        <button onClick={confirmUpload}>Confirm upload</button>

        <UploadComponent
          {...state.upload}
          handleChange={handleChange}
        />
    
      </div>
    );
  
}

Image.prototypes = {
  onChangeItemImage: PropTypes.func.isRequired,
};

export default connect( null)(withRouter(Image));