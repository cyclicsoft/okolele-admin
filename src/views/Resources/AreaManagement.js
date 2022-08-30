import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
// Global State
import { store, useGlobalState } from "state-pool";
// Custom Hooks
import useEmptyObjCheck from "views/OkoleleCustomHooks/useEmptyObjCheck";

// core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Table from "components/Table/Table.js";

// material-ui icons
import Edit from "@material-ui/icons/Edit";
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Close from "@material-ui/icons/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
// SCSS File
import "../../assets/scss/ghorwali-scss/appPrivacy.scss";
import Add from "@material-ui/icons/Add";

const customStyles = {
  content: {
    height: "auto",
    maxHeight: "75vh",
    minHeight: "215px",
    width: "auto",
    minWidth: "425px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "20px",
    margin: "5%",
    transform: "translate(-50%, -50%)",
    display: "block",
  },
};

const useStyles = makeStyles(styles);

function AreaManagement() {
  const classes = useStyles();
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );

  const [divisionList, setDivisionList] = useState([]);
  const [selectedDivisionName, setSelectedDivisionName] = useState("");
  const [selectedDivId, setSelectedDivId] = useState("");
  const [newDivisionName, setNewDivisionName] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [areaList, setAreaList] = useState([]);
  const [selectedAreaName, setSelectedAreaName] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [newAreaName, setNewAreaName] = useState("");
  const [newAreaDeliveryConst, setNewAreaDeliveryConst] = useState(0);

  const [updatedDivId, setUpdatedDivId] = useState("");
  const [updatedCityId, setUpdatedCityId] = useState("");
  const [updatedAreaId, setUpdatedAreaId] = useState("");
  const [toUpdate, setToUpdate] = useState("Area");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [deliveryCostToUpdate, setDeliveryCostToUpdate] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    getToken((token) => {
      getAreas(token);
    });
  }, []);

  const getAreas = (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const areaListAPI = "http://localhost:8080/area";

    axios
      .get(areaListAPI, config)
      .then(function (response) {
        setDivisionList(response.data.content.divisions);
        setSelectedDivisionName(response.data.content.divisions[0].div_name);
        setSelectedDivId(response.data.content.divisions[0].div_id);
        setCityList(response.data.content.divisions[0].cities);
        setSelectedCityName(
          response.data.content.divisions[0].cities[0].city_name
        );
        setSelectedCityId(response.data.content.divisions[0].cities[0].city_id);
        setAreaList(response.data.content.divisions[0].cities[0].areas);
        console.log("Area List...: ", response);
      })
      .catch(function (error) {
        console.log("Area List error", error);
      });
  };
  // Division
  const saveDivision = () => {
    let tkn = "";
    getToken((token) => {
      tkn = token;
    });

    let config = {
      headers: {
        Authorization: "Bearer " + tkn,
      },
    };

    const addDivisionAPI =
      "http://localhost:8080/area/division?div_name=" + newDivisionName;

    axios
      .post(addDivisionAPI, {}, config)
      .then(function (response) {
        console.log("New Division...: ", response);

        setDivisionList(response.data.content.divisions);
        setSelectedDivisionName(response.data.content.divisions[0].div_name);
        setSelectedDivId(response.data.content.divisions[0].div_id);
        setCityList(response.data.content.divisions[0].cities);
        setSelectedCityName(
          response.data.content.divisions[0].cities[0].city_name
        );
        setSelectedCityId(response.data.content.divisions[0].cities[0].city_id);
        setAreaList(response.data.content.divisions[0].cities[0].areas);
      })
      .catch(function (error) {
        console.log("New Division error", error);
      });
  };
  const editDivNameClick = (div_id, div_name) => {
    setToUpdate("Division");
    setUpdatedDivId(div_id);
    setNameToUpdate(div_name);
    setIsOpen(true);
  };
  const deleteDivision = (div_id) => {};
  // City
  const showCityList = (div_id) => {
    console.log("Div List....:", divisionList);
    divisionList.map((division) => {
      if (division.div_id === div_id) {
        console.log("div_id....:", div_id);
        setSelectedDivisionName(division.div_name);
        setSelectedDivId(div_id);
        if (Object.keys(division).length !== 0) {
          setCityList(division.cities);
        } else {
          setCityList([]);
        }

        if (Object.keys(division.cities).length !== 0) {
          setAreaList(division.cities[0].areas);
        } else {
          setAreaList([]);
        }
      }
    });
  };
  const saveCity = () => {
    let tkn = "";
    getToken((token) => {
      tkn = token;
    });

    let config = {
      headers: {
        Authorization: "Bearer " + tkn,
      },
    };

    const addCityAPI =
      "http://localhost:8080/area/cities?div_id=" +
      selectedDivId +
      "&city_name=" +
      newCityName;

    axios
      .post(addCityAPI, {}, config)
      .then(function (response) {
        console.log("New City...: ", response);

        setDivisionList(response.data.content.divisions);
        setSelectedDivisionName(response.data.content.divisions[0].div_name);
        setSelectedDivId(response.data.content.divisions[0].div_id);
        setCityList(response.data.content.divisions[0].cities);
        setSelectedCityName(
          response.data.content.divisions[0].cities[0].city_name
        );
        setSelectedCityId(response.data.content.divisions[0].cities[0].city_id);
        setAreaList(response.data.content.divisions[0].cities[0].areas);
      })
      .catch(function (error) {
        console.log("New City error", error);
      });
  };
  const editCityNameClick = (city_id, city_name) => {
    setToUpdate("City");
    setUpdatedCityId(city_id);
    setNameToUpdate(city_name);
    setIsOpen(true);
  };
  const deleteCity = (city_id) => {};
  // Area
  const showAreaList = (city_id) => {
    console.log("Div List....:", cityList);
    cityList.map((city) => {
      if (city.city_id === city_id) {
        console.log("city_id....:", city_id);
        setSelectedCityName(city.city_name);
        setSelectedCityId(city.city_id);
        if (Object.keys(city).length !== 0) {
          setAreaList(city.areas);
        } else {
          setAreaList([]);
        }
      }
    });
  };
  const saveArea = () => {
    let tkn = "";
    getToken((token) => {
      tkn = token;
    });

    let config = {
      headers: {
        Authorization: "Bearer " + tkn,
      },
    };

    const addAreaAPI =
      "http://localhost:8080/area/areas?div_id=" +
      selectedDivId +
      "&city_id=" +
      selectedCityId +
      "&area_name=" +
      newAreaName +
      "&delivery_cost=" +
      newAreaDeliveryConst;

    axios
      .post(addAreaAPI, {}, config)
      .then(function (response) {
        console.log("Area City...: ", response);

        setDivisionList(response.data.content.divisions);
        setSelectedDivisionName(response.data.content.divisions[0].div_name);
        setSelectedDivId(response.data.content.divisions[0].div_id);
        setCityList(response.data.content.divisions[0].cities);
        setSelectedCityName(
          response.data.content.divisions[0].cities[0].city_name
        );
        setSelectedCityId(response.data.content.divisions[0].cities[0].city_id);
        setAreaList(response.data.content.divisions[0].cities[0].areas);
      })
      .catch(function (error) {
        console.log("New Area error", error);
      });
  };
  const editAreaNameClick = (area_id, area_name) => {
    setToUpdate("Area");
    setUpdatedAreaId(area_id);
    setNameToUpdate(area_name);
    setIsOpen(true);
  };
  const deleteArea = (area_id) => {};

  function closeModal() {
    setIsOpen(false);
  }

  const updateDivCityArea = () => {
    let tkn = "";
    getToken((token) => {
      tkn = token;
    });

    let config = {
      headers: {
        Authorization: "Bearer " + tkn,
      },
    };

    let updateAPI = "";
    if (toUpdate === "Division") {
      updateAPI =
        "http://localhost:8080/area/division/" +
        updatedDivId +
        "?div_name=" +
        nameToUpdate;
    } else if (toUpdate === "City") {
      updateAPI =
        "http://localhost:8080/area/cities/" +
        updatedCityId +
        "?div_id=" +
        selectedDivId +
        "&city_name=" +
        nameToUpdate;
    } else if (toUpdate === "Area") {
      updateAPI =
        "http://localhost:8080/area/areas/" +
        updatedAreaId +
        "?div_id=" +
        selectedDivId +
        "&city_id=" +
        selectedCityId +
        "&area_name=" +
        nameToUpdate +
        "&delivery_cost=" +
        deliveryCostToUpdate;
    }

    axios
      .put(updateAPI, {}, config)
      .then(function (response) {
        console.log("After Update...: ", response);

        setDivisionList(response.data.content.divisions);
        setSelectedDivisionName(response.data.content.divisions[0].div_name);
        setSelectedDivId(response.data.content.divisions[0].div_id);
        setCityList(response.data.content.divisions[0].cities);
        setSelectedCityName(
          response.data.content.divisions[0].cities[0].city_name
        );
        setSelectedCityId(response.data.content.divisions[0].cities[0].city_id);
        setAreaList(response.data.content.divisions[0].cities[0].areas);
      })
      .catch(function (error) {
        console.log("After Update error", error);
      });

    setIsOpen(false);
  };

  const deleteDivCityArea = (id, type) => {
    let tkn = "";
    getToken((token) => {
      tkn = token;
    });

    let config = {
      headers: {
        Authorization: "Bearer " + tkn,
      },
    };

    let deleteAPI = "";
    if (type === "Division") {
      deleteAPI = "http://localhost:8080/area/division/" + id;
    } else if (type === "City") {
      deleteAPI =
        "http://localhost:8080/area/cities/" + id + "?div_id=" + selectedDivId;
    } else if (type === "Area") {
      deleteAPI =
        "http://localhost:8080/area/areas/" +
        id +
        "?div_id=" +
        selectedDivId +
        "&city_id=" +
        selectedCityId;
    }

    axios
      .delete(deleteAPI, config)
      .then(function (response) {
        console.log("After Delete...: ", response);
      })
      .catch(function (error) {
        console.log("After Delete error", error);
      });

    setIsOpen(false);
  };

  // get Token
  function getToken(callback) {
    let userTkn = userToken;
    console.log("getToken/userToken: ", userTkn);
    // token
    let token = userTkn.token;
    // tokenValidity
    var tokenTime = new Date(userTkn.tokenValidity);
    // current time
    var now = new Date();

    if (tokenTime.getTime() > now.getTime()) {
      console.log("getToken/If conditio", token);
      callback(token);
    } else {
      refreshTokenGenerator((newToken) => {
        console.log("getToken/Else conditio", newToken);
        if (newToken !== null && newToken.length > 0) {
          token = newToken;
          callback(token);
        }
      });
    }
  }
  // Refresh Token Generator
  function refreshTokenGenerator(callback) {
    var refreshTokenTime = new Date(userToken.refreshTokenValidity);
    var now = new Date();

    if (refreshTokenTime.getTime() > now.getTime()) {
      const refreshTokenAPI = "http://localhost:8080/auth/token";
      console.log(
        "RefreshTokenGenerator/refreshToken before generation: ",
        userToken.refreshToken
      );

      axios
        .post(refreshTokenAPI, {
          refreshToken: userToken.refreshToken,
        })
        .then(function (response) {
          if (response.status == 403) {
            alert(response.data.message);
            localStorage.clear();
            window.location.href = "/";
          } else {
            tokenUdateHandler(response.data);

            console.log("RefreshTokenGenerator/response.data: ", response.data);
            callback(response.data.token);
          }
        })
        .catch(function (error) {
          console.log("RefreshTokenGenerator / error: ", error);
          localStorage.clear();
          window.location.href = "/";
        });
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }
  // token Udate to Global state
  const tokenUdateHandler = (TokenContent) => {
    updateUserToken(function (accessToken) {
      accessToken.token = TokenContent.token;
      accessToken.tokenValidity = TokenContent.tokenValidity;
      accessToken.refreshToken = TokenContent.refreshToken;
      accessToken.refreshTokenValidity = TokenContent.refreshTokenValidity;
    });
  };

  return (
    <>
      <GridContainer>
        {/* Edit Popup modal */}
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <CustomInput
            labelText={"Update " + toUpdate}
            id="update-name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: "String",
              value: nameToUpdate || "",
              onChange: (event) => setNameToUpdate(event.target.value),
              maxLength: "50",
            }}
          />
          {toUpdate === "Area" && (
            <CustomInput
              labelText="Delivery Cost"
              id="new-delivery-cost"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "Number",
                value: deliveryCostToUpdate || "",
                onChange: (event) =>
                  setDeliveryCostToUpdate(event.target.value),
                maxLength: "50",
              }}
            />
          )}
          <Button
            color="info"
            // size="sm"
            // round
            className={classes.lastButton}
            onClick={() => updateDivCityArea()}
          >
            Update
          </Button>
          <Button
            color="rose"
            className={classes.updateProfileButton}
            onClick={closeModal}
            style={{ marginRight: "-132px" }}
          >
            Close
          </Button>
        </Modal>

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Edit />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Service Areas - <small>Update City Names</small>
              </h4>
            </CardHeader>
            <CardBody>
              {/* Divisions */}
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <h4 className={classes.cardIconTitle}>List of Divisions </h4>
                  <br />
                  <div style={{ height: "45vh", overflowY: "scroll" }}>
                    {useEmptyObjCheck(divisionList) && (
                      <Table
                        tableHead={["#", "Name", "Actions"]}
                        tableData={divisionList.map((division) => {
                          //   console.log("customerList: ", user);
                          const { div_id, div_name } = division;
                          return [
                            div_id,
                            div_name,
                            <div
                              key={div_id}
                              style={{ width: "10px", display: "flex" }}
                            >
                              <Button
                                style={{
                                  margin: "2px",
                                }}
                                round
                                size="sm"
                                justIcon="true"
                                color="info"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() => showCityList(div_id)}
                              >
                                <VisibilityIcon className={classes.icon} />
                              </Button>
                              <Button
                                style={{ margin: "2px" }}
                                round
                                size="sm"
                                justIcon="true"
                                color="rose"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() =>
                                  editDivNameClick(div_id, div_name)
                                }
                              >
                                <Edit className={classes.icon} />
                              </Button>
                              <Button
                                style={{ margin: "2px" }}
                                round
                                size="sm"
                                justIcon="true"
                                color="danger"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() =>
                                  deleteDivCityArea(div_id, "Division")
                                }
                              >
                                <DeleteIcon className={classes.icon} />
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
                    )}
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} styles={{ display: "flex" }}>
                  <h4 className={classes.cardIconTitle}>+ Add New Division</h4>
                  <CustomInput
                    labelText="Division Name"
                    id="div-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: newDivisionName || "",
                      onChange: (event) =>
                        setNewDivisionName(event.target.value),
                      maxLength: "50",
                    }}
                  />
                  <Button
                    color="info"
                    size="sm"
                    round
                    className={classes.lastButton}
                    onClick={() => saveDivision()}
                  >
                    Save
                  </Button>
                </GridItem>
              </GridContainer>

              <br />
              <br />

              {/* City */}
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <h4 className={classes.cardIconTitle}>
                    List Of Cities Under {selectedDivisionName} Division
                  </h4>
                  <br />
                  <div style={{ height: "45vh", overflowY: "scroll" }}>
                    {useEmptyObjCheck(cityList) && (
                      <Table
                        tableHead={["#", "Name", "Actions"]}
                        tableData={cityList.map((city) => {
                          //   console.log("customerList: ", user);
                          const { city_id, city_name } = city;
                          return [
                            city_id,
                            city_name,
                            <div
                              key={city_id}
                              style={{ width: "10px", display: "flex" }}
                            >
                              <Button
                                style={{
                                  margin: "2px",
                                }}
                                round
                                size="sm"
                                justIcon="true"
                                color="info"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() => showAreaList(city_id)}
                              >
                                <VisibilityIcon className={classes.icon} />
                              </Button>
                              <Button
                                style={{ margin: "2px" }}
                                round
                                size="sm"
                                justIcon="true"
                                color="rose"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() =>
                                  editCityNameClick(city_id, city_name)
                                }
                              >
                                <Edit className={classes.icon} />
                              </Button>
                              <Button
                                style={{ margin: "2px" }}
                                round
                                size="sm"
                                justIcon="true"
                                color="danger"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() =>
                                  deleteDivCityArea(city_id, "City")
                                }
                              >
                                <DeleteIcon className={classes.icon} />
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
                    )}
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} styles={{ display: "flex" }}>
                  <h4 className={classes.cardIconTitle}>+ Add New City</h4>
                  <CustomInput
                    labelText="City Name"
                    id="city-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: newCityName || "",
                      onChange: (event) => setNewCityName(event.target.value),
                      maxLength: "100",
                    }}
                  />
                  <Button
                    color="info"
                    size="sm"
                    round
                    className={classes.lastButton}
                    onClick={() => saveCity()}
                  >
                    Save
                  </Button>
                </GridItem>
              </GridContainer>

              <br />
              <br />

              {/* Area */}
              <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                  <h4 className={classes.cardIconTitle}>
                    List Of Areas Under {selectedCityName} City
                  </h4>

                  <br />
                  <div style={{ height: "45vh", overflowY: "scroll" }}>
                    {useEmptyObjCheck(areaList) && (
                      <Table
                        tableHead={["#", "Name", "Cost", "Actions"]}
                        tableData={areaList.map((area) => {
                          const { area_id, area_name, delivery_cost } = area;
                          return [
                            area_id,
                            area_name,
                            delivery_cost,
                            <div
                              key={area_id}
                              style={{ width: "10px", display: "flex" }}
                            >
                              <Button
                                style={{ margin: "2px" }}
                                round
                                size="sm"
                                justIcon="true"
                                color="rose"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() =>
                                  editAreaNameClick(area_id, area_name)
                                }
                              >
                                <Edit className={classes.icon} />
                              </Button>
                              <Button
                                style={{ margin: "2px" }}
                                round
                                size="sm"
                                justIcon="true"
                                color="danger"
                                className={
                                  classes.actionButton +
                                  " " +
                                  classes.actionButtonRound
                                }
                                onClick={() =>
                                  deleteDivCityArea(area_id, "Area")
                                }
                              >
                                <DeleteIcon className={classes.icon} />
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
                    )}
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} styles={{ display: "flex" }}>
                  <h4 className={classes.cardIconTitle}>+ Add New Area</h4>
                  <CustomInput
                    labelText="Area Name"
                    id="area-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: newAreaName || "",
                      onChange: (event) => setNewAreaName(event.target.value),
                      maxLength: "50",
                    }}
                  />
                  <CustomInput
                    labelText="Delivery Cost"
                    id="delivery-cost"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: newAreaDeliveryConst || "",
                      onChange: (event) =>
                        setNewAreaDeliveryConst(event.target.value),
                      maxLength: "6",
                    }}
                  />
                  <Button
                    color="info"
                    size="sm"
                    round
                    className={classes.lastButton}
                    onClick={() => saveArea()}
                  >
                    Save
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default AreaManagement;
