//index->App->Admin->Sidebar->AdminProfile
//Ghorwali Component

import React, { useState, useEffect } from "react";
// Axios
import axios from "axios";
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
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";

const useStyles = makeStyles(styles);

export default function AdminProfile() {
  const classes = useStyles();

  const [profileImage, setprofileImage] = useState(avatar);
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [adminId, setAdminId] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [activeStatus, setActiveStatus] = useState(false);

  // Admin Update 
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

  useEffect(() => {
    const logedinAdminId = 'ad1015';
    const logedinAdminById = '/multivendorshop/mv/v1/admin/app/admin/' + logedinAdminId;
    axios.get(logedinAdminById)
      .then(function (response) {
        // console.log('Admin Details: ', response.data);
        setName(response.data[0].adminName);
        setphone(response.data[0].adminMobile);
        setemail(response.data[0].adminEmail);
        setAdminId(response.data[0].adminId);
        setpassword(response.data[0].password);
        setconfirmPassword(response.data[0].password);
        if(response.data[0].profileImage != null){
          setprofileImage(response.data[0].profileImage);
        }else{
          setprofileImage(avatar);
        }
        // setActiveStatus(response.data[0].disabled);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);


  
  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      // console.debug("file stored", base64);
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


// ############# Data to update profile #############
const userInfo = 
{
  "adminName":name,
    "adminPhone": phone,
    "adminEmail":email,
    "adminProfileImage": profileImage,
    "adminPassword":password
}
// ############# update Confirmation Flag #############
const updateConfirmationFlag = (flag) => {
  if(password === confirmPassword && flag == true){
    // console.log('test: ', userInfo)
    const adminUpdateByIdUrl = '/multivendorshop/mv/v1/admin/app/admin/' + adminId;
    axios.put(adminUpdateByIdUrl, userInfo)
      .then(function(response){
        console.log(response)
    });
  }

}
// ############# onDeleteChangeFlag #############
const onUpdateChangeFlag = (flag) => {
  setUpdateBtnClicked(flag);
}
// ############# Update Admin Info #############
const profileUpdateHandler = (event) => {
  setUpdateBtnClicked(true);

  event.preventDefault();
}


  return (
    <div>
       {/* ############################# Warning Component Calling ############################# */}
       {updateBtnClicked ? <UpdateWarning updateConfirmationFlag={updateConfirmationFlag} onUpdateChangeFlag={onUpdateChangeFlag}/> : null }

      <GridContainer>

        {/* ############# Profile Details ############# */}
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={profileImage} alt="Admin" />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>ADMIN / GHORWALI</h6>
              <h4 className={classes.cardTitle}>{name}</h4>
              <p>ID: {adminId}</p>
              <p>Phone: {phone}</p>
              <p>Email: {email}</p>
            </CardBody>
          </Card>
        </GridItem>

        {/* ############# Edit Profile ############# */}
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <PermIdentity />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Edit Profile - <small>Complete your profile</small>
              </h4>
            </CardHeader>
            <CardBody>

              {/* Name and Image input  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'String',
                      value: name || '',
                      onChange: (event) => setName(event.target.value),
                      maxLength: "20"

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
              
              {/* Phone and email input  */}
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
                      value: phone || '',
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
                      value: email || '',
                      onChange: (event) => setemail(event.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              {/* password input  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Set Password"
                    id="set-password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'password',
                      value: password || '',
                      onChange: (event) => setpassword(event.target.value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="confirm-password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: 'password',
                      value: confirmPassword || '',
                      onChange: (event) => setconfirmPassword(event.target.value)
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              <Button color="rose" className={classes.updateProfileButton} onClick={profileUpdateHandler}>
                Update Profile
              </Button>
              
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}
