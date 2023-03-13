/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";

import ImageUpload from "components/CustomUpload/ImageUpload.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Check from "@material-ui/icons/Check";
import Search from "@material-ui/icons/Search";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import DateValidate from "views/DatePicker/DateValidate";




const useStyles = makeStyles(styles);

export default function CreateSlide(props) {

    // const [selectedValue, setSelectedValue] = React.useState(null);
    const classes = useStyles();

    const [slideImage, setSlideImage] = useState('');

    // The first commit of Material-UI
    const [selectedStartDate, setselectedStartDate] = React.useState(new Date());
    const [selectedStartTime, setselectedStartTime] = React.useState(new Date());
    const [selectedEndDate, setselectedEndDate] = React.useState(new Date());
    const [selectedEndTime, setselectedEndTime] = React.useState(new Date());

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    useEffect(() => {
        toTimeStamp();
    }, [selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime]);



    const handleImageSelect = (selectedImageInBase64) => {
        console.log('handleSubmit from create Slide component', selectedImageInBase64)
        setSlideImage(selectedImageInBase64);
    };



    //Start Date
    const handleStartDate = (date) => {
        setselectedStartDate(date);
    }
    //Start Time
    const handleStartTime = (date) => {
        setselectedStartTime(date);
    }
    //End Date
    const handleEndDate = (date) => {
        setselectedEndDate(date);
    }
    //End Time
    const handleEndTime = (date) => {
        setselectedEndTime(date);
    }



    const slideData = {
        "image": slideImage,
        "startDate": startDateTime,
        "endDate": endDateTime
    }
    const saveSlideHandler = (event) => {
        if (selectedStartDate.getTime() <= selectedEndDate.getTime()) {
            if (selectedStartDate.getTime() === selectedEndDate.getTime()) {
                if (selectedStartTime.getTime() < selectedEndTime.getTime()) {
                    toTimeStamp();

                    console.log('slideData: ', slideData);
                    const slideCreateUrl = '/multivendorshop/mv/v1/slide/app/admin';
                    axios.post(slideCreateUrl, slideData)
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
                const slideCreateUrl = '/multivendorshop/mv/v1/slide/app/admin';
                axios.post(slideCreateUrl, slideData)
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
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            <GridContainer>
                                {/* ########################## Slide Image Selector ########################## */}
                                <GridItem xs={12} sm={4} md={4}>
                                    <legend>Pick Slider Image</legend>
                                    <ImageUpload
                                        addButtonProps={{
                                            // type: "file",
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

                                {/* ########################## Date Picker ########################## */}
                                <GridItem xs={12} sm={4} md={8}>
                                    <DateValidate
                                        handleStartDate={handleStartDate}
                                        handleStartTime={handleStartTime}
                                        handleEndDate={handleEndDate}
                                        handleEndTime={handleEndTime}
                                    />

                                </GridItem>

                                <Button style={{ marginLeft: '68vw' }} color="rose" className={classes.updateProfileButton} onClick={saveSlideHandler}>
                                    Save
                                </Button>
                            </GridContainer>

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
