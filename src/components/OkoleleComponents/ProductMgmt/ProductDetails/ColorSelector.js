import React from "react";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//SCSS file
import detailStyles from "../../../../assets/scss/ghorwali-scss/_product-details-comp.module.scss";

const ColorSelector = (props) => {
  const onColorClick = (productVariants) => {
    props.productColorClick(productVariants);
  };

  return (
    <GridContainer>
      {props.allVariants.map((productVariants) => (
        <GridItem
          xs={6}
          sm={6}
          md={6}
          onClick={() => onColorClick(productVariants)}
          key={productVariants.colorVariantId}
        >
          <div
            className={detailStyles["product-details-color-sec"]}
            style={{
              borderColor:
                productVariants.colorVariantId === props.colorVariantId
                  ? "#0E86D4"
                  : "#d3d3d3",
            }}
          >
            <div
              className={detailStyles["product-details-color-color"]}
              style={{ background: productVariants.colorCode }}
            />
            <div
              className={detailStyles["product-details-label4"]}
              style={{ marginTop: "7px" }}
            >
              {productVariants.color}
            </div>
          </div>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default ColorSelector;
