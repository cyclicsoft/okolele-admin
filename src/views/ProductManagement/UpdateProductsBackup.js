/*eslint-disable*/
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

// Loader
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";

// SCSS
// import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
import "assets/scss/ghorwali-scss/update-product.scss";
import "../../assets/scss/ghorwali-scss/create-admin.scss";

import UpdatePhone from "./Phone/UpdatePhone";
import UpdateTab from "./Tab/UpdateTab";
// Warning Popup
import UpdateSmartWatch from "./SmartWatch/UpdateSmartWatch";
import UpdateAccessory from "./Accessory/UpdateAccessory";

const useStyles = makeStyles(styles);

export default function UpdateProducts(props) {
  const classes = useStyles();

  // Products Info
  const [editProductId, setEditProductId] = useState(props.location.productId);
  // Search
  const [dropdownValue, setDropdownValue] = useState(
    props.location.productType
  );

  return (
    <>
      <GridContainer>
        {/* Update Product */}
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardBody>
              {dropdownValue == "MOBILE" ? (
                <UpdatePhone editProductId={editProductId} />
              ) : null}

              {dropdownValue == "TABLET" ? (
                <UpdateTab editProductId={editProductId} />
              ) : null}

              {dropdownValue == "SMARTWATCH" ? (
                <UpdateSmartWatch editProductId={editProductId} />
              ) : null}

              {dropdownValue == "ACCESSORY" ? (
                <UpdateAccessory editProductId={editProductId} />
              ) : null}

              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
