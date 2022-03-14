import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";

// material-ui icons
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LaunchIcon from "@mui/icons-material/Launch";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import DetailsIcon from "@mui/icons-material/Details";
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
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Date
import "date-fns";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
// Data formatter
import moment from "moment";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// Rich Text Editor
import JoditEditor from "jodit-react";
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

function CreateAccessory() {
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
  const [category, setCategory] = useState("4"); //category 1 is fixed for phone
  const [mName, setmName] = useState("N/A");
  const [mBasePrice, setmBasePrice] = useState("0");
  // const [mCurrentPrice, setmCurrentPrice] = useState("0");
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
  // LAUNCH
  const [mAnnounchDate, setmAnnounchDate] = useState(new Date());
  const [mReleaseDate, setmReleaseDate] = useState(new Date());
  // Detail Info
  const [accessoryDetails, setAccessoryDetails] = useState("");
  const editor = useRef(null);
  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");
  // Preview and Crop Img
  const [shouldPreview, setShouldPreview] = useState(false);
  const [imgIdToPreview, setImgIdToPreview] = useState("");

  // For rich text editor
  const joditConfig = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  const accessoryDetailsData = {
    category: category,
    title: mName,
    basePrice: mBasePrice,
    totalStock: mTotalQuantity,
    sellableStock: mSellableQuantity,
    brand: mBrandName,
    warranty: mWarranty,
    announceDate: moment(mAnnounchDate).format("YYYY-MM-DD"),
    releaseDate: moment(mReleaseDate).format("YYYY-MM-DD"),
    images: [
      productImages[0].imgBase64,
      productImages[1].imgBase64,
      productImages[2].imgBase64,
      productImages[3].imgBase64,
      productImages[4].imgBase64,
    ],
    hasWarranty: mWarranty > 0 ? true : false,
    discount: {
      type: mDiscountType,
      value: mDiscountType !== "" ? mDiscountValue : "",
    },
    details: [accessoryDetails],
    published: false,
  };
  const accessorySaveClick = () => {
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
        saveNewAccessory();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          saveNewAccessory();
        });
      }
    }

    setShowHttpResponseMsg(false);
    setShowProductCreatePopup(false);
  };

  const saveNewAccessory = () => {
    const accessoryCreateAPI = "http://localhost:8080/accessories";
    axios
      .post(accessoryCreateAPI, accessoryDetailsData, config)
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
    setAccessoryDetails("");
  };

  // Images Handler
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
    data.append("productType", "ACCESSORY");

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
    setCategory(searchedProduct.category);
    // Basic
    setmName(searchedProduct.title);
    setmBasePrice(searchedProduct.oldPrice);
    // setmCurrentPrice(searchedProduct.currentPrice);
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

    setAccessoryDetails(getRichText(searchedProduct.details));
  };

  // Rich Text to Plain Text
  const getRichText = (richText) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = richText;
    return divContainer.textContent || divContainer.innerText || "";
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
              <h4 className={classes.cardIconTitle}>Create New Accessory</h4>
            </CardHeader>
            <CardBody>
              {/* Bulk Accessory Upload  */}
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
                productType={"accessories"}
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

              {/* Base & Current Price  */}
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
                <DetailsIcon />
                <p className="sectionPara">[Details INFO]</p>
              </div>
              {/* Details Info  */}
              <GridContainer>
                <GridItem xs={12} sm={4} md={8}>
                  <JoditEditor
                    ref={editor}
                    value={accessoryDetails}
                    config={joditConfig}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setAccessoryDetails(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                  />
                </GridItem>
              </GridContainer>

              {/* <GridContainer>
                <GridItem xs={12} sm={4} md={8}>
                  <div className={classes.buttonGroup}>
                    <Button
                      color="info"
                      size="sm"
                      round
                      className={classes.lastButton}
                      onClick={() => handleAdd()}
                    >
                      <Add className={classes.icon} />
                    </Button>
                  </div>
                  <br />
                  {mDetailsList.map((field, idx) => {
                    return (
                      <div key={`${field}-${idx}`}>
                        <input
                          style={{ padding: "1%", margin: "1%", width: "70%" }}
                          type="text"
                          placeholder="Enter Privacy Term"
                          onChange={(e) => detailsInfoHandler(idx, e)}
                          maxLength="100"
                        />
                        <button
                          style={{ padding: "1%" }}
                          type="button"
                          onClick={() => handleRemove(idx)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </GridItem>
              </GridContainer> */}

              {/* Save Accessory */}
              <Button
                color="rose"
                className={classes.updateProfileButton}
                onClick={accessorySaveClick}
              >
                Save Accessory
              </Button>

              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

export default CreateAccessory;
