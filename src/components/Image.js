import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UploadComponent from "./Upload";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import "./styles.css";

const Image = (props) => {

    const [state, setState] = useState({
        upload: {
          pictures: [],
          maxFileSize: 5242880,
          imgExtension: [".jpg", ".png"],
          defaultImages: [
            "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183614687947000000-o.jpg",
            "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183639357715000000-o.jpg",
            "https://media.smarteragent.com/unsafe/http://cdn.photos.sparkplatform.com/fl/20190819183701098384000000-o.jpg"
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

const rootElement = document.getElementById("root");
export default connect( null)(withRouter(Image));