import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import ListIcon from '@material-ui/icons/List';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import avatar from "assets/img/faces/marc.jpg";

import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import CardAvatar from "components/Card/CardAvatar.js";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import Search from "@material-ui/icons/Search";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import AddLocation from "@material-ui/icons/AddLocation";
// react components used to create a google map
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Map from '../../views/GhorwaliMap/Map'
import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"
import "../../assets/scss/ghorwali-scss/search-dropdown.scss"


import axios from "axios";
import ProductPaginationComponent from "views/Pagination/ProductPaginationComponent";

const useStyles = makeStyles(styles);

const getVendorList = () => fetch("/multivendorshop/mv/v1/vendor").then(res => res.json());

export default function VendorProducts() {

    // ############################# Vendor List Data#############################
    const [checked, setChecked] = React.useState([]);
    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;


    // Product Info 
    const [productId, setProductId] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [productRegularPrice, setProductRegularPrice] = useState('');
    const [productFinalPrice, setProductFinalPrice] = useState('');
    const [productImage, setProductImage] = useState(avatar);
    const [productStock, setProductStock] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productRating, setProductrating] = useState('');
    const [productStatus, setProductStatus] = useState('');

    // ############################# Edit Vendor Data #############################
    const [vendorId, setVendorId] = useState('');
    const [vendorDescription, setVendorDescription] = useState('');
    const [profileImage, setprofileImage] = useState(avatar);

    const [totalProductPageNo, setTotalProductPageNo] = useState(1)
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchTypeValue, setSearchTypeValue] = useState('Search By VendorId');

    const [vendorProductList, setVendorProductList] = useState([]);

    // Section visibility flag
    const [ViewProductFlag, setViewProductFlag] = useState(true);
    const [editProductFlag, seteditProductFlag] = useState(true);


    // Get Vendor Product List
    useEffect(() => {
        const pageNo = 1;
        const vendorProductListByPagination = '/multivendorshop/mv/v1/product/getAll?page=' + pageNo + '&size=10';

        axios.get(vendorProductListByPagination)
            .then(function (response) {
                setVendorProductList(response.data.content);
                console.log("Total...: ", response.data.totalElements);
                setTotalProductPageNo(Math.ceil(response.data.totalElements / 10));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // Vendor Product List Pagination Handler 
    const paginationHandlerProduct = (pageNumber) => {

        console.log('pageNumber: ', pageNumber);
        const pageNo = pageNumber - 1;
        const vendorProductListByPagination = '/multivendorshop/mv/v1/product/getAll?page=' + pageNo + '&size=10';

        axios.get(vendorProductListByPagination)
            .then(function (response) {
                setVendorProductList(response.data.content);
                console.log("vendorListByPagination: ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const setSearchType = (event) => {
        console.log('event.target.value', event.target.value);
        setSearchTypeValue(event.target.value);
    }

    const productSearchHanler = (event) => {
        console.log("Search Keyword: ", searchKeyword);

        if (searchTypeValue === 'Search By VendorId') {
            // const vendorById = '/multivendorshop/mv/v1/vendor/by/vendorId/' + searchKeyword;
            // axios.get(vendorById)
            //   .then(function (response) {
            //     setVendorList(response.data);
            //     console.log("Searched Vendor: ", response.data);
            //     //setTotalPageNo(Math.ceil(response.data.totalElements/10));
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
          } if (searchTypeValue === 'Search By ProductId') {
            // const vendorById = '/multivendorshop/mv/v1/vendor/by/name/' + searchKeyword;
            // axios.get(vendorById)
            //   .then(function (response) {
            //     setVendorList(response.data);
            //     console.log("Searched Vendor: ", response.data);
            //     //setTotalPageNo(Math.ceil(response.data.totalElements/10));
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
          }
      
          if (searchTypeValue === '') {
            // const pageNo = 0;
            // const vendorListByPagination = '/multivendorshop/mv/v1/vendor/all/vendors?page=' + pageNo + '&size=10';
      
            // axios.get(vendorListByPagination)
            //   .then(function (response) {
            //     setVendorList(response.data.content);
            //     console.log("Total...: ", response.data.totalElements);
            //     setTotalPageNo(Math.ceil(response.data.totalElements / 10));
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
          }

    }

    const imageUpload = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            localStorage["fileBase64"] = base64;
            //console.debug("file stored", base64);
            setprofileImage(base64)
        });
    }


    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    const viewProductDetails = (event) => {
        setViewProductFlag(true);
        seteditProductFlag(false);

    }

    const editProduct = (event) => {
        setViewProductFlag(false);
        seteditProductFlag(true);
    }

    const productUpdateHandler = (event) => {

    }

    const deleteProduct = (event) => {

    }




    return (
        <>
            <GridContainer>

                {/* ############################# Vendor all Products ############################# */}
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Product List</h4>



                            {/* Search Product by Vendor Id / Product Id */}
                            <div style={{ marginLeft: '45vw', display: 'flex' }}>
                                {/* Searching Type Selector */}
                                <div className="search-dropdown-style">
                                    <select
                                        value={searchTypeValue}
                                        onChange={setSearchType}
                                    >
                                        <option value="Search By VendorId">Search By VendorId</option>
                                        <option value="Search By ProductId">Search By ProductId</option>
                                    </select>
                                </div>
                                {/* Search input field  */}
                                <CustomInput
                                    formControlProps={{
                                        className: classes.top + " " + classes.search
                                    }}
                                    inputProps={{
                                        placeholder: "Search Product",
                                        value: searchKeyword,
                                        onChange: (event) => setSearchKeyword(event.target.value),
                                        type: 'String'
                                    }}
                                />
                                <Button
                                    style={{ marginTop: '5%' }}
                                    color="white"
                                    aria-label="edit"
                                    justIcon
                                    round
                                    className={searchButton}
                                    onClick={() => productSearchHanler()}
                                >
                                    <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                                </Button>
                            </div>

                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHead={[
                                    "#",
                                    "Product Name",
                                    "Price",
                                    "Stock",
                                    "Status",
                                    "Actions"
                                ]}
                                tableData={vendorProductList.map((products) => {
                                    console.log('vendor Product List: ', products);
                                    const { productId, productTitle, regularPrice, stock, productStatus } = products;
                                    return (
                                        [
                                            productId,
                                            productTitle,
                                            regularPrice,
                                            stock,
                                            productStatus,
                                            <div>
                                                <Button style={{ margin: '2px', }}
                                                    round
                                                    color='info'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => viewProductDetails(products.productId)}>
                                                    <Person className={classes.icon} />
                                                </Button>

                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='success'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => editProduct(products.productId)}>
                                                    <Edit className={classes.icon} />
                                                </Button>

                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='danger'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => deleteProduct(products.productId)}>
                                                    <Close className={classes.icon} />
                                                </Button>
                                            </div>

                                        ]
                                    )
                                })}
                                customCellClasses={[classes.center, classes.right, classes.right]}
                                customClassesForCells={[0, 4, 5]}
                                customHeadCellClasses={[
                                    classes.center,
                                    classes.right,
                                    classes.right
                                ]}
                                customHeadClassesForCells={[0, 4, 5]}
                            />
                        </CardBody>

                        <div className="pagination-style">
                            <ProductPaginationComponent paginationHandlerProduct={paginationHandlerProduct} totalProductPageCount={totalProductPageNo} />
                        </div>

                    </Card>

                </GridItem>

            </GridContainer>

            {/* 
      Product Details & 
      Edit Profile
      */}
      <GridContainer>
        {ViewProductFlag ?
          <GridContainer >
            <GridItem xs={12} sm={12} md={6} >
              {/* ############## Vendor Product Details ############## */}
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={productImage} alt="Vendor" />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>Product / Vendor</h6>
                  <h4 className={classes.cardTitle}>Vendor Description: {vendorDescription}</h4>
                  <p className={classes.cardTitle}>Product Title: {productTitle}</p>
                  <p className={classes.cardTitle}>Product Description: {productDescription}</p>
                  <p className={classes.cardTitle}>Product ID: {productId}</p>
                  <p className={classes.cardTitle}>Regular Price: {productRegularPrice}</p>
                  <p className={classes.cardTitle}>productRating: {productStock}</p>
                  <p className={classes.cardTitle}>Stock: {productStock}</p>
                  <p className={classes.cardTitle}>Status: {productStatus}</p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          : null}

        {/* ############################# Edit Product Form ############################# */}
        {editProductFlag ?
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Edit />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Product - <small>Complete Product Info</small>
                </h4>
              </CardHeader>
              <CardBody>

                {/* First Row */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product ID"
                      id="product-id"
                      disabled='true'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: productId,
                        maxLength: "20"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Vendor ID"
                      id="vendor-id"
                      disabled='true'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: vendorId,
                        maxLength: "20"
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Second Row */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Title"
                      id="product-title"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: productTitle,
                        onChange: (event) => setProductTitle(event.target.value)
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Description"
                      id="product-description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: productDescription,
                        onChange: (event) => setProductDescription(event.target.value)
                      }}
                    />
                  </GridItem>
                </GridContainer>
                {/* Third Row */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Price"
                      id="product-price"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: productRegularPrice,
                        onChange: (event) => setProductRegularPrice(event.target.value),
                        maxLength: "20"

                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Stock"
                      id="product-stock"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: productStock,
                        onChange: (event) => setProductStock(event.target.value),
                        maxLength: "10"
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <Button color="rose" style={{ marginLeft: '60.5vw', marginTop: '4vh' }} className={classes.updateProfileButton} onClick={productUpdateHandler}>
                  Update Product
                </Button>
                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
          : null}

      </GridContainer>
        </>
    );
}
