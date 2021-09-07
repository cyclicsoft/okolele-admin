//index->App->Admin->Sidebar->AdminProfile
//Ghorwali Component

import React, {useState} from "react";
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
import CardAvatar from "components/Card/CardAvatar.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

import avatar from "assets/img/faces/marc.jpg";

const useStyles = makeStyles(styles);

export default function SponsorVendor() {
  const classes = useStyles();
  
  const [vendordescription, setvendordescription] = useState(' ')
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState(' ');
  const [phone, setphone] = useState(' ')
  const [email, setemail] = useState(' ');
  const [vendorAddress, setvendorAddress] = useState(' ');
  const [profileImage, setprofileImage] = useState(' ');


  const imageUpload = (e) => {
      // const file = e.target.files[0];
      // getBase64(file).then(base64 => {
      //   localStorage["fileBase64"] = base64;
      //   console.debug("file stored",base64);
      // });
  }


  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const profileUpdateHandler = (event) => {
    // const userData = {
    //   fName: {fName},
    //   setlName: {setlName},
    //   phone: {phone},
    //   email: {email},
    // }
    // console.log(userData);

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
                    labelText="Vendor Description"
                    id="vendor-description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      onChange: (event) => setvendordescription(event.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Vendor Address"
                    id="vendor-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      onChange: (event) => setvendorAddress(event.target.value)
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
                      onChange: (event) => setemail(event.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button color="rose" className={classes.updateProfileButton} onClick={profileUpdateHandler}>
                Save Profile
              </Button>
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="Vendor" />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>Vendor / GHORWALI</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
