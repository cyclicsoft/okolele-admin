/*eslint-disable*/
import React, { useState, useEffect } from "react";
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
import { swDataSetter } from "components/OkoleleComponents/ProductMgmt/CreateUpdate/DataMapping/swDataSetter";
import VariantsUpdate from "components/OkoleleComponents/ProductMgmt/CreateUpdate/VariantsUpdate";
import Models from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Models";
import OtherDetails from "components/OkoleleComponents/ProductMgmt/CreateUpdate/OtherDetails";

const useStyles = makeStyles(styles);

export default function UpdateSmartWatch({ editProductId, prodDetails }) {
  console.log(
    "%cUpdateSmartWatch.js line:51 prodDetails",
    "color: #007acc;",
    prodDetails
  );
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
  const [prodData, setProdData] = useState({
    name: "",
    prodType: 3,
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
    otherDetails: [],
  });

  useEffect(() => {
    const data = swDataSetter(prodDetails);
    setProdData(data);
  }, [prodDetails]);

  // Product create confirmation popup viewar
  const [showProductUpdatePopup, setShowProductUpdatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const swDetails = {
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
    others: prodData.otherDetails,
  };

  const swUpdateClick = () => {
    setShowProductUpdatePopup(true);
  };
  // Product Create Flag From Modal
  const productUpdateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        updateSw();
      } else {
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          updateSw();
        });
      }
    }

    setShowHttpResponseMsg(false);
    setShowProductUpdatePopup(false);
  };

  const updateSw = () => {
    console.log("updateSw/swDetails: ", swDetails);
    const swUpdateAPI = rootPath[0] + "/smartwatches/" + editProductId;

    axios
      .put(swUpdateAPI, swDetails, config)
      .then(function (response) {
        console.log("update response: ", response);
        // console.log("response code: ", response.status);
        // setHttpResponseCode(response.status);
        // setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        // setHttpResponseCode(error.response.status);
        // setShowHttpResponseMsg(true);
      });
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
        {showProductUpdatePopup ? (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productUpdateFlagFromModal}
          />
        ) : null}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg === true ? (
          <HttpStatusCode responseCode={httpResponseCode} />
        ) : null}
      </div>

      <h4 className={classes.cardIconTitle}>Update Smart Watch</h4>

      {/* GeneralInfo */}
      <GeneralInfo prodData={prodData} setProdData={setProdData} />
      {/* Variants */}
      <VariantsUpdate prodData={prodData} setProdData={setProdData} />
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
      {/* Comms */}
      <Comms prodData={prodData} setProdData={setProdData} />
      {/* Features */}
      <Features prodData={prodData} setProdData={setProdData} />
      {/* Battery */}
      <Battery prodData={prodData} setProdData={setProdData} />
      {/* Misc */}
      <Models prodData={prodData} setProdData={setProdData} />
      {/* Tests */}
      <Tests prodData={prodData} setProdData={setProdData} />
      {/* OtherDetails */}
      <OtherDetails prodData={prodData} setProdData={setProdData} />

      {/* Update Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={swUpdateClick}
      >
        Update
      </Button>
    </>
  );
}
