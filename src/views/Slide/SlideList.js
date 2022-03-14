import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import defaultAvatar from "assets/img/placeholder.jpg";

// @material-ui/icons
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

//SCSS file
import '../../assets/scss/ghorwali-scss/voucher-list.scss'

import 'date-fns';
import DateValidate from "views/DatePicker/DateValidate";

import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"


// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";

// core components
import ImageUpload from "components/CustomUpload/ImageUpload.js";

// material-ui icons
import Check from "@material-ui/icons/Check";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";

import moment from 'moment';

//Date
import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";


const useStyles = makeStyles(styles);

function SlideList() {

    const classes = useStyles();
    // const [selectedValue, setSelectedValue] = React.useState(null);

    const searchButton = classes.top + " " + classes.searchButton;


    const [slideList, setSlideList] = useState([]);
    const [slideId, setSlideId] = useState('');
    const [activeStatus, setActiveStatus] = useState('');
    const [slideImage, setSlideImage] = useState('');

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    // The first commit of Material-UI
    const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
    const [selectedStartTime, setselectedStartTime] = React.useState(new Date());
    const [selectedEndDate, setselectedEndDate] = React.useState(new Date());
    const [selectedEndTime, setselectedEndTime] = React.useState(new Date());

    const [totalPageNo, setTotalPageNo] = useState(1);

    const [userNormalRender, setUserNormalRender] = useState(true); // true for normal pagination, false for search pagination
    // Search 
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchTypeValue, setSearchTypeValue] = useState('No Select');

    // Voucher Delete 
    const [deleteUrl, setDeleteUrl] = useState('');
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
    // Voucher Update 
    const [updateBtnClicked, setUpdateBtnClicked] = useState(false);


    useEffect(() => {
        console.log('---------Called from useEffect----------');
        const pageNo = 0;
        const slideListByPagination = '/multivendorshop/mv/v1/slide/app/admin?page=' + pageNo + '&size=10';

        axios.get(slideListByPagination)
            .then(function (response) {
                setSlideList(response.data.content);
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
        const slideListByPagination = '/multivendorshop/mv/v1/slide/app/admin?page=' + pageNo + '&size=10';

        axios.get(slideListByPagination)
            .then(function (response) {
                setSlideList(response.data.content);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    useEffect(() => {
        toTimeStamp();
    }, [selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime]);



    //Start Date
    const handleStartDateChange = (date) => {
        console.log(date)
        setselectedStartDate(date);
    }
    //Start Time
    const handleStartTimeChange = (date) => {
        setselectedStartTime(date);
    }
    //End Date
    const handleEndDateChange = (date) => {
        console.log(date)
        setselectedEndDate(date);
    }
    //End Time
    const handleEndTimeChange = (date) => {
        setselectedEndTime(date);
    }


    // set img received from ImageUpload.js
    const handleImageSelect = (selectedImageInBase64) => {
        console.log('handleSubmit from create Slide component', selectedImageInBase64)
        setSlideImage(selectedImageInBase64);
    };




    // Retriving the record to be updated 
    const editSlide = (id) => {
        alert(id)
        const slideDetailsUrl = '/multivendorshop/mv/v1/slide/app/admin/' + id;
        axios.get(slideDetailsUrl)
            .then(function (response) {
                console.log(response.data)
                setSlideId(response.data.sliderId);
                setSlideImage(response.data.image);

                const convertedStartDate = timeStampToDate(response.data.startDate);
                setselectedStartDate(convertedStartDate);
                setselectedStartTime(convertedStartDate);

                const convertedEndDate = timeStampToDate(response.data.endDate);
                setselectedEndDate(convertedEndDate);
                setselectedEndTime(convertedEndDate);

                if (response.data.active) {
                    setActiveStatus('Active');
                } else {
                    setActiveStatus('Inactive');
                }
            });
    }
    const timeStampToDate = (timeStamp) => {
        const convertedDateTime = new Date(timeStamp); // Unix timestamp to date time
        // const convertedDateTime = new Date(timeStamp * 1000);  // normal timestamp to date time 
        console.log('Unix time stamp converted to date: ', convertedDateTime);

        return convertedDateTime;
    }
    // For update button click
    const slideUpdateHandler = (event) => {
        setUpdateBtnClicked(true);

        event.preventDefault();
    }
    // Record data to be updated 
    const slideData = {
        "image": slideImage,
        "startDate": startDateTime,
        "endDate": endDateTime
    }
    // update record if Flag receives 'true'
    const updateConfirmationFlag = (flag) => {

        if (flag == true) {
            if (selectedStartDate.getTime() <= selectedEndDate.getTime()) {
                if (selectedStartDate.getTime() === selectedEndDate.getTime()) {
                    if (selectedStartTime.getTime() < selectedEndTime.getTime()) {
                        toTimeStamp();

                        console.log('slideData: ', slideData);
                        const slideUpdateUrl = '/multivendorshop/mv/v1/slide/app/admin/' + slideId;
                        axios.put(slideUpdateUrl, slideData)
                            .then(function (response) {
                                console.log('update response: ', response);
                            })
                            .catch(function (error) {
                                console.log('error: ', error);
                            });
                    } else {
                        alert("End Time must be greater than Start Time")
                    }
                } else {
                    toTimeStamp();

                    console.log('slideData: ', slideData);
                    const slideUpdateUrl = '/multivendorshop/mv/v1/slide/app/admin/' + slideId;
                    axios.put(slideUpdateUrl, slideData)
                        .then(function (response) {
                            console.log('update response: ', response);
                        })
                        .catch(function (error) {
                            console.log('error: ', error);
                        });
                }

            }
            else {
                alert("End Date must be greater than Start Date")
            }
        }
    }
    // onUpdate Change Flag 
    const onUpdateChangeFlag = (flag) => {
        setUpdateBtnClicked(flag);
    }



    // Record delete handler 
    const deleteSlide = (id) => {
        alert(id)
        const slideDeleteById = '/multivendorshop/mv/v1/slide/app/admin/' + id;
        setDeleteUrl(slideDeleteById);

        setDeleteBtnClicked(true);
    }
    // on Delete close the warning popup 
    const onDeleteChangeFlag = (flag) => {
        setDeleteBtnClicked(flag);
    }



    // slide Deactivate Handler 
    const slideDeactivateHandler = () => {
        const slideDeactivateUrl = '/multivendorshop/mv/v1/slide/app/admin/status/' + slideId + '?status=false';
        axios.put(slideDeactivateUrl)
            .then(function (response) {
                console.log('update response: ', response);
            })
            .catch(function (error) {
                console.log('error: ', error);
            });
    }
    // slide Activate Handler 
    const slideActivateHandler = () => {
        const slideActivateUrl = '/multivendorshop/mv/v1/slide/app/admin/status/' + slideId + '?status=true';
        axios.put(slideActivateUrl)
            .then(function (response) {
                console.log('update response: ', response);
            })
            .catch(function (error) {
                console.log('error: ', error);
            });
    }



    // handle Search Type
    const handleSearchType = (event) => {
        //Normal pagination component will be hide and Search pagination will be rendered
        if (event.target.value === 'No Select') {
            setUserNormalRender(true);
        } else if (event.target.value === 'Search By Slide ID') {
            setUserNormalRender(false);
        }
        // Searching type will be set here 
        console.log('event.target.value', event.target.value);
        setSearchTypeValue(event.target.value);
    }
    // Voucher Search Handler
    const slideSearchHanler = (event) => {
        console.log("searchTypeValue...: ", searchTypeValue);
        console.log("searchKeyword...: ", searchKeyword);
        const pageNo = 0;

        if (searchTypeValue === 'Search By Slide ID') {
            const slideSearchUrl = '/multivendorshop/mv/v1/slide/app/admin/byslide/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(slideSearchUrl)
                .then(function (response) {
                    setSlideList(response.data.content);
                    console.log("Total...: ", response.data);
                    setTotalPageNo(Math.ceil(response.data.totalElements / 10));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else if (searchTypeValue === 'No Select') {
            const slideListByPagination = '/multivendorshop/mv/v1/slide/app/admin?page=' + pageNo + '&size=10';

            axios.get(slideListByPagination)
                .then(function (response) {
                    setSlideList(response.data.content);
                    console.log("Total...: ", response.data.totalElements);
                    // console.log("Total Page: ", Math.ceil(response.data.totalElements / 10));
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

        if (searchTypeValue === 'Search By Slide ID') {
            const slideSearchUrl = '/multivendorshop/mv/v1/slide/app/admin/byslide/' + searchKeyword + '?page=' + pageNo + '&size=10';
            axios.get(slideSearchUrl)
                .then(function (response) {
                    setSlideList(response.data.content);
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }



    // Convert to TimeStamp
    const toTimeStamp = () => {
        // start date time 
        const startDate = splitDate(selectedStartDate);
        console.log('selectedStartDate: ', selectedStartDate);
        const startTime = splitTime(selectedStartTime);
        const startDT = startDate + ' ' + startTime;
        const startDtStamp = new Date(startDT).valueOf(); // converting to unix timestamp
        // const startDtStamp = Date.parse(startDT) / 1000; // converting to normal timestamp
        console.log('startDtStamp: ', startDT);
        setStartDateTime(startDtStamp);

        // end date time
        const endtDate = splitDate(selectedEndDate);
        const endTime = splitTime(selectedEndTime);
        const endDT = endtDate + ' ' + endTime;
        const endDtStamp = new Date(endDT).valueOf(); // converting to unix timestamp
        // const endDtStamp = Date.parse(endDT) / 1000; // converting to normal timestamp
        console.log('endDtStamp: ', endDtStamp);
        setEndDateTime(endDtStamp);
    }
    // split Date 
    const splitDate = (x) => {
        const temp = new Date(x.getTime() - (x.getTimezoneOffset() * 60000)).toJSON();
        const splitedDate = JSON.stringify(temp).slice(1, 11);
        console.log('temp: ', splitedDate);
        return splitedDate;
    }
    // split Time 
    const splitTime = (x) => {
        let hoursDiff = x.getHours();
        let minutesDiff = x.getMinutes();
        let secondDiff = x.getSeconds();
        console.log(hoursDiff + ':' + minutesDiff + ':' + secondDiff);
        return hoursDiff + ':' + minutesDiff + ':' + secondDiff;
    }


    return (
        <>

            {/* ############################# Warning Component Calling ############################# */}
            {updateBtnClicked ? <UpdateWarning updateConfirmationFlag={updateConfirmationFlag} onUpdateChangeFlag={onUpdateChangeFlag} /> : null}
            {deleteBtnClicked ? <DeleteWarning deleteUrl={deleteUrl} onDeleteChangeFlag={onDeleteChangeFlag} /> : null}


            {/* ############################# Slide List Table############################# */}
            <GridContainer>
                <GridItem xs={12}>
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
                                        <option value="Search By Slide ID">Search By Slide ID</option>
                                    </select>
                                </div>

                                <CustomInput
                                    formControlProps={{
                                        className: classes.top + " " + classes.search
                                    }}
                                    inputProps={{
                                        placeholder: "Search Slide",
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
                                    onClick={() => slideSearchHanler()}
                                >
                                    <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                                </Button>
                            </div>

                        </CardHeader>

                        <CardBody>
                            <Table
                                tableHead={[
                                    "#",
                                    "Start Date",
                                    "End Date",
                                    "Status",
                                    "Actions"
                                ]}
                                tableData={slideList.map((user) => {
                                    const { sliderId, startDate, endDate, active } = user;

                                    var activeStatus;
                                    var startDateTime = moment(startDate).format('DD-MM-YYYY')
                                    var endDateTime = moment(endDate).format('DD-MM-YYYY')

                                    if (!active || active == null) { activeStatus = "Inactive" }
                                    else { activeStatus = "Active" }

                                    return (
                                        [
                                            sliderId,
                                            startDateTime,
                                            endDateTime,
                                            activeStatus,
                                            <div>
                                                <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                                                    round
                                                    color='success'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => editSlide(sliderId)}>
                                                    <Edit className={classes.icon} />
                                                </Button>
                                                <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                                                    round
                                                    color='danger'
                                                    className={classes.actionButton + " " + classes.actionButtonRound}
                                                    onClick={() => deleteSlide(sliderId)}>
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
                            {userNormalRender ? <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo} /> :
                                <SearchPaginationComponent paginationHandler={searchPaginationHandler} totalCount={totalPageNo} />
                            }
                        </div>

                    </Card>
                </GridItem>

            </GridContainer>


            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            {slideImage ?
                                <GridContainer style={{ marginBottom: '50px' }}>
                                    <GridItem xs={12} md={4} >
                                        <legend>Preview Slide</legend>
                                        <div className={"thumbnail" + (defaultAvatar ? " img-circle" : "")}>
                                            <img style={{ height: '300px' }} src={slideImage} alt="..." />
                                        </div>
                                    </GridItem>
                                </GridContainer> :
                                null
                            }
                            <GridContainer>
                                {/* ########################## Slide Image Selector ########################## */}
                                <GridItem xs={12} sm={4} md={4}>
                                    <legend>Pick Slider Image</legend>
                                    <ImageUpload
                                        addButtonProps={{
                                            color: "rose",
                                            round: true,
                                        }}
                                        changeButtonProps={{
                                            color: "rose",
                                            round: true,
                                        }}
                                        removeButtonProps={{
                                            color: "danger",
                                            round: true
                                        }}
                                        handleSubmit={handleImageSelect}
                                    />
                                </GridItem>

                                {/* ########################## Id, Status and Date ########################## */}
                                <GridItem xs={12} sm={4} md={8}>
                                    <CustomInput
                                        labelText="Slide Id"
                                        id="slide-id"
                                        disabled='true'
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: 'String',
                                            value: slideId || ''
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Status"
                                        id="status"
                                        disabled='true'
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: 'String',
                                            value: activeStatus || '',
                                        }}
                                    />

                                    {/* Date and Time  */}
                                    <GridContainer>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Start Date"
                                                    format="MM/dd/yyyy"
                                                    value={selectedStartDate}
                                                    onChange={handleStartDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Time picker"
                                                    value={selectedStartTime}
                                                    onChange={handleStartTimeChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />

                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="End Date"
                                                    format="MM/dd/yyyy"
                                                    value={selectedEndDate}
                                                    onChange={handleEndDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <KeyboardTimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    label="Time picker"
                                                    value={selectedEndTime}
                                                    onChange={handleEndTimeChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>

                                    </GridContainer>

                                </GridItem>

                                <Button style={{ marginLeft: '1vw' }} color="danger" className={classes.updateProfileButton} onClick={slideDeactivateHandler}>
                                    Deactivate
                                </Button>
                                <Button style={{ marginLeft: '3px' }} color="success" className={classes.updateProfileButton} onClick={slideActivateHandler}>
                                    Activate
                                </Button>
                                <Button style={{ marginLeft: '3px' }} color="info" className={classes.updateProfileButton} onClick={slideUpdateHandler}>
                                    Update
                                </Button>
                            
                            </GridContainer>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>

        </>
    )
}

export default SlideList
