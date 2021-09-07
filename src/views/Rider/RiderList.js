import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Map from '../../views/GhorwaliMap/Map'
import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";
import "../../assets/scss/ghorwali-scss/paginations.scss"
import "../../assets/scss/ghorwali-scss/search-dropdown.scss"
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";
import ActivationWarning from "views/ConfirmationModals/ActivationWarning";



const useStyles = makeStyles(styles);

export default function RiderList() {

    // ############################# Vendor List Data#############################
    const [checked, setChecked] = React.useState([]);
    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;



    // #############################Edit Vendor Data#############################
    // const [vendordescription, setvendordescription] = useState('Sultans Dine')
    const [riderID, setRiderId] = useState('');
    const [name, setName] = useState('');
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setprofileImage] = useState(avatar);
    const [accountNumber, setAccountNumber] = useState('');
    const [rating, setRating] = useState('');
    // const [addressLat, setAddressLat] = useState('');
    // const [addressLng, setAddressLng] = useState('');
    const [activeStatus, setActiveStatus] = useState('');
    const [ViewProfile, setViewProfile] = useState(false);
    const [EditProfile, setEditProfile] = useState(false);

    const [totalPageNo, setTotalPageNo] = useState(1);

    const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination
    // Search 
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchTypeValue, setSearchTypeValue] = useState('No Select');

    const [riderList, setRiderList] = useState([]);
    // const [riderDetails, setRiderDetails] = useState({});
    const [currentOrderList, setCurrentOrderList] = useState([]);
    // Rider Delete 
    const [deleteUrl, setDeleteUrl] = useState('');
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
    // Status Update 
    const [statusChangeBtnClicked, setStatusChangeBtnClicked] = useState(false);
    const [updateUrl, setUpdateUrl] = useState('');
    // Rider Update 
    const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

   

    useEffect(() => {
        console.log('---------Called from useEffect----------');
        const pageNo = 0;
        const riderListByPagination = '/multivendorshop/mv/v1/rider/app/admin?page=' + pageNo + '&size=10';

        axios.get(riderListByPagination)
            .then(function (response) {
                setRiderList(response.data.content);
                console.log("Total...: ", response.data.totalElements);
                // console.log("Total Page: ", Math.ceil(response.data.totalElements / 10));
                setTotalPageNo(Math.ceil(response.data.totalElements / 10));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    // Pagination handler 
    const paginationHandler = (pageNumber) => {
        console.log('---------Called from paginationHandler----------');
        const pageNo = pageNumber - 1;
        const riderListByPagination = '/multivendorshop/mv/v1/rider/app/admin?page=' + pageNo + '&size=10';

        axios.get(riderListByPagination)
            .then(function (response) {
                setRiderList(response.data.content);
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
    const riderSearchHanler = (event) => {
        const pageNo = 0;

        if (searchTypeValue === 'Search By Phone') {
            const riderByPhone = '/multivendorshop/mv/v1/rider/app/admin/byPhone/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByPhone)
                .then(function (response) {
                    setRiderList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } 
        else if (searchTypeValue === 'Search By Name') {
            const riderByName = '/multivendorshop/mv/v1/rider/app/admin/byName/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByName)
                .then(function (response) {
                    setRiderList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } 
        else if(searchTypeValue === 'No Select'){
            const riderListByPagination = '/multivendorshop/mv/v1/rider/app/admin?page=' + pageNo + '&size=10';

            axios.get(riderListByPagination)
                .then(function (response) {
                    setRiderList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    console.log("Total Page: ", Math.ceil(response.data.totalElements / 10));
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
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
            const riderByPhone = '/multivendorshop/mv/v1/rider/app/admin/byPhone/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByPhone)
            .then(function (response) {
                setRiderList(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });

        } 
        else if (searchTypeValue === 'Search By Name') {
            const riderByName = '/multivendorshop/mv/v1/rider/app/admin/byName/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByName)
            .then(function (response) {
                setRiderList(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });

        } 

        
    }




    const viewRider = (id) => {
        alert(id)
        console.log('---------Called from viewRider----------');
        const riderDetailsUrl = '/multivendorshop/mv/v1/rider/app/admin/' + id;
        axios.get(riderDetailsUrl)
            .then(function (response) {
                console.log('riderDetails-------------: ', response.data);
                setRiderId(response.data.id);
                setName(response.data.name);
                setemail(response.data.email);
                setphone(response.data.phone);
                setAccountNumber(response.data.accountNo);
                setAddress(response.data.address);
                if (response.data.profileImage != null) {
                    setprofileImage(response.data.profileImage);
                } else {
                    setprofileImage(avatar);
                }

            });

        setViewProfile(true);
        setEditProfile(false);
    }


    // Retriving the record to be updated 
    const editRider = (id) => {
        alert(id)

        const riderDetailsUrl = '/multivendorshop/mv/v1/rider/app/admin/' + id;
        axios.get(riderDetailsUrl)
            .then(function (response) {
                console.log('riderDetailsUrl: ', response.data);
                setRiderId(response.data.id);
                setName(response.data.name);
                setemail(response.data.email);
                setphone(response.data.phone);
                setAccountNumber(response.data.accountNo);
                setAddress(response.data.address);
                if (response.data.profileImage != null) {
                    setprofileImage(response.data.profileImage);
                } else {
                    setprofileImage(avatar);
                }

            });

        //setClickedRowId(id);
        setViewProfile(false);
        setEditProfile(true);
    }
    // For update button click set 
    const profileUpdateHandler = (event) => {
        setUpdateBtnClicked(true);

        event.preventDefault();
    }
    // Record data to be updated 
    const userData = {
        "name": name,
        "email": email,
        "image": profileImage,
        "address": address,
    }
    // update record if Flag receives 'true'
    const updateConfirmationFlag = (flag) => {

        if (flag == true) {
            const riderUpdateById = '/multivendorshop/mv/v1/rider/app/admin/' + riderID;
            axios.put(riderUpdateById, userData)
                .then(function (response) {
                    console.log('update response: ', response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        }


    }
    // // onUpdate Change Flag 
    const onUpdateChangeFlag = (flag) => {
        setUpdateBtnClicked(flag);
    }


    // Record delete handler
    const deleteRider = (id) => {
        alert(id)

        const riderDeleteById = '/multivendorshop/mv/v1/rider/app/admin/' + id;
        setDeleteUrl(riderDeleteById);

        setDeleteBtnClicked(true);

        setViewProfile(false);
        setEditProfile(false);
    }
    // on Delete close the warning popup 
    const onDeleteChangeFlag = (flag) => {
        setDeleteBtnClicked(flag);
    }


    const activateDeactivateVendor = (event) => {
        const status = event.currentTarget.value;
        console.log('status: ', status);
        const vendorStatusUpdateUrl = '/multivendorshop/mv/v1/vendor/app/admin/status/' + riderID + '?statusByAdmin=' + status;
        setUpdateUrl(vendorStatusUpdateUrl);
        setStatusChangeBtnClicked(true);
    
    }
    // on Update Change Flag 
    const onStatusUpdateChangeFlag = (flag) => {
    setStatusChangeBtnClicked(flag);
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
            {statusChangeBtnClicked ? <ActivationWarning updateUrl={updateUrl} onStatusUpdateChangeFlag={onStatusUpdateChangeFlag} /> : null}


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
                                    //console.log('riderList: ', user);
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
                                                    onClick={() => viewRider(user.id)}>
                                                    <Person className={classes.icon} />
                                                </Button>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='success'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => editRider(user.id)}>
                                                    <Edit className={classes.icon} />
                                                </Button>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='danger'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => deleteRider(user.id)}>
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
                                        <img src={profileImage} alt="Rider" />
                                    </a>
                                </CardAvatar>
                                <CardBody profile>
                                    <h6 className={classes.cardCategory}>Rider / GHORWALI</h6>
                                    <p className={classes.cardTitle}>Name: {name} </p>
                                    <p className={classes.cardTitle}>Account No: </p>
                                    <p className={classes.cardTitle}>Rider ID: {riderID}</p>
                                    <p className={classes.cardTitle}>Phone: {phone}</p>
                                    <p className={classes.cardTitle}>Email: {email}</p>

                                    <Button color="rose" style={{ marginLeft: '1vw', marginTop: '4vh' }} className={classes.updateProfileButton} 
                                        value='false' onClick={activateDeactivateVendor} >Deactivate
                                    </Button>
                                    <Button color="info" style={{ marginLeft: '1vw', marginTop: '4vh' }} className={classes.updateProfileButton} 
                                        value='true' onClick={activateDeactivateVendor} >Activate
                                    </Button>
                
                                </CardBody>
                            </Card>


                        </GridItem>

                        {/* ############## Rider Current Orders ############## */}
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

                                {/* Profile Image and ID */}
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
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Name and Email */}
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

                                {/* Address */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Address"
                                            id="email-address"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: address,
                                                onChange: (event) => setAddress(event.target.value)
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