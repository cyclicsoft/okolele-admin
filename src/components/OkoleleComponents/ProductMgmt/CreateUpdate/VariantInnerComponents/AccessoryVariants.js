/*eslint-disable*/
import React from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DynamicImgElmntUpdate from "../DynamicInputs/DynamicImgElmntUpdate";
// SCSS
import "../../../../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";

const AccessoryVariants = ({
  actionType,
  productVariants,
  setProductVariants,
}) => {
  const productImagesSetter = (images, index) => {
    const list = [...productVariants];
    list[index]["images"] = images;
    setProductVariants(list);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const list = [...productVariants];
    const { name, value } = e.target;
    console.log("%cAccessoryVariants.js line:21 name,value", name, value);
    list[index][name] = value;
    setProductVariants(list);
  };

  // handle click event of the Remove button
  const handleRemoveVariant = (index) => {
    const list = [...productVariants];
    list.splice(index, 1);
    setProductVariants(list);
  };

  // Add button click
  const handleAddVariant = () => {
    setProductVariants([
      ...productVariants,
      {
        color: "",
        colorCode: "",
        basePrice: 0,
        images: [""],
      },
    ]);
  };

  // Clone button click
  const handleCloneVariant = (variantToClone) => {
    if (actionType === "create") {
      setProductVariants([...productVariants, { ...variantToClone }]);
    } else if (actionType === "update") {
      let tempObj = { ...variantToClone };
      tempObj["images"] = [""];
      setProductVariants([...productVariants, { ...tempObj }]);
    }
  };

  return (
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
                  onChange={(e) => handleInputChange(e, i)}
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
                  onChange={(e) => handleInputChange(e, i)}
                />
              </GridItem>
              {/* Base Price */}
              <GridItem xs={12} sm={12} md={3}>
                <input
                  name="basePrice"
                  placeholder="Base Price"
                  className="input-field"
                  style={{ marginRight: "10px" }}
                  value={x.basePrice}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </GridItem>
            </GridContainer>

            {/* Img Picker */}
            <GridContainer>
              <div style={{ color: "red", marginLeft: "15px" }}>
                Aspect Ratio 1:1 & Dimension 1080px X 1080px
              </div>
              <GridItem xs={12} sm={12} md={12} key={i}>
                {/* <DynamicImgElmntCreator
                  productImages={productVariants[i].images}
                  setProductImages={(list) => productImagesSetter(list, i)}
                /> */}

                <DynamicImgElmntUpdate
                  productImages={productVariants[i].images}
                  setProductImages={(list) => productImagesSetter(list, i)}
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
                  Remove
                </button>
              )}

              {productVariants.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{ marginLeft: "0", marginRight: "10px" }}
                  onClick={handleAddVariant}
                >
                  Add New
                </button>
              )}

              <button
                className="add-remove-btn"
                style={{ marginLeft: "0", marginRight: "10px" }}
                onClick={() => handleCloneVariant(x)}
              >
                Clone
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccessoryVariants;
