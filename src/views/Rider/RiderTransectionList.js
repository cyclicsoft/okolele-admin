import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Search from "@material-ui/icons/Search";
import DetailsIcon from '@material-ui/icons/Details';

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
import CardAvatar from "components/Card/CardAvatar.js";


import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"
import "../../assets/scss/ghorwali-scss/search-dropdown.scss"


import axios from "axios";

const useStyles = makeStyles(styles);


export default function RiderTransectionList() {

    // ############################# Vendor List Data#############################
    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;



    // #############################Edit Vendor Data#############################
    const [riderId, setRiderId] = useState('')
    const [name, setName] = useState('');
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setprofileImage] = useState(avatar);
    const [viewTransectionList, setViewTransectionList] = useState(false);
    // const [EditProfile, setEditProfile] = useState(false);
    const [ClickedRowId, setClickedRowId] = useState('');
    const [totalPageNo, setTotalPageNo] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchTypeValue, setSearchTypeValue] = useState('Search By Name');

    const [riderList, setRiderList] = useState([]);
    const [currentOrderList, setCurrentOrderList] = useState([]);

    useEffect(() => {
        const pageNo = 0;
        const riderListByPagination = '/multivendorshop/mv/v1/rider/paginate/all?page=' + pageNo + '&size=10';

        axios.get(riderListByPagination)
            .then(function (response) {
                setRiderList(response.data.content);
                console.log("Total...: ", response.data.totalElements);
                setTotalPageNo(Math.ceil(response.data.totalElements / 10));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);



    // Rider Search Handler
    const riderSearchHanler = (event) => {
        console.log("Search Keyword: ", searchKeyword);
        //alert("vendorSearchHanler");

        if (searchTypeValue === 'Search By ID') {
            const vendorById = '/multivendorshop/mv/v1/vendor/by/vendorId/' + searchKeyword;
            axios.get(vendorById)
                .then(function (response) {
                    setRiderList(response.data);
                    console.log("Searched Vendor: ", response.data);
                    //setTotalPageNo(Math.ceil(response.data.totalElements/10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } if (searchTypeValue === 'Search By Name') {
            const vendorById = '/multivendorshop/mv/v1/vendor/by/name/' + searchKeyword;
            axios.get(vendorById)
                .then(function (response) {
                    setRiderList(response.data);
                    console.log("Searched Vendor: ", response.data);
                    //setTotalPageNo(Math.ceil(response.data.totalElements/10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (searchKeyword === '') {
            const pageNo = 0;
            const vendorListByPagination = '/multivendorshop/mv/v1/vendor/all/vendors?page=' + pageNo + '&size=10';

            axios.get(vendorListByPagination)
                .then(function (response) {
                    setRiderList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    const viewRiderTransactions = (id) => {
        alert(id)
        setRiderId(id);
        // const riderDetailsUrl = '/multivendorshop/mv/v1/vendor/by/vendorId/' + id;
        // axios.get(riderDetailsUrl)
        //   .then(function (response) {
        //     console.log(response.data);
        //     setRiderId(response.data[0].vendorId);
        //     setfName(response.data[0].name.firstName);
        //     setlName(response.data[0].name.lastName);
        //     setemail(response.data[0].email);
        //     setphone(response.data[0].phone);
        //     setAddress(response.data[0].address.area + ', ' + response.data[0].address.city + ', ' + response.data[0].address.region);
        //   });

        setClickedRowId(id);
        setViewTransectionList(true);
        // setEditProfile(false);
    }

    // Pagination handler 
    const paginationHandler = (pageNumber) => {

        console.log('pageNumber: ', pageNumber);
        const pageNo = pageNumber - 1;
        const riderListByPagination = '/multivendorshop/mv/v1/rider/paginate/all?page=' + pageNo + '&size=10';

        axios.get(riderListByPagination)
            .then(function (response) {
                setRiderList(response.data.content);
                console.log("riderListByPagination: ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    const handleSearchType = (event) => {
        console.log('event.target.value', event.target.value);
        setSearchTypeValue(event.target.value);
    }

    return (
        <>
            {/* ############################# Rider List ############################# */}
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Rider List</h4>



                            <div style={{ marginLeft: '45vw', display: 'flex' }}>

                                <div className="search-dropdown-style">
                                    <select
                                        value={searchTypeValue}
                                        onChange={handleSearchType}
                                    >
                                        <option value="Search By Name">Search By Name</option>
                                        <option value="Search By ID">Search By ID</option>
                                    </select>
                                </div>

                                <CustomInput
                                    formControlProps={{
                                        className: classes.top + " " + classes.search
                                    }}
                                    inputProps={{
                                        placeholder: "Search Rider",
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
                                    onClick={() => riderSearchHanler()}
                                >
                                    <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                                </Button>
                            </div>

                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHead={[
                                    "#",
                                    "Name",
                                    "Phone",
                                    "Email",
                                    "Actions"
                                ]}
                                tableData={riderList.map((user) => {
                                    console.log('riderList: ', user);
                                    const { riderId, name, phone, email } = user;
                                    return (
                                        [
                                            riderId,
                                            name,
                                            phone,
                                            email,
                                            // email, 
                                            <div>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='info'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => viewRiderTransactions(riderId)}>
                                                    <DetailsIcon className={classes.icon} />
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
                            <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo} />
                        </div>

                    </Card>

                </GridItem>

            </GridContainer>


            {viewTransectionList ?
                <GridContainer >
                    {/* Rider Transection List  */}
                    <GridItem xs={12} sm={12} md={12}>
                        <Card profile >
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <Assignment />
                                </CardIcon>
                                <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Rider Transection List</h4>
                            </CardHeader>

                            <CardBody>
                                <Table
                                    tableHead={[
                                        "#",
                                        "DateTime",
                                        "Transection Amount",
                                        "Updated Amount",
                                        "Actions"
                                    ]}
                                    tableData={currentOrderList.map((products) => {
                                        console.log('vendor Product List: ', products);
                                        //const { productId, productTitle, regularPrice, stock, productStatus } = products;
                                        return (
                                            [
                                                // productId,
                                                // productTitle,
                                                // regularPrice,
                                                // stock,
                                                // productStatus,
                                                // <div>
                                                //   <Button style={{ margin: '2px', }}
                                                //     round
                                                //     color='info'
                                                //     className={classes.actionButton + " " + classes.actionButtonRound}
                                                //     onClick={() => viewProductDetails(products.productId)}>
                                                //     <Person className={classes.icon} />
                                                //   </Button>

                                                // </div>

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

                            {/* <div className="pagination-style">
                            <ProductPaginationComponent paginationHandlerProduct={paginationHandlerProduct} totalProductPageCount={totalProductPageNo} />
                            </div> */}
                        </Card>
                    </GridItem>

                </GridContainer>
            : null}


        </>
    );
}
