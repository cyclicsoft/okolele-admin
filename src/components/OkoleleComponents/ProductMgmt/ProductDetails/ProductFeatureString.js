import React from "react";
// SCSS 
import featueStyle from "../../../../assets/scss/ghorwali-scss/prod-details/_product-feature.module.scss";

const ProductFeatureString = (props) => {
  return (
    <div style={{ alignItems: "center" }}>
      <div className={featueStyle["product-details-label5"]}>
        {props.featureLable}
      </div>
      <div className={featueStyle["product-details-label4"]}>
        {props.feature}
      </div>
    </div>
  );
};

export default ProductFeatureString;
