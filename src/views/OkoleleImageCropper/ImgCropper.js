import React, { useState, useCallback } from "react";
// react-image-crop
import ReactCrop from "react-image-crop";
// core components
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import Modal from "react-modal";
// CSS
import "react-image-crop/dist/ReactCrop.css";

const customStyles = {
  content: {
    height: "auto",
    maxHeight: "75vh",
    minHeight: "490px",
    width: "auto",
    minWidth: "425px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    margin: "5%",
    transform: "translate(-50%, -50%)",
    display: "block",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("el");
const useStyles = makeStyles(styles);

export default function ImgCropper(props) {
  const classes = useStyles();
  // console.log(props.shouldPreview);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  // function openModal() {
  //   setIsOpen(props.shouldPreview);
  // }

  //   function afterOpenModal() {
  //     // references are now sync'd and can be accessed.
  //     subtitle.style.color = "#f00";
  //   }

  function closeModal() {
    setIsOpen(false);
    props.onCloseImgCropper(props.src, false);
  }

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    // const base64Image = canvas.toDataURL("image/png");
    // return base64Image;
    const base64Image = canvas.toDataURL("image/png");
    setResult(base64Image);
    // console.log("base64Image", base64Image);
  }

  const returnCroppedImg = () => {
    setIsOpen(false);
    props.onCloseImgCropper(result, false);
  };
  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {props.src && (
          <div style={{ margin: "5%" }}>
            <ReactCrop
              src={props.src}
              crop={crop}
              onChange={setCrop}
              onImageLoaded={setImage}
            />
            <div style={{ display: "flex" }}>
              <Button
                color="info"
                className={classes.updateProfileButton}
                onClick={getCroppedImg}
              >
                Crop Image
              </Button>

              <Button
                color="rose"
                className={classes.updateProfileButton}
                onClick={closeModal}
                style={{ marginRight: "-132px" }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
        {result && (
          <div style={{ margin: "5%" }}>
            <img src={result} alt="cropped Img" className="img-gluid" />
          </div>
        )}
        {result && (
          <div style={{ marginRight: "5%", paddingBottom: "10vh" }}>
            <Button
              color="info"
              className={classes.updateProfileButton}
              onClick={returnCroppedImg}
            >
              Confirm
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
