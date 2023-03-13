/*eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
// Global State
import { useGlobalState } from "state-pool";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import moment from "moment";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
toast.configure();

import GeneralInfo from "components/OkoleleComponents/ProductMgmt/CreateUpdate/GeneralInfo";
import { enums } from "services/enum/enums";
import Network from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Network";
import Launch from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Launch";
import Body from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Body";
import Display from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Display";
import Platform from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Platform";
import Memory from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Memory";
import MainCam from "components/OkoleleComponents/ProductMgmt/CreateUpdate/MainCam";
import SelfiCam from "components/OkoleleComponents/ProductMgmt/CreateUpdate/SelfiCam";
import Sound from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Sound";
import Comms from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Comms";
import Features from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Features";
import Battery from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Battery";
import Misc from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Misc";
import Tests from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Tests";
import Variants from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Variants";
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

const useStyles = makeStyles(styles);

function CreatePhone() {
  const classes = useStyles();
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  var accessTknValidity = new Date(userToken.tokenValidity);
  var refreshTknValidity = new Date(userToken.refreshTokenValidity);
  const refreshTkn = {
    refreshToken: userToken.refreshToken,
  };
  // API Header
  let config = {
    headers: {
      Authorization: "Bearer " + userToken.token,
    },
  };
  // Product Info
  // Bulk Upload
  const [csvFile, setCsvFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [prodData, setProdData] = useState({
    name: "",
    prodType: 1,
    discountType: enums.discountType[0],
    discountValue: 0,
    brand: "1101",
    warranty: 0,
    productAllVariants: [],
    technology: "",
    speed: "",
    band2G: [],
    band3G: [],
    band4G: [],
    band5G: [],
    announceDate: new Date(),
    releaseDate: new Date(),
    dimension: "",
    weight: "",
    build: "",
    sim: "",
    displayType: "",
    displaySize: "",
    resolution: "",
    protection: "",
    os: "",
    chipset: "",
    cpu: "",
    gpu: "",
    cardSlot: "",
    internalStorage: "",
    mainCams: [],
    mainCamFeatures: [],
    mainCamVideos: [],
    frontCams: [],
    frontCamFeatures: [],
    frontCamVideos: [],
    loudSpeaker: "",
    jack: "",
    wlan: "",
    bluetooth: "",
    gps: "",
    nfc: "",
    radio: "",
    usb: "",
    sensors: [],
    batteryType: "",
    charging: "",
    sar: "",
    sarEu: "",
    models: [],
    performances: [],
  });

  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const phoneDetails = {
    category: prodData.prodType,
    title: prodData.name,
    brand: prodData.brand,
    warranty: prodData.warranty,
    technology: prodData.technology,
    m2GBands: prodData.band2G,
    m3GBands: prodData.band3G,
    m4GBands: prodData.band4G,
    m5GBands: prodData.band5G,
    speed: prodData.speed,
    dimension: prodData.dimension,
    weight: prodData.weight,
    build: prodData.build,
    announceDate: moment(prodData.announceDate).format("YYYY-MM-DD"),
    releaseDate: moment(prodData.releaseDate).format("YYYY-MM-DD"),
    sim: prodData.sim,
    displayType: prodData.displayType,
    displaySize: prodData.displaySize,
    displayResolution: prodData.resolution,
    displayProtection: prodData.protection,
    os: prodData.os,
    chipset: prodData.chipset,
    cpu: prodData.cpu,
    gpu: prodData.gpu,
    cardSlot: prodData.cardSlot,
    internalSlot: prodData.internalStorage,
    mainCamera: prodData.mainCams,
    mainCameraFeatures: prodData.mainCamFeatures,
    mainCameraVideo: prodData.mainCamVideos,
    frontCamera: prodData.frontCams,
    frontCameraFeatures: prodData.frontCamFeatures,
    frontCameraVideo: prodData.frontCamVideos,
    loudspeaker: prodData.loudSpeaker,
    jack: prodData.jack,
    wlan: prodData.wlan,
    bluetooth: prodData.bluetooth,
    gps: prodData.gps,
    nfc: prodData.nfc,
    radio: prodData.radio,
    usb: prodData.usb,
    sensors: prodData.sensors,
    batteryType: prodData.batteryType,
    batteryCharging: prodData.charging,
    models: prodData.models,
    sarEu: prodData.sarEu,
    sarUs: prodData.sar,
    performances: prodData.performances,
    discount: {
      type: prodData.discountType,
      value: prodData.discountValue,
    },
    variants: prodData.productAllVariants,
  };

  const phoneSaveClick = () => {
    setShowProductCreatePopup(true);
  };
  // Product Create Flag From Modal
  const productCreateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        saveNewPhone();
      } else {
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          saveNewPhone();
        });
      }
    }

    setShowHttpResponseMsg(false);
    setShowProductCreatePopup(false);
  };

  const saveNewPhone = () => {
    console.log("saveNewPhone/phoneDetails: ", phoneDetails);
    const phoneCreateAPI = rootPath[0] + "/mobiles";
    axios
      .post(phoneCreateAPI, phoneDetails, config)
      .then(function (response) {
        setHttpResponseCode(response.status);
        setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  };

  // Bulk Upload
  const setFile = (event) => {
    setCsvFile(event.target.files[0]);

    var files = event.target.files;
    var filesArray = [].slice.call(files);
    filesArray.forEach((event) => {
      setFileSize(Math.round(event.size / 1024));
    });
  };
  const bulkUploadHandler = () => {
    //Get file extension from file name
    const split_name = csvFile.name.split(".");
    const type = split_name[split_name.length - 1];

    //create a blob from file calling mime type injection function
    const blob = new Blob([csvFile], { type: mimeType(type) });

    //Here you can use the file as you wish
    const new_file = blobToFile(blob, "csv");

    const data = new FormData();
    data.append("file", new_file);
    data.append("productType", "MOBILE");

    const csvConfig = {
      headers: {
        "content-type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: "Bearer " + userToken.token,
      },
    };

    const bulkUploadAPI = rootPath[0] + "/products/bulkdata";

    axios
      .post(bulkUploadAPI, data, csvConfig)
      .then(function (response) {})
      .catch(function (error) {});
  };
  //Inject mimeType By extension - Excel files check only
  const mimeType = (extension) => {
    switch (extension) {
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      case "xls":
        return "application/vnd.ms-excel";

      default:
        return "text/csv";
    }
  };
  //Convert Blob to File
  const blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;

    return theBlob;
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      const refreshTokenAPI = rootPath[0] + "/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
          } else {
            updateUserToken(function (accessToken) {
              accessToken.token = response.data.token;
              accessToken.tokenValidity = response.data.tokenValidity;
              accessToken.refreshToken = response.data.refreshToken;
              accessToken.refreshTokenValidity =
                response.data.refreshTokenValidity;
            });
            return true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // Logout forcefully from here
      try {
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      <div>
        {/* Confirmation Modal */}
        {showProductCreatePopup ? (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productCreateFlagFromModal}
          />
        ) : null}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg === true ? (
          <HttpStatusCode responseCode={httpResponseCode} />
        ) : null}
      </div>

      {/* Bulk Phone Upload  */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              {/* <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon> */}
              <h4 className={classes.cardIconTitle}>Bulk Upload</h4>
            </CardHeader>
            <CardBody>
              {/* Bulk Phone Upload  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Select CSV"
                    id="select-csv"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "file",
                      onChange: (event) => setFile(event),
                    }}
                  />
                </GridItem>
                {/* Upload button */}
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    color="rose"
                    style={{ marginTop: "20px" }}
                    className={classes.updateProfileButton}
                    onClick={bulkUploadHandler}
                  >
                    Upload CSV
                  </Button>
                </GridItem>
              </GridContainer>

              {fileSize > 0 ? (
                <GridContainer>
                  <GridItem>
                    <div>File Size: {fileSize} KB</div>
                  </GridItem>
                </GridContainer>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <h4 className={classes.cardIconTitle}>Create New Phone</h4>
      {/* Reset & Search To Clone */}
      <div style={{ display: "flex" }}>
        {/* Reset */}
        <div className="resetIcon-container">
          {/* <RefreshIcon className="reset-input" onClick={inputsResetHandler} />{" "} */}
          Reset A~Z
        </div>

        {/* Search To Clone */}
        {/* <SearchToClone
          getSearchedProduct={getSearchedProduct}
          productType={"mobiles"}
        /> */}
      </div>

      {/* GeneralInfo */}
      <GeneralInfo prodData={prodData} setProdData={setProdData} />
      {/* Variants */}
      <Variants prodData={prodData} setProdData={setProdData} />
      {/* Network */}
      <Network prodData={prodData} setProdData={setProdData} />
      {/* Launch */}
      <Launch prodData={prodData} setProdData={setProdData} />
      {/* Launch */}
      <Body prodData={prodData} setProdData={setProdData} />
      {/* Display */}
      <Display prodData={prodData} setProdData={setProdData} />
      {/* Platform */}
      <Platform prodData={prodData} setProdData={setProdData} />
      {/* Memory */}
      <Memory prodData={prodData} setProdData={setProdData} />
      {/* MainCam */}
      <MainCam prodData={prodData} setProdData={setProdData} />
      {/* SelfiCam */}
      <SelfiCam prodData={prodData} setProdData={setProdData} />
      {/* Sound */}
      <Sound prodData={prodData} setProdData={setProdData} />
      {/* Comms */}
      <Comms prodData={prodData} setProdData={setProdData} />
      {/* Features */}
      <Features prodData={prodData} setProdData={setProdData} />
      {/* Battery */}
      <Battery prodData={prodData} setProdData={setProdData} />
      {/* Misc */}
      <Misc prodData={prodData} setProdData={setProdData} />
      {/* Tests */}
      <Tests prodData={prodData} setProdData={setProdData} />

      {/* Save Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={phoneSaveClick}
      >
        Save
      </Button>
    </>
  );
}

export default CreatePhone;
