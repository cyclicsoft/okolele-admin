import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Search from "@material-ui/icons/Search";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Remove';
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
import Clearfix from "components/Clearfix/Clearfix.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
// react component used to create alerts
import GeneralConfirmation from "views/ConfirmationModals/GeneralConfirmation.js";

import moment from 'moment';

const useStyles = makeStyles(styles);


export default function Payments() {

    // ############################# Vendor List Data#############################
    const [checked, setChecked] = React.useState([]);
    const classes = useStyles();

    const searchButton = classes.top + " " + classes.searchButton;

    const [loggedAdminId, setLoggedAdminId] = useState('');
    // ############################# Transection Data #############################
    const [pendingTransectionList, setPendingTransectionList] = useState([]);
    const [transectionId, setTransectionId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [userType, setUserType] = useState('');
    const [requestAmount, setRequestAmount] = useState('0');
    const [addAmount, setAddAmount] = useState('0');
    const [previousBalance, setPreviousBalance] = useState('0');
    const [currentBalance, setCurrentBalance] = useState('0');
    const [transectionStatus, setTransectionStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentNumber, setPaymentNumber] = useState('');
    const [requestTime, setRequestTime] = useState('');
    const [remark, setRemark] = useState('');

    const [isAccepted, setIsAccepted] = useState(false);
    const [rejectOrAddBtnClicked, setRejectOrAddBtnClicked] = useState(false);

    const [totalPageNo, setTotalPageNo] = useState(1);
    // const [totalProductPageNo, setTotalProductPageNo] = useState(1)


    // Section visibility flag
    const [showForm, setShowForm] = useState(false);


    useEffect(() => {
        const pageNo = 0;
        const pendingTransections = '/multivendorshop/mv/v1/transection/app/admin/pending?page=' + pageNo + '&size=10';
        axios.get(pendingTransections)
            .then(function (response) {
                setPendingTransectionList(response.data.content);
                setTotalPageNo(Math.ceil(response.data.totalElements / 10));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    // Pagination handler 
    const paginationHandler = (pageNumber) => {
        const pageNo = pageNumber - 1;
        const pendingTransections = '/multivendorshop/mv/v1/transection/app/admin/pending?page=' + pageNo + '&size=10';
        axios.get(pendingTransections)
            .then(function (response) {
                setPendingTransectionList(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    //   adjust Balance Handler
    const getPaymentRequestDetails = (id) => {
        console.log('id: ', id);

        const paymentRequestDetails = '/multivendorshop/mv/v1/transection/app/admin/' + id;
        axios.get(paymentRequestDetails)
            .then(function (response) {
                console.log('Requested Transection Details: ', response.data);
                setTransectionId(response.data.id);
                setOwnerId(response.data.ownerId);
                if (response.data.ownerType == 2) { 
                    setUserType('Vendor');
                }else if (response.data.ownerType == 3) { 
                    setUserType('Rider');
                }else { 
                    setUserType('N/A') 
                }
                setRequestAmount(response.data.amount);
                setPreviousBalance(response.data.previousAmount);
                setAddAmount(response.data.paidAmount);
                setCurrentBalance(response.data.currentBalance);
                setLoggedAdminId(response.data.acceptedBy);
                if(response.data.status == 0){
                    setTransectionStatus('Rejected');
                }else if(response.data.status == 1){
                    setTransectionStatus('Accepted');
                }else if(response.data.status == 2){
                    setTransectionStatus('Pending');
                }
                setPaymentMethod('');
                setPaymentNumber('');
                const convertedDateTime = new Date(response.data.timestamp); 
                setRequestTime(convertedDateTime);
                setRemark(response.data.remark);
            });

            setShowForm(true);
    }


    
    //   adjust Balance Handler
    const addBalanceHandler = (event) => {
        setIsAccepted(true);
        setRejectOrAddBtnClicked(true);

        event.preventDefault();
    }
    //  Reject Transection Request 
    const rejectButtonHandler = (event) => {
        setIsAccepted(false);
        setRejectOrAddBtnClicked(true);

        event.preventDefault();
    }
    const generalConfirmationFlag = (flag) => {
        

        if(flag == true && isAccepted == true){
            const paymentData = {
                "paidAmount": addAmount,
                "acceptedBy": loggedAdminId,
                "remark": remark,
                "status": '1'
            }
            const transectionUpdateById = '/multivendorshop/mv/v1/transection/app/admin/' + transectionId;
            axios.put(transectionUpdateById, paymentData)
            .then(function (response) {
                console.log('update response: ', response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        } else if(flag == true && isAccepted == false){
            const paymentData = {
                "paidAmount": '0',
                "acceptedBy": loggedAdminId,
                "remark": remark,
                "status": '0'
            }
    
            const transectionUpdateById = '/multivendorshop/mv/v1/transection/app/admin/' + transectionId;
            axios.put(transectionUpdateById, paymentData)
            .then(function (response) {
                console.log('update response: ', response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    const onTransection = (flag) => {
        setRejectOrAddBtnClicked(flag);
      }

    const cancelButtonHandler = (event) => {
        setRejectOrAddBtnClicked(false);
        setShowForm(false);

        event.preventDefault();
    }


    return (
        <>

            {/* ############################# Warning Component Calling ############################# */}
            {rejectOrAddBtnClicked ? <GeneralConfirmation generalConfirmationFlag={generalConfirmationFlag} onConfirmation={onTransection} /> : null}

            {/* ############################# Vendor List Table ############################# */}
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Assignment />
                            </CardIcon>
                            <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Current Paymet Requests</h4>

                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHead={[
                                    "#",
                                    "User Type",
                                    "Request Amount",
                                    "Date",
                                    "Status",
                                    "Actions"
                                ]}
                                tableData={pendingTransectionList.map((user) => {
                                    const { id, ownerId, ownerType, amount, timestamp, status } = user; //Here id: transection id
                                    var requestDate = moment(timestamp).format('DD-MM-YYYY')
                                    var userType = '';
                                    var transectionStatus = '';

                                    if (ownerType == 2) { userType = 'Vendor' }
                                    else if (ownerType == 3) { userType = 'Rider' }
                                    else { userType = 'N/A' }

                                    if(status == 0){transectionStatus = 'Rejected'}
                                    else if(status == 1){transectionStatus = 'Accepted'}
                                    else if(status == 2){transectionStatus = 'Pending'}

                                    return (
                                        [
                                            ownerId,
                                            userType,
                                            amount,
                                            requestDate,
                                            transectionStatus,
                                            <div>
                                                <Button style={{ margin: '2px' }}
                                                    round
                                                    color='info'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => getPaymentRequestDetails(id)}>
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


            {/* ############################# Adjust Balance ############################# */}
            {/* ############################# Adjust Rider Balance ############################# */}
            <GridContainer>

                {/* ########### Add Balance ########### */}
                {showForm ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="info" icon>
                                <CardIcon color="info">
                                    <AddCircleOutlineIcon />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>
                                    Adjust Rider Balance - <small>Complete Transaction Info</small>
                                </h4>
                            </CardHeader>
                            <CardBody>

                                {/* Transection ID & requestTime */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Transection ID"
                                            id="transection-id"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: transectionId || '',
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Request Time"
                                            id="request-time"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: requestTime || '',
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

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
                                
                                {/* Payment Method & Payment Number */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Payment Method"
                                            id="payment-method"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: paymentMethod || '',
                                                maxLength: "20"
                                            }}
                                        />
                                    </GridItem>

                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Payment Number"
                                            id="requpaymentest-number"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: paymentNumber || '',
                                            }}
                                        />
                                    </GridItem>
                                </GridContainer>

                                {/* Requested Amount & Status */}
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Requested Amount"
                                            id="requested-amount"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: requestAmount || '',
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <CustomInput
                                            labelText="Transection Status"
                                            id="transection-status"
                                            disabled='true'
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: 'String',
                                                value: transectionStatus || '',
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

                                <Button color="rose" style={{ marginLeft: '44vw', marginTop: '4vh' }} className={classes.updateProfileButton} onClick={cancelButtonHandler}>
                                    Cancel
                                </Button>
                                <Button color="success" style={{ marginTop: '4vh' }} className={classes.updateProfileButton} onClick={rejectButtonHandler}>
                                    Reject
                                </Button>
                                <Button color="info" style={{ marginTop: '4vh' }} className={classes.updateProfileButton} onClick={addBalanceHandler}>
                                    Add Balance
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
