import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// material-ui icons
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
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
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Date
import "date-fns";
import DateValidate from "views/DatePicker/DateValidate";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

import moment from "moment";
import { title } from "assets/jss/material-dashboard-pro-react";
import SaveWarning from "views/ConfirmationModals/SaveWarning";
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
import ImgCropper from "views/OkoleleImageCropper/ImgCropper";
import SearchToClone from "../CloneProducts/SearchToClone";
// toast-configuration method,
// it is compulsory method.
toast.configure();

const useStyles = makeStyles(styles);

function CreateTab() {
  const classes = useStyles();
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
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  // Basic
  const [category, setCategory] = useState("2"); //category 2 is fixed for tab
  const [mName, setmName] = useState("N/A");
  const [mBasePrice, setmBasePrice] = useState("0");
  // const [mNewPrice, setmNewPrice] = useState("0");
  const [mDiscountType, setmDiscountType] = useState("");
  const [mDiscountValue, setmDiscountValue] = useState("0");
  const [mTotalQuantity, setmTotalQuantity] = useState("0");
  const [mSellableQuantity, setmSellableQuantity] = useState("0");
  const [mBrandName, setmBrandName] = useState("N/A");
  const [mWarranty, setmWarranty] = useState("0");
  const [productImages, setProductImages] = useState([
    { imgId: 1, imgBase64: "" },
    { imgId: 2, imgBase64: "" },
    { imgId: 3, imgBase64: "" },
    { imgId: 4, imgBase64: "" },
    { imgId: 5, imgBase64: "" },
  ]);

  // NETWORK
  const [mTechnology, setmTechnology] = useState("N/A");
  const [m2GBand, setm2GBand] = useState("N/A");
  const [m3GBand1, setm3GBand1] = useState("N/A");
  const [m3GBand2, setm3GBand2] = useState("N/A");
  const [m4GBand1, setm4GBand1] = useState("N/A");
  const [m4GBand2, setm4GBand2] = useState("N/A");
  const [m5GBand1, setm5GBand1] = useState("N/A");
  const [m5GBand2, setm5GBand2] = useState("N/A");
  const [mSpeed, setmSpeed] = useState("N/A");
  // LAUNCH
  const [mAnnounchDate, setmAnnounchDate] = useState(new Date());
  const [mReleaseDate, setmReleaseDate] = useState(new Date());
  // BODY
  const [mDimension, setmDimension] = useState("N/A");
  const [mWeight, setmWeight] = useState("N/A");
  const [mBuild, setmBuild] = useState("N/A");
  const [mSim, setmSim] = useState("N/A");
  // DISPLAY
  const [mDisplayType, setmDisplayType] = useState("N/A");
  const [mSize, setmSize] = useState("N/A");
  const [mResolution, setmResolution] = useState("N/A");
  const [mProtection, setmProtection] = useState("N/A");
  // PLATFORM
  const [mOS, setmOS] = useState("N/A");
  const [mChipset, setmChipset] = useState("N/A");
  const [mCPU, setmCPU] = useState("N/A");
  const [mGPU, setmGPU] = useState("N/A");
  // MEMORY
  const [mCardSlot, setmCardSlot] = useState("N/A");
  const [mInternal, setmInternal] = useState("N/A");
  // MAIN CAMERA
  const [mMainMP1, setmMainMP1] = useState("N/A");
  const [mMainMP2, setmMainMP2] = useState("N/A");
  const [mMainMP3, setmMainMP3] = useState("N/A");
  const [mMainMP4, setmMainMP4] = useState("N/A");
  const [mMainFeatures, setmMainFeatures] = useState("N/A");
  const [mMainVideo, setmMainVideo] = useState("N/A");
  // SELFIE CAMERA
  const [mSecondaryMP, setmSecondaryMP] = useState("N/A");
  const [mSecondaryFeatures, setmSecondaryFeatures] = useState("N/A");
  const [mSecondaryVideo, setmSecondaryVideo] = useState("N/A");
  // SOUND
  const [mLoudSpeaker, setmLoudSpeaker] = useState("N/A");
  const [mJack, setmJack] = useState("N/A");
  // COMMS
  const [mWlan, setmWlan] = useState("N/A");
  const [mBlueTooth, setmBlueTooth] = useState("N/A");
  const [mGPS, setmGPS] = useState("N/A");
  const [mNFC, setmNFC] = useState("N/A");
  const [mRadio, setmRadio] = useState("N/A");
  const [mUSB, setmUSB] = useState("N/A");
  // FEATURES
  const [mSensor1, setmSensor1] = useState("N/A");
  const [mSensor2, setmSensor2] = useState("N/A");
  const [mSensor3, setmSensor3] = useState("N/A");
  // BATTERY
  const [mBatteryType, setmBatteryType] = useState("N/A");
  const [mBatteryCharging, setmBatteryCharging] = useState("N/A");
  // MISC
  const [mColor, setmColor] = useState("N/A");
  const [mModel, setmModel] = useState("N/A");
  const [mSar, setmSar] = useState("N/A");
  const [mSarEu, setmSarEu] = useState("N/A");
  // TESTS
  const [mPerformance1, setmPerformance1] = useState("N/A");
  const [mPerformance2, setmPerformance2] = useState("N/A");
  const [mPerformance3, setmPerformance3] = useState("N/A");
  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");
  // Preview and Crop Img
  const [shouldPreview, setShouldPreview] = useState(false);
  const [imgIdToPreview, setImgIdToPreview] = useState("");

  const tabDetails = {
    category: category,
    title: mName,
    basePrice: mBasePrice,
    totalStock: mTotalQuantity,
    sellableStock: mSellableQuantity,
    brand: mBrandName,
    warranty: mWarranty,
    technology: mTechnology,
    m2GBands: [m2GBand],
    m3GBands: [m3GBand1, m3GBand2],
    m4GBands: [m4GBand1, m4GBand2],
    m5GBands: [m5GBand1, m5GBand2],
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
    mainCamera: [mMainMP1, mMainMP2, mMainMP3, mMainMP4],
    mainCameraFeatures: [mMainFeatures],
    mainCameraVideo: [mMainVideo],
    frontCamera: [mSecondaryMP],
    frontCameraFeatures: [mSecondaryFeatures],
    frontCameraVideo: [mSecondaryVideo],
    loudspeaker: mLoudSpeaker,
    jack: mJack,
    wlan: mWlan,
    bluetooth: mBlueTooth,
    gps: mGPS,
    nfc: mNFC,
    radio: mRadio,
    usb: mUSB,
    sensors: [mSensor1, mSensor2, mSensor3],
    batteryType: mBatteryType,
    batteryCharging: mBatteryCharging,
    colors: [mColor],
    models: [mModel],
    sarEu: mSarEu,
    sarUs: mSar,
    images: [
      productImages[0].imgBase64,
      productImages[1].imgBase64,
      productImages[2].imgBase64,
      productImages[3].imgBase64,
      productImages[4].imgBase64,
    ],
    performances: [mPerformance1, mPerformance2, mPerformance3],
    hasWarranty: mWarranty > 0 ? true : false,
    discount: {
      type: mDiscountType,
      value: mDiscountType !== "" ? mDiscountValue : "",
    },
  };

  const phoneSaveClick = () => {
    setShowProductCreatePopup(true);
  };
  // Product Create Flag From Modal
  const productCreateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        console.log(
          "accessTknValidity.getTime() > currentLocalDateTime.getTime()"
        );
        saveNewTab();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          saveNewTab();
        });
      }
    }

    setShowHttpResponseMsg(false);
    setShowProductCreatePopup(false);
  };

  const saveNewTab = () => {
    const tabCreateAPI = "http://localhost:8080/tabs";
    axios
      .post(tabCreateAPI, tabDetails, config)
      .then(function (response) {
        setHttpResponseCode(response.status);
        setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  };

  // inputs Reset Handler
  const inputsResetHandler = () => {
    setCategory("1");
    // Basic
    setmName("N/A");
    setmBasePrice("0");
    // setmCurrentPrice(response.data.currentPrice);
    setmDiscountType("");
    setmDiscountValue("0");
    setmTotalQuantity("0");
    setmSellableQuantity("0");
    setmBrandName("N/A");
    setmWarranty("0");

    productImages[0].imgBase64 = "";
    productImages[1].imgBase64 = "";
    productImages[2].imgBase64 = "";
    productImages[3].imgBase64 = "";
    productImages[4].imgBase64 = "";

    // NETWORK
    setmTechnology("N/A");
    setm2GBand("N/A");
    setm3GBand1("N/A");
    setm3GBand2("N/A");
    setm4GBand1("N/A");
    setm4GBand2("N/A");
    setm5GBand1("N/A");
    setm5GBand2("N/A");
    setmSpeed("N/A");
    // LAUNCH
    setmAnnounchDate(new Date());
    setmReleaseDate(new Date());
    // BODY
    setmDimension("N/A");
    setmWeight("N/A");
    setmBuild("N/A");
    setmSim("N/A");
    // DISPLAY
    setmDisplayType("N/A");
    setmSize("N/A");
    setmResolution("N/A");
    setmProtection("N/A");
    // PLATFORM
    setmOS("N/A");
    setmChipset("N/A");
    setmCPU("N/A");
    setmGPU("N/A");
    // MEMORY
    setmCardSlot("N/A");
    setmInternal("N/A");
    // MAIN CAMERA
    setmMainMP1("N/A");
    setmMainMP2("N/A");
    setmMainMP3("N/A");
    setmMainMP4("N/A");
    setmMainFeatures("N/A");
    setmMainVideo("N/A");
    // SELFIE CAMERA
    setmSecondaryMP("N/A");
    setmSecondaryFeatures("N/A");
    setmSecondaryVideo("N/A");
    // SOUND
    setmLoudSpeaker("N/A");
    setmJack("N/A");
    // COMMS
    setmWlan("N/A");
    setmBlueTooth("N/A");
    setmGPS("N/A");
    setmNFC("N/A");
    setmRadio("N/A");
    setmUSB("N/A");
    // FEATURES
    setmSensor1("N/A");
    setmSensor2("N/A");
    setmSensor3("N/A");
    // BATTERY
    setmBatteryType("N/A");
    setmBatteryCharging("N/A");
    // MISC
    setmColor("N/A");
    setmModel("N/A");
    setmSar("N/A");
    setmSarEu("N/A");
    // TESTS
    setmPerformance1("N/A");
    setmPerformance2("N/A");
    setmPerformance3("N/A");
  };

  // Image Handler
  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      // console.log("handleImageChange/id,e: ", id, base64);
      let tempArray = [...productImages]; // copying the old datas array
      // console.log("handleImageChange/tempArray: ", tempArray);
      tempArray[id - 1].imgBase64 = base64; // replace e.target.value with whatever you want to change it to

      setProductImages(tempArray);
    });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const removeSelectedImg = (id) => {
    let tempArray = [...productImages]; // copying the old datas array
    // console.log("handleImageChange/tempArray: ", tempArray);
    tempArray[id - 1].imgBase64 = ""; // replace e.target.value with whatever you want to change it to

    setProductImages(tempArray);
  };

  // Preview & Crop Image
  const previewSelectedImg = (id) => {
    if (
      productImages[id - 1].imgBase64 != "" &&
      productImages[id - 1].imgBase64 != undefined
    ) {
      setImgIdToPreview(id);
      setShouldPreview(true);
    }
  };
  const onCloseImgCropper = (croppedImg, hideImgCropper) => {
    setShouldPreview(hideImgCropper);

    let tempArray = [...productImages]; // copying the old datas array
    tempArray[imgIdToPreview - 1].imgBase64 = croppedImg; // replace e.target.value with whatever you want to change it to
    setProductImages(tempArray);
  };

  // Bulk Upload
  const setFile = (event) => {
    setCsvFile(event.target.files[0]);

    var files = event.target.files;
    var filesArray = [].slice.call(files);
    filesArray.forEach((event) => {
      setFileName(event.name);
      setFileSize(Math.round(event.size / 1024));
      console.log(event.type);
      console.log(event.length);
      // setFileUpdateDate(event.lastModifiedDate);
    });
  };
  const bulkUploadHandler = () => {
    console.log("CSV: ", csvFile);

    //Get file extension from file name
    const split_name = csvFile.name.split(".");
    const type = split_name[split_name.length - 1];

    //create a blob from file calling mime type injection function
    const blob = new Blob([csvFile], { type: mimeType(type) });

    //Here you can use the file as you wish
    const new_file = blobToFile(blob, "csv");
    console.log(new_file);

    const data = new FormData();
    data.append("file", new_file);
    data.append("productType", "TAB");

    const csvConfig = {
      headers: {
        "content-type": `multipart/form-data; boundary=${data._boundary}`,
      },
    };

    const bulkUploadAPI = "http://localhost:8080/products/bulkdata";

    axios
      .post(bulkUploadAPI, data, csvConfig)
      .then(function (response) {
        console.log("update response: ", response);
      })
      .catch(function (error) {
        console.log("error: ", error);
        // if (error.response) {
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // }
      });
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
      console.log(
        "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      );
      const refreshTokenAPI = "http://localhost:8080/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          console.log("Refresh token response: ", response);
          console.log("Status Code: ", response.status);

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
          console.log("Status Code: ", error.response.status);
          console.log(error);
        });
    } else {
      console.log(
        "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      );
      // Logout forcefully from here
      try {
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  // Searched Product
  const getSearchedProduct = (searchedProduct) => {
    setCategory("1");
    // Basic
    setmName(searchedProduct.title);
    setmBasePrice(searchedProduct.basePrice);
    setmDiscountType(searchedProduct.discount.type);
    setmDiscountValue(searchedProduct.discount.value);
    setmTotalQuantity(searchedProduct.totalStock);
    setmSellableQuantity(searchedProduct.sellableStock);
    if (searchedProduct.brand === "SAMSUNG") {
      setmBrandName(1101);
    } else if (searchedProduct.brand === "APPLE") {
      setmBrandName(1102);
    } else if (searchedProduct.brand === "XIAOMI") {
      setmBrandName(1103);
    } else if (searchedProduct.brand === "REALME") {
      setmBrandName(1104);
    } else if (searchedProduct.brand === "ONEPLUS") {
      setmBrandName(1105);
    } else if (searchedProduct.brand === "WALTON") {
      setmBrandName(1106);
    } else if (searchedProduct.brand === "SYMPHONY") {
      setmBrandName(1107);
    } else if (searchedProduct.brand === "OPPO") {
      setmBrandName(1108);
    } else if (searchedProduct.brand === "NOKIA") {
      setmBrandName(1109);
    } else if (searchedProduct.brand === "VIVO") {
      setmBrandName(1110);
    } else if (searchedProduct.brand === "HUAWEI") {
      setmBrandName(1111);
    } else if (searchedProduct.brand === "TECNO") {
      setmBrandName(1112);
    } else if (searchedProduct.brand === "INFINIX") {
      setmBrandName(1113);
    } else if (searchedProduct.brand === "GOOGLE") {
      setmBrandName(1114);
    } else if (searchedProduct.brand === "HONOR") {
      setmBrandName(1115);
    } else if (searchedProduct.brand === "SONY") {
      setmBrandName(1116);
    } else if (searchedProduct.brand === "ASUS") {
      setmBrandName(1117);
    } else if (searchedProduct.brand === "UMIDIGI") {
      setmBrandName(1118);
    } else if (searchedProduct.brand === "MICROMAX") {
      setmBrandName(1119);
    } else if (searchedProduct.brand === "MAXIMUS") {
      setmBrandName(1120);
    } else if (searchedProduct.brand === "LG") {
      setmBrandName(1121);
    } else if (searchedProduct.brand === "HTC") {
      setmBrandName(1122);
    } else if (searchedProduct.brand === "LAVA") {
      setmBrandName(1123);
    } else if (searchedProduct.brand === "HELIO") {
      setmBrandName(1124);
    } else if (searchedProduct.brand === "ALCATEL") {
      setmBrandName(1125);
    } else if (searchedProduct.brand === "LENOVO") {
      setmBrandName(1126);
    } else if (searchedProduct.brand === "OKAPIA") {
      setmBrandName(1127);
    } else if (searchedProduct.brand === "MYCELL") {
      setmBrandName(1128);
    } else if (searchedProduct.brand === "ITEL") {
      setmBrandName(1129);
    }

    setmWarranty(searchedProduct.warranty);

    productImages[0].imgBase64 = searchedProduct.images[0];
    productImages[1].imgBase64 = searchedProduct.images[1];
    productImages[2].imgBase64 = searchedProduct.images[2];
    productImages[3].imgBase64 = searchedProduct.images[3];
    productImages[4].imgBase64 = searchedProduct.images[4];

    // NETWORK
    setmTechnology(searchedProduct.technology);
    setm2GBand(searchedProduct.m2GBands[0]);
    setm3GBand1(searchedProduct.m3GBands[0]);
    setm3GBand2(searchedProduct.m3GBands[1]);
    setm4GBand1(searchedProduct.m4GBands[0]);
    setm4GBand2(searchedProduct.m4GBands[1]);
    setm5GBand1(searchedProduct.m5GBands[0]);
    setm5GBand2(searchedProduct.m5GBands[1]);
    setmSpeed(searchedProduct.speed);
    // LAUNCH
    setmAnnounchDate(searchedProduct.announceDate);
    setmReleaseDate(searchedProduct.releaseDate);
    // BODY
    setmDimension(searchedProduct.dimension);
    setmWeight(searchedProduct.weight);
    setmBuild(searchedProduct.build);
    setmSim(searchedProduct.sim);
    // DISPLAY
    setmDisplayType(searchedProduct.displayType);
    setmSize(searchedProduct.displaySize);
    setmResolution(searchedProduct.displayResolution);
    setmProtection(searchedProduct.displayProtection);
    // PLATFORM
    setmOS(searchedProduct.os);
    setmChipset(searchedProduct.chipset);
    setmCPU(searchedProduct.cpu);
    setmGPU(searchedProduct.gpu);
    // MEMORY
    setmCardSlot(searchedProduct.cardSlot);
    setmInternal(searchedProduct.internalSlot);
    // MAIN CAMERA
    setmMainMP1(searchedProduct.mainCamera[0]);
    setmMainMP2(searchedProduct.mainCamera[1]);
    setmMainMP3(searchedProduct.mainCamera[2]);
    setmMainMP4(searchedProduct.mainCamera[3]);
    setmMainFeatures(searchedProduct.mainCameraFeatures[0]);
    setmMainVideo(searchedProduct.mainCameraVideo[0]);
    // SELFIE CAMERA
    setmSecondaryMP(searchedProduct.frontCamera[0]);
    setmSecondaryFeatures(searchedProduct.frontCameraFeatures[0]);
    setmSecondaryVideo(searchedProduct.frontCameraVideo[0]);
    // SOUND
    setmLoudSpeaker(searchedProduct.loudspeaker);
    setmJack(searchedProduct.jack);
    // COMMS
    setmWlan(searchedProduct.wlan);
    setmBlueTooth(searchedProduct.bluetooth);
    setmGPS(searchedProduct.gps);
    setmNFC(searchedProduct.nfc);
    setmRadio(searchedProduct.radio);
    setmUSB(searchedProduct.usb);
    // FEATURES
    setmSensor1(searchedProduct.sensors[0]);
    setmSensor2(searchedProduct.sensors[1]);
    setmSensor3(searchedProduct.sensors[2]);
    // BATTERY
    setmBatteryType(searchedProduct.batteryType);
    setmBatteryCharging(searchedProduct.batteryCharging);
    // MISC
    setmColor(searchedProduct.colors[0]);
    setmModel(searchedProduct.models[0]);
    setmSar(searchedProduct.sarUs);
    setmSarEu(searchedProduct.sarEu);
    // TESTS
    setmPerformance1(searchedProduct.performances[0]);
    setmPerformance2(searchedProduct.performances[1]);
    setmPerformance3(searchedProduct.performances[2]);
  };

  return (
    <>
      <div>
        {shouldPreview && (
          <ImgCropper
            src={productImages[imgIdToPreview - 1].imgBase64}
            onCloseImgCropper={onCloseImgCropper}
          />
        )}
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

      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              {/* <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon> */}
              <h4 className={classes.cardIconTitle}>Create New Tablet</h4>
            </CardHeader>
            <CardBody>
              {/* Bulk Tab Upload  */}
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
                    className={classes.updateProfileButton}
                    onClick={bulkUploadHandler}
                  >
                    Upload
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

              <br />

              <SearchToClone
                getSearchedProduct={getSearchedProduct}
                productType={"tabs"}
              />

              {/* Reset */}
              <div className="resetIcon-container">
                <RefreshIcon
                  className="reset-input"
                  onClick={inputsResetHandler}
                />{" "}
                Reset
              </div>

              <div className="sectionDiv">
                <AcUnitIcon />
                <p className="sectionPara">[GENERAL INFO]</p>
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
                <GridItem xs={12} sm={12} md={6}>
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

              {/* Old & New Price  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Base Price"
                    id="base-price"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mBasePrice || "",
                      onChange: (event) => setmBasePrice(event.target.value),
                      maxLength: "6",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Discount Type & Value  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Discount Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={mDiscountType || " "}
                      onChange={(event) => setmDiscountType(event.target.value)}
                      label="Brand Name"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"FLAT"}>Flat (৳)</MenuItem>
                      <MenuItem value={"PERCENTAGE"}>Percentage (%)</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                {mDiscountType !== "" ? (
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Discount Value"
                      id="discount-value"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mDiscountValue || "",

                        onChange: (event) =>
                          setmDiscountValue(event.target.value),
                        // maxLength: "3",
                      }}
                    />
                  </GridItem>
                ) : null}
              </GridContainer>

              {/* Total Quantity & Sellable Quantity */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Total Quantity"
                    id="total-quantity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mTotalQuantity || "",
                      onChange: (event) =>
                        setmTotalQuantity(event.target.value),
                      maxLength: "6",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Sellable Quantity"
                    id="sellable-quantity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mSellableQuantity || "",
                      onChange: (event) =>
                        setmSellableQuantity(event.target.value),
                      maxLength: "6",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Warranty & Brand*/}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Brand Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Warranty (In Month)"
                    id="warranty"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mWarranty || "",
                      onChange: (event) => setmWarranty(event.target.value),
                      maxLength: "2",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Product Image Picker */}
              <div style={{ fontWeight: "bold", color: "red" }}>
                Image aspect ratio must be 1:1 & Dimension should be 1080px X
                1080px
              </div>
              <GridContainer>
                {/* Image Picker 1 */}
                <GridItem>
                  <div className="picture-container">
                    <div
                      className="picture"
                      style={{ borderRadius: "0", backgroundColor: "#ededed " }}
                    >
                      {productImages[0].imgBase64 === "" ? (
                        <div>
                          <AddToPhotosIcon className="imgAddIcon" />
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 1)}
                          />
                        </div>
                      ) : (
                        <div>
                          <DeleteIcon
                            className="removeSelectedImg"
                            onClick={() => removeSelectedImg(1)}
                          />
                          <VisibilityIcon
                            className="previewSelectedImg"
                            onClick={() => previewSelectedImg(1)}
                          />
                          <img
                            className="imgPickerImg"
                            src={productImages[0].imgBase64}
                            alt="ProductImg"
                          />
                        </div>
                      )}
                    </div>
                    <h6 className="description">Image 1</h6>
                  </div>
                </GridItem>

                {/* Image Picker 2 */}
                <GridItem>
                  <div className="picture-container">
                    <div
                      className="picture"
                      style={{ borderRadius: "0", backgroundColor: "#ededed " }}
                    >
                      {productImages[1].imgBase64 === "" ? (
                        <div>
                          <AddToPhotosIcon className="imgAddIcon" />
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 2)}
                          />
                        </div>
                      ) : (
                        <div>
                          <DeleteIcon
                            className="removeSelectedImg"
                            onClick={() => removeSelectedImg(2)}
                          />
                          <VisibilityIcon
                            className="previewSelectedImg"
                            onClick={() => previewSelectedImg(2)}
                          />
                          <img
                            className="imgPickerImg"
                            src={productImages[1].imgBase64}
                            alt="ProductImg"
                          />
                        </div>
                      )}
                    </div>
                    <h6 className="description">Image 2</h6>
                  </div>
                </GridItem>

                {/* Image Picker 3 */}
                <GridItem>
                  <div className="picture-container">
                    <div
                      className="picture"
                      style={{ borderRadius: "0", backgroundColor: "#ededed " }}
                    >
                      {productImages[2].imgBase64 === "" ? (
                        <div>
                          <AddToPhotosIcon className="imgAddIcon" />
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 3)}
                          />
                        </div>
                      ) : (
                        <div>
                          <DeleteIcon
                            className="removeSelectedImg"
                            onClick={() => removeSelectedImg(3)}
                          />
                          <VisibilityIcon
                            className="previewSelectedImg"
                            onClick={() => previewSelectedImg(3)}
                          />
                          <img
                            className="imgPickerImg"
                            src={productImages[2].imgBase64}
                            alt="ProductImg"
                          />
                        </div>
                      )}
                    </div>
                    <h6 className="description">Image 3</h6>
                  </div>
                </GridItem>

                {/* Image Picker 4 */}
                <GridItem>
                  <div className="picture-container">
                    <div
                      className="picture"
                      style={{ borderRadius: "0", backgroundColor: "#ededed " }}
                    >
                      {productImages[3].imgBase64 === "" ? (
                        <div>
                          <AddToPhotosIcon className="imgAddIcon" />
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 4)}
                          />
                        </div>
                      ) : (
                        <div>
                          <DeleteIcon
                            className="removeSelectedImg"
                            onClick={() => removeSelectedImg(4)}
                          />
                          <VisibilityIcon
                            className="previewSelectedImg"
                            onClick={() => previewSelectedImg(4)}
                          />
                          <img
                            className="imgPickerImg"
                            src={productImages[3].imgBase64}
                            alt="ProductImg"
                          />
                        </div>
                      )}
                    </div>
                    <h6 className="description">Image 4</h6>
                  </div>
                </GridItem>

                {/* Image Picker 5 */}
                <GridItem>
                  <div className="picture-container">
                    <div
                      className="picture"
                      style={{ borderRadius: "0", backgroundColor: "#ededed " }}
                    >
                      {productImages[4].imgBase64 === "" ? (
                        <div>
                          <AddToPhotosIcon className="imgAddIcon" />
                          <input
                            type="file"
                            onChange={(e) => handleImageChange(e, 5)}
                          />
                        </div>
                      ) : (
                        <div>
                          <DeleteIcon
                            className="removeSelectedImg"
                            onClick={() => removeSelectedImg(5)}
                          />
                          <VisibilityIcon
                            className="previewSelectedImg"
                            onClick={() => previewSelectedImg(5)}
                          />
                          <img
                            className="imgPickerImg"
                            src={productImages[4].imgBase64}
                            alt="ProductImg"
                          />
                        </div>
                      )}
                    </div>
                    <h6 className="description">Image 5</h6>
                  </div>
                </GridItem>
              </GridContainer>

              <br />
              <div className="sectionDiv">
                <RssFeedIcon />
                <p className="sectionPara">[NETWORK]</p>
              </div>
              {/* Technology & 2G Band  */}
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
                    labelText="2G Band"
                    id="2g-band"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m2GBand || "",
                      onChange: (event) => setm2GBand(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* 3G Band */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="3G Band 1"
                    id="3g-band1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m3GBand1 || "",
                      onChange: (event) => setm3GBand1(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="3G Band 2"
                    id="3g-band2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m3GBand2 || "",
                      onChange: (event) => setm3GBand2(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* 4G Band */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="4G Band 1"
                    id="4g-band1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m4GBand1 || "",
                      onChange: (event) => setm4GBand1(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="4G Band 2"
                    id="4g-band2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m4GBand2 || "",
                      onChange: (event) => setm4GBand2(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* 5G Band */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="5G Band 1"
                    id="5g-band1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m5GBand1 || "",
                      onChange: (event) => setm5GBand1(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="5G Band 2"
                    id="5g-band2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: m5GBand2 || "",
                      onChange: (event) => setm5GBand2(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Speed */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
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

              <div className="sectionDiv">
                <LaunchIcon />
                <p className="sectionPara">[LAUNCH]</p>
              </div>

              {/* Announce date and Release date  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
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

              <br />

              <div className="sectionDiv">
                <PhoneAndroidIcon />
                <p className="sectionPara">[BODY]</p>
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

              <div className="sectionDiv">
                <SmartDisplayIcon />
                <p className="sectionPara">[DISPLAY]</p>
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

              <div className="sectionDiv">
                <HardwareIcon />
                <p className="sectionPara">[PLATFORM]</p>
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

              <div className="sectionDiv">
                <MemoryIcon />
                <p className="sectionPara">[MEMORY]</p>
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

              <div className="sectionDiv">
                <CameraRearIcon />
                <p className="sectionPara">[MAIN CAMERA]</p>
              </div>

              {/* Camera 1 & Camera 2 */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Camera 1 (MP)"
                    id="camera1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mMainMP1 || "",
                      onChange: (event) => setmMainMP1(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Camera 2 (MP)"
                    id="camera2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mMainMP2 || "",
                      onChange: (event) => setmMainMP2(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Camera 3 & Camera 4 */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Camera 3 (MP)"
                    id="camera3"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mMainMP3 || "",
                      onChange: (event) => setmMainMP3(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Camera 4 (MP)"
                    id="camera4"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mMainMP4 || "",
                      onChange: (event) => setmMainMP4(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Feature & Video */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Feature"
                    id="feature"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mMainFeatures || "",
                      onChange: (event) => setmMainFeatures(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Video"
                    id="video"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mMainVideo || "",
                      onChange: (event) => setmMainVideo(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <div className="sectionDiv">
                <CameraFrontIcon />
                <p className="sectionPara">[SELFIE CAMERA]</p>
              </div>

              {/* Camera */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Camera  (MP)"
                    id="camera"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSecondaryMP || "",
                      onChange: (event) => setmSecondaryMP(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Feature & Video */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Feature"
                    id="secondary-feature"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSecondaryFeatures || "",
                      onChange: (event) =>
                        setmSecondaryFeatures(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Video"
                    id="secondary-video"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSecondaryVideo || "",
                      onChange: (event) =>
                        setmSecondaryVideo(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <div className="sectionDiv">
                <VolumeUpIcon />
                <p className="sectionPara">[SOUND]</p>
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

              <div className="sectionDiv">
                <SettingsInputAntennaIcon />
                <p className="sectionPara">[COMMS]</p>
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

              <div className="sectionDiv">
                <FeaturedPlayListIcon />
                <p className="sectionPara">[FEATURES]</p>
              </div>

              {/* Sensor 1 & Sensor 2 */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Sensor 1"
                    id="sensor1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSensor1 || "",
                      onChange: (event) => setmSensor1(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Sensor 2"
                    id="sensor2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSensor2 || "",
                      onChange: (event) => setmSensor2(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Sensor 3 */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Sensor 3"
                    id="sensor3"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mSensor3 || "",
                      onChange: (event) => setmSensor3(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              <div className="sectionDiv">
                <BatteryCharging50Icon />
                <p className="sectionPara">[BATTERY]</p>
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

              <div className="sectionDiv">
                <MiscellaneousServicesIcon />
                <p className="sectionPara">[MISC]</p>
              </div>

              {/* Colors & Models */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Colors"
                    id="colors"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mColor || "",
                      onChange: (event) => setmColor(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Models"
                    id="models"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mModel || "",
                      onChange: (event) => setmModel(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* SAR & SAR EU */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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
                <GridItem xs={12} sm={12} md={6}>
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
              </GridContainer>

              <div className="sectionDiv">
                <SpeedIcon />
                <p className="sectionPara">[TESTS]</p>
              </div>

              {/* Performance 1 & Performance 2 */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Performance 1"
                    id="performance1"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mPerformance1 || "",
                      onChange: (event) => setmPerformance1(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Performance 2"
                    id="performance2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mPerformance2 || "",
                      onChange: (event) => setmPerformance2(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Performance 3 */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Performance 3"
                    id="performance3"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      value: mPerformance3 || "",
                      onChange: (event) => setmPerformance3(event.target.value),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Save Button */}
              <Button
                color="rose"
                className={classes.updateProfileButton}
                onClick={phoneSaveClick}
              >
                Save
              </Button>

              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CreateTab;
