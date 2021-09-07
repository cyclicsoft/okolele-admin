import React, { useState } from "react";
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

// @material-ui/icons
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import CardMembershipIcon from '@material-ui/icons/CardMembership';

//SCSS file
import '../../assets/scss/ghorwali-scss/voucher-list.scss'

import 'date-fns';
import DateValidate from "views/DatePicker/DateValidate";

import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"


// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";

// core components
import ImageUpload from "components/CustomUpload/ImageUpload.js";

// material-ui icons
import Check from "@material-ui/icons/Check";
import PermIdentity from "@material-ui/icons/PermIdentity";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";






const useStyles = makeStyles(styles);

function SubscriptionPlan() {

    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(null);

    const searchButton = classes.top + " " + classes.searchButton;

    // #############################Edit Vendor Data#############################
    const [slideTitle, setslideTitle] = useState('TK 100 Off on first purchase!');
    const [PublishStatus, setPublishStatus] = useState('Active')

    const [PlanName, setPlanName] = useState('');
    const [PlanDescription, setPlanDescription] = useState('');
    const [PlanType, setPlanType] = useState('e.g.:Yearly Plan');
    const [PlanPrice, setPlanPrice] = useState('');
    const [planStatus, setPlanStatus] = useState("Deactive");
    const [PlanDuration, setPlanDuration] = useState('');

    // The first commit of Material-UI
    const [selectedStartDate, setselectedStartDate] = React.useState(new Date('2021-01-01T00:00:54'));
    const [selectedStartTime, setselectedStartTime] = React.useState(new Date('2021-01-01T00:00:54'));
    const [selectedEndDate, setselectedEndDate] = React.useState(new Date('2021-01-01T00:00:54'));
    const [selectedEndTime, setselectedEndTime] = React.useState(new Date('2021-01-01T00:00:54'));

    // Searching
    const [searchKeyword, setSearchKeyword] = useState('')
    const [searchTypeValue, setSearchTypeValue] = useState('Search By Slide Id');

    const userData = [
        {
            id: 1,
            slideTitle: slideTitle,
            selectedStartDate: 'selectedStartDate',
            selectedEndDate: 'selectedEndDate',
            PublishStatus: PublishStatus,
        },
        {
            id: 2,
            slideTitle: slideTitle,
            selectedStartDate: 'selectedStartDate',
            selectedEndDate: 'selectedEndDate',
            PublishStatus: PublishStatus,
        },
    ]

    //Start Date
    const handleStartDate = (date) => {
        setselectedStartDate(date);
        alert(date);
    }
    //Start Time
    const handleStartTime = (date) => {
        setselectedStartTime(date);
        alert(date);
    }
    //End Date
    const handleEndDate = (date) => {
        setselectedEndDate(date);
        alert(date);
    }
    //End Time
    const handleEndTime = (date) => {
        setselectedEndTime(date);
        alert(date);
    }

    const handleChange = event => {
        setSelectedValue(event.target.value);
    };


    const editSlide = (id) => {
        alert(id)
    }
    const deleteSlide = (id) => {
        alert(id)
    }


    const [checked, setChecked] = React.useState([]);
    const handleToggle = value => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };


    return (
        <>
            <GridContainer>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <CardMembershipIcon />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>
                            Subscription Plan - <small>Add / Update Plan</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Plan Name"
                                    id="plan-name"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: 'String',
                                        value: PlanName,
                                        onChange: (event) => setPlanName(event.target.value),
                                        maxLength: "20"

                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Plan Price"
                                    id="plan-price"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: 'number',
                                        value: PlanPrice,
                                        onChange: (event) => setPlanPrice(event.target.value)
                                    }}
                                />
                            </GridItem>
                        </GridContainer>

                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                    labelText="Status"
                                    id="plan-status"
                                    disabled='true'
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: 'String',
                                        value: planStatus,
                                    }}
                                />
                            </GridItem>

                        </GridContainer>
                        <GridContainer>

                        </GridContainer>
                        <Button color="danger" className={classes.updateProfileButton} >
                            Deactivate
                        </Button>
                        <Button color="success" className={classes.updateProfileButton} >
                            Activate
                        </Button>
                        <Button color="info" className={classes.updateProfileButton} >
                            Update
                        </Button>
                    </CardBody>
                </Card>
            </GridContainer>
        </>
    )
}

export default SubscriptionPlan
