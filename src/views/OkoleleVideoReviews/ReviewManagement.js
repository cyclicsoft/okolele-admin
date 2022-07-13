//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TabIcon from "@mui/icons-material/Tab";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import WatchIcon from "@mui/icons-material/Watch";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Search from "@material-ui/icons/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Radio from "@mui/material/Radio";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Table from "components/Table/Table.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
// Loader
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Pagination
import PaginationComponent from "views/Pagination/PaginationComponent";
// Warning Popup
import ProductStatusUpdateWarning from "views/ConfirmationModals/ProductStatusUpdateWarning";
import CreateVideoReview from "./CreateVideoReview";
import UpdateVideoReview from "./UpdateVideoReview";

const useStyles = makeStyles(styles);

export default function ReviewManagement() {
  const classes = useStyles();
  const history = useHistory();
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  var accessTknValidity = new Date(userToken.tokenValidity);
  var refreshTknValidity = new Date(userToken.refreshTokenValidity);
  const refreshTkn = {
    refreshToken: userToken.refreshToken,
  };
  // API Header
  let config = {
    headers: {
      Authorization: "Bearer " + userToken.token,
    },
  };

  // Review Info
  const [reviewList, setReviewList] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [editReviewId, setEditReviewId] = useState("");
  // Create Tracker
  const [shouldCreate, setShouldCreate] = useState(true);
  // Update Tracker
  const [shouldUpdate, setShouldUpdate] = useState(false);
  // Pagination
  const [totalPageNo, setTotalPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  // Data loader flag
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // Product status change flag
  const [statusUpdateReviewtId, setStatusUpdateReviewId] = useState("");
  const [statusToBeChanged, setStatusToBeChanged] = useState("FALSE");
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  // Radio button
  const [selectedRadioValue, setSelectedRadioValue] = React.useState("create");

  // Initial API Call
  useEffect(() => {
    // Show Data Loader
    setIsDataLoaded(false);
    const pageNo = 0;
    const allReviewsAPI =
      "http://localhost:8080/reviews?page=" + pageNo + "&size=10&activeStatus=";

    axios
      .get(allReviewsAPI)
      .then(function (response) {
        if (response.data.content.data !== undefined) {
          setReviewList(response.data.content.data);
          setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
        }

        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    // Show Data Loader
    setIsDataLoaded(false);
    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;
    setCurrentPage(pageNo);
    const allReviewsAPI =
      "http://localhost:8080/reviews?page=" + pageNo + "&size=10&activeStatus=";

    axios
      .get(allReviewsAPI)
      .then(function (response) {
        setReviewList(response.data.content.data);
        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Refresh product List
  const reviewListRefreshOnclick = () => {
    // Show Data Loader
    setIsDataLoaded(false);
    // const pageNo = 0;
    const allReviewsAPI =
      "http://localhost:8080/reviews?page=" +
      currentPage +
      "&size=10&activeStatus=";

    axios
      .get(allReviewsAPI)
      .then(function (response) {
        setReviewList(response.data.content.data);
        setIsDataLoaded(true);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Create New Review
  const createNewReview = () => {
    history.push({
      pathname: "/admin/create-review",
    });
  };

  // edit Review
  const editReview = (reviewDetails) => {
    history.push({
      pathname: "/admin/update-review",
      reviewDetails: reviewDetails,
    });
  };

  // change Product Status
  const changeActiveStatus = (id, status) => {
    setShowPublishPopup(true);
    setStatusUpdateReviewId(id);
    setStatusToBeChanged(status);
  };
  // status Change Flag From Modal
  const statusChangeFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        console.log(
          "accessTknValidity.getTime() > currentLocalDateTime.getTime()"
        );
        updateActiveStatus();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          updateActiveStatus();
        });
      }
    }
    setShowPublishPopup(false);
  };

  const updateActiveStatus = () => {
    const statusUpdateAPI =
      "http://localhost:8080/reviews/status/" +
      statusUpdateReviewtId +
      "?isActive=" +
      statusToBeChanged;
    axios
      .post(statusUpdateAPI, {}, config)
      .then(function (response) {
        console.log("Status Update response: ", response);
        alert("Status updated!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      console.log(
        "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      );
      const refreshTokenAPI = "http://localhost:8080/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          console.log("Refresh token response: ", response);
          console.log("Status Code: ", response.status);

          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
            try {
              localStorage.clear();
              window.location.href = "/";
            } catch (e) {
              console.log(e.message);
            }
          } else {
            updateUserToken(function (accessToken) {
              accessToken.token = response.data.token;
              accessToken.tokenValidity = response.data.tokenValidity;
              accessToken.refreshToken = response.data.refreshToken;
              accessToken.refreshTokenValidity =
                response.data.refreshTokenValidity;
            });
            return true;
          }
        })
        .catch(function (error) {
          console.log("Status Code: ", error.response.status);
          console.log(error);
        });
    } else {
      console.log(
        "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      );
      // Logout forcefully from here
      try {
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showPublishPopup ? (
        <ProductStatusUpdateWarning
          statusChangeFlagFromModal={statusChangeFlagFromModal}
        />
      ) : null}

      {/* Create / Update */}
      {/* <GridContainer>
        <GridItem xs={12} sm={12}>
          <Card>
            <CardHeader color="rose" icon>
              <h4 className={classes.cardIconTitle}>Create / Update Review</h4>
            </CardHeader>

            <CardBody>
              <div style={{ display: "flex" }}>
                <h5>Create</h5>
                <Radio
                  checked={selectedRadioValue === "create"}
                  onChange={handleRadioChange}
                  value="create"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Create" }}
                />
                <h5>Update</h5>
                <Radio
                  checked={selectedRadioValue === "update"}
                  onChange={handleRadioChange}
                  value="update"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Update" }}
                />
              </div>
              {shouldCreate === true ? <CreateVideoReview /> : null}
              {shouldUpdate === true ? (
                <UpdateVideoReview editReviewId={editReviewId} />
              ) : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer> */}

      <GridContainer>
        {/* Product List */}
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <CardGiftcardIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Review List</h4>
            </CardHeader>
            <br />
            <br />
            {/* Refresh Review list */}
            <div style={{ display: "flex", fontWeight: "bold" }}>
              <CachedIcon
                className="product-list-refresh"
                onClick={reviewListRefreshOnclick}
              />{" "}
              Refresh
              <Button
                color="rose"
                style={{ marginLeft: "53vw" }}
                className={classes.updateProfileButton}
                onClick={createNewReview}
              >
                + Create New
              </Button>
            </div>
            {isDataLoaded === false ? (
              <div
                style={{
                  marginLeft: "35vw",
                  marginTop: "25%",
                  position: "absolute",
                }}
              >
                {/* Data Loader */}
                <FillingBottle
                  color="#f50057"
                  width="50px"
                  height="50px"
                  style={{ marginLeft: "20px" }}
                  onClick={() => alert("Clicked")}
                />

                <h4 style={{ fontWeight: "bold" }}>Loading.....</h4>
              </div>
            ) : (
              <CardBody>
                {/* Review List (Table) */}
                <Table
                  tableHead={[
                    "#",
                    "Product Name",
                    "Description",
                    "Status",
                    "Actions",
                  ]}
                  tableData={reviewList.map((reviews) => {
                    const {
                      id,
                      title,
                      description,
                      url,
                      activeStatus,
                    } = reviews;
                    let showInUI = "Inactive";
                    if (activeStatus === true) {
                      showInUI = "Active";
                    } else {
                      showInUI = "Inactive";
                    }

                    return [
                      id,
                      title,
                      description,
                      showInUI,

                      // Action Buttons
                      <div style={{ width: "70px" }}>
                        {/* edit Review */}
                        <Button
                          style={{
                            height: "30px",
                            width: "30px",
                            padding: "0px 0px 0px 3px",
                            margin: "0px 2px 0px 2px",
                          }}
                          round
                          color="success"
                          className={
                            classes.actionButton +
                            " " +
                            classes.actionButtonRound
                          }
                          onClick={() => editReview(reviews)}
                        >
                          <Edit className={classes.icon} />
                        </Button>

                        {/* Publish/Unpublished button (Conditional display) */}
                        {activeStatus ? (
                          <Button
                            style={{
                              height: "30px",
                              width: "30px",
                              padding: "0px 0px 0px 3px",
                              margin: "0px 2px 0px 2px",
                            }}
                            round
                            color="default"
                            className={
                              classes.actionButton +
                              " " +
                              classes.actionButtonRound
                            }
                            onClick={() => changeActiveStatus(id, "FALSE")}
                          >
                            <UnpublishedIcon className={classes.icon} />
                          </Button>
                        ) : (
                          <Button
                            style={{
                              height: "30px",
                              width: "30px",
                              padding: "0px 0px 0px 3px",
                              margin: "0px 2px 0px 2px",
                            }}
                            round
                            color="rose"
                            className={
                              classes.actionButton +
                              " " +
                              classes.actionButtonRound
                            }
                            onClick={() => changeActiveStatus(id, "TRUE")}
                          >
                            <CheckCircleIcon className={classes.icon} />
                          </Button>
                        )}
                      </div>,
                    ];
                  })}
                  customCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customClassesForCells={[0, 4, 5]}
                  customHeadCellClasses={[
                    classes.center,
                    classes.right,
                    classes.right,
                  ]}
                  customHeadClassesForCells={[0, 4, 5]}
                />
              </CardBody>
            )}
            <div className="pagination-style">
              <PaginationComponent
                paginationHandler={paginationHandler}
                totalCount={totalPageNo}
              />
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
