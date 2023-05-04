//index->App->Admin->Sidebar->CreateAdmin
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Edit from "@material-ui/icons/Edit";
import Search from "@material-ui/icons/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
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
// SCSS
// import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
import "assets/scss/ghorwali-scss/update-product.scss";
import "../../assets/scss/ghorwali-scss/create-admin.scss";

// Warning Popup
import ActivateDeactivatePopup from "views/ConfirmationModals/ActivateDeactivatePopup";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

export default function ProductList() {
  const classes = useStyles();
  const history = useHistory();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  const [headers, setHeaders] = useState();

  // Products Info
  const [allProducts, setallProducts] = useState([]);
  // Search
  const [dropdownValue, setDropdownValue] = useState("MOBILE");
  const [prodCategory, setProdCategory] = useState("mobiles");
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

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  // Initial API Call
  useEffect(() => {
    console.log("useEffect 1 start / prodCategory", prodCategory);
    // Show Data Loader
    setIsDataLoaded(false);

    const pageNo = 0;
    const allProductsAPI =
      rootPath +
      "/products?page=" +
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
    // Show Data Loader
    setIsDataLoaded(false);
    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;
    setCurrentPage(pageNo);
    const allProductsAPI =
      rootPath +
      "/products?page=" +
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
    // Show Data Loader
    setIsDataLoaded(false);
    // const pageNo = 0;
    const allProductsAPI =
      rootPath +
      "/products?page=" +
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
    // Show Data Loader
    setIsDataLoaded(false);
    const pageNo = 0;
    // let productCategory = "";
    // if (dropdownValue == "MOBILE") {
    //   productCategory = "mobiles";
    // } else if (dropdownValue == "TABLET") {
    //   productCategory = "tablets";
    // } else if (dropdownValue == "SMARTWATCH") {
    //   productCategory = "smartwatches";
    // } else if (dropdownValue == "ACCESSORY") {
    //   productCategory = "accessories";
    // }
    const phoneSearchAPI =
      rootPath +
      "/" +
      prodCategory +
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

    history.push({
      pathname: "/admin/product-details/" + productCategory + "/" + details.id,
      productDetailsInfo: details,
      productType: productCategory,
    });
  };

  // Edit Product
  const editProduct = (id) => {
    history.push({
      pathname: "/admin/update-products/" + prodCategory + "/" + id,
      // productId: id,
      // productType: dropdownValue,
    });
  };

  // change Product Status
  const statusChangeBtnClick = (id, status) => {
    setShowPublishPopup(true);
    setStatusUpdateProductId(id);
    setStatusToBeChanged(status);
  };
  // status Change Flag From Modal
  const statusChangeFlag = (isConfirmed) => {
    if (isConfirmed === true && headers) {
      updateStatus();
    }
    setShowPublishPopup(false);
  };
  const updateStatus = () => {
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
      rootPath +
      "/" +
      productCategory +
      "/updatePublishStatus/" +
      statusUpdateProductId +
      "?isPublished=" +
      statusToBeChanged;

    axios
      .post(statusUpdateAPI, {}, headers)
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
    switch (event.target.value) {
      case "MOBILE":
        setProdCategory("mobiles");
        break;
      case "TABLET":
        setProdCategory("tablets");
        break;
      case "SMARTWATCH":
        setProdCategory("smartwatches");
        break;
      case "ACCESSORY":
        setProdCategory("accessories");
        break;
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showPublishPopup ? (
        <ActivateDeactivatePopup statusChangeFlag={statusChangeFlag} />
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
      </GridContainer>
    </>
  );
}
