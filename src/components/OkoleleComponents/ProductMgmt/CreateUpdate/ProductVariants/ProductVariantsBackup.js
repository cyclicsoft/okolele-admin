import React, { useEffect, useState } from "react";

// material-ui icons
import Add from "@material-ui/icons/Add";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UpdateIcon from "@mui/icons-material/Update";
// core components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Select from "@mui/material/Select";
// Images
import updateIcon from "assets/img/okolele-img/updated.png";
// SCSS
import "../../../../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";

// import { red } from "@material-ui/core/colors";
import VariantInnerObj from "./VariantInnerObj";
// import { DirectionsRailway } from "@material-ui/icons";
import DynamicImgElmntCreator from "./DynamicImgElmntCreator";

const useStyles = makeStyles(styles);

const ProductVariants = (props) => {
  const classes = useStyles();
  const [productVariants, setProductVariants] = useState([
    {
      color: "",
      colorCode: "",
      images: [{}],
      variants: [{}],
    },
  ]);

  useEffect(() => {
    if (Object.keys(props.objectValue).length > 0) {
      setProductVariants(props.objectValue);
    } else {
      setProductVariants([
        {
          color: "",
          colorCode: "",
          images: [{}],
          variants: [{}],
        },
      ]);
    }
  }, [props.objectValue]);

  // handle input change
  const handleInputChange = (e, index, isInnerObj, objName) => {
    const list = [...productVariants];
    // If the response comes from input element Directy
    // then e will contain the target (input name and value)
    // objName will contain null
    if (!isInnerObj) {
      const { name, value } = e.target;
      list[index][name] = value;
      setProductVariants(list);
    }
    // If the response comes as an Obj from VariantInnerObj.js
    // then e will contain the object objName will contain the object name
    else {
      list[index][objName] = e;
      setProductVariants(list);
    }
  };

  // handle click event of the Add button
  const handleAddVariant = () => {
    setProductVariants([
      ...productVariants,
      {
        color: "",
        colorCode: "",
        images: [],
        variants: [{}],
      },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveVariant = (index) => {
    const list = [...productVariants];
    console.log("handleRemoveVariant");
    list.splice(index, 1);
    setProductVariants(list);
  };

  // Response received from VariantInnerObj.js is setting to local var
  const innerObjCallbackFun = (responseData, variantIndex) => {
    handleInputChange(responseData, variantIndex, true, "variants");
  };

  // Response received from DynamicImgElmntCreator.js is setting to local var
  const imgPickerCallbackFun = (responseData, variantIndex) => {
    console.log("imgPickerCallbackFun/responseData", responseData);
    console.log("imgPickerCallbackFun/variantIndex", variantIndex);
    handleInputChange(responseData, variantIndex, true, "images");
  };

  const callBackDataSender = () => {
    props.productVariantsSetter(productVariants);
  };

  return (
    // onBlur={callBackDataSender}
    <div style={{ marginBottom: "15px" }}>
      {productVariants.map((x, i) => {
        return (
          <div key={i}>
            {/* Color Code & Name */}
            <GridContainer>
              {/* Color Name */}
              <GridItem xs={12} sm={12} md={3}>
                <input
                  name="color"
                  placeholder="Color Name"
                  className="input-field"
                  style={{ marginRight: "10px" }}
                  value={x.color}
                  onChange={(e) => handleInputChange(e, i, false, null)}
                />
              </GridItem>
              {/* Color Code */}
              <GridItem xs={12} sm={12} md={3}>
                <input
                  name="colorCode"
                  placeholder="Color Code"
                  className="input-field"
                  style={{ marginRight: "10px" }}
                  value={x.colorCode}
                  onChange={(e) => handleInputChange(e, i, false, null)}
                />
              </GridItem>
            </GridContainer>

            {/* Stock Info & Base Price */}
            <GridContainer>
              {/* Inner Obj: Ram, Rom, Base Price */}
              <GridItem xs={12} sm={12} md={12} key={i}>
                <VariantInnerObj
                  variantIndex={i}
                  innerObjCallbackFun={innerObjCallbackFun}
                  variants={productVariants[i].variants}
                />
              </GridItem>
            </GridContainer>

            {/* Img Picker */}
            <GridContainer>
              <div style={{ color: "red", marginLeft: "15px" }}>
                Aspect Ratio 1:1 & Dimension 1080px X 1080px
              </div>
              <GridItem xs={12} sm={12} md={12} key={i}>
                <DynamicImgElmntCreator
                  variantIndex={i}
                  imgPickerCallbackFun={imgPickerCallbackFun}
                  images={productVariants[i].images}
                />
              </GridItem>
            </GridContainer>

            <div style={{ display: "flex" }}>
              {productVariants.length !== 1 && (
                <button
                  className="add-remove-btn"
                  style={{ marginLeft: "0", marginRight: "10px" }}
                  onClick={() => handleRemoveVariant(i)}
                >
                  Remove Variant
                </button>
              )}

              {productVariants.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{ marginLeft: "0", marginRight: "10px" }}
                  onClick={handleAddVariant}
                >
                  Add New Variant
                </button>
              )}
              {productVariants.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{ marginLeft: "0" }}
                  onClick={callBackDataSender}
                >
                  Update Variants
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;
