import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
// SCSS File
import "../../assets/scss/ghorwali-scss/appPrivacy.scss";
import { apiHeader } from "services/helper-function/api-header";

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
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

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
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    if (headers) {
      getAreas();
    }
  }, []);

  const getAreas = () => {
    const areaListAPI = rootPath + "/area";

    axios
      .get(areaListAPI, headers)
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
    const addDivisionAPI =
      rootPath + "/area/division?div_name=" + newDivisionName;

    axios
      .post(addDivisionAPI, {}, headers)
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
    const addCityAPI =
      rootPath +
      "/area/cities?div_id=" +
      selectedDivId +
      "&city_name=" +
      newCityName;

    axios
      .post(addCityAPI, {}, headers)
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
    const addAreaAPI =
      rootPath +
      "/area/areas?div_id=" +
      selectedDivId +
      "&city_id=" +
      selectedCityId +
      "&area_name=" +
      newAreaName +
      "&delivery_cost=" +
      newAreaDeliveryConst;

    axios
      .post(addAreaAPI, {}, headers)
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
    let updateAPI = "";
    if (toUpdate === "Division") {
      updateAPI =
        rootPath +
        "/area/division/" +
        updatedDivId +
        "?div_name=" +
        nameToUpdate;
    } else if (toUpdate === "City") {
      updateAPI =
        rootPath +
        "/area/cities/" +
        updatedCityId +
        "?div_id=" +
        selectedDivId +
        "&city_name=" +
        nameToUpdate;
    } else if (toUpdate === "Area") {
      updateAPI =
        rootPath +
        "/area/areas/" +
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
      .put(updateAPI, {}, headers)
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
      })
      .catch(function (error) {
        console.log("After Update error", error);
      });

    setIsOpen(false);
  };

  const deleteDivCityArea = (id, type) => {
    let deleteAPI = "";
    if (type === "Division") {
      deleteAPI = rootPath + "/area/division/" + id;
    } else if (type === "City") {
      deleteAPI = rootPath + "/area/cities/" + id + "?div_id=" + selectedDivId;
    } else if (type === "Area") {
      deleteAPI =
        rootPath +
        "/area/areas/" +
        id +
        "?div_id=" +
        selectedDivId +
        "&city_id=" +
        selectedCityId;
    }

    axios
      .delete(deleteAPI, headers)
      .then(function (response) {
        console.log("After Delete...: ", response);
      })
      .catch(function (error) {
        console.log("After Delete error", error);
      });

    setIsOpen(false);
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
