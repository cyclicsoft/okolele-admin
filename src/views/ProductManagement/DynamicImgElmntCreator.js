import React, { useEffect, useState } from "react";

// material-ui icons
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateIcon from "@mui/icons-material/Update";

// Images
import updateIcon from "assets/img/okolele-img/updated.png";

// SCSS
import "../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";
import ImgCropper from "views/OkoleleImageCropper/ImgCropper";

const DynamicImgElmntCreator = (props) => {
  // console.log("DynamicImgElmntCreator/props.images: ", props.images);

  // Img HTML elements
  const [productImages, setProductImages] = useState([{}]);

  useEffect(() => {
    // console.log("props.images.length: ", props.images.length);
    setProductImages(props.images);
  }, [props.images]);

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
    // console.log("removeSelectedImg id: ", index);
    let tempArray = [...productImages];
    tempArray.splice(index, 1);
    setProductImages(tempArray);
  };

  // select Img From Loacl Storage
  const imgAddRemoveHandler = (event, id, addRemoveFlag) => {
    if (addRemoveFlag === "add") {
      const file = event.target.files[0];
      getBase64(file).then((base64) => {
        // console.log("imgAddRemoveHandler/Converted Img: ", base64);
        localStorage["fileBase64"] = base64;
        let tempArray = [...productImages]; // copying the old datas array
        tempArray[id] = base64; // replace e.target.value with whatever you want to change it to

        setProductImages(tempArray);
      });
    } else if (addRemoveFlag === "remove") {
      let tempArray = [...productImages]; // copying the old datas array
      tempArray[id] = ""; // replace e.target.value with whatever you want to change it to

      setProductImages(tempArray);
    }
  };

  // Convert to base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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

  const dataSender = () => {
    // console.log("dataSender/productImages: ", productImages);
    props.imgPickerCallbackFun(productImages, props.variantIndex);
  };

  return (
    <div style={{ display: "flex" }} key={props.variantIndex}>
      {shouldPreview && (
        <ImgCropper
          src={productImages[imgIdToPreview]}
          onCloseImgCropper={onCloseImgCropper}
        />
      )}
      {productImages.map((x, i) => {
        return (
          <div style={{ marginRight: "15px" }}>
            {/* {console.log(
              "productImages & Index...........: ",
              productImages,
              props.variantIndex
            )} */}
            {/* Img Selector  */}
            <div className="picture-container">
              <div
                className="picture"
                style={{ borderRadius: "0", backgroundColor: "#ededed " }}
              >
                {/* {console.log("productImages[i]...: ", i, productImages[i])} */}
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
                        src={productImages[i]}
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
                  className="add-remove-btn"
                  style={{ width: "5vh", marginTop: "0", marginLeft: "13px" }}
                  onClick={handleAddImgElement}
                >
                  +
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button
        className="add-remove-btn"
        style={{ width: "6vh", marginTop: "45px", marginLeft: "15px" }}
        onClick={() => dataSender()}
      >
        <UpdateIcon />
      </button>
    </div>
  );
};

export default DynamicImgElmntCreator;
