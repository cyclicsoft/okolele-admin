import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// Global State

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Search from "@material-ui/icons/Search";
import SendIcon from "@mui/icons-material/Send";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import Modal from "react-modal";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import PaginationComponent from "views/Pagination/PaginationComponent";
import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

const customStyles = {
  content: {
    height: "auto",
    maxHeight: "75vh",
    minHeight: "490px",
    width: "auto",
    minWidth: "425px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "0",
    margin: "5%",
    transform: "translate(-50%, -50%)",
    display: "block",
  },
};

export default function UserNotifications(props) {
  const classes = useStyles();
  const history = useHistory();

  // customerId from props
  var customer_Id = props.location.customerId;
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  const searchButton = classes.top + " " + classes.searchButton;

  const [customerID, setCustomerID] = useState(customer_Id);
  const [notificationId, setNotificationId] = useState("");
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState("DEFAULT");
  const [notificationContent, setNotificationContent] = useState("");
  const [activeStatus, setActiveStatus] = useState(true);
  const [userNotifications, setUserNotifications] = useState([]);
  const [createdOn, setCreatedOn] = useState("");
  const [modifiedOn, setModifiedOn] = useState("");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [customerPhone, setCustomerPhone] = useState("");

  const [totalPageNo, setTotalPageNo] = useState(1);

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    if (headers) {
      getNotificationList();
    }
  }, [customerID, headers]);

  //   get Order List
  const getNotificationList = () => {
    const pageNo = 0;
    const notificationListAPI =
      rootPath +
      "/notification/user?userId=" +
      customerID +
      "&activeStatusType=ALL&page=" +
      pageNo +
      "&size=10";

    axios
      .get(notificationListAPI, headers)
      .then(function (response) {
        setUserNotifications(response.data.content.data);
        console.log("getNotificationList...: ", response.data.content.data);
        // setTotalPageNo(Math.ceil(response.data.totalElements / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // send Notification
  const sendNotification = (id) => {
    history.push({
      pathname: "/admin/send-notification",
      customerId: id,
    });
  };

  const viewNotificationDetails = (notificationDetails) => {
    setIsOpen(true);

    setNotificationId(notificationDetails.id);
    setNotificationTitle(notificationDetails.title);
    setNotificationType(notificationDetails.notificationType);
    setNotificationContent(notificationDetails.content);
    setActiveStatus(notificationDetails.activeStatus);
    setCreatedOn(notificationDetails.createdDate);
    setModifiedOn(notificationDetails.modifiedDate);
  };

  const closeModal = () => {
    // alert("closeModal clicked");
    setIsOpen(false);
  };

  const editNotification = (customerId, notification) => {
    history.push({
      pathname: "/admin/update-notification",
      customerId: customerId,
      notificationDetails: notification,
    });
  };

  // ============================

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;
    const riderListByPagination =
      "/multivendorshop/mv/v1/rider/paginate/all?page=" + pageNo + "&size=10";

    axios
      .get(riderListByPagination)
      .then(function (response) {
        // setRiderList(response.data.content);
        console.log("riderListByPagination: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
        // setRiderList([]);
      });
  };

  return (
    <>
      {/* ############################# Notification List ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Notification List
              </h4>

              <div style={{ marginLeft: "52vw", display: "flex" }}>
                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search,
                  }}
                  inputProps={{
                    placeholder: "Search By Phone",
                    value: customerPhone,
                    onChange: (event) => setCustomerPhone(event.target.value),
                    type: "Phone",
                  }}
                />
                <Button
                  style={{ marginTop: "5%" }}
                  color="white"
                  aria-label="edit"
                  justIcon
                  round
                  className={searchButton}
                  // onClick={() => orderSearchClick()}
                >
                  <Search
                    className={
                      classes.headerLinksSvg + " " + classes.searchIcon
                    }
                  />
                </Button>
                {console.log("------", customer_Id, customerID)}
                <Button
                  style={{
                    margin: "25px 0 17px 25px",
                    height: "35px",
                  }}
                  // round
                  disabled={
                    customer_Id !== undefined || customerID !== undefined
                      ? false
                      : true
                  }
                  color="success"
                  className={
                    classes.actionButton + " " + classes.actionButtonRound
                  }
                  onClick={() => sendNotification(customerID)}
                >
                  Send New
                  {/* <SendIcon className={classes.icon} /> */}
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Title",
                  "Notification Type",
                  "Created On",
                  "Actions",
                ]}
                tableData={userNotifications.map((notification) => {
                  // console.log("riderList: ", user);
                  const {
                    id,
                    title,
                    notificationType,
                    createdDate,
                  } = notification;
                  return [
                    title,
                    notificationType,
                    createdDate,
                    <div>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="info"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => viewNotificationDetails(notification)}
                      >
                        <InfoIcon className={classes.icon} />
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() =>
                          editNotification(customerID, notification)
                        }
                      >
                        <Edit className={classes.icon} />
                      </Button>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => sendNotification(id)}
                      >
                        <SendIcon className={classes.icon} />
                      </Button>
                    </div>,
                  ];
                })}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right,
                ]}
                customClassesForCells={[0, 4, 5]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right,
                ]}
                customHeadClassesForCells={[0, 4, 5]}
              />
            </CardBody>

            <div className="pagination-style">
              <PaginationComponent
                paginationHandler={paginationHandler}
                totalCount={totalPageNo}
              />
            </div>
          </Card>
        </GridItem>
        <GridItem>
          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              // onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={false}
              style={customStyles}
              contentLabel="Notification Details"
            >
              <div style={{ margin: "20px", fontSize: "12px" }}>
                <h5>Customer ID: {customerID}</h5>
                <h5>Notification ID: {notificationId}</h5>
                <h5>Notification Title: {notificationTitle}</h5>
                <h5>Notification Type: {notificationType}</h5>
                <h5>Created On: {createdOn}</h5>
                <h5>Modified On: {modifiedOn}</h5>
                <h5>Active Status: {activeStatus}</h5>
                <h5>Notification Content: {notificationContent}</h5>
                <Button
                  color="rose"
                  className={classes.updateProfileButton}
                  onClick={closeModal}
                  style={{ marginRight: "-132px" }}
                >
                  Close
                </Button>
              </div>
            </Modal>
          )}
        </GridItem>
      </GridContainer>
    </>
  );
}
