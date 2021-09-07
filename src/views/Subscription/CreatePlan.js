import React, { useState } from 'react'

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import CustomInput from "components/CustomInput/CustomInput.js";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Check from "@material-ui/icons/Check";
import Search from "@material-ui/icons/Search";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import DateValidate from "views/DatePicker/DateValidate";
// SCSS File
import '../../assets/scss/ghorwali-scss/appPrivacy.scss'

const useStyles = makeStyles(styles);




function CreatePlan() {

    const classes = useStyles();

    const [PlanName, setPlanName] = useState('');
    const [PlanDescription, setPlanDescription] = useState('');
    const [PlanType, setPlanType] = useState('e.g.:Yearly Plan');
    const [PlanPrice, setPlanPrice] = useState('');
    const [PlanDuration, setPlanDuration] = useState('');

    return (
        <>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <PermIdentity />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                        Add Plan - <small>Create A New Plan</small>
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

                    <Button color="rose" className={classes.updateProfileButton} >
                        Save Plan
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}

export default CreatePlan
