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




function UpdateContacts() {

    const classes = useStyles();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [instagram, setInstagram] = useState('');
    const [whatsApp, setWhatsApp] = useState('');
    const [imo, setImo] = useState('');
    const [others, setOthers] = useState('');

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
                        Ghorwali Contacts - <small>Update Contact Info</small>
                    </h4>
                </CardHeader>
                <CardBody>

                    {/* Phone & Email  */}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Phone Number"
                                id="phone-number"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: phoneNumber || '',
                                    onChange: (event) => setPhoneNumber(event.target.value),
                                    maxLength: "14"

                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Email"
                                id="email"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: email || '',
                                    onChange: (event) => setEmail(event.target.value),
                                    maxLength: "50"

                                }}
                            />
                        </GridItem>
                    </GridContainer>

                    {/* Facebook & Instagram                   */}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="FaceBook Link"
                                id="facebook-link"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: facebookLink || '',
                                    onChange: (event) => setFacebookLink(event.target.value),
                                    maxLength: "500"

                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Instagram"
                                id="instagram"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: instagram || '',
                                    onChange: (event) => setInstagram(event.target.value),
                                    maxLength: "500"

                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    
                    {/* WhatsApp & Imo  */}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="WhatsApp"
                                id="whats-app"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: whatsApp || '',
                                    onChange: (event) => setWhatsApp(event.target.value),
                                    maxLength: "100"

                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                                labelText="Imo"
                                id="imo"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: imo || '',
                                    onChange: (event) => setImo(event.target.value),
                                    maxLength: "100"

                                }}
                            />
                        </GridItem>
                    </GridContainer>
                    
                    {/* Others  */}
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Others"
                                id="others"
                                multiline
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: 'String',
                                    value: others || '',
                                    onChange: (event) => setOthers(event.target.value),
                                    maxLength: "500"

                                }}
                            />
                        </GridItem>
                    </GridContainer>

                    <Button color="rose" className={classes.updateProfileButton} onClick={aboutUpdateHandler}>
                        Update Contacts
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}

export default UpdateContacts;
