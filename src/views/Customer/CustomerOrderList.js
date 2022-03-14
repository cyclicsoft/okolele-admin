import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

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
import Map from '../GhorwaliMap/Map'
import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"
import "../../assets/scss/ghorwali-scss/search-dropdown.scss"


import axios from "axios";

const useStyles = makeStyles(styles);


export default function CustomerOrderList() {

    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;

    const [riderID, setRiderId] = useState('');
    const [name, setName] = useState('');
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setprofileImage] = useState(avatar);
    const [accountNumber, setAccountNumber] = useState('');
    const [rating, setRating] = useState('');
    const [activeStatus, setActiveStatus] = useState('');
    const [ViewProfile, setViewProfile] = useState(false);
    const [EditProfile, setEditProfile] = useState(false);
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
        //console.log(vendorList);
    }, []);

    // handle Search Type
    const handleSearchType = (event) => {
        console.log('event.target.value', event.target.value);
        setSearchTypeValue(event.target.value);
    }

    // Rider Search Handler
    const riderSearchHanler = (event) => {
        console.log("Search Keyword: ", searchKeyword);
        //alert("vendorSearchHanler");

        if (searchTypeValue === 'Search By ID') {
            const riderById = '/multivendorshop/mv/v1/rider/' + searchKeyword;
            axios.get(riderById)
                .then(function (response) {
                    setRiderList(response.data);
                    console.log("Searched Vendor: ", response.data);
                    setTotalPageNo(Math.ceil(response.data.totalElements/10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } if (searchTypeValue === 'Search By Name') {
            const riderByName = '/multivendorshop/mv/v1/rider/by/name/' + searchKeyword;
            axios.get(riderByName)
                .then(function (response) {
                    setRiderList(response.data);
                    console.log("Searched Vendor: ", response.data);
                    setTotalPageNo(Math.ceil(response.data.totalElements/10));
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

    const viewRider = (id) => {
        alert(id)

        const riderDetailsUrl = '/multivendorshop/mv/v1/rider/' + id;
        axios.get(riderDetailsUrl)
          .then(function (response) {
            console.log('riderDetailsUrl: ', response.data);
            setRiderId(response.data.riderId);
            setName(response.data.name);
            setemail(response.data.email);
            setphone(response.data.mobile);
            setAccountNumber(response.data.accountInfos);
            setAddress(response.data.addressInfos);
            setprofileImage(response.data.profileImage);
            setRating(response.data.rating);
            setActiveStatus(response.data.isActive);
          });

        setClickedRowId(id);
        setViewProfile(true);
        setEditProfile(false);
    }

    const editRider = (id) => {
        alert(id)
        
        const riderDetailsUrl = '/multivendorshop/mv/v1/rider/' + id;
        axios.get(riderDetailsUrl)
          .then(function (response) {
            console.log('riderDetailsUrl: ', response.data);
            setRiderId(response.data.riderId);
            setName(response.data.name);
            setemail(response.data.email);
            setphone(response.data.mobile);
            setAccountNumber(response.data.accountInfos);
            setAddress(response.data.addressInfos);
            setprofileImage(response.data.profileImage);
            setRating(response.data.rating);
            setActiveStatus(response.data.isActive);

          });

        setClickedRowId(id);
        setViewProfile(false);
        setEditProfile(true);
    }

    const deleteRider = (id) => {
        alert(id)

        const riderDeleteById = '/multivendorshop/mv/v1/rider/' + id;
        axios.delete(riderDeleteById)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setClickedRowId(id);
        setViewProfile(false);
        setEditProfile(false);
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

      const userData = {
        "id": " ",
        "riderId": " ",
        "name": name,
        "email": email,
        "mobile": phone,
        "accountInfos": '',
        "rating": '',
        "location": '',
        "addressInfos": '',
        "orderHistory": '',
        "profileImage": profileImage,
        "currentOrderList": '',
        "ratingList": '',
        "documents": '',
        "riderDescription": '',
        "isActive": '',
        "createdAt": ''
    }

    const profileUpdateHandler = (id) => {
        alert(id)
        
        const riderUpdateById = '/multivendorshop/mv/v1/rider/' + id;
        axios.put(riderUpdateById, userData)
          .then(function (response) {
            console.log('update response: ', response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });

        //event.preventDefault();
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
                                                    onClick={() => viewRider(riderId)}>
                                                    <Person className={classes.icon} />
                                                </Button>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='success'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => editRider(user.riderId)}>
                                                    <Edit className={classes.icon} />
                                                </Button>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='danger'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => deleteRider(user.riderId)}>
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
                            <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo} />
                        </div>

                    </Card>

                </GridItem>

            </GridContainer>



            <GridContainer>
                {ViewProfile ?
                    <GridContainer >
                        {/* ############## Rider Profile Details ############## */}
                        <GridItem xs={12} sm={12} md={4} >
                            <Card profile style={{ marginLeft: '16px' }}>
                                <CardAvatar profile>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={profileImage} alt="Vendor" />
                                    </a>
                                </CardAvatar>
                                <CardBody profile>
                                    <h6 className={classes.cardCategory}>Rider / GHORWALI</h6>
                                    <p className={classes.cardTitle}>Name: {name} </p>
                                    <p className={classes.cardTitle}>Account No: </p>
                                    <p className={classes.cardTitle}>Rider ID: {riderID}</p>
                                    <p className={classes.cardTitle}>Phone: {phone}</p>
                                    <p className={classes.cardTitle}>Email: {email}</p>
                                </CardBody>
                            </Card>


                        </GridItem>

                        {/* Rider Current Orders  */}
                        <GridItem xs={12} sm={12} md={7} style={{ marginLeft: '10px' }}>
                            <Card profile style={{ width: '49vw' }}>
                                <CardHeader color="rose" icon>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Current Order List</h4>
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

                                                    //   <Button style={{ margin: '2px' }}
                                                    //     round
                                                    //     color='success'
                                                    //     className={classes.actionButton + " " + classes.actionButtonRound}
                                                    //     onClick={() => editProduct(products.productId)}>
                                                    //     <Edit className={classes.icon} />
                                                    //   </Button>

                                                    //   <Button style={{ margin: '2px' }}
                                                    //     round
                                                    //     color='danger'
                                                    //     className={classes.actionButton + " " + classes.actionButtonRound}
                                                    //     onClick={() => deleteProduct(products.productId)}>
                                                    //     <Close className={classes.icon} />
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

                {/* ############################# Rider Profile Edit Form ############################# */}
                {EditProfile ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <PermIdentity />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    Edit Rider Profile - <small>Complete Rider profile</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                {/* First Row */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Profile Picture"
                                            id="profile-picture"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "file",
                                                onChange: (event) => imageUpload(event),
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Rider ID"
                                            id="last-name"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: riderID,
                                                // onChange: (event) => setlName(event.target.value),
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Second ROw */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Name"
                                            id="rider-name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: name,
                                                onChange: (event) => setName(event.target.value),
                                                maxLength: "20"

                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Phone Number"
                                            id="rider-phone"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: phone,
                                                onChange: (event) => setphone(event.target.value),
                                                maxLength: "20"

                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Third Row */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Email address"
                                            id="email-address"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'Email',
                                                value: email,
                                                onChange: (event) => setemail(event.target.value)
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <Button color="rose" style={{ marginLeft: '60.5vw', marginTop: '4vh' }} className={classes.updateProfileButton} onClick={profileUpdateHandler}>
                                    Update Profile
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
