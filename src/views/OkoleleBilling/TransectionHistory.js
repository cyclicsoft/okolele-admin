/*eslint-disable*/
import React, { useState, useEffect } from "react";
// Global State
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";

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
// @material-ui/icons
import Search from "@material-ui/icons/Search";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

// react components used to create a google map
import PaginationComponent from "views/Pagination/PaginationComponent";
import SearchPaginationComponent from "views/Pagination/SearchPaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss";
import "../../assets/scss/ghorwali-scss/search-dropdown.scss";
// react component used to create alerts

import axios from "axios";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

export default function TransectionHistory() {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  const [headers, setHeaders] = useState();

  const [transectionListBy, setTransectionListBy] = useState(
    "By Customer Phone"
  );
  const [customerPhone, setCustomerPhone] = useState("");
  const [transectionType, setTransectionType] = useState("PAYMENT");
  const [transectionList, settransectionList] = useState([]);

  const [transectByPhone, setTransectByPhone] = useState(true);

  const searchButton = classes.top + " " + classes.searchButton;
  const [totalPageNo, setTotalPageNo] = useState(1);

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  // Customer Search Handler
  const transectionByPhoneOnclick = () => {
    setTransectByPhone(true);
    getTransectionByPhone();
  };
  // getTransectionByPhone
  const getTransectionByPhone = () => {
    const pageNo = 0;

    const transectionByPhoneAPI =
      rootPath +
      "/transaction/mobile?mobile=" +
      customerPhone +
      "&page=" +
      pageNo +
      "&size=10";
    axios
      .get(transectionByPhoneAPI, headers)
      .then(function (response) {
        settransectionList(response.data.content.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Search Pagination handler
  const searchPaginationHandler = (pageNumber) => {
    const pageNo = pageNumber - 1;

    const transectionByIdAPI =
      rootPath +
      "/transaction/type?transactionType=" +
      transectionType +
      "&page=" +
      pageNo +
      "&size=5";
    axios
      .get(transectionByIdAPI, headers)
      .then(function (response) {
        settransectionList(response.data.content.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log("users error", error);
      });
  };

  // Pagination handler
  const paginationHandler = (pageNumber) => {
    const pageNo = pageNumber - 1;

    const transectionByPhoneAPI =
      rootPath +
      "/transaction/mobile?mobile=" +
      customerPhone +
      "&page=" +
      pageNo +
      "&size=10";
    axios
      .get(transectionByPhoneAPI, headers)
      .then(function (response) {
        settransectionList(response.data.content.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTransectionBy = (event) => {
    setTransectionListBy(event.target.value);
    if (event.target.value === "By Transection Type") {
      setTransectByPhone(false);

      getTransectionListByType(transectionType);
    }
  };

  const transectionTypeHandler = (event) => {
    setTransectionType(event.target.value);

    getTransectionListByType(event.target.value);
  };

  const getTransectionListByType = (transectionType) => {
    const pageNo = 0;

    const transectionByIdAPI =
      rootPath +
      "/transaction/type?transactionType=" +
      transectionType +
      "&page=" +
      pageNo +
      "&size=5";
    axios
      .get(transectionByIdAPI, headers)
      .then(function (response) {
        settransectionList(response.data.content.data);
        setTotalPageNo(Math.ceil(response.data.content.totalItems / 10));
      })
      .catch(function (error) {
        console.log("users error", error);
      });
  };

  return (
    <>
      {/* ############################# Rider List ############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Assignment />
              </CardIcon>
              <h4 style={{ float: "left" }} className={classes.cardIconTitle}>
                Billing History
              </h4>

              <div style={{ marginLeft: "45vw", display: "flex" }}>
                <div className="search-dropdown-style">
                  <select
                    value={transectionListBy}
                    onChange={(event) => getTransectionBy(event)}
                  >
                    <option value="By Customer Phone">By Customer Phone</option>
                    <option value="By Transection Type">
                      By Transection Type
                    </option>
                  </select>
                </div>
                {transectionListBy === "By Transection Type" && (
                  <div className="search-dropdown-style">
                    <select
                      value={transectionType}
                      onChange={(event) => transectionTypeHandler(event)}
                    >
                      <option value="PAYMENT">PAYMENT</option>
                      <option value="REFUND">REFUND</option>
                      <option value="ADJUSTMENT">ADJUSTMENT</option>
                    </select>
                  </div>
                )}

                {transectionListBy === "By Customer Phone" && (
                  <div style={{ display: "flex" }}>
                    <CustomInput
                      formControlProps={{
                        className: classes.top + " " + classes.search,
                      }}
                      inputProps={{
                        placeholder: "Customer Phone",
                        value: customerPhone,
                        onChange: (event) =>
                          setCustomerPhone(event.target.value),
                        type: "Phone",
                      }}
                    />
                    <Button
                      style={{ marginTop: "9%" }}
                      color="white"
                      aria-label="edit"
                      justIcon
                      round
                      className={searchButton}
                      onClick={() => transectionByPhoneOnclick()}
                    >
                      <Search
                        className={
                          classes.headerLinksSvg + " " + classes.searchIcon
                        }
                      />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardBody>
              <Table
                tableHead={[
                  "Customer ID",
                  "Transection Type",
                  "Amount",
                  "Modified On",
                  "Actions",
                ]}
                tableData={transectionList.map((transection) => {
                  // console.log("customerList: ", user);
                  const {
                    id,
                    customerId,
                    transactionType,
                    amount,
                    modifiedDate,
                  } = transection;
                  return [
                    customerId,
                    transactionType,
                    amount,
                    modifiedDate,
                    <div>
                      <Button
                        style={{ margin: "2px" }}
                        round
                        color="info"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        // onClick={() => goToCustomerDetails(id)}
                      >
                        <Person className={classes.icon} />
                      </Button>
                      {/* <Button
                        style={{ margin: "2px" }}
                        round
                        color="success"
                        className={
                          classes.actionButton + " " + classes.actionButtonRound
                        }
                        onClick={() => editCustomer(id)}
                      >
                        <Edit className={classes.icon} />
                      </Button> */}
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
              {transectByPhone ? (
                <PaginationComponent
                  paginationHandler={paginationHandler}
                  totalCount={totalPageNo}
                />
              ) : (
                <SearchPaginationComponent
                  paginationHandler={searchPaginationHandler}
                  totalCount={totalPageNo}
                />
              )}
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
