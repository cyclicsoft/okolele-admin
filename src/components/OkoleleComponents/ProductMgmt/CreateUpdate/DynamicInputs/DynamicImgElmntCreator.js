import React, { useState } from "react";

// material-ui icons
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Images

// SCSS
import "../../../../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";
import ImgCropper from "views/OkoleleImageCropper/ImgCropper";
import { getBase64Img } from "services/helper-function/getBase64Img";

const DynamicImgElmntCreator = ({ productImages, setProductImages }) => {
  // Preview and Crop Img
  const [shouldPreview, setShouldPreview] = useState(false);
  const [imgIdToPreview, setImgIdToPreview] = useState("");

  // Add HTML Img Element
  const handleAddImgElement = () => {
    setProductImages([...productImages, ""]);
  };

  // handle click event of the Remove button
  const handleRemoveImgElement = (index) => {
    // Remove the img first
    let tempArray = [...productImages];
    tempArray.splice(index, 1);
    setProductImages(tempArray);
  };

  // select Img From Loacl Storage
  const imgAddRemoveHandler = async (event, id, addRemoveFlag) => {
    event.persist(); //To use React synthetic events inside an asynchronous callback function
    if (addRemoveFlag === "add") {
      if (event.target.files && event.target.files[0]) {
        getBase64Img(event.target.files[0]).then((base64) => {
          // localStorage["fileBase64"] = base64;
          let tempArray = [...productImages];
          let imgObj = {
            file_name: event.target.files[0].name,
            file_type: event.target.files[0].type,
            base64: base64,
          };
          tempArray[id] = imgObj;

          setProductImages(tempArray);
        });
      }
    } else if (addRemoveFlag === "remove") {
      let tempArray = [...productImages]; // copying the old datas array
      tempArray[id] = ""; // replace e.target.value with whatever you want to change it to

      setProductImages(tempArray);
    }
  };

  // Preview & Crop Image
  const previewSelectedImg = (id) => {
    if (productImages[id] != "" && productImages[id] != undefined) {
      setImgIdToPreview(id);
      setShouldPreview(true);
    }
  };

  const onCloseImgCropper = (croppedImg, hideImgCropper) => {
    setShouldPreview(hideImgCropper);

    let tempArray = [...productImages]; // copying the old datas array
    tempArray[imgIdToPreview] = croppedImg; // replace e.target.value with whatever you want to change it to
    setProductImages(tempArray);
  };

  return (
    <div style={{ display: "flex" }}>
      {shouldPreview && (
        <ImgCropper
          src={productImages[imgIdToPreview]}
          onCloseImgCropper={onCloseImgCropper}
        />
      )}

      {productImages.map((x, i) => (
        <div key={i} style={{ marginRight: "15px" }}>
          {console.log('%cDynamicImgElmntCreator.js line:86 typeof productImages[i]', 'color: #007acc;', typeof productImages[i])}
          {/* Img Selector  */}
          <div className="picture-container">
            <div
              className="picture"
              style={{ borderRadius: "0", backgroundColor: "#ededed " }}
            >
              {productImages[i] !== undefined &&
                (productImages[i].length <= 0 ? (
                  <div>
                    <AddToPhotosIcon className="imgAddIcon" />
                    <input
                      type="file"
                      onChange={(e) => imgAddRemoveHandler(e, i, "add")}
                    />
                  </div>
                ) : (
                  <div>
                    <DeleteIcon
                      className="removeSelectedImg"
                      onClick={() => imgAddRemoveHandler(null, i, "remove")}
                    />
                    <VisibilityIcon
                      className="previewSelectedImg"
                      onClick={() => previewSelectedImg(i)}
                    />
                    <img
                      className="imgPickerImg"
                      src={productImages[i].base64}
                      alt="ProductImg"
                    />
                  </div>
                ))}
            </div>
            <h6 className="description">Image: {i + 1}</h6>
          </div>

          {/* Add & Remove Button  */}
          <div style={{ display: "flex" }}>
            {productImages.length !== 1 && (
              <button
                className="add-remove-btn"
                style={{ width: "5vh", marginTop: "0", marginLeft: "13px" }}
                onClick={() => handleRemoveImgElement(i)}
              >
                -
              </button>
            )}

            {productImages.length - 1 === i && (
              <button
                disabled={productImages.length > 4 ? true : false}
                className="add-remove-btn"
                style={{ width: "5vh", marginTop: "0", marginLeft: "13px" }}
                onClick={handleAddImgElement}
              >
                +
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicImgElmntCreator;
