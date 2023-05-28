/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
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
import { apiHeader } from "services/helper-function/api-header";
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import VariantsContainer from "components/OkoleleComponents/ProductMgmt/CreateUpdate/VariantsContainer";

const useStyles = makeStyles(styles);

function CreatePhone() {
  const classes = useStyles();

  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();

  // Product Info
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

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  const phoneSaveClick = () => {
    setShowProductCreatePopup(true);
  };
  // Product Create Flag From Modal
  const productCreateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      saveNewPhone();
    }

    setShowHttpResponseMsg(false);
    setShowProductCreatePopup(false);
  };

  const saveNewPhone = () => {
    // console.log("saveNewPhone/phoneDetails: ", phoneDetails);
    const phoneCreateAPI = rootPath + "/mobiles";
    axios
      .post(phoneCreateAPI, phoneDetails, headers)
      .then(function (response) {
        setHttpResponseCode(response.status);
        setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  };

  return (
    <>
      <div>
        {/* Confirmation Modal */}
        {showProductCreatePopup && (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productCreateFlagFromModal}
          />
        )}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg && (
          <HttpStatusCode responseCode={httpResponseCode} />
        )}
      </div>

      <h4 className={classes.cardIconTitle}>Create New Phone</h4>
      {/* Reset & Search To Clone */}
      <div style={{ display: "flex" }}>
        {/* Reset */}
        <div className="resetIcon-container">
          {/* <RefreshIcon className="reset-input" onClick={inputsResetHandler} />{" "} */}
          Reset A~Z
        </div>
      </div>

      {/* GeneralInfo */}
      <GeneralInfo prodData={prodData} setProdData={setProdData} />
      {/* Variants */}
      <VariantsContainer prodData={prodData} setProdData={setProdData} />
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
