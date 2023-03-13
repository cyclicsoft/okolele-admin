/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";

// material-ui icons
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LaunchIcon from "@mui/icons-material/Launch";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import HardwareIcon from "@mui/icons-material/Hardware";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraRearIcon from "@mui/icons-material/CameraRear";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SpeedIcon from "@mui/icons-material/Speed";
import RefreshIcon from "@mui/icons-material/Refresh";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
// Date
// import "date-fns";
// import DateValidate from "views/DatePicker/DateValidate";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
// Data formatter
import moment from "moment";

// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";

import SearchToClone from "../CloneProducts/SearchToClone";
import DynamicElementCreator from "../DynamicElementCreator";
import ProductVariants from "../ProductVariants";
import ProductUpdateWarning from "views/ConfirmationModals/ProductUpdateWarning";
// toast-configuration method,
// it is compulsory method.
toast.configure();

const useStyles = makeStyles(styles);

function UpdateTab(props) {
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
  // Basic
  const [category, setCategory] = useState("2"); //category 1 is fixed for phone
  const [mName, setmName] = useState("");
  const [mDiscountType, setmDiscountType] = useState("FLAT");
  const [mDiscountValue, setmDiscountValue] = useState(0);
  const [mBrandName, setmBrandName] = useState("1101");
  const [mWarranty, setmWarranty] = useState(0);
  const [userComments, setUserComments] = useState([]);
  const [isPublished, setPsPublished] = useState(false);
  // NETWORK
  const [mTechnology, setmTechnology] = useState("");
  const [m2GBand, setm2GBand] = useState([]);
  const [m3GBand, setm3GBand] = useState([]);
  const [m4GBand, setm4GBand] = useState([]);
  const [m5GBand, setm5GBand] = useState([]);
  const [mSpeed, setmSpeed] = useState("");
  // LAUNCH
  const [mAnnounchDate, setmAnnounchDate] = useState(new Date());
  const [mReleaseDate, setmReleaseDate] = useState(new Date());
  // BODY
  const [mDimension, setmDimension] = useState("");
  const [mWeight, setmWeight] = useState("");
  const [mBuild, setmBuild] = useState("");
  const [mSim, setmSim] = useState("");
  // DISPLAY
  const [mDisplayType, setmDisplayType] = useState("");
  const [mSize, setmSize] = useState("");
  const [mResolution, setmResolution] = useState("");
  const [mProtection, setmProtection] = useState("");
  // PLATFORM
  const [mOS, setmOS] = useState("");
  const [mChipset, setmChipset] = useState("");
  const [mCPU, setmCPU] = useState("");
  const [mGPU, setmGPU] = useState("");
  // MEMORY
  const [mCardSlot, setmCardSlot] = useState("");
  const [mInternal, setmInternal] = useState("");
  // MAIN CAMERA
  const [mainCams, setMainCams] = useState([]);
  const [mainCamFeatures, setMainCamFeatures] = useState([]);
  const [mainCamVideos, setMainCamVideos] = useState([]);
  // SELFIE CAMERA
  const [frontCams, setFrontCams] = useState([]);
  const [frontCamFeatures, setFrontCamFeatures] = useState([]);
  const [frontCamVideos, setFrontCamVideos] = useState([]);
  // SOUND
  const [mLoudSpeaker, setmLoudSpeaker] = useState("");
  const [mJack, setmJack] = useState("");
  // COMMS
  const [mWlan, setmWlan] = useState("");
  const [mBlueTooth, setmBlueTooth] = useState("");
  const [mGPS, setmGPS] = useState("");
  const [mNFC, setmNFC] = useState("");
  const [mRadio, setmRadio] = useState("");
  const [mUSB, setmUSB] = useState("");
  // FEATURES
  const [sensors, setSensors] = useState([]);
  // BATTERY
  const [mBatteryType, setmBatteryType] = useState("");
  const [mBatteryCharging, setmBatteryCharging] = useState("");
  // MISC
  const [models, setModels] = useState([]);
  const [mSar, setmSar] = useState("");
  const [mSarEu, setmSarEu] = useState("");
  // TESTS
  const [performances, setPerformances] = useState([]);
  // product All Variants
  const [productAllVariants, setProductAllVariants] = useState([]);

  // Data loader flag
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // Product update confirmation popup viewar
  const [showProductUpdatePopup, setShowProductUpdatePopup] = useState(false); // Http Response Msg
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");
  // Preview and Crop Img
  const [shouldPreview, setShouldPreview] = useState(false);
  const [imgIdToPreview, setImgIdToPreview] = useState("");

  useEffect(() => {
    const tabDetailsAPI = rootPath[0] + "/tablets/" + props.editProductId;

    axios
      .get(tabDetailsAPI)
      .then(function (response) {
        console.log("axios / Product Details: ", response);
        setIsDataLoaded(false);

        setCategory(response.data.content.category);
        // Basic
        setmName(response.data.content.title);
        setmDiscountType(response.data.content.discount.type);
        setmDiscountValue(response.data.content.discount.value);
        if (response.data.content.brand === "SAMSUNG") {
          setmBrandName(1101);
        } else if (response.data.content.brand === "APPLE") {
          setmBrandName(1102);
        } else if (response.data.content.brand === "XIAOMI") {
          setmBrandName(1103);
        } else if (response.data.content.brand === "REALME") {
          setmBrandName(1104);
        } else if (response.data.content.brand === "ONEPLUS") {
          setmBrandName(1105);
        } else if (response.data.content.brand === "WALTON") {
          setmBrandName(1106);
        } else if (response.data.content.brand === "SYMPHONY") {
          setmBrandName(1107);
        } else if (response.data.content.brand === "OPPO") {
          setmBrandName(1108);
        } else if (response.data.content.brand === "NOKIA") {
          setmBrandName(1109);
        } else if (response.data.content.brand === "VIVO") {
          setmBrandName(1110);
        } else if (response.data.content.brand === "HUAWEI") {
          setmBrandName(1111);
        } else if (response.data.content.brand === "TECNO") {
          setmBrandName(1112);
        } else if (response.data.content.brand === "INFINIX") {
          setmBrandName(1113);
        } else if (response.data.content.brand === "GOOGLE") {
          setmBrandName(1114);
        } else if (response.data.content.brand === "HONOR") {
          setmBrandName(1115);
        } else if (response.data.content.brand === "SONY") {
          setmBrandName(1116);
        } else if (response.data.content.brand === "ASUS") {
          setmBrandName(1117);
        } else if (response.data.content.brand === "UMIDIGI") {
          setmBrandName(1118);
        } else if (response.data.content.brand === "MICROMAX") {
          setmBrandName(1119);
        } else if (response.data.content.brand === "MAXIMUS") {
          setmBrandName(1120);
        } else if (response.data.content.brand === "LG") {
          setmBrandName(1121);
        } else if (response.data.content.brand === "HTC") {
          setmBrandName(1122);
        } else if (response.data.content.brand === "LAVA") {
          setmBrandName(1123);
        } else if (response.data.content.brand === "HELIO") {
          setmBrandName(1124);
        } else if (response.data.content.brand === "ALCATEL") {
          setmBrandName(1125);
        } else if (response.data.content.brand === "LENOVO") {
          setmBrandName(1126);
        } else if (response.data.content.brand === "OKAPIA") {
          setmBrandName(1127);
        } else if (response.data.content.brand === "MYCELL") {
          setmBrandName(1128);
        } else if (response.data.content.brand === "ITEL") {
          setmBrandName(1129);
        }

        setmWarranty(response.data.content.warranty);
        setUserComments(response.data.content.comments);

        setPsPublished(response.data.content.published);

        // NETWORK
        setmTechnology(response.data.content.technology);
        setm2GBand(response.data.content.m2GBands);
        setm3GBand(response.data.content.m3GBands);
        setm4GBand(response.data.content.m4GBands);
        setm5GBand(response.data.content.m5GBands);
        setmSpeed(response.data.content.speed);
        // LAUNCH
        setmAnnounchDate(response.data.content.announceDate);
        setmReleaseDate(response.data.content.releaseDate);
        // BODY
        setmDimension(response.data.content.dimension);
        setmWeight(response.data.content.weight);
        setmBuild(response.data.content.build);
        setmSim(response.data.content.sim);
        // DISPLAY
        setmDisplayType(response.data.content.displayType);
        setmSize(response.data.content.displaySize);
        setmResolution(response.data.content.displayResolution);
        setmProtection(response.data.content.displayProtection);
        // PLATFORM
        setmOS(response.data.content.os);
        setmChipset(response.data.content.chipset);
        setmCPU(response.data.content.cpu);
        setmGPU(response.data.content.gpu);
        // MEMORY
        setmCardSlot(response.data.content.cardSlot);
        setmInternal(response.data.content.internalSlot);
        // MAIN CAMERA
        setMainCams(response.data.content.mainCamera);
        setMainCamFeatures(response.data.content.mainCameraFeatures);
        setMainCamVideos(response.data.content.mainCameraVideo);
        // SELFIE CAMERA
        setFrontCams(response.data.content.frontCamera);
        setFrontCamFeatures(response.data.content.frontCameraFeatures);
        setFrontCamVideos(response.data.content.frontCameraVideo);
        // SOUND
        setmLoudSpeaker(response.data.content.loudspeaker);
        setmJack(response.data.content.jack);
        // COMMS
        setmWlan(response.data.content.wlan);
        setmBlueTooth(response.data.content.bluetooth);
        setmGPS(response.data.content.gps);
        setmNFC(response.data.content.nfc);
        setmRadio(response.data.content.radio);
        setmUSB(response.data.content.usb);
        // FEATURES
        setSensors(response.data.content.sensors);
        // BATTERY
        setmBatteryType(response.data.content.batteryType);
        setmBatteryCharging(response.data.content.batteryCharging);
        // MISC
        setModels(response.data.content.models);
        setmSar(response.data.content.sarUs);
        setmSarEu(response.data.content.sarEu);
        // TESTS
        setPerformances(response.data.content.performances);

        // Variants
        setProductAllVariants(response.data.content.variants);

        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  }, [props.editProductId]);

  // Dynamic Elements Handler
  const band2gHandler = (callBackData) => {
    setm2GBand(callBackData);
  };
  const band3gHandler = (callBackData) => {
    setm3GBand(callBackData);
  };
  const band4gHandler = (callBackData) => {
    setm4GBand(callBackData);
  };
  const band5gHandler = (callBackData) => {
    setm5GBand(callBackData);
  };
  const mainCamsHandler = (callBackData) => {
    console.log("Main Camera: ", callBackData);
    setMainCams(callBackData);
  };
  const mainCamFeatureHandler = (callBackData) => {
    setMainCamFeatures(callBackData);
  };
  const mainCamVideosHandler = (callBackData) => {
    setMainCamVideos(callBackData);
  };
  const frontCamsHandler = (callBackData) => {
    setFrontCams(callBackData);
  };
  const frontCamFeatureHandler = (callBackData) => {
    setFrontCamFeatures(callBackData);
  };
  const frontCamVideosHandler = (callBackData) => {
    setFrontCamVideos(callBackData);
  };
  const sensorsHandler = (callBackData) => {
    setSensors(callBackData);
  };
  const modelsHandler = (callBackData) => {
    setModels(callBackData);
  };
  const performanceHandler = (callBackData) => {
    setPerformances(callBackData);
  };

  const productVariantsSetter = (response) => {
    console.log("productVariantsSetter/All Variants: ", response);
    setProductAllVariants(response);
  };

  const tabDetails = {
    category: category,
    title: mName,
    brand: mBrandName,
    warranty: mWarranty,
    technology: mTechnology,
    m2GBands: m2GBand,
    m3GBands: m3GBand,
    m4GBands: m4GBand,
    m5GBands: m5GBand,
    speed: mSpeed,
    dimension: mDimension,
    weight: mWeight,
    build: mBuild,
    announceDate: moment(mAnnounchDate).format("YYYY-MM-DD"),
    releaseDate: moment(mReleaseDate).format("YYYY-MM-DD"),
    sim: mSim,
    displayType: mDisplayType,
    displaySize: mSize,
    displayResolution: mResolution,
    displayProtection: mProtection,
    os: mOS,
    chipset: mChipset,
    cpu: mCPU,
    gpu: mGPU,
    cardSlot: mCardSlot,
    internalSlot: mInternal,
    mainCamera: mainCams,
    mainCameraFeatures: mainCamFeatures,
    mainCameraVideo: mainCamVideos,
    frontCamera: frontCams,
    frontCameraFeatures: frontCamFeatures,
    frontCameraVideo: frontCamVideos,
    loudspeaker: mLoudSpeaker,
    jack: mJack,
    wlan: mWlan,
    bluetooth: mBlueTooth,
    gps: mGPS,
    nfc: mNFC,
    radio: mRadio,
    usb: mUSB,
    sensors: sensors,
    batteryType: mBatteryType,
    batteryCharging: mBatteryCharging,
    models: models,
    sarEu: mSarEu,
    sarUs: mSar,
    performances: performances,
    discount: {
      type: mDiscountType,
      value: mDiscountValue,
    },
    variants: productAllVariants,
  };

  // phone update Handler
  const tabUpdateClick = () => {
    setShowProductUpdatePopup(true);
  };

  // Product Update Flag From Modal
  const productUpdateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        console.log(
          "accessTknValidity.getTime() > currentLocalDateTime.getTime()"
        );
        tabUpdate();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          tabUpdate();
        });
      }
    }
    setShowProductUpdatePopup(false);
  };
  const tabUpdate = () => {
    console.log("tabUpdate/tabDetails >>>", tabDetails);

    console.log("tabUpdate/config >>>", config);

    const tabUpdateAPI = rootPath[0] + "/tablets/" + props.editProductId;

    console.log("tabUpdate/tabUpdateAPI >>>", tabUpdateAPI);
    axios
      .put(tabUpdateAPI, tabDetails, config)
      .then(function (response) {
        // console.log("update response: ", response);
        // console.log("response code: ", response.status);
        // if(response.status === 200){
        //   setHttpResponseCode(response.status);
        // setShowHttpResponseMsg(true);
        // }
        setHttpResponseCode(response.status);
        setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        console.log("tabUpdate/error >> ", error);
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  };

  // inputs Reset Handler
  const inputsResetHandler = () => {
    // GeneralInfo
    resetGeneralInfo();
    // Variants
    resetVariants();
    // NETWORK
    resetNetworks();
    // LAUNCH
    resetLaunch();
    // BODY
    resetBody();
    // DISPLAY
    resetDisplay();
    // PLATFORM
    resetPlatform();
    // MEMORY
    resetMemory();
    // MAIN CAMERA
    resetMainCams();
    // SELFIE CAMERA
    resetFrontCams();
    // SOUND
    resetSound();
    // COMMS
    resetComms();
    // FEATURES
    resetFeatures();
    // BATTERY
    resetBattery();
    // MISC
    resetMisc();
    // TESTS
    resetTests();
  };

  const resetGeneralInfo = () => {
    setCategory("2");
    setmName("");
    setmDiscountType("FLAT");
    setmDiscountValue(0);
    setmBrandName("1101");
    setmWarranty(0);
  };

  const resetVariants = () => {
    setProductAllVariants([]);
  };

  const resetNetworks = () => {
    setmTechnology("");
    setm2GBand([]);
    setm3GBand([]);
    setm4GBand([]);
    setm5GBand([]);
    setmSpeed("");
  };

  const resetLaunch = () => {
    setmAnnounchDate(new Date());
    setmReleaseDate(new Date());
  };

  const resetBody = () => {
    setmDimension("");
    setmWeight("");
    setmBuild("");
    setmSim("");
  };

  const resetDisplay = () => {
    setmDisplayType("");
    setmSize("");
    setmResolution("");
    setmProtection("");
  };

  const resetPlatform = () => {
    setmOS("");
    setmChipset("");
    setmCPU("");
    setmGPU("");
  };

  const resetMemory = () => {
    setmCardSlot("");
    setmInternal("");
  };

  const resetMainCams = () => {
    setMainCams([]);
    setMainCamFeatures([]);
    setMainCamVideos([]);
  };

  const resetFrontCams = () => {
    setFrontCams([]);
    setFrontCamFeatures([]);
    setFrontCamVideos([]);
  };

  const resetSound = () => {
    setmLoudSpeaker("");
    setmJack("");
  };

  const resetComms = () => {
    setmWlan("");
    setmBlueTooth("");
    setmGPS("");
    setmNFC("");
    setmRadio("");
    setmUSB("");
  };

  const resetFeatures = () => {
    setSensors([]);
  };

  const resetBattery = () => {
    setmBatteryType("");
    setmBatteryCharging("");
  };

  const resetMisc = () => {
    setModels([]);
    setmSar("");
    setmSarEu("");
  };

  const resetTests = () => {
    setPerformances([]);
  };

  // remove Comment from front end ( remove from userComments variable)
  const deleteComment = (msg) => {
    console.log("userComments: ", userComments);
    setUserComments(userComments.filter((item) => item.msg !== msg));
  };
  // Update Comment in DB after removing comments from userComments variable
  const commentsUpdateHandler = () => {
    const commentsUpdateAPI =
      rootPath[0] + "/tablets/deleteComment/" + props.editProductId;

    axios
      .post(commentsUpdateAPI, userComments)
      .then(function (response) {
        console.log("commentsUpdateAPI response: ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      // console.log(
      //   "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      // );
      const refreshTokenAPI = rootPath[0] + "/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          // console.log("Refresh token response: ", response);
          // console.log("Status Code: ", response.status);

          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
            try {
              localStorage.clear();
              window.location.href = "/";
            } catch (e) {
              console.log(e.message);
            }
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
          // console.log("Status Code: ", error.response.status);
          console.log(error);
        });
    } else {
      // console.log(
      //   "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      // );
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
          <ProductUpdateWarning
            productUpdateFlagFromModal={productUpdateFlagFromModal}
          />
        ) : null}
        {/* Show HTTP response code  */}
        {showHttpResponseMsg === true ? (
          <HttpStatusCode responseCode={httpResponseCode} />
        ) : null}
      </div>

      <h4 className={classes.cardIconTitle}>Update Tablet</h4>
      {/* Reset & Search To Clone */}
      <div style={{ display: "flex" }}>
        {/* Reset */}
        <div className="resetIcon-container">
          <RefreshIcon className="reset-input" onClick={inputsResetHandler} />{" "}
          Reset A~Z
        </div>
      </div>

      {/* [GENERAL INFO] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <AcUnitIcon />
                  <p className="sectionPara">[GENERAL INFO]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetGeneralInfo}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Name & Product Type  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Product Name"
                    id="product-name"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mName || "",
                      onChange: (event) => setmName(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>

                {/* Category 1 is fixed for Phone type */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Product Category "
                    id="product-category"
                    disabled="true"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: category || "",
                      // onChange: (event) => setCategory(event.target.value),
                      maxLength: "5",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Discount Type, Discount Value, Warranty & Brand  */}
              <GridContainer>
                {/* Discount Type */}
                <GridItem xs={12} sm={12} md={3} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                      style={{ fontSize: "14px" }}
                    >
                      Discount Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      style={{ fontSize: "14px" }}
                      value={mDiscountType || " "}
                      onChange={(event) => setmDiscountType(event.target.value)}
                      label="Brand Name"
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={"FLAT"}>Flat (৳)</MenuItem>
                      <MenuItem value={"PERCENTAGE"}>Percentage (%)</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>

                {/* Discount Value */}
                {mDiscountType !== "" ? (
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Discount Value"
                      id="discount-value"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mDiscountValue || 0,

                        onChange: (event) =>
                          setmDiscountValue(event.target.value),
                        // maxLength: "3",
                      }}
                    />
                  </GridItem>
                ) : null}

                {/* Brand*/}
                <GridItem xs={12} sm={12} md={3} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                      style={{ fontSize: "14px" }}
                    >
                      Brand Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      style={{ fontSize: "14px" }}
                      value={mBrandName || " "}
                      onChange={(event) => setmBrandName(event.target.value)}
                      label="Brand Name"
                      // style={{ maxHeight: "100px", overflowY: "scroll" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"1101"}>SAMSUNG</MenuItem>
                      <MenuItem value={"1102"}>APPLE</MenuItem>
                      <MenuItem value={"1103"}>XIAOMI</MenuItem>
                      <MenuItem value={"1104"}>REALME</MenuItem>
                      <MenuItem value={"1105"}>ONEPLUS</MenuItem>
                      <MenuItem value={"1106"}>WALTON</MenuItem>
                      <MenuItem value={"1107"}>SYMPHONY</MenuItem>
                      <MenuItem value={"1108"}>OPPO</MenuItem>
                      <MenuItem value={"1109"}>NOKIA</MenuItem>
                      <MenuItem value={"1110"}>VIVO</MenuItem>
                      <MenuItem value={"1111"}>HUAWEI</MenuItem>
                      <MenuItem value={"1112"}>TECNO</MenuItem>
                      <MenuItem value={"1113"}>INFINIX</MenuItem>
                      <MenuItem value={"1114"}>GOOGLE</MenuItem>
                      <MenuItem value={"1115"}>HONOR</MenuItem>
                      <MenuItem value={"1116"}>SONY</MenuItem>
                      <MenuItem value={"1117"}>ASUS</MenuItem>
                      <MenuItem value={"1118"}>UMIDIGI</MenuItem>
                      <MenuItem value={"1119"}>MICROMAX</MenuItem>
                      <MenuItem value={"1120"}>MAXIMUS</MenuItem>
                      <MenuItem value={"1121"}>LG</MenuItem>
                      <MenuItem value={"1122"}>HTC</MenuItem>
                      <MenuItem value={"1123"}>LAVA</MenuItem>
                      <MenuItem value={"1124"}>HELIO</MenuItem>
                      <MenuItem value={"1125"}>ALCATEL</MenuItem>
                      <MenuItem value={"1126"}>LENOVO</MenuItem>
                      <MenuItem value={"1127"}>OKAPIA</MenuItem>
                      <MenuItem value={"1128"}>MYCELL</MenuItem>
                      <MenuItem value={"1129"}>ITEL</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>

                {/* Warranty */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Warranty (In Month)"
                    id="warranty"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mWarranty || 0,
                      onChange: (event) => setmWarranty(event.target.value),
                      maxLength: "2",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [VARIANTS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <BakeryDiningIcon />
                  <p className="sectionPara">[VARIANTS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetVariants}
                  />{" "}
                  Reset
                </div>
              </div>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <ProductVariants
                    objectValue={productAllVariants}
                    productVariantsSetter={productVariantsSetter}
                    placeHolder="Outer fields"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [NETWORK] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <RssFeedIcon />
                  <p className="sectionPara">[NETWORK]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetNetworks}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Technology & Speed */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Technology"
                    id="technology"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mTechnology || "",
                      onChange: (event) => setmTechnology(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Speed"
                    id="speed"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSpeed || "",
                      onChange: (event) => setmSpeed(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* 2G Bands & 3G Bands*/}
              <GridContainer>
                {/* 2G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={m2GBand}
                    callBackFun={band2gHandler}
                    placeHolder="2G Bands"
                  />
                </GridItem>
                {/* 3G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={m3GBand}
                    callBackFun={band3gHandler}
                    placeHolder="3G Bands"
                  />
                </GridItem>
              </GridContainer>

              {/* 4G Bands & 5G Bands */}
              <GridContainer>
                {/* 4G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={m4GBand}
                    callBackFun={band4gHandler}
                    placeHolder="4G Bands"
                  />
                </GridItem>
                {/* 5G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={m5GBand}
                    callBackFun={band5gHandler}
                    placeHolder="5G Bands"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [LAUNCH] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <LaunchIcon />
                  <p className="sectionPara">[LAUNCH]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetLaunch} />{" "}
                  Reset
                </div>
              </div>

              {/* Announce date and Release date  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableFuture
                      openTo="date"
                      format="yyyy-MM-dd"
                      label="Date of Announced"
                      views={["year", "month", "date"]}
                      value={mAnnounchDate}
                      onChange={(date) => setmAnnounchDate(date)}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      disableFuture
                      openTo="date"
                      format="yyyy-MM-dd"
                      label="Date of Release"
                      views={["year", "month", "date"]}
                      value={mReleaseDate}
                      onChange={(date) => setmReleaseDate(date)}
                    />
                  </MuiPickersUtilsProvider>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [BODY] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <PhoneAndroidIcon />
                  <p className="sectionPara">[BODY]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetBody} />{" "}
                  Reset
                </div>
              </div>

              {/* Dimension & Weight  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Dimension"
                    id="dimension"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mDimension || "",
                      onChange: (event) => setmDimension(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Weight"
                    id="weight"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mWeight || "",
                      onChange: (event) => setmWeight(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Build & Sim  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Build"
                    id="build"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mBuild || "",
                      onChange: (event) => setmBuild(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="SIM"
                    id="sim"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSim || "",
                      onChange: (event) => setmSim(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [DISPLAY] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SmartDisplayIcon />
                  <p className="sectionPara">[DISPLAY]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetDisplay} />{" "}
                  Reset
                </div>
              </div>

              {/* DISPLAY Type & Size  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Type"
                    id="type"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mDisplayType || "",
                      onChange: (event) => setmDisplayType(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Size"
                    id="size"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSize || "",
                      onChange: (event) => setmSize(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* DISPLAY Resolution & Protection  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Resolution"
                    id="resolution"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mResolution || "",
                      onChange: (event) => setmResolution(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Protection"
                    id="protection"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mProtection || "",
                      onChange: (event) => setmProtection(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [PLATFORM] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <HardwareIcon />
                  <p className="sectionPara">[PLATFORM]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetPlatform}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* OS & Chipset  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="OS"
                    id="os"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mOS || "",
                      onChange: (event) => setmOS(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Chipset"
                    id="chipset"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mChipset || "",
                      onChange: (event) => setmChipset(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* CPU & GPU  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="CPU"
                    id="cpu"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mCPU || "",
                      onChange: (event) => setmCPU(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="GPU"
                    id="gpu"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mGPU || "",
                      onChange: (event) => setmGPU(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [MEMORY] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <MemoryIcon />
                  <p className="sectionPara">[MEMORY]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetMemory} />{" "}
                  Reset
                </div>
              </div>

              {/* Card Slot & Internal  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Card Slot"
                    id="card-slot"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mCardSlot || "",
                      onChange: (event) => setmCardSlot(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Internal"
                    id="internal"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mInternal || "",
                      onChange: (event) => setmInternal(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [MAIN CAMERA] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <CameraRearIcon />
                  <p className="sectionPara">[MAIN CAMERA]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetMainCams}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Main Cameras & Feature */}
              <GridContainer>
                {/* Main Cameras */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={mainCams}
                    callBackFun={mainCamsHandler}
                    placeHolder="Rare Camera"
                  />
                </GridItem>
                {/* Feature */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={mainCamFeatures}
                    callBackFun={mainCamFeatureHandler}
                    placeHolder="Rare Camera Feature"
                  />
                </GridItem>

                {/* Video */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={mainCamVideos}
                    callBackFun={mainCamVideosHandler}
                    placeHolder="Rare Camera Video Feature"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [SELFIE CAMERA] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <CameraFrontIcon />
                  <p className="sectionPara">[SELFIE CAMERA]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetFrontCams}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* SELFIE Cameras & Feature */}
              <GridContainer>
                {/* SELFIE Cameras */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={frontCams}
                    callBackFun={frontCamsHandler}
                    placeHolder="Front Camera"
                  />
                </GridItem>
                {/* Feature */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={frontCamFeatures}
                    callBackFun={frontCamFeatureHandler}
                    placeHolder="Front Camera Feature"
                  />
                </GridItem>
                {/* Video */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={frontCamVideos}
                    callBackFun={frontCamVideosHandler}
                    placeHolder="Front Camera Video Feature"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [SOUND] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <VolumeUpIcon />
                  <p className="sectionPara">[SOUND]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetSound} />{" "}
                  Reset
                </div>
              </div>

              {/* Loud Speaker & Jack */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Loud Speaker"
                    id="loud-speaker"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mLoudSpeaker || "",
                      onChange: (event) => setmLoudSpeaker(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Jack"
                    id="jack"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mJack || "",
                      onChange: (event) => setmJack(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [COMMS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SettingsInputAntennaIcon />
                  <p className="sectionPara">[COMMS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetComms} />{" "}
                  Reset
                </div>
              </div>

              {/* WLAN & Bluetooth */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="WLAN"
                    id="wlan"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mWlan || "",
                      onChange: (event) => setmWlan(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Bluetooth"
                    id="bluetooth"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mBlueTooth || "",
                      onChange: (event) => setmBlueTooth(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* GPS & NFC */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="GPS"
                    id="gps"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mGPS || "",
                      onChange: (event) => setmGPS(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="NFC"
                    id="NFC"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mNFC || "",
                      onChange: (event) => setmNFC(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Radio & USB */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Radio"
                    id="radio"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mRadio || "",
                      onChange: (event) => setmRadio(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="USB"
                    id="usb"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mUSB || "",
                      onChange: (event) => setmUSB(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [FEATURES] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <FeaturedPlayListIcon />
                  <p className="sectionPara">[FEATURES]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetFeatures}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Sensors */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={sensors}
                    callBackFun={sensorsHandler}
                    placeHolder="Sensor"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [BATTERY] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <BatteryCharging50Icon />
                  <p className="sectionPara">[BATTERY]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetBattery} />{" "}
                  Reset
                </div>
              </div>

              {/* Battery Type & Charging */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Battery Type"
                    id="battery-type"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mBatteryType || "",
                      onChange: (event) => setmBatteryType(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Charging"
                    id="charging"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mBatteryCharging || "",
                      onChange: (event) =>
                        setmBatteryCharging(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [MISC] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <MiscellaneousServicesIcon />
                  <p className="sectionPara">[MISC]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetMisc} />{" "}
                  Reset
                </div>
              </div>

              {/* SAR & SAR EU & Models */}
              <GridContainer>
                {/* SAR */}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="SAR"
                    id="sar"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSar || "",
                      onChange: (event) => setmSar(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>

                {/* SAR EU */}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="SAR EU"
                    id="sar-eu"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSarEu || "",
                      onChange: (event) => setmSarEu(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>

                {/* Models */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={models}
                    callBackFun={modelsHandler}
                    placeHolder="Models"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [TESTS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SpeedIcon />
                  <p className="sectionPara">[TESTS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetTests} />{" "}
                  Reset
                </div>
              </div>

              {/* Performances */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={performances}
                    callBackFun={performanceHandler}
                    placeHolder="Performances"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Save Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={tabUpdateClick}
      >
        Save & Update
      </Button>
    </>
  );
}

export default UpdateTab;
