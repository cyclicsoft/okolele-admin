import React from "react";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//SCSS file
import detailStyles from "../../../../assets/scss/ghorwali-scss/_product-details-comp.module.scss";

const CapacitySelector = (props) => {
  const onCapacityClick = (selectedVrnt) => {
    props.productCapacityClick(selectedVrnt);
  };

  return (
    <GridContainer>
      {props.selectedColorVariants.map((selectedVrnt) => (
        <GridItem
          xs={6}
          sm={6}
          md={6}
          onClick={() => onCapacityClick(selectedVrnt)}
          key={selectedVrnt.variantId}
        >
          <div
            className={detailStyles["product-details-capacity-sec"]}
            style={{
              borderColor:
                selectedVrnt.variantId === props.variantId
                  ? "#0E86D4"
                  : "#d3d3d3",
            }}
          >
            {/* Ram / Rom */}
            <div className={detailStyles["ram-rom-div-cont"]}>
              <div className={detailStyles["product-details-label3"]}>
                {selectedVrnt.ram}
                {selectedVrnt.ramUnit} /
              </div>
              <div className={detailStyles["product-details-label6"]}>
                {selectedVrnt.rom}
                {selectedVrnt.romUnit}
              </div>
            </div>

            <div
              className={detailStyles["product-details-label4"]}
              style={{ marginTop: "7px" }}
            >
              {selectedVrnt.currentPrice}৳
            </div>
          </div>
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default CapacitySelector;
