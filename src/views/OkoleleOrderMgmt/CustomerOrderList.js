import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Edit from "@material-ui/icons/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Search from "@material-ui/icons/Search";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

// react components used to create a google map
import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

export default function CustomerOrderList(props) {
  const classes = useStyles();
  const history = useHistory();

  // customerId from props
  var customerId = props.location.customerId;
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  const searchButton = classes.top + " " + classes.searchButton;

  const [customerID, setCustomerID] = useState(customerId);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [customerPhone, setCustomerPhone] = useState("");

  // Pagination
  const [totalPageNo, setTotalPageNo] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    if (headers) {
      getOrderList();
    }
  }, [customerID, headers]);

  //   get Order List
  const getOrderList = () => {
    const pageNo = 0;
    const odrListAPI =
      rootPath + "/order?userId=" + customerID + "&page=" + pageNo + "&size=10";

    axios
      .get(odrListAPI, headers)
      .then(function (response) {
        setCustomerOrders(response.data.content.data);
        console.log("Order List...: ", response.data.content.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    // Show Data Loader
    // setIsDataLoaded(false);
    console.log("pageNumber: ", pageNumber);
    const pageNo = pageNumber - 1;
    setCurrentPage(pageNo);

    const odrListAPI =
      rootPath + "/order?userId=" + customerID + "&page=" + pageNo + "&size=10";

    axios
      .get(odrListAPI, headers)
      .then(function (response) {
        if (response.status == 200 && response.data.content.totalItems > 0) {
          setCustomerOrders(response.data.content.data);
        }
        // setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        // setIsDataLoaded(true);
      });
  };

  // order Search Click
  const orderSearchClick = (event) => {
    searchOdrByCustomerPhone();
  };
  // search Odr By Customer Phone
  const searchOdrByCustomerPhone = () => {
    const pageNo = 0;

    const searchOdrListAPI =
      rootPath +
      "/order/mobile?page=" +
      pageNo +
      "&size=10&mobile=" +
      customerPhone;
    axios
      .get(searchOdrListAPI, headers)
      .then(function (response) {
        setCustomerOrders(response.data.content.data);
        console.log("Searched Odr List: ", response.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
        setCustomerOrders([]);
      });
  };

  const viewOrderDetails = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/order-details",
      orderId: id,
    });
  };

  const updateOrderStatus = (id) => {
    alert(id);

    history.push({
      pathname: "/admin/update-orderStatus",
      orderId: id,
    });
  };

  return (
    <>
      {/* ############################# Order List ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Order List
              </h4>

              <div style={{ marginLeft: "59vw", display: "flex" }}>
                {/* <div className="search-dropdown-style">
                  <select value={searchTypeValue} onChange={handleSearchType}>
                    <option value="Search By Name">Search By Name</option>
                    <option value="Search By Phone">Search By Phone</option>
                  </select>
                </div> */}

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
                  onClick={() => orderSearchClick()}
                >
                  <Search
                    className={
                      classes.headerLinksSvg + " " + classes.searchIcon
                    }
                  />
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={["#", "Date", "Order Total", "Status", "Actions"]}
                tableData={customerOrders.map((user) => {
                  console.log("riderList: ", user);
                  const { id, createdDate, subTotal, orderStatus } = user;
                  return [
                    id,
                    createdDate,
                    subTotal,
                    orderStatus,
                    <div>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="info"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => viewOrderDetails(id)}
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
                        onClick={() => updateOrderStatus(id)}
                      >
                        <Edit className={classes.icon} />
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
      </GridContainer>
    </>
  );
}
