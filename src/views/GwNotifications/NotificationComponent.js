import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import PaginationComponent from "views/Pagination/PaginationComponent";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import Close from "@material-ui/icons/Close";

// core components
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Button from "components/CustomButtons/Button.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Instruction from "components/Instruction/Instruction.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-pro-react/views/notificationsStyle.js";

import noticeModal1 from "assets/img/card-1.jpeg";
import noticeModal2 from "assets/img/card-2.jpeg";

const useStyles = makeStyles(styles);

function NotificationComponent() {

    const classes = useStyles();
    const [notificationColor, setNotificationColor] = useState("success")
    // Pagingation 
    const [totalPageNo, setTotalPageNo] = useState(1);

    // Pagination handler 
    const paginationHandler = (pageNumber) =>{
        // console.log('pageNumber: ', pageNumber);
        // const pageNo = pageNumber -1;
        // const adminListByPagination = '/multivendorshop/mv/v1/admin/allAdmin?page=' + pageNo + '&size=5';

        // axios.get(adminListByPagination)
        //   .then(function (response) {
        //     setUserData(response.data.content);
        //     console.log("adminListByPagination: ", response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

    }



    return (
        <>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardBody>
                        <div>
                            <div className={classes.cardHeader}>
                                <h4 className={classes.cardTitle}>Notification states</h4>
                            </div>
                            <br />
                            <SnackbarContent
                                message={
                                    'SUCCESS - This is a regular notification made with color="success"'
                                }
                                close
                                color={notificationColor}                               
                            />
                        </div>
                    </CardBody>

                    <div className="pagination-style">
                        <PaginationComponent paginationHandler={paginationHandler} totalCount={totalPageNo}/> 
                    </div>

                </Card>
            </GridItem>

        </>
    )
}

export default NotificationComponent
