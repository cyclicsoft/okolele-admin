/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// material-ui icons
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
// Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Date
import "date-fns";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
// Data formatter

// Dropdown Select
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
import { apiHeader } from "services/helper-function/api-header";
toast.configure();

const useStyles = makeStyles(styles);

function UpdateVideoReview(props) {
  const classes = useStyles();

  //   Review Details from props
  var reviewDetails = props.location.reviewDetails;

  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  // Review Info
  const [name, setName] = useState(reviewDetails ? reviewDetails.title : "");
  const [productDescription, setProductDescription] = useState(
    reviewDetails ? reviewDetails.description : ""
  );
  const [videoUrl, setVideoUrl] = useState(
    reviewDetails ? reviewDetails.url : ""
  );
  const [activeStatus, setActiveStatus] = useState(
    reviewDetails ? reviewDetails.activeStatus : false
  );
  const [reviewId, setReviewId] = useState(
    reviewDetails ? reviewDetails.id : ""
  );
  // const [reviewDetails, setReviewDetails] = useState([]);

  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const videoReviewData = {
    title: name,
    url: videoUrl,
    activeStatus: activeStatus,
    description: productDescription,
  };

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    console.log("reviewId: ", props.editReviewId);
    const reviewCreateAPI = rootPath + "/reviews/" + props.editReviewId;
    axios
      .get(reviewCreateAPI)
      .then(function (response) {
        console.log("response: ", response.data);
        // console.log("response code: ", response.status);
        setName(response.data.title);
        setProductDescription(response.data.description);
        setVideoUrl(response.data.url);
        setActiveStatus(response.data.activeStatus);

        // setHttpResponseCode(response.status);
        // setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  }, []);

  const reviewUpdateHandler = () => {
    setShowProductCreatePopup(true);
  };
  // review Create Flag From Modal
  const reviewUpdateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true && headers) {
      var currentLocalDateTime = new Date();
      updateReview();
    }
    setShowProductCreatePopup(false);
  };

  const updateReview = () => {
    if (name != "" && productDescription != "" && videoUrl != "") {
      const reviewUpdateAPI = rootPath + "/reviews/" + reviewId;
      axios
        .put(reviewUpdateAPI, videoReviewData, headers)
        .then(function (response) {
          // console.log("update response: ", response);
          // console.log("response code: ", response.status);
          setHttpResponseCode(response.status);
          setShowHttpResponseMsg(true);
        })
        .catch(function (error) {
          console.log("error: ", error);
          // setHttpResponseCode(error.response.status);
          setShowHttpResponseMsg(true);
        });
    } else {
      alert("Please enter all the field.");
    }
  };

  // inputs Reset Handler
  const inputsResetHandler = () => {
    setName(reviewDetails ? reviewDetails.title : "");
    setProductDescription(reviewDetails ? reviewDetails.description : "");
    setVideoUrl(reviewDetails ? reviewDetails.url : "");
    setActiveStatus(reviewDetails ? reviewDetails.activeStatus : false);
    setReviewId(reviewDetails ? reviewDetails.id : "");
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showProductCreatePopup ? (
        <ProductCreateConfirmation
          productCreateFlagFromModal={reviewUpdateFlagFromModal}
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
              <h4 className={classes.cardIconTitle}>Update Review</h4>
            </CardHeader>
            {reviewDetails ? (
              <CardBody>
                {/* Reset */}
                <div className="resetIcon-container">
                  <RefreshIcon
                    className="reset-input"
                    onClick={inputsResetHandler}
                  />{" "}
                  Reset
                </div>

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

                {/* Review Active Status & URL */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Active Status"
                      id="active-status"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: activeStatus || "",
                        // onChange: (event) => setVideoUrl(event.target.value),
                        maxLength: "10",
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
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
                  onClick={reviewUpdateHandler}
                >
                  Update
                </Button>

                <Clearfix />
              </CardBody>
            ) : (
              <h5 style={{ textAlign: "center", color: "red" }}>
                No data to update!
              </h5>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default UpdateVideoReview;
