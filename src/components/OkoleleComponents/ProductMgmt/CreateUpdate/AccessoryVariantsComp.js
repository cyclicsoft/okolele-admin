/*eslint-disable*/
import React, { useState, useEffect } from "react";
// material-ui icons
import RefreshIcon from "@mui/icons-material/Refresh";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import ProductVariants from "./ProductVariants/ProductVariants";
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import AccessoryVariants from "./ProductVariants/AccessoryVariants";

export default function AccessoryVariantsComp({ prodData, setProdData }) {
  const [productVariants, setProductVariants] = useState([
    {
      color: "",
      colorCode: "",
      basePrice: 0,
      images: [""],
    },
  ]);

  useEffect(() => {
    setProdData((prevState) => ({
      ...prevState,
      productAllVariants: productVariants,
    }));
  }, [productVariants]);

  const resetVariants = () => {
    setProdData((prevState) => ({
      ...prevState,
      productAllVariants: [],
    }));
  };

  return (
    <>
      {/* [VARIANTS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <BakeryDiningIcon />
                  <p className="sectionPara">[VARIANTS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetVariants}
                  />{" "}
                  Reset
                </div>
              </div>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <AccessoryVariants
                    productVariants={productVariants}
                    setProductVariants={setProductVariants}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
