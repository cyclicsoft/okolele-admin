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
// SCSS File
import '../../assets/scss/ghorwali-scss/appPrivacy.scss'

const useStyles = makeStyles(styles);




function About() {

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


    return (
        <>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <AcUnitIcon />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                        Ghorwali About - <small>Ghorwali About Info</small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                        <h4 className={classes.cardIconTitle}>
                            {aboutGhorwali}
                        </h4>
                        </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        </>
    )
}

export default About
