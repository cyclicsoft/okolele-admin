//index->App->Admin->Sidebar->AdminProfile
//Ghorwali Component

import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import avatar from "assets/img/faces/marc.jpg";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

// react components used to create a google map
//import GhorwaliMapComp from '../GhorwaliMap/GhorwaliMapComp'
import Map from '../../views/GhorwaliMap/Map'

import axios from "axios";

const useStyles = makeStyles(styles);

export default function CreateVendor() {

  const classes = useStyles();



  //Profile Data Handler
  const [vendordescription, setvendordescription] = useState(' ')
  const [fName, setfName] = useState(' ');
  const [lName, setlName] = useState(' ');
  const [phone, setphone] = useState(' ')
  const [email, setemail] = useState(' ');
  const [vendorAddress, setvendorAddress] = useState('');
  const [vendorAddressLat, setvendorAddressLat] = useState('');
  const [vendorAddressLng, setvendorAddressLng] = useState('');
  const [profileImage, setprofileImage] = useState(avatar);


  const getAddress = (vendorAddress) => {
    console.log('vendorAddress ', vendorAddress)
    setvendorAddress(vendorAddress)
  }
  const getLatitude = (vendorAddressLat) => {
    console.log('vendorAddressLat ', vendorAddressLat)
    setvendorAddressLat(vendorAddressLat)
  }
  const getLongitude = (vendorAddressLng) => {
    console.log('vendorAddressLng ', vendorAddressLng)
    setvendorAddressLng(vendorAddressLng)
  }

  const onPlaceChanged = (event) => {
    setvendorAddress(event.target.value)
  }


  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored", base64);
      setprofileImage(base64)
    });
  }


  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }


  const vendorData = {
    "vendorId": "",
    "name": {
      "firstName": fName, 
      "lastName": lName
    },
    "email": email,
    "phone": phone,
    "account": { 
      "accountNumber": " ", 
      "balance": " " 
    },
    "rating": " ",
    "location": { 
      "latitude": vendorAddressLat, 
      "longitude": vendorAddressLng 
    },
    "address": { 
      "region": " ", 
      "city": " ", 
      "area": " ", 
      "phone": " ", 
      "addressLine": " " 
    },
    "description": vendordescription,
    "productCatalog": [
      { 
        "title": " ", 
        "index": " " 
      }
    ],
    "orderHistory": [
      " "
    ],
    "profileImage": profileImage,
    "currentOrderList": [
      " "
    ],
    "ratingList": [
      { 
        "comment": " ", 
        "ratedBy": " ", 
        "value": " " 
      }
    ],
    "isActiveVendor": false,
    "isStoreOpen": false
  }

  const addVendorHandler = (event) => {
    axios.post('/multivendorshop/mv/v1/vendor/save', vendorData)
      .then(function (response) {
        console.log("response: ", response);
      })
      .catch(function (error) {
        console.log("error response: ", error.response);
        console.log("error message: ", error.message);
        console.log("error request: ", error.request);
      });

    //console.log('userData ', userData);

    alert('profileUpdateHandler')

    event.preventDefault();
  }


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} >
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Vendor Profile - <small>Complete Vendor profile</small>
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Vendor Description"
                    id="vendor-description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: vendordescription,
                      onChange: (event) => setvendordescription(event.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Profile Picture"
                    id="profile-picture"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "file",
                      onChange: (event) => imageUpload(event),
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: fName,
                      onChange: (event) => setfName(event.target.value),
                      maxLength: "20"

                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: lName,
                      onChange: (event) => setlName(event.target.value),
                      maxLength: "20"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone number"
                    id="phone-number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'Phone',
                      value: phone,
                      onChange: (event) => setphone(event.target.value),
                      maxLength: "14",
                      minLength: "11"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'Email',
                      value: email,
                      onChange: (event) => setemail(event.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Vendor Address"
                    id="vendor-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: vendorAddress,
                      onChange: onPlaceChanged
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Map center={{ lat: 23.8103, lng: 90.4125 }} height='300px' getAddress={getAddress} getLatitude={getLatitude} getLongitude={getLongitude} />
                </GridItem>
              </GridContainer>
              <Button color="rose" className={classes.updateProfileButton} onClick={addVendorHandler}>
                Save Profile
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
