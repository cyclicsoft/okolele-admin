//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Global State
import { store, useGlobalState } from "state-pool";
// @material-ui/core components
import axios from "axios";

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
import CreatePhone from "./Phone/CreatePhone";
import CreateTab from "./Tab/CreateTab";
import CreateSmartWatch from "./SmartWatch/CreateSmartWatch";
import CreateAccessory from "./Accessory/CreateAccessory";
// Loader
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Pagination
import PaginationComponent from "views/Pagination/PaginationComponent";
// SCSS
// import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
import "assets/scss/ghorwali-scss/update-product.scss";
import "../../assets/scss/ghorwali-scss/create-admin.scss";

import UpdatePhone from "./Phone/UpdatePhone";
import PhoneDetails from "./Phone/PhoneDetails";
import TabDetails from "./Tab/TabDetails";
import UpdateTab from "./Tab/UpdateTab";
import SmartWatchDetails from "./SmartWatch/SmartWatchDetails";
import { TrendingUpRounded } from "@mui/icons-material";
// Warning Popup
import ProductStatusUpdateWarning from "views/ConfirmationModals/ProductStatusUpdateWarning";
import AccessoryDetails from "./Accessory/AccessoryDetails";
import UpdateAccessory from "./Accessory/UpdateAccessory";
import UpdateSmartWatch from "./SmartWatch/UpdateSmartWatch";
import UpdatePhoneCopy from "./Phone/UpdatePhoneCopy";

const useStyles = makeStyles(styles);

