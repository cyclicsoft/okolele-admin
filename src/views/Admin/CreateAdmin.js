//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component

import React, { useState } from "react";
// @material-ui/core components
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import "../../assets/scss/ghorwali-scss/create-admin.scss"

const useStyles = makeStyles(styles);

export default function AdminManagement() {

    const classes = useStyles();
    const [password, setpassword] = useState('');
    const [ID, setID] = useState("");
    const [CreationLog, setCreationLog] = useState(false);

    const profileCreateHandler = (event) => {
        setCreationLog(true);

        axios.post("/multivendorshop/mv/v1/admin/app/admin/create")
            .then(function (response) {
                console.log(response.data);
                setID(response.data.adminId);
                setpassword(response.data.password);
            })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }


    const clearCredintials = (event) => {
        setCreationLog(false);
    }

    return (
        <>
            {/* ############################# Create Admin############################# */}
            <GridContainer>
                <GridItem xs={12} sm={8} >
                    {/* md={8} */}
                    <Card>
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <PermIdentity />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>
                                Create Admin
                            </h4>
                        </CardHeader>
                        <CardBody >
                            {CreationLog ? null :
                                <Button color="rose" className={classes.updateProfileButton} onClick={profileCreateHandler}>
                                    Create Profile
                                </Button>
                            }
                            <Clearfix />
                            {CreationLog ?
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12} >
                                        <h4 className="create-admin-style">Admin ID: {ID}</h4>
                                        <h4 className="create-admin-style">Admin Password: {password}</h4>
                                        <Button color="rose" className={classes.updateProfileButton} onClick={clearCredintials}>
                                            Clear Credintials
                                        </Button>
                                    </GridItem>
                                </GridContainer>

                                : null}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </>
    );
}
