//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Global State
import { store, useGlobalState } from "state-pool";
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

import PhoneDetails from "./Phone/PhoneDetails";
import TabDetails from "./Tab/TabDetails";
import SmartWatchDetails from "./SmartWatch/SmartWatchDetails";
// Warning Popup
import AccessoryDetails from "./Accessory/AccessoryDetails";

const useStyles = makeStyles(styles);

export default function ProductDetails(props) {
  const classes = useStyles();

  // Products Info
  const [productDetails, setProductDetails] = useState(
    props.location.productDetailsInfo
  );

  // Search
  const [dropdownValue, setDropdownValue] = useState(
    props.location.productType
  );

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
              {dropdownValue == "MOBILE" ? (
                <PhoneDetails productDetails={productDetails} />
              ) : null}
              {dropdownValue == "TABLET" ? (
                <TabDetails productDetails={productDetails} />
              ) : null}
              {dropdownValue == "SMARTWATCH" ? (
                <SmartWatchDetails productDetails={productDetails} />
              ) : null}
              {dropdownValue == "ACCESSORY" ? (
                <AccessoryDetails productDetails={productDetails} />
              ) : null}
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
