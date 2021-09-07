import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Search from "@material-ui/icons/Search";


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

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

// react components used to create a google map
import Map from '../../views/GhorwaliMap/Map';
import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";
import ActivationWarning from "views/ConfirmationModals/ActivationWarning";



const useStyles = makeStyles(styles);

export default function VendorList() {

  // ############################# Vendor List Data#############################
  const [checked, setChecked] = React.useState([]);
  const classes = useStyles();

  const searchButton = classes.top + " " + classes.searchButton;



  // ############################# Vendor Data #############################
  const [id, setId] = useState('')
  const [name, setName] = useState('');
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('');
  const [vendorAddress, setvendorAddress] = useState('');
  const [profileImage, setprofileImage] = useState(avatar);
  const [vendorAddressLat, setvendorAddressLat] = useState('');
  const [vendorAddressLng, setvendorAddressLng] = useState('');
  const [vendorAccountNo, setVendorAccountNo] = useState('');
  const [vendorDescription, setVendorDescription] = useState('');

  const [ClickedRowId, setClickedRowId] = useState('');
  // Page Size Handler 
  const [totalPageNo, setTotalPageNo] = useState(1);
  const [totalProductPageNo, setTotalProductPageNo] = useState(1);

  const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination
  // Search Handler 
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchTypeValue, setSearchTypeValue] = useState('No Select');

  const [vendorList, setVendorList] = useState([]);
  const [vendorProductList, setVendorProductList] = useState([]);
  const [currentOrderList, setCurrentOrderList] = useState([]);
  const [vendorDetails, setVendorDetails] = useState({});
  // Section visibility flag
  const [ViewProfile, setViewProfile] = useState(false);
  const [EditProfile, setEditProfile] = useState(false);
  // Vendor Delete 
  const [deleteUrl, setDeleteUrl] = useState('');
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
  // Status Update 
  const [statusChangeBtnClicked, setStatusChangeBtnClicked] = useState(false);
  const [updateUrl, setUpdateUrl] = useState('');
  // Vendor Update 
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);


  useEffect(() => {
    const pageNo = 0;
    const vendorListByPagination = '/multivendorshop/mv/v1/vendor/app/admin?page=' + pageNo + '&size=10';

    axios.get(vendorListByPagination)
      .then(function (response) {
        setVendorList(response.data.content);
        console.log("Total...: ", response.data.totalElements);
        setTotalPageNo(Math.ceil(response.data.totalElements / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // Pagination handler 
  const paginationHandler = (pageNumber) => {
    const pageNo = pageNumber - 1;
    const vendorListByPagination = '/multivendorshop/mv/v1/vendor/app/admin?page=' + pageNo + '&size=10';
    axios.get(vendorListByPagination)
      .then(function (response) {
        setVendorList(response.data.content);
        console.log("vendorListByPagination: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  // ################# get Address #################
  const getAddress = (vendorAddress) => {
    //console.log('vendorAddress ', vendorAddress)
    setvendorAddress(vendorAddress)
  }
  // ################# get Latitude #################
  const getLatitude = (vendorAddressLat) => {
    //console.log('vendorAddressLat ', vendorAddressLat)
    setvendorAddressLat(vendorAddressLat)
  }
  // ################# get Longitude #################
  const getLongitude = (vendorAddressLng) => {
    //console.log('vendorAddressLng ', vendorAddressLng)
    setvendorAddressLng(vendorAddressLng)
  }



    // handle Search Type
    const handleSearchType = (event) => {
      //Normal pagination component will be hide and Search pagination will be rendered
      if(event.target.value == 'No Select'){
          setUserNormalRender(true);
      }else if(event.target.value == 'Search By Description' || event.target.value == 'Search By Phone'){
          setUserNormalRender(false);
      }

      console.log('event.target.value', event.target.value);
      setSearchTypeValue(event.target.value);
  }
  // ################# vendor Search Hanler #################
  const vendorSearchHanler = (event) => {
        const pageNo = 0;

        if (searchTypeValue === 'Search By Phone') {
            const riderByPhone = '/multivendorshop/mv/v1/rider/app/admin/byPhone/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByPhone)
                .then(function (response) {
                  setVendorList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } 
        else if (searchTypeValue === 'Search By Description') {
            const riderByName = '/multivendorshop/mv/v1/rider/app/admin/byName/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(riderByName)
                .then(function (response) {
                  setVendorList(response.data.content);
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
                  setVendorList(response.data.content);
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
            setVendorList(response.data.content);
          })
          .catch(function (error) {
              console.log(error);
          });

      } 
      else if (searchTypeValue === 'Search By Description') {
          const riderByName = '/multivendorshop/mv/v1/rider/app/admin/byName/' + searchKeyword + '?page=' + pageNo + '&size=10';
          axios.get(riderByName)
          .then(function (response) {
            setVendorList(response.data.content);
          })
          .catch(function (error) {
              console.log(error);
          });

      } 

      
  }



  // ################# Show  vendor Details #################
  const viewVendor = (id) => {
    // Vendor Details
    const vendorDetailsUrl = '/multivendorshop/mv/v1/admin/app/vendor/' + id;
    axios.get(vendorDetailsUrl)
      .then(function (response) {
        console.log(response.data);
        setId(response.data.id);
        setemail(response.data.email);
        setphone(response.data.phone);
        setvendorAddress(response.data.address);
        setVendorAccountNo(response.data.accountNo);
        setVendorDescription(response.data.description);
      });

    setViewProfile(true);
    setEditProfile(false);
  }



  // update Confirmation Flag 
  const updateConfirmationFlag = (flag) => {

    if (flag == true) {
      const vendorUpdateById = '/multivendorshop/mv/v1/admin/app/vendor/' + id;
      axios.put(vendorUpdateById, userData)
        .then(function (response) {
          console.log('update response: ', response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }


  }
  // onDeleteChangeFlag 
  const onUpdateChangeFlag = (flag) => {
    setUpdateBtnClicked(flag);
  }
  const userData = {
    "address":vendorAddress,
    "name":name,
    "description":vendorDescription,
    "email":email,
    "img":profileImage,
    "mobile":phone,
    // "serviceHour":"12pm",
    // "title":"nothing",
    // "accountNo":"888888888"
  }
  const profileUpdateHandler = (event) => {
    // alert('profileUpdateHandler')
    setUpdateBtnClicked(true);

    event.preventDefault();
  }
  // ################# Edit Vendor #################
  const editVendor = (id) => {
    const vendorDetailsUrl = '/multivendorshop/mv/v1/admin/app/vendor/' + id;
    axios.get(vendorDetailsUrl)
      .then(function (response) {
        console.log(response.data);
        setId(response.data.id);
        setemail(response.data.email);
        setphone(response.data.phone);
        setvendorAddress(response.data.address);
        setVendorAccountNo(response.data.accountNo);
        setVendorDescription(response.data.description);
      });

    setViewProfile(false);
    setEditProfile(true);
  }



  const deleteVendor = (id) => {
    alert(id)

    const vendorDeleteById = '/multivendorshop/mv/v1/vendor/app/admin/' + id;
    setDeleteUrl(vendorDeleteById);

    setDeleteBtnClicked(true);

    // setClickedRowId(id);
    setViewProfile(false);
    setEditProfile(false);
  }
  // onDeleteChangeFlag 
  const onDeleteChangeFlag = (flag) => {
    setDeleteBtnClicked(flag);
  }


  const activateDeactivateVendor = (event) => {
    const status = event.currentTarget.value;
    console.log('status: ', status);
    const vendorStatusUpdateUrl = '/multivendorshop/mv/v1/vendor/app/admin/status/' + id + '?statusByAdmin=' + status;
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

      {/* ############################# Vendor List Table ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Vendor List</h4>



              <div style={{ marginLeft: '45vw', display: 'flex' }}>

                <div className="search-dropdown-style">
                  <select
                    value={searchTypeValue}
                    onChange={handleSearchType}
                  >
                    <option value="No Select">No Select</option>
                    <option value="Search By Description">Search By Description</option>
                    <option value="Search By Phone">Search By Phone</option>
                  </select>
                </div>

                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Search Vendor",
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
                  onClick={() => vendorSearchHanler()}
                >
                  <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                </Button>
              </div>

            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Vendor Description",
                  "Phone",
                  "Email",
                  "Actions"
                ]}
                tableData={vendorList.map((user) => {
                  console.log('vendorList: ', user);
                  const { id, description, phone, email } = user;
                  return (
                    [
                      description,
                      phone,
                      email,
                      <div>
                        <Button style={{ margin: '2px', }}
                          round
                          color='info'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => viewVendor(id)}>
                          <Person className={classes.icon} />
                        </Button>

                        <Button style={{ margin: '2px' }}
                          round
                          color='success'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => editVendor(id)}>
                          <Edit className={classes.icon} />
                        </Button>

                        <Button style={{ margin: '2px' }}
                          round
                          color='danger'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => deleteVendor(id)}>
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

      {/* 
      Vendor Profile Details & 
      Current Orders & 
      Edit Profile
      */}
      <GridContainer>
        {ViewProfile ?
          <GridContainer >

            {/* ############## Vendor Profile Details ############## */}
            <GridItem xs={12} sm={12} md={4} style={{ marginLeft: '15px' }}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={profileImage} alt="Vendor" />
                  </a>
                </CardAvatar>
                
                <CardBody profile>
                  <h6 className={classes.cardCategory}>Vendor / GHORWALI</h6>
                  <h4 className={classes.cardTitle}>Vendor Description: {vendorDescription}</h4>
                  <p className={classes.cardTitle}>Name: {name}</p>
                  <p className={classes.cardTitle}>Account No: {vendorAccountNo}</p>
                  <p className={classes.cardTitle}>Vendor ID: {id}</p>
                  <p className={classes.cardTitle}>Vendor Address: {vendorAddress}</p>
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


            {/* ############## Vender Current Orders List ############## */}
            <GridItem xs={12} sm={12} md={7} style={{ marginLeft: '5px' }}>
              <Card style={{ width: '49vw' }}>
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


        {/* ############################# Vendor Profile Edit Form ############################# */}
        {EditProfile ?
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <Edit />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Vendor Profile - <small>Complete Vendor profile</small>
                </h4>
              </CardHeader>
              <CardBody>

                {/* Profile Image and Id  */}
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
                      labelText="Vendor ID"
                      id="last-name"
                      disabled='true'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: id || '',
                        // onChange: (event) => setlName(event.target.value),
                        maxLength: "20"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                
                {/* Description and Account No  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Vendor Description"
                      id="vendor-description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: vendorDescription || '',
                        onChange: (event) => setVendorDescription(event.target.value),
                        maxLength: "30"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Account No"
                      id="account-no"
                      disabled='true'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: vendorAccountNo || '',
                      }}
                    />
                  </GridItem>
                </GridContainer>
                
                {/* Phone and Email  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone number"
                      id="phone-number"
                      disabled='true'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'Phone',
                        value: phone || '',
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
                
                {/* Address  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Vendor Address"
                      id="vendor-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: vendorAddress || '',
                        onChange: (event) => setvendorAddress(event.target.value)
                      }}
                    />
                  </GridItem>
                </GridContainer>
                
                {/* Lat and Lang  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <Map center={{ lat: 23.8103, lng: 90.4125 }} height='300px' getAddress={getAddress} getLatitude={getLatitude} getLongitude={getLongitude} />
                    </Card>

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
