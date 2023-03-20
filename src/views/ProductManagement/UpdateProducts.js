/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import UpdatePhone from "views/ProductManagement/Phone/UpdatePhone";
import UpdateTab from "views/ProductManagement/Tab/UpdateTab";
import UpdateSmartWatch from "views/ProductManagement/SmartWatch/UpdateSmartWatch";
import UpdateAccessory from "views/ProductManagement/Accessory/UpdateAccessory";
// SCSS
import "assets/scss/ghorwali-scss/update-product.scss";

export default function UpdateProducts(props) {
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");
  // Products Info
  const [prodId, setProdId] = useState(null);
  const [prodCategory, setProdCategory] = useState(null);
  const [prodDetails, setProdDetails] = useState(null);

  useEffect(() => {
    if (window?.location?.pathname) {
      const queryParams = window.location.pathname.split("/");
      setProdCategory(queryParams[3]);
      setProdId(queryParams[4]);

      getProdDetails(queryParams[3], queryParams[4]);
    }
  }, [window.location]);

  const getProdDetails = (category, id) => {
    const detailsAPI = rootPath[0] + "/" + category + "/" + id;

    axios
      .get(detailsAPI)
      .then(function (response) {
        console.log("axios / Product Details: ", response);
        if (response.status === 200) {
          setProdDetails(response.data.content);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!prodId || !prodCategory || !prodDetails) {
    return (
      <div>Select a product from product listing page first to update</div>
    );
  }

  return (
    <>
      <GridContainer>
        {/* Update Product */}
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardBody>
              {prodCategory == "mobiles" ? (
                <UpdatePhone editProductId={prodId} prodDetails={prodDetails} />
              ) : null}

              {prodCategory == "tablets" ? (
                <UpdateTab editProductId={prodId} prodDetails={prodDetails} />
              ) : null}

              {prodCategory == "smartwatches" ? (
                <UpdateSmartWatch
                  editProductId={prodId}
                  prodDetails={prodDetails}
                />
              ) : null}

              {prodCategory == "accessories" ? (
                <UpdateAccessory
                  editProductId={prodId}
                  prodDetails={prodDetails}
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
