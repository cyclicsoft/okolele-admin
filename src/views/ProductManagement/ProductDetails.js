/*eslint-disable*/
//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component
import React, { useState, useEffect } from "react";
// Global State
// @material-ui/core components
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
// SCSS
// import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
import "assets/scss/ghorwali-scss/update-product.scss";
import "../../assets/scss/ghorwali-scss/create-admin.scss";
// Warning Popup
import ProductDetailsComponent from "components/OkoleleComponents/ProductMgmt/ProductDetails/ProductDetailsComponent";

const useStyles = makeStyles(styles);

export default function ProductDetails(props) {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // Path URL
  let pathURL = window.location.pathname;

  // Products Info
  const [productDetails, setProductDetails] = useState(null);
  const [productId, setProductId] = useState("");

  // Search
  const [dropdownValue, setDropdownValue] = useState("");

  // product Details from props/API call
  useEffect(() => {
    if (props.location.productDetailsInfo) {
      setProductDetails(props.location.productDetailsInfo);
      setDropdownValue(props.location.productType);
    } else {
      let prodId = "";
      getProductID((id) => {
        prodId = id;
      });

      let prodCategory = "";
      getProductCategory((category) => {
        prodCategory = category;
      });

      setDropdownValue(prodCategory);

      let productDetailsURL = rootPath + "/" + prodCategory + "/" + prodId;

      axios
        .get(productDetailsURL)
        .then(function (response) {
          if (response.status === 200) {
            console.log(
              "%cProductDetails.js line:82 response",
              "color: #007acc;",
              response
            );
            setProductDetails(response.data.content);
          }
        })
        .catch(function (error) {});
    }
  }, [props]);

  // get Product ID to get product details
  function getProductID(callback) {
    // let lastSlashIndex = -1;
    // for (let i in pathURL) {
    //   if (pathURL.charCodeAt(i) === 47) {
    //     lastSlashIndex = parseInt(i) + 1;
    //   }
    // }
    // if (lastSlashIndex > 0) {
    //   setProductId(pathURL.slice(lastSlashIndex));
    //   callback(pathURL.slice(lastSlashIndex));
    // }

    let parts = pathURL.split("/");
    let result = parts[4];
    console.log(result);
    callback(result);
  }

  function getProductCategory(callback) {
    let parts = pathURL.split("/");
    let result = parts[3];
    console.log(result);
    callback(result);
  }

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GridContainer>
        {/* Product Details */}
        <GridItem xs={12} sm={12}>
          {console.log("productDetails: ", productDetails)}
          <Card>
            <CardHeader icon>
              {/* <CardIcon color="info">
              <Edit />
            </CardIcon> */}
              <h4 className={classes.cardIconTitle}>Product Details</h4>
            </CardHeader>
            <CardBody>
              {dropdownValue == "mobiles" ? (
                // <PhoneDetails productDetails={productDetails} />
                <ProductDetailsComponent
                  prodAttributes={productDetails}
                  productCategory="mobiles"
                />
              ) : null}
              {dropdownValue == "tablets" ? (
                // <TabDetails productDetails={productDetails} />
                <ProductDetailsComponent
                  prodAttributes={productDetails}
                  productCategory="tablets"
                />
              ) : null}
              {dropdownValue == "smartwatches" ? (
                // <SmartWatchDetails productDetails={productDetails} />
                <ProductDetailsComponent
                  prodAttributes={productDetails}
                  productCategory="smartwatches"
                />
              ) : null}
              {dropdownValue == "accessories" ? (
                // <AccessoryDetails productDetails={productDetails} />
                <ProductDetailsComponent
                  prodAttributes={productDetails}
                  productCategory="accessories"
                />
              ) : null}
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