export default function UpdateProducts() {
  const classes = useStyles();
  const history = useHistory();
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  var accessTknValidity = new Date(userToken.tokenValidity);
  var refreshTknValidity = new Date(userToken.refreshTokenValidity);
  // API Header
  let config = {
    headers: {
      Authorization: "Bearer " + userToken.token,
    },
  };

  // Products Info
  const [allProducts, setallProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [editProductId, setEditProductId] = useState("");
  // Section Flag
  const [showDetailSection, setShowDetailSection] = useState(false);
  const [showEditSection, setShowEditSection] = useState(false);
  // Search
  const [dropdownValue, setDropdownValue] = useState("MOBILE");
  const [searchKeyword, setSearchKeyword] = useState("");
  // Pagination
  const [totalPageNo, setTotalPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  // Data loader flag
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // Product status change flag
  const [statusUpdateProductId, setStatusUpdateProductId] = useState("");
  const [statusToBeChanged, setStatusToBeChanged] = useState(false);
  const [showPublishPopup, setShowPublishPopup] = useState(false);

  // useEffect 1
  // Initial API Call
  useEffect(() => {
    console.log("useEffect 1 start / dropdownValue", dropdownValue);
    // Hide Product Details Section
    setShowDetailSection(false);
    // Hide Product Edit Section
    setShowEditSection(false);
    // Show Data Loader
    setIsDataLoaded(false);

    const pageNo = 0;
    const allProductsAPI =
      "http://localhost:8080/products?page=" +
      pageNo +
      "&size=10&productType=" +
      dropdownValue +
      "&publishStatus=ALL";

    axios
      .get(allProductsAPI)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          setallProducts(response.data.content.data);
          setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
        } else {
          setallProducts([]);
        }

        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  }, [dropdownValue]);

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    // Hide Product Details Section
    setShowDetailSection(false);
    // Hide Product Edit Section
    setShowEditSection(false);
    // Show Data Loader
    setIsDataLoaded(false);
    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;
    setCurrentPage(pageNo);
    const allProductsAPI =
      "http://localhost:8080/products?page=" +
      pageNo +
      "&size=10&productType=" +
      dropdownValue +
      "&publishStatus=ALL";

    axios
      .get(allProductsAPI)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          setallProducts(response.data.content.data);
        }
        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  };

  // Refresh product List
  const productListRefresh = () => {
    // Hide Product Details Section
    setShowDetailSection(false);
    // Hide Product Edit Section
    setShowEditSection(false);
    // Show Data Loader
    setIsDataLoaded(false);
    // const pageNo = 0;
    const allProductsAPI =
      "http://localhost:8080/products?page=" +
      currentPage +
      "&size=10&productType=" +
      dropdownValue +
      "&publishStatus=ALL";

    axios
      .get(allProductsAPI)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          setallProducts(response.data.content.data);
          setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
        }
        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  };

  // product Search Hanler
  const productSearchHanler = () => {
    // Hide Product Details Section
    setShowDetailSection(false);
    // Hide Product Edit Section
    setShowEditSection(false);
    // Show Data Loader
    setIsDataLoaded(false);
    const pageNo = 0;
    let productCategory = "";
    if (dropdownValue == "MOBILE") {
      productCategory = "mobiles";
    } else if (dropdownValue == "TABLET") {
      productCategory = "tablets";
    } else if (dropdownValue == "SMARTWATCH") {
      productCategory = "smartwatches";
    } else if (dropdownValue == "ACCESSORY") {
      productCategory = "accessories";
    }
    const phoneSearchAPI =
      "http://localhost:8080/" +
      productCategory +
      "/searchByTitle?keyword=" +
      searchKeyword +
      "&page=" +
      pageNo +
      "&size=10";

    axios
      .get(phoneSearchAPI)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          setallProducts(response.data.content.data);
          setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
        }
        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  };

  // View Product Details
  const viewProductDetails = (details) => {
    setProductDetails(details);

    setShowDetailSection(true);
    setShowEditSection(false);
  };

  // Edit Product
  const editProduct = (id) => {
    // alert(id);
    setEditProductId(id);

    setShowDetailSection(false);
    setShowEditSection(true);
  };

  // change Product Status
  const statusChangeBtnClick = (id, status) => {
    setShowPublishPopup(true);
    setStatusUpdateProductId(id);
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
        updateStatus();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          updateStatus();
        });
      }
    }
    setShowPublishPopup(false);
  };
  const updateStatus = () => {
    // Hide Product Details Section
    setShowDetailSection(false);
    // Hide Product Edit Section
    setShowEditSection(false);

    let productCategory = "";
    if (dropdownValue == "MOBILE") {
      productCategory = "mobiles";
    } else if (dropdownValue == "TABLET") {
      productCategory = "tablets";
    } else if (dropdownValue == "SMARTWATCH") {
      productCategory = "smartwatches";
    } else if (dropdownValue == "ACCESSORY") {
      productCategory = "accessories";
    }

    setIsDataLoaded(false);

    const statusUpdateAPI =
      "http://localhost:8080/" +
      productCategory +
      "/updatePublishStatus/" +
      statusUpdateProductId +
      "?isPublished=" +
      statusToBeChanged;

    axios
      .post(statusUpdateAPI, {}, config)
      .then(function (response) {
        console.log("Status Update response: ", response);
        alert("Status updated!");
        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  };

  // dropdown Handler
  const dropdownHandler = (event) => {
    // console.log('event.target.value', event.target.value);
    setDropdownValue(event.target.value);
    setShowDetailSection(false);
    setShowEditSection(false);
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      console.log(
        "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      );
      const refreshTokenAPI = "http://localhost:8080/auth/token";
      axios
        .post(refreshTokenAPI, userToken.refreshToken)
        .then(function (response) {
          console.log("Refresh token response: ", response);

          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
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
          console.log(error);
        });
    } else {
      console.log(
        "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      );
      // Logout forcefully from here
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

      <GridContainer>
        {/* Product List */}
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <CardGiftcardIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Product List</h4>

              {/* Select Product Category & Search*/}
              <div style={{ display: "flex" }}>
                <FormControl style={{ marginLeft: "30vw", width: "20vw" }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Type*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={dropdownValue}
                    label="Select Type*"
                    onChange={dropdownHandler}
                  >
                    <MenuItem value={"MOBILE"}>Search Phone</MenuItem>
                    <MenuItem value={"TABLET"}>Search Tab</MenuItem>
                    <MenuItem value={"SMARTWATCH"}>Search Smart Watch</MenuItem>
                    <MenuItem value={"ACCESSORY"}>Search Accessory</MenuItem>
                  </Select>
                </FormControl>

                {/* Search Product by Name */}
                <div className="search-field">
                  <CustomInput
                    formControlProps={{
                      className: classes.top + " " + classes.search,
                    }}
                    inputProps={{
                      placeholder: "Search by Name",
                      value: searchKeyword,
                      onChange: (event) => setSearchKeyword(event.target.value),
                      type: "String",
                    }}
                  />
                </div>

                {/* Search Button */}
                <Button
                  style={{ marginTop: "1%" }}
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  //   className={searchButton}
                  onClick={() => productSearchHanler()}
                >
                  <Search
                    className={
                      classes.headerLinksSvg + " " + classes.searchIcon
                    }
                  />
                </Button>
              </div>
            </CardHeader>

            {/* Refresh product list */}
            <div style={{ display: "flex", fontWeight: "bold" }}>
              <CachedIcon
                className="product-list-refresh"
                onClick={productListRefresh}
              />{" "}
              Refresh
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
                {/* Product List (Table) */}
                <Table
                  tableHead={[
                    "#",
                    "Product Name",
                    "Category",
                    "Brand",
                    "Status",
                    "Actions",
                  ]}
                  tableData={allProducts.map((products) => {
                    const { id, title, category, brand, published } = products;
                    let showInUI = "Inactive";
                    if (published === true) {
                      showInUI = "Active";
                    } else {
                      showInUI = "Inactive";
                    }

                    // console.log(products);
                    return [
                      id,
                      title,
                      category,
                      brand,
                      showInUI,

                      // Action Buttons
                      <div>
                        {/* view Product Details */}
                        <Button
                          style={{
                            height: "30px",
                            width: "30px",
                            padding: "0px 0px 0px 3px",
                            margin: "0px 2px 0px 2px",
                          }}
                          round
                          color="info"
                          className={
                            classes.actionButton +
                            " " +
                            classes.actionButtonRound
                          }
                          onClick={() => viewProductDetails(products)}
                        >
                          <VisibilityIcon className={classes.icon} />
                        </Button>
                        {/* edit Product */}
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
                          onClick={() => editProduct(id)}
                        >
                          <Edit className={classes.icon} />
                        </Button>

                        {/* Publish/Unpublished button (Conditional display) */}
                        {published ? (
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
                            onClick={() => statusChangeBtnClick(id, false)}
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
                            onClick={() => statusChangeBtnClick(id, true)}
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

        {/* Product Details */}
        {showDetailSection ? (
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
        ) : null}

        {/* Update Product */}
        {showEditSection === true ? (
          <GridItem xs={12} sm={12}>
            {/* md={8} */}
            <Card>
              <CardHeader icon>
                {/* <CardIcon color="info">
              <Edit />
            </CardIcon> */}
                <h4 className={classes.cardIconTitle}>Update Products</h4>
              </CardHeader>
              <CardBody>
                {dropdownValue == "MOBILE" ? (
                  <UpdatePhoneCopy editProductId={editProductId} />
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
        ) : null}
      </GridContainer>
    </>
  );
}
