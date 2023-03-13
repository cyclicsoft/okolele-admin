/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";

// material-ui icons
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LaunchIcon from "@mui/icons-material/Launch";
import RefreshIcon from "@mui/icons-material/Refresh";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import DetailsIcon from "@mui/icons-material/Details";
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
import AccessoryVariants from "../AccessoryVariants";

// toast-configuration method,
// it is compulsory method.
toast.configure();

const useStyles = makeStyles(styles);

function UpdateAccessory(props) {
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
  // const [fileUpdateDate, setFileUpdateDate] = useState([]);
  // Basic
  const [category, setCategory] = useState("3"); //category 3 is fixed for SW
  const [mName, setmName] = useState("");
  const [mDiscountType, setmDiscountType] = useState("FLAT");
  const [mDiscountValue, setmDiscountValue] = useState(0);
  const [mBrandName, setmBrandName] = useState("1101");
  const [mWarranty, setmWarranty] = useState(0);
  const [userComments, setUserComments] = useState([]);
  const [isPublished, setPsPublished] = useState(false);

  // LAUNCH
  const [mAnnounchDate, setmAnnounchDate] = useState(new Date());
  const [mReleaseDate, setmReleaseDate] = useState(new Date());

  // product All Variants
  const [productAllVariants, setProductAllVariants] = useState([]);
  // other Details
  const [otherDetails, setOtherDetails] = useState([]);

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
    const accessoryDetailsAPI =
      rootPath[0] + "/accessories/" + props.editProductId;

    axios
      .get(accessoryDetailsAPI)
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

        // LAUNCH
        setmAnnounchDate(response.data.content.announceDate);
        setmReleaseDate(response.data.content.releaseDate);

        // Variants
        setProductAllVariants(response.data.content.variants);

        // other Details
        setOtherDetails(response.data.content.details);

        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setIsDataLoaded(true);
      });
  }, [props.editProductId]);

  // Dynamic Elements Handler
  const otherDetailsHandler = (callBackData) => {
    setOtherDetails(callBackData);
  };

  const productVariantsSetter = (response) => {
    console.log("productVariantsSetter/All Variants: ", response);
    setProductAllVariants(response);
  };

  const accessoryDetails = {
    category: category,
    title: mName,
    brand: mBrandName,
    warranty: mWarranty,
    announceDate: moment(mAnnounchDate).format("YYYY-MM-DD"),
    releaseDate: moment(mReleaseDate).format("YYYY-MM-DD"),
    discount: {
      type: mDiscountType,
      value: mDiscountValue,
    },
    variants: productAllVariants,
    details: otherDetails,
  };

  // phone update Handler
  const accessoryUpdateClick = () => {
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
        accessoryUpdate();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          accessoryUpdate();
        });
      }
    }
    setShowProductUpdatePopup(false);
  };
  const accessoryUpdate = () => {
    const accessoryUpdateAPI =
      rootPath[0] + "/accessories/" + props.editProductId;

    axios
      .put(accessoryUpdateAPI, accessoryDetails, config)
      .then(function (response) {
        // console.log("update response: ", response);
        // console.log("response code: ", response.status);
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
    // GeneralInfo
    resetGeneralInfo();
    // Variants
    resetVariants();
    // Launch
    resetLaunch();
    // Other Details
    resetOtherDetails();
  };

  const resetGeneralInfo = () => {
    setCategory("3");
    setmName("");
    setmDiscountType("FLAT");
    setmDiscountValue(0);
    setmBrandName("1101");
    setmWarranty(0);
  };

  const resetVariants = () => {
    setProductAllVariants([]);
  };

  const resetLaunch = () => {
    setmAnnounchDate(new Date());
    setmReleaseDate(new Date());
  };

  const resetOtherDetails = () => {
    setOtherDetails([]);
  };

  // remove Comment from front end ( remove from userComments variable)
  const deleteComment = (msg) => {
    console.log("userComments: ", userComments);
    setUserComments(userComments.filter((item) => item.msg !== msg));
  };
  // Update Comment in DB after removing comments from userComments variable
  const commentsUpdateHandler = () => {
    const commentsUpdateAPI =
      rootPath[0] + "/accessories/deleteComment/" + props.editProductId;

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

      <h4 className={classes.cardIconTitle}>Update Accessory</h4>
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
                  <AccessoryVariants
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

      {/* [Other Details] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <DetailsIcon />
                  <p className="sectionPara">[Other Details]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetOtherDetails}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Performances */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={otherDetails}
                    callBackFun={otherDetailsHandler}
                    placeHolder="Other Details"
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
        onClick={accessoryUpdateClick}
      >
        Save & Update
      </Button>
    </>
  );
}

export default UpdateAccessory;
