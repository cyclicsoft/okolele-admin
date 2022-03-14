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
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"
import "../../assets/scss/ghorwali-scss/search-dropdown.scss"
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";


import axios from "axios";

const useStyles = makeStyles(styles);


export default function CustomerList() {

    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;

    const [customerID, setCustomerId] = useState('');
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setprofileImage] = useState(avatar);
    // const [accountNumber, setAccountNumber] = useState('');
    // const [rating, setRating] = useState('');
    // const [activeStatus, setActiveStatus] = useState('');
    const [ViewProfile, setViewProfile] = useState(false);
    const [EditProfile, setEditProfile] = useState(false);
    const [ClickedRowId, setClickedRowId] = useState('');
    const [totalPageNo, setTotalPageNo] = useState(1);

    const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination
    // Search 
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchTypeValue, setSearchTypeValue] = useState('No Select');

    const [customerList, setCustomerList] = useState([]);
    const [currentOrderList, setCurrentOrderList] = useState([]);
    // Rider Delete 
    const [deleteUrl, setDeleteUrl] = useState('');
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
    // Rider Update 
    const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

    useEffect(() => {
        const pageNo = 0;

        const customerListByPagination = '/multivendorshop/mv/v1/customer/app/admin?page=' + pageNo + '&size=5';
        axios.get(customerListByPagination)
            .then(function (response) {
                setCustomerList(response.data.content);
                console.log("Total...: ", response.data.totalElements);
                setTotalPageNo(Math.ceil(response.data.totalElements / 5));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    // Pagination handler 
    const paginationHandler = (pageNumber) => {
        console.log('pageNumber: ', pageNumber);
        const pageNo = pageNumber - 1;

        const customerListByPagination = '/multivendorshop/mv/v1/customer/app/admin?page=' + pageNo + '&size=5';
        axios.get(customerListByPagination)
            .then(function (response) {
                setCustomerList(response.data.content);
                // console.log("Total...: ", response.data.totalElements);
            })
            .catch(function (error) {
                console.log(error);
            });

    }




    // handle Search Type
    const handleSearchType = (event) => {
        //Normal pagination component will be hide and Search pagination will be rendered
        if(event.target.value == 'No Select'){
            setUserNormalRender(true);
        }else if(event.target.value == 'Search By Name' || event.target.value == 'Search By Phone'){
            setUserNormalRender(false);
        }

        console.log('event.target.value', event.target.value);
        setSearchTypeValue(event.target.value);
    }
    // Rider Search Handler
    const customerSearchHanler = (event) => {
        const pageNo = 0;
    
        if (searchTypeValue === 'Search By Phone') {
            const riderByPhone = '/multivendorshop/mv/v1/customer/app/admin/byPhone/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByPhone)
                .then(function (response) {
                    setCustomerList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } 
        else if (searchTypeValue === 'Search By Name') {
            const riderByName = '/multivendorshop/mv/v1/customer/app/admin/byName/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByName)
                .then(function (response) {
                    setCustomerList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } 
        else if(searchTypeValue === 'No Select'){
            const customerListByPagination = '/multivendorshop/mv/v1/customer/app/admin?page=' + pageNo + '&size=5';
            axios.get(customerListByPagination)
                .then(function (response) {
                    setCustomerList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 5));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    // Search Pagination handler 
    const searchPaginationHandler = (pageNumber) => {

        console.log('---------Called from searchPaginationHandler----------');
        const pageNo = pageNumber - 1;

        if (searchTypeValue === 'Search By Phone') {
            const riderByPhone = '/multivendorshop/mv/v1/customer/app/admin/byPhone/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByPhone)
            .then(function (response) {
                setCustomerList(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });

        } 
        else if (searchTypeValue === 'Search By Name') {
            const riderByName = '/multivendorshop/mv/v1/customer/app/admin/byName/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByName)
            .then(function (response) {
                setCustomerList(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });

        } 

        
    }



    const viewCustomer = (id) => {
        alert(id)
        // Customer Details 
        const customerDetailsUrl = '/multivendorshop/mv/v1/customer/app/admin/' + id;
        axios.get(customerDetailsUrl)
            .then(function (response) {
                console.log('customerDetailsUrl: ', response.data);
                setCustomerId(response.data.id);
                setName(response.data.name);
                setemail(response.data.email);
                setphone(response.data.phone);
                setAddress(response.data.address);
                if (response.data.image != null) {
                    setprofileImage(response.data.image);
                } else {
                    setprofileImage(avatar);
                }

            });

        setViewProfile(true);
        setEditProfile(false);
    }



    const editCustomer = (id) => {
        alert(id)

        const customerDetailsUrl = '/multivendorshop/mv/v1/customer/app/admin/' + id;
        axios.get(customerDetailsUrl)
            .then(function (response) {
                console.log('customerDetailsUrl: ', response.data);
                setCustomerId(response.data.id);
                setName(response.data.name);
                setemail(response.data.email);
                setphone(response.data.phone);
                setAddress(response.data.address);
                if (response.data.image != null) {
                    setprofileImage(response.data.image);
                } else {
                    setprofileImage(avatar);
                }

            });

        setViewProfile(false);
        setEditProfile(true);
    }
    const profileUpdateHandler = (event) => {
        setUpdateBtnClicked(true);
        event.preventDefault();
    }
    const userData = {
        "name": name,
        "email": email,
        "image": profileImage,
    }
    // update Confirmation Flag 
    const updateConfirmationFlag = (flag) => {
        if (flag == true) {
            const customerUpdateById = '/multivendorshop/mv/v1/customer/app/admin/' + customerID;
            axios.put(customerUpdateById, userData)
                .then(function (response) {
                    console.log('update response: ', response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }
    // onUpdateChangeFlag 
    const onUpdateChangeFlag = (flag) => {
        setUpdateBtnClicked(flag);
    }





    const deleteCustomer = (id) => {
        alert(id)

        const riderDeleteById = '/multivendorshop/mv/v1/customer/app/admin/' + id;
        setDeleteUrl(riderDeleteById);

        setDeleteBtnClicked(true);

        // setClickedRowId(id);
        setViewProfile(false);
        setEditProfile(false);
    }
    // onDeleteChangeFlag 
    const onDeleteChangeFlag = (flag) => {
        setDeleteBtnClicked(flag);
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







    return (
        <>
            {/* ############################# Warning Component Calling ############################# */}
            {updateBtnClicked ? <UpdateWarning updateConfirmationFlag={updateConfirmationFlag} onUpdateChangeFlag={onUpdateChangeFlag} /> : null}
            {deleteBtnClicked ? <DeleteWarning deleteUrl={deleteUrl} onDeleteChangeFlag={onDeleteChangeFlag} /> : null}


            {/* ############################# Rider List ############################# */}
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Customer List</h4>



                            <div style={{ marginLeft: '45vw', display: 'flex' }}>

                                <div className="search-dropdown-style">
                                    <select
                                        value={searchTypeValue}
                                        onChange={handleSearchType}
                                    >
                                        <option value="No Select">No Select</option>
                                        <option value="Search By Name">Search By Name</option>
                                        <option value="Search By Phone">Search By Phone</option>
                                    </select>
                                </div>

                                <CustomInput
                                    formControlProps={{
                                        className: classes.top + " " + classes.search
                                    }}
                                    inputProps={{
                                        placeholder: "Search Customer",
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
                                    onClick={() => customerSearchHanler()}
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
                                tableData={customerList.map((user) => {
                                    console.log('customerList: ', user);
                                    const { id, name, phone, email } = user;
                                    return (
                                        [
                                            id,
                                            name,
                                            phone,
                                            email,
                                            <div>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='info'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => viewCustomer(user.id)}>
                                                    <Person className={classes.icon} />
                                                </Button>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='success'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => editCustomer(user.id)}>
                                                    <Edit className={classes.icon} />
                                                </Button>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='danger'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => deleteCustomer(user.id)}>
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
                            { userNormalRender ? <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo} />:
                            <SearchPaginationComponent paginationHandler={searchPaginationHandler} totalCount={totalPageNo} />
                            }
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
                                        <img src={profileImage} alt="Customer" />
                                    </a>
                                </CardAvatar>
                                <CardBody profile>
                                    <h6 className={classes.cardCategory}>Customer / GHORWALI</h6>
                                    <p className={classes.cardTitle}>Name: {name} </p>
                                    <p className={classes.cardTitle}>Customer ID: {customerID}</p>
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
                                            "Customer Phone",
                                            "Vendor Phone",
                                            "Order Price",
                                            "Actions"
                                        ]}
                                        tableData={currentOrderList.map((products) => {
                                            console.log('Customer Product List: ', products);
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
                                    Edit Customer Profile - <small>Complete Customer profile</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                {/* Profile picture and ID */}
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
                                            labelText="Customer ID"
                                            id="last-name"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: customerID || '',
                                                // onChange: (event) => setlName(event.target.value),
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Name and Phone */}
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
                                                value: name || '',
                                                onChange: (event) => setName(event.target.value),
                                                maxLength: "20"

                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Phone Number"
                                            id="rider-phone"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: phone || '',
                                                // onChange: (event) => setphone(event.target.value),
                                                // maxLength: "20"

                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Email */}
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
                                                value: email || '',
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
