import React from "react";
// SCSS 
import featueStyle from "../../../../assets/scss/ghorwali-scss/prod-details/_product-feature.module.scss";

const ProductFeatureArray = (props) => {
  return (
    <div className={featueStyle["featue-container"]}>
      <div className={featueStyle["product-details-label5"]}>
        {props.featureLable}{" "}
      </div>
      <div className={featueStyle["product-details-label4"]}>
        {props.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </div>
    </div>
  );
};

export default ProductFeatureArray;
