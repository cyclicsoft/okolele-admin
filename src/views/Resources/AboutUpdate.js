/*eslint-disable*/
import React, { useState, useEffect } from 'react'

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
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Edit from "@material-ui/icons/Edit";
// SCSS File
import '../../assets/scss/ghorwali-scss/appPrivacy.scss'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(styles);




function AboutUpdate() {

    const classes = useStyles();

    const [aboutGhorwali, setAboutGhorwali] = useState('Lorem Ipsumlkjfgoisj');

    useEffect(() => {
        const ghorwaliAboutUrl = '/multivendorshop/mv/v1/ghorwali/app/about/702';

        // axios.get(ghorwaliAboutUrl)
        //     .then(function (response) {
        //         setAboutGhorwali(response.data.content);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }, []);

    const aboutUpdateHandler = (event) => {
        const ghorwaliAboutUpdateUrl = '/multivendorshop/mv/v1/ghorwali/app/about/6105a5e9e4f3890d41e09929';

        // axios.put(ghorwaliAboutUpdateUrl, aboutGhorwali)
        //     .then(function (response) {

        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        event.preventDefault();
    } 

    return (
        <>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Edit />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                    Update About - <small>Update About Info</small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            {/* <CustomInput
                                labelText="Plan Name"
                                id="plan-name"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: aboutGhorwali,
                                    onChange: (event) => setAboutGhorwali(event.target.value),
                                    maxLength: "2000"

                                }}
                            /> */}

                        <TextField                            
                            label="Multiline Placeholder"
                            id="standard-textarea"
                            placeholder="Placeholder"
                            multiline
                            fullWidth = 'true'
                            inputProps={{
                                type: 'String',
                                value: aboutGhorwali,
                                onChange: (event) => setAboutGhorwali(event.target.value),
                                maxLength: "5000"

                            }}
                        />

                        </GridItem>
                    </GridContainer>

                    <Button color="rose" className={classes.updateProfileButton} onClick={aboutUpdateHandler}>
                        Update About
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}

export default AboutUpdate
