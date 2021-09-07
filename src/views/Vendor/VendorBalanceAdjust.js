// VendorBalanceAdjust

import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Search from "@material-ui/icons/Search";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';


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

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
// import { isNamespaceExport } from "typescript";
// react component used to create alerts
import GeneralConfirmation from "views/ConfirmationModals/GeneralConfirmation.js";


const useStyles = makeStyles(styles);


export default function VendorBalanceAdjust() {

    const [checked, setChecked] = React.useState([]);
    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;
    // Logged in admin info 
    const [loggedAdminId, setLoggedAdminId] = useState('');
    // Rider Info 
    const [vendorList, setVendorList] = useState([]);
    const [vendorID, setVendorId] = useState('');
    // Popup Visibility flag 
    const [addOrDeductBtnClicked, setAddOrDeductBtnClicked] = useState(false);
    // Pagination 
    const [totalPageNo, setTotalPageNo] = useState(1);
    const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination
    // Search 
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchTypeValue, setSearchTypeValue] = useState('Search By Name');
    // ############################# Transection Data #############################
    const [ownerId, setOwnerId] = useState('');
    const [userType, setUserType] = useState('');
    const [addAmount, setAddAmount] = useState('0');
    const [deductAmount, setDeductAmount] = useState('0');
    const [previousBalance, setPreviousBalance] = useState('0');
    const [remark, setRemark] = useState('');
    // Transection form visibility flag
    const [addBalanceFlag, setAddBalanceFlag] = useState(false);
    const [reduceBalanceFlag, setReduceBalanceFlag] = useState(false);


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



    // Add button icon handler in Rider List
    // Show transection form for adding balance
    const addBalanceBtn = (id) => {
        setVendorId(id);
        setOwnerId(id);

        const vendorDetailsUrl = '/multivendorshop/mv/v1/admin/app/vendor/' + id;
        axios.get(vendorDetailsUrl)
            .then(function (response) {
                setUserType('Vendor');
                setPreviousBalance(response.data.balance);

            });

        setAddBalanceFlag(true);
        setReduceBalanceFlag(false);
    }
    // Deduct button icon handler in Rider List
    // Show transection form for deducting balance
    const reduceBalanceBtn = (id) => {
        setVendorId(id);
        setOwnerId(id);

        const vendorDetailsUrl = '/multivendorshop/mv/v1/admin/app/vendor/' + id;
        axios.get(vendorDetailsUrl)
            .then(function (response) {
                setUserType('Vendor');
                setPreviousBalance(response.data.balance);

            });

        setAddBalanceFlag(false);
        setReduceBalanceFlag(true);
    }
    // Hide transection form 
    const formCancelButtonHandler = (event) => {
        setAddBalanceFlag(false);
        setReduceBalanceFlag(false);

        event.preventDefault();
    }



    //   Form "Add Balance" button Handler
    const addBalanceHandler = (event) => {
        // open confirmation popup 
        setAddOrDeductBtnClicked(true);

        event.preventDefault();
    }
    //   Form "Deduct Balance" button Handler
    const reduceBalanceHandler = (event) => {
        setAddOrDeductBtnClicked(true);

        event.preventDefault();
    }
    const addBalanceData = {
        "ownerId": vendorID,
        "ownerType": '2',
        "paidAmount": addAmount,
        "acceptedBy": loggedAdminId,
        "remark": remark,
        "status": '1'
    }
    const deductBalanceData = {
        "ownerId": vendorID,
        "ownerType": '2',
        "paidAmount": deductAmount,
        "acceptedBy": loggedAdminId,
        "remark": remark,
        "status": '1'
    }
    // on Modal confirmation button click add or deduct balance 
    const onConfirmation = (flag) => {
        if (flag == true && addBalanceFlag == true) {
            const addBalanceUrl = '/multivendorshop/mv/v1/transection/app/admin/addBalance';
            axios.post(addBalanceUrl, addBalanceData)
                .then(function (response) {
                    console.log('update response: ', response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        } else if (flag == true && reduceBalanceFlag == true) {
            const deductBalanceUrl = '/multivendorshop/mv/v1/transection/app/admin/deductBalance';
            axios.post(deductBalanceUrl, deductBalanceData)
                .then(function (response) {
                    console.log('update response: ', response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    // Hide popup and Transection form 
    const onTransection = (flag) => {
        // open confirmation popup 
        setAddOrDeductBtnClicked(flag);
        // hide the transection form 
        setAddBalanceFlag(flag);
        setReduceBalanceFlag(flag);
    }

    return (
        <>

            {/* ############################# Warning Component Calling ############################# */}
            {addOrDeductBtnClicked ? <GeneralConfirmation generalConfirmationFlag={onConfirmation} onConfirmation={onTransection} /> : null}


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
                                        <option value="Search By Name">Search By Name</option>
                                        <option value="Search By ID">Search By ID</option>
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
                                    // console.log('vendorList: ', user);
                                    const { id, description, phone, email } = user;
                                        return (
                                            [
                                            description,
                                            phone,
                                            email,
                                            <div>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='info'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => addBalanceBtn(user.id)}>
                                                    <AddCircleOutlineIcon className={classes.icon} />
                                                </Button>

                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='rose'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => reduceBalanceBtn(user.id)}>
                                                    <RemoveIcon className={classes.icon} />
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


            {/* ############################# Adjust Vendor Balance ############################# */}
            <GridContainer>

                {/* ########### Add Balance ########### */}
                {addBalanceFlag ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info" icon>
                                <CardIcon color="info">
                                    <AddCircleOutlineIcon />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    Adjust Vendor Balance - <small>Complete Transaction Info</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                 {/* User Id and Type */}
                                 <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="User ID"
                                            id="user-id"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: ownerId || '',
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="User Type"
                                            id="user-type"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: userType || '',
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Previous Balance and Add Amount */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Previous Balance (Taka)"
                                            id="previous-balance"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: previousBalance || '',
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Add Amount (Taka)"
                                            id="add-amount"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: addAmount || '',
                                                onChange: (event) => setAddAmount(event.target.value),
                                                maxLength: "20"

                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Remark */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Remarks"
                                            id="transection-remarks-add"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: remark || '',
                                                onChange: (event) => setRemark(event.target.value),
                                                maxLength: "100"

                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <Button color="rose" style={{ marginLeft: '51vw', marginTop: '4vh' }} className={classes.updateProfileButton} onClick={formCancelButtonHandler}>
                                    Cancel
                                </Button>
                                <Button color="info" style={{ marginTop: '4vh' }} className={classes.updateProfileButton} onClick={addBalanceHandler}>
                                    Add Balance
                                </Button>

                                <Clearfix />
                            </CardBody>
                        </Card>
                    </GridItem>

                    : null}


                {/* ########### Reduce Balance ########### */}
                {reduceBalanceFlag ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="rose" icon>
                                <CardIcon color="rose">
                                    <RemoveIcon />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    Adjust Vendor Balance - <small>Complete Transaction Info</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                 {/* User Id and Type */}
                                 <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="User ID"
                                            id="user-id"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: ownerId || '',
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="User Type"
                                            id="user-type"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: userType || '',
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Previous Balance and Deduct Amount */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Previous Balance (Taka)"
                                            id="previous-balance"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: previousBalance || '',
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Reduce Amount (Taka)"
                                            id="reduce-amount"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: deductAmount || '',
                                                onChange: (event) => setDeductAmount(event.target.value),
                                                maxLength: "20"

                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Remark */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInput
                                            labelText="Remarks"
                                            id="transection-remarks-add"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: remark || '',
                                                onChange: (event) => setRemark(event.target.value),
                                                maxLength: "100"

                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                <Button color="rose" style={{ marginLeft: '50vw', marginTop: '4vh' }} className={classes.updateProfileButton} onClick={formCancelButtonHandler}>
                                    Cancel
                                </Button>
                                <Button color="info" style={{ marginTop: '4vh' }} className={classes.updateProfileButton} onClick={reduceBalanceHandler}>
                                    Reduce Balance
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
