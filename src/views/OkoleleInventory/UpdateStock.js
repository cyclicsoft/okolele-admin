//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { useGlobalState } from "state-pool";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";

// @material-ui/icons
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Edit from "@material-ui/icons/Edit";
import Search from "@material-ui/icons/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CachedIcon from "@mui/icons-material/Cached";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
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
import ProductStatusUpdateWarning from "views/ConfirmationModals/ProductStatusUpdateWarning";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

const customStyles = {
  content: {
    minWidth: "29vw",
    height: "50vh",
    boxShadow: "10px 10px 10px lightgrey",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-44%, -30%)",
  },
};

export default function UpdateStock() {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  // Products Info
  const [allProducts, setallProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

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
  //   Stock Update Modal
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [outerVarinatObj, setOuterVarinatObj] = useState([]);
  const [qtyToAddDeduct, setQtyToAddDeduct] = useState("0");
  const [editProductId, setEditProductId] = useState("");
  const [editProductCategory, setEditProductCategory] = useState("");

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);
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
    // Hide Product Details Section
    setShowDetailSection(false);
    // Hide Product Edit Section
    setShowEditSection(false);
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
      rootPath +
      "/" +
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
  // const editProduct = (id) => {
  //   // alert(id);
  //   setEditProductId(id);

  //   setShowDetailSection(false);
  //   setShowEditSection(true);
  // };

  // change Product Status
  const statusChangeBtnClick = (id, status) => {
    setShowPublishPopup(true);
    setStatusUpdateProductId(id);
    setStatusToBeChanged(status);
  };
  // status Change Flag From Modal
  const statusChangeFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true && headers) {
      updateStatus();
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
    setShowDetailSection(false);
    setShowEditSection(false);
  };

  function openModal(id, category, outerVarinatObj) {
    // console.log("category: ", category);
    setEditProductId(id);
    if (category == "1") {
      setEditProductCategory("MOBILE");
    } else if (category == "2") {
      setEditProductCategory("TABLET");
    } else if (category == "3") {
      setEditProductCategory("SMARTWATCH");
    } else if (category == "4") {
      setEditProductCategory("ACCESSORY");
    }

    setOuterVarinatObj(outerVarinatObj);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  // stock Change Handler
  const totalStockChangeHandler = (
    value,
    changeType,
    outerIndex,
    innerIndex
  ) => {
    // copy object to new var
    let tempVarObj = outerVarinatObj.map((a) => {
      return { ...a };
    });

    tempVarObj.map((tempOuterObj, outerObjIndex) => {
      // console.log("tempOuterObj: ", outerObjIndex, tempOuterObj.variants);
      if (outerIndex == outerObjIndex) {
        tempOuterObj.variants.map((tempInnerObj, innerObjIndex) => {
          if (innerIndex == innerObjIndex) {
            // console.log("temp2: ", temp2Index, temp2);
            if (changeType == "totalStock") {
              tempInnerObj.totalStock = value;
            } else if (changeType == "sellableStock") {
              tempInnerObj.sellableStock = value;
            }
          }
        });
      }
    });
    setOuterVarinatObj(tempVarObj);
  };

  const updateTotalQtyClick = (innerVariantId, addDeductFlag) => {
    updateTotalQty(innerVariantId, addDeductFlag);
  };

  // updateTotalQty
  function updateTotalQty(innerVariantId, addDeductFlag) {
    let totalStockUpdateAPI = "";
    if (addDeductFlag == "deduct") {
      totalStockUpdateAPI =
        rootPath +
        "/products/updateStock/" +
        editProductId +
        "?variantId=" +
        innerVariantId +
        "&productType=" +
        editProductCategory +
        "&changeQuantity=-" +
        qtyToAddDeduct +
        "&stockType=TOTAL";
    } else if (addDeductFlag == "add") {
      totalStockUpdateAPI =
        rootPath +
        "/products/updateStock/" +
        editProductId +
        "?variantId=" +
        innerVariantId +
        "&productType=" +
        editProductCategory +
        "&changeQuantity=" +
        qtyToAddDeduct +
        "&stockType=TOTAL";
    }

    axios
      .post(totalStockUpdateAPI, {}, headers)
      .then(function (response) {
        console.log("updateTotalQty / response: ", response);
        if (response.status == 200) {
          setQtyToAddDeduct("0");
          alert("Quantity Updated!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 416) {
          alert("Invalid Quantity Input!");
        }
        console.log("updateTotalQty / error: ", error);
      });
  }

  const updateSellableQtyClick = (innerVariantId, addDeductFlag) => {
    updateSellableQty(innerVariantId, addDeductFlag);
  };

  // updateSellableQty
  function updateSellableQty(innerVariantId, addDeductFlag) {
    let sellableStockUpdateAPI = "";
    if (addDeductFlag == "deduct") {
      sellableStockUpdateAPI =
        rootPath +
        "/products/updateStock/" +
        editProductId +
        "?variantId=" +
        innerVariantId +
        "&productType=" +
        editProductCategory +
        "&changeQuantity=-" +
        qtyToAddDeduct +
        "&stockType=SELL";
    } else if (addDeductFlag == "add") {
      sellableStockUpdateAPI =
        rootPath +
        "/products/updateStock/" +
        editProductId +
        "?variantId=" +
        innerVariantId +
        "&productType=" +
        editProductCategory +
        "&changeQuantity=" +
        qtyToAddDeduct +
        "&stockType=SELL";
    }

    axios
      .post(sellableStockUpdateAPI, {}, headers)
      .then(function (response) {
        console.log("updateTotalQty / response: ", response);
        if (response.status == 200) {
          setQtyToAddDeduct("0");
          alert("Quantity Updated!");
        }
      })
      .catch(function (error) {
        if (error.response.status === 416) {
          alert("Invalid Quantity Input!");
        }
        console.log("updateTotalQty / error: ", error);
      });
  }

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
                    "Product Name",
                    "Total Stock",
                    "Sellable Stock",
                    "Brand",
                    "Status",
                    "Actions",
                  ]}
                  tableData={allProducts.map((products) => {
                    console.log("Table / products: ", products);
                    let sellableStock = "";
                    let totalStock = "";
                    products.variants.map((outerVarinats) => {
                      // If product category is Phone / Tab / SW
                      if (products.category != "4") {
                        outerVarinats.variants.map((innerVariants) => {
                          sellableStock =
                            sellableStock + innerVariants.sellableStock + "-";
                          totalStock =
                            totalStock + innerVariants.totalStock + "-";
                        });
                      }
                      // If product category is Accessory
                      else {
                        sellableStock =
                          sellableStock + outerVarinats.sellableStock + "-";
                        totalStock =
                          totalStock + outerVarinats.totalStock + "-";
                      }
                    });

                    sellableStock = sellableStock.slice(0, -1);
                    totalStock = totalStock.slice(0, -1);

                    const { id, title, category, brand, published } = products;
                    let showInUI = "Inactive";
                    if (published === true) {
                      showInUI = "Active";
                    } else {
                      showInUI = "Inactive";
                    }

                    // console.log(products);
                    return [
                      title,
                      totalStock,
                      sellableStock,
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
                          onClick={() =>
                            openModal(id, category, products.variants)
                          }
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

        {/* Stock Update Modal */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* <div>Total Stock: {outerVarinatObj[0].variants[0].totalStock}</div> */}
          {outerVarinatObj[0] !== undefined
            ? [
                outerVarinatObj.map((outerVarinatObj, outerIndex) => (
                  <div key={outerVarinatObj.id}>
                    {console.log("Return/outerVarinatObj: ", outerVarinatObj)}
                    {/* color */}
                    <div style={{ fontWeight: "bold" }}>
                      {outerVarinatObj.color}
                    </div>

                    {editProductCategory !== "ACCESSORY" ? (
                      outerVarinatObj.variants.map(
                        (innerVariants, innerIndex) => (
                          <div key={innerVariants.id}>
                            <div>
                              RAM: {innerVariants.ram}
                              {innerVariants.ramUnit} / ROM: {innerVariants.rom}
                              {innerVariants.romUnit}
                            </div>

                            {/* Total Stock Update  */}
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={5}>
                                <div style={{ marginRight: "10px" }}>
                                  <CustomInput
                                    labelText="Current Total Stock"
                                    id="current-total-stock"
                                    disabled="true"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: "String",
                                      value: innerVariants.totalStock,
                                      maxLength: "100",
                                    }}
                                  />
                                </div>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={5}>
                                <div style={{ marginRight: "10px" }}>
                                  <CustomInput
                                    labelText="Add/Deduct Quantity"
                                    id="total-stock"
                                    disabled="true"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: "String",
                                      value: qtyToAddDeduct,
                                      onChange: (event) =>
                                        setQtyToAddDeduct(event.target.value),
                                      maxLength: "100",
                                    }}
                                  />
                                </div>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={1}>
                                <Button
                                  justIcon
                                  color="rose"
                                  className={classes.updateProfileButton}
                                  onClick={() =>
                                    updateTotalQtyClick(
                                      innerVariants.variantId,
                                      "add"
                                    )
                                  }
                                >
                                  <AddBoxIcon />
                                </Button>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={1}>
                                <Button
                                  justIcon
                                  color="rose"
                                  className={classes.updateProfileButton}
                                  onClick={() =>
                                    updateTotalQtyClick(
                                      innerVariants.variantId,
                                      "deduct"
                                    )
                                  }
                                >
                                  <IndeterminateCheckBoxIcon />
                                </Button>
                              </GridItem>
                            </GridContainer>

                            {/* Sellable Stock Update  */}
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={5}>
                                <div style={{ marginRight: "10px" }}>
                                  <CustomInput
                                    labelText="Current Sellable Stock"
                                    id="current-sellable-stock"
                                    disabled="true"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: "String",
                                      value: innerVariants.sellableStock,
                                      maxLength: "100",
                                    }}
                                  />
                                </div>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={5}>
                                <div style={{ marginRight: "10px" }}>
                                  <CustomInput
                                    labelText="Add/Deduct Quantity"
                                    id="sellable-stock"
                                    disabled="true"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: "String",
                                      value: qtyToAddDeduct,
                                      onChange: (event) =>
                                        setQtyToAddDeduct(event.target.value),
                                      maxLength: "100",
                                    }}
                                  />
                                </div>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={1}>
                                <Button
                                  justIcon
                                  color="rose"
                                  className={classes.updateProfileButton}
                                  onClick={() =>
                                    updateSellableQtyClick(
                                      innerVariants.variantId,
                                      "add"
                                    )
                                  }
                                >
                                  <AddBoxIcon />
                                </Button>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={1}>
                                <Button
                                  justIcon
                                  color="rose"
                                  className={classes.updateProfileButton}
                                  onClick={() =>
                                    updateSellableQtyClick(
                                      innerVariants.variantId,
                                      "deduct"
                                    )
                                  }
                                >
                                  <IndeterminateCheckBoxIcon />
                                </Button>
                              </GridItem>
                            </GridContainer>
                          </div>
                        )
                      )
                    ) : (
                      <div>
                        {/* Total Stock Update  */}
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={5}>
                            <div style={{ marginRight: "10px" }}>
                              <CustomInput
                                labelText="Current Total Stock"
                                id="current-total-stock"
                                disabled="true"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "String",
                                  value: outerVarinatObj.totalStock,
                                  maxLength: "100",
                                }}
                              />
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={5}>
                            <div style={{ marginRight: "10px" }}>
                              <CustomInput
                                labelText="Add/Deduct Quantity"
                                id="total-stock"
                                disabled="true"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "String",
                                  value: qtyToAddDeduct,
                                  onChange: (event) =>
                                    setQtyToAddDeduct(event.target.value),
                                  maxLength: "100",
                                }}
                              />
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={1}>
                            <Button
                              justIcon
                              color="rose"
                              className={classes.updateProfileButton}
                              onClick={() =>
                                updateTotalQtyClick(
                                  outerVarinatObj.variantId,
                                  "add"
                                )
                              }
                            >
                              <AddBoxIcon />
                            </Button>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={1}>
                            <Button
                              justIcon
                              color="rose"
                              className={classes.updateProfileButton}
                              onClick={() =>
                                updateTotalQtyClick(
                                  outerVarinatObj.variantId,
                                  "deduct"
                                )
                              }
                            >
                              <IndeterminateCheckBoxIcon />
                            </Button>
                          </GridItem>
                        </GridContainer>

                        {/* Sellable Stock Update  */}
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={5}>
                            <div style={{ marginRight: "10px" }}>
                              <CustomInput
                                labelText="Current Sellable Stock"
                                id="current-sellable-stock"
                                disabled="true"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "String",
                                  value: outerVarinatObj.sellableStock,
                                  maxLength: "100",
                                }}
                              />
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={5}>
                            <div style={{ marginRight: "10px" }}>
                              <CustomInput
                                labelText="Add/Deduct Quantity"
                                id="sellable-stock"
                                disabled="true"
                                formControlProps={{
                                  fullWidth: true,
                                }}
                                inputProps={{
                                  type: "String",
                                  value: qtyToAddDeduct,
                                  onChange: (event) =>
                                    setQtyToAddDeduct(event.target.value),
                                  maxLength: "100",
                                }}
                              />
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={1}>
                            <Button
                              justIcon
                              color="rose"
                              className={classes.updateProfileButton}
                              onClick={() =>
                                updateSellableQtyClick(
                                  outerVarinatObj.variantId,
                                  "add"
                                )
                              }
                            >
                              <AddBoxIcon />
                            </Button>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={1}>
                            <Button
                              justIcon
                              color="rose"
                              className={classes.updateProfileButton}
                              onClick={() =>
                                updateSellableQtyClick(
                                  outerVarinatObj.variantId,
                                  "deduct"
                                )
                              }
                            >
                              <IndeterminateCheckBoxIcon />
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </div>
                    )}
                    <br />
                  </div>
                )),
              ]
            : null}
          <button onClick={closeModal}>close</button>
        </Modal>

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
              {/* <CardBody>
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
              </CardBody> */}
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
              {/* <CardBody>
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
              </CardBody> */}
            </Card>
          </GridItem>
        ) : null}
      </GridContainer>
    </>
  );
}
