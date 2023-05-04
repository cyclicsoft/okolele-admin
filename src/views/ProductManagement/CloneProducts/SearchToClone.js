/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// core components
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// Loader
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";
// SCSS
import "assets/scss/ghorwali-scss/search-to-clone.scss";

const useStyles = makeStyles(styles);

function SearchToClone(props) {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // Search
  const [productCategory, setProductCategory] = useState(props.productType);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchedProductList, setSearchedProductList] = useState([]);
  const [showSearchedList, setShowSearchedList] = useState(false);
  // Data loader flag
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  // HTTP Respose Code
  const [responseCode, setResponseCode] = useState(200);

  // product Search Hanler
  const productSearchHanler = () => {
    setIsDataLoaded(false);
    const phoneSearchAPI =
      rootPath +
      "/" +
      productCategory +
      "/searchByTitle?keyword=" +
      searchKeyword +
      "&page=0&size=15";

    axios
      .get(phoneSearchAPI)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          console.log(
            "response.data.content.data: ",
            response.data.content.data
          );
          setSearchedProductList(response.data.content.data);
          setShowSearchedList(true);
          setResponseCode(response.status);
        } else {
          setSearchedProductList([]);
          setShowSearchedList(false);
          setResponseCode(response.status);
        }
        setIsDataLoaded(true);
      })
      .catch(function (error) {
        setResponseCode(error.response.status);
        setIsDataLoaded(true);
      });
  };

  const hideSearchedList = () => {
    setShowSearchedList(false);
  };

  const getSelectedProduct = (selectedProduct) => {
    console.log(selectedProduct);
    console.log("selectedProduct.title: ", selectedProduct.title);
    props.getSearchedProduct(selectedProduct);
    setSearchKeyword(selectedProduct.title);
    setShowSearchedList(false);
  };

  return (
    <>
      {/* Data loader */}
      {isDataLoaded == false ? (
        <div
          style={{
            marginLeft: "33vw",
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
      ) : null}

      {/* Search Product to clone*/}
      <div style={{ display: "flex", marginLeft: "50vw" }}>
        {/* Search Product by Name */}
        <div className="search-field">
          <CustomInput
            formControlProps={{
              className: classes.top + " " + classes.search,
            }}
            inputProps={{
              placeholder: "Search by Name to Clone",
              value: searchKeyword,
              onChange: (event) => setSearchKeyword(event.target.value),
              type: "String",
            }}
          />
        </div>

        {/* Search Button */}
        <Button
          style={{ marginTop: "5%" }}
          color="white"
          aria-label="edit"
          justIcon
          round
          //   className={searchButton}
          onClick={() => productSearchHanler()}
        >
          <Search
            className={classes.headerLinksSvg + " " + classes.searchIcon}
          />
        </Button>
      </div>

      {/* Show Searched result as dropdown list */}
      {showSearchedList === true && searchedProductList.length > 0 ? (
        <div>
          <div className="searched-products-container">
            <div className="remover-icon" onClick={hideSearchedList}>
              X
            </div>
            {searchedProductList.map((productList) => (
              <div style={{ display: "flex" }} key={productList.id}>
                <div
                  className="products-container-child"
                  onClick={() => getSelectedProduct(productList)}
                >
                  {productList.title}
                </div>
                <ContentCopyIcon
                  className="clone-icon"
                  onClick={() => getSelectedProduct(productList)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : responseCode !== 200 ? (
        <div style={{ color: "#f50057" }}>
          Oops! Please search something different...
        </div>
      ) : null}
    </>
  );
}

export default SearchToClone;
