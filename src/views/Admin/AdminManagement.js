import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import PermIdentity from "@material-ui/icons/PermIdentity";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
// Card 
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/marc.jpg";
// Custom Input 
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Pagination
import PaginationComponent from "views/Pagination/PaginationComponent";
// Style 
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
// react component used to create alerts
import DeleteWarning from "views/ConfirmationModals/DeleteWarning";
import UpdateWarning from "views/ConfirmationModals/UpdateWarning";


const useStyles = makeStyles(styles);


export default function AdminManagement() {
  const classes = useStyles();
  //  Admin Details 
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [profileImage, setprofileImage] = useState(avatar);

  const [totalPageNo, setTotalPageNo] = useState(1);
  const [userData, setUserData] = useState([]);
  // View Profile &  View Edit Profile section display flag
  const [ViewProfile, setViewProfile] = useState(false);
  const [ViewEditProfile, setViewEditProfile] = useState(false);
  // Admin active flag 
  const [activeStatus, setActiveStatus] = useState(false);
  // Admin Delete 
  const [deleteUrl, setDeleteUrl] = useState('');
  const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
  // Admin Update 
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);


  useEffect(() => {
    const pageNo = 0;
    const adminListByPagination = '/multivendorshop/mv/v1/admin/app/admin?page=' + pageNo + '&size=5';

    axios.get(adminListByPagination)
      .then(function (response) {
        setUserData(response.data.content);
        //console.log("Total...: ", Math.ceil(response.data.totalElements/5));
        setTotalPageNo(Math.ceil(response.data.totalElements/5));
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);
  // Pagination handler 
  const paginationHandler = (pageNumber) =>{
    console.log('pageNumber: ', pageNumber);
    const pageNo = pageNumber -1;
    const adminListByPagination = '/multivendorshop/mv/v1/admin/app/admin?page=' + pageNo + '&size=5';

    axios.get(adminListByPagination)
      .then(function (response) {
        setUserData(response.data.content);
        console.log("adminListByPagination: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }



  // ############# View Admin Info / get admin by adminId #############
  const viewAdminDetails = (id) => {
    alert(id)
    const adminGetByIdUrl = '/multivendorshop/mv/v1/admin/app/admin/' + id;
    axios.get(adminGetByIdUrl)
      .then(function (response) {
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
        setActiveStatus(response.data[0].disabled);
        // handle success
        console.log("viewAdminDetails: ", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    setViewProfile(true);
    setViewEditProfile(false);
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
      console.log('test: ', userInfo)
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
// ############# Get Admin Info for Update #############
  const editAdmin = (id) => {
    alert(id)
    const adminGetByIdUrl = '/multivendorshop/mv/v1/admin/app/admin/' + id;
    axios.get(adminGetByIdUrl)
      .then(function (response) {
        setName(response.data[0].adminName);
        setphone(response.data[0].adminMobile);
        setemail(response.data[0].adminEmail);
        setAdminId(response.data[0].adminId);
        setActiveStatus(response.data[0].disabled);
        setpassword(response.data[0].password);
        setconfirmPassword(response.data[0].password);
        // handle success
        console.log("editAdmin Details: ", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    setViewProfile(false);
    setViewEditProfile(true);
  }
  // ############# Update Admin Info #############
  const profileUpdateHandler = (event) => {
    setUpdateBtnClicked(true);

    event.preventDefault();
  }



// ############# Delete Admin Info #############
  const deleteAdmin = (id) => {
    //alert(id)
    const adminDeleteByIdUrl = '/multivendorshop/mv/v1/admin/app/admin/' + id;
    setDeleteUrl(adminDeleteByIdUrl);

    setDeleteBtnClicked(true);

    setViewProfile(false);
    setViewEditProfile(false);
  }
  // onDeleteChangeFlag 
  const onDeleteChangeFlag = (flag) => {
    setDeleteBtnClicked(flag);
  }



  // imageUpload 
  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored", base64);
      setprofileImage(base64)
    });
  }
  // getBase64 
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }



  return (
    <>

      {/* ############################# Warning Component Calling ############################# */}
      {updateBtnClicked ? <UpdateWarning updateConfirmationFlag={updateConfirmationFlag} onUpdateChangeFlag={onUpdateChangeFlag}/> : null }
      {deleteBtnClicked ? <DeleteWarning deleteUrl={deleteUrl} onDeleteChangeFlag={onDeleteChangeFlag}/> : null}
      
      {/* ############################# Admin List Table############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Admin List</h4>
            </CardHeader>
            <CardBody>


              <Table
                tableHead={[
                  "#",
                  "Name",
                  "Phone",
                  "Email",
                  "Actions"
                ]}
                tableData={userData.map((user) => {
                  //console.log('user: ', user)
                  const { adminId, adminName, adminMobile, adminEmail } = user;
                  return (
                    [
                      adminId,
                      adminName,
                      adminMobile,
                      adminEmail,
                      <div>
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                          round
                          color='info'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => viewAdminDetails(user.adminId)}>
                          <Person className={classes.icon} />
                        </Button>
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                          round
                          color='success'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => editAdmin(user.adminId)}>
                          <Edit className={classes.icon} />
                        </Button>
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }}
                          round
                          color='danger'
                          className={classes.actionButton + " " + classes.actionButtonRound}
                          onClick={() => deleteAdmin(user.adminId)}>
                          <Close className={classes.icon} />
                        </Button>
                      </div>
                      
                    ]
                  )
                })}
                customCellClasses={[classes.center, classes.right, classes.right]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 4, 5]}

              />
            </CardBody>

            <div className="pagination-style">
              <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo}/> 
            </div>

          </Card>
        </GridItem>
      </GridContainer>

      {ViewProfile == true ?
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card profile>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={profileImage} alt="Admin" />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  <h6 className={classes.cardCategory}>ADMIN / GHORWALI</h6>
                  {name ? <h4 className={classes.cardTitle}>{name}</h4> : null}
                  {adminId ? <h5 className={classes.cardTitle}>ID: {adminId}</h5> : null}
                  {phone ? <p>Phone: {phone}</p> : null}
                  {email ? <p>Email: {email}</p> : null}
                  {activeStatus ? <p>Active Status: {activeStatus}</p> : null}
                </CardBody>
              </Card>
            </GridItem> 
          </GridContainer>         
      : null}

      {ViewEditProfile == true ?
        <GridContainer>
          <GridItem xs={12} sm={12} >
            {/* md={8} */}
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PermIdentity />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>
                  Edit Admin Profile
              </h4>
              </CardHeader>
              <CardBody>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Admin ID"
                      id="last-name"
                      disabled= 'true'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: 'String',
                        value: adminId || '',
                        // onChange: (event) => setlName(event.target.value),
                        maxLength: "20"
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Admin Name"
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
        </GridContainer> : null}

    </>
  );
}
