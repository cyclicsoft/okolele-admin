/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
// Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
import { apiHeader } from "services/helper-function/api-header";
toast.configure();

const useStyles = makeStyles(styles);

function CreateVideoReview() {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  // Review Info
  const [name, setName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const videoReviewData = {
    title: name,
    url: videoUrl,
    activeStatus: false,
    description: productDescription,
  };

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  const reviewSaveClick = () => {
    setShowProductCreatePopup(true);
  };
  // Review Create Flag From Modal
  const reviewCreateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      saveNewVideoReview();
    }
    setShowProductCreatePopup(false);
  };

  const saveNewVideoReview = () => {
    if (name !== "" && productDescription !== "" && videoUrl !== "") {
      const reviewCreateAPI = rootPath + "/reviews";
      axios
        .post(reviewCreateAPI, videoReviewData, headers)
        .then(function (response) {
          // console.log("update response: ", response);
          console.log("response code: ", response.status);
          setHttpResponseCode(response.status);
          setShowHttpResponseMsg(true);
        })
        .catch(function (error) {
          setHttpResponseCode(error.response.status);
          setShowHttpResponseMsg(true);
        });
    } else {
      alert("Please enter all the field.");
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showProductCreatePopup ? (
        <ProductCreateConfirmation
          productCreateFlagFromModal={reviewCreateFlagFromModal}
        />
      ) : null}

      {/* Show HTTP response code  */}
      {showHttpResponseMsg === true ? (
        <HttpStatusCode responseCode={httpResponseCode} />
      ) : null}

      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <h4 className={classes.cardIconTitle}>Create New Review</h4>
            </CardHeader>
            <CardBody>
              {/* Name & Product Description  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Product Name"
                    id="product-name"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: name || "",
                      onChange: (event) => setName(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>

                {/* Category 1 is fixed for Phone type */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Product Description "
                    id="product-description"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: productDescription || "",
                      onChange: (event) =>
                        setProductDescription(event.target.value),
                      maxLength: "200",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Review URL */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Review URL"
                    id="review-url"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: videoUrl || "",
                      onChange: (event) => setVideoUrl(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <Button
                color="rose"
                className={classes.updateProfileButton}
                onClick={reviewSaveClick}
              >
                Save
              </Button>

              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CreateVideoReview;
