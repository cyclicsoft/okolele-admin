import React, { useState, useEffect } from "react";
import axios from "axios";
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
import CloseIcon from "@mui/icons-material/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
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
import "assets/scss/ghorwali-scss/product-details.scss";

import moment from "moment";
import { title } from "assets/jss/material-dashboard-pro-react";
import SaveWarning from "views/ConfirmationModals/SaveWarning";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AndroidOutlined } from "@material-ui/icons";
// Images
import "assets/img/okolele-img/mobile-dummy-img.jpg";
import dummyProfileImg128px from "assets/img/okolele-img/dummy_profile_img_128px.png";
// Carousel ImageGallery
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles(styles);

function SmartWatchDetails(props) {
  const classes = useStyles();

  // General
  const [category, setCategory] = useState("N/A");
  // Basic
  const [productName, setProductName] = useState("N/A");
  const [basePrice, setBasePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [discountType, setDiscountType] = useState("N/A");
  const [discountValue, setDiscountValue] = useState("0");
  const [totalQuantity, setTotalQuantity] = useState("0");
  const [sellableQuantity, setSellableQuantity] = useState(0);
  const [brandName, setBrandName] = useState("N/A");
  const [warranty, setWarranty] = useState("N/A");
  const [userComments, setUserComments] = useState([]);
  const [productImages, setProductImages] = useState([]);
  // LAUNCH
  const [announchDate, setAnnounchDate] = useState("N/A");
  const [releaseDate, setReleaseDate] = useState("N/A");
  // BODY
  const [dimension, setDimension] = useState("N/A");
  const [weight, setWeight] = useState("N/A");
  const [build, setBuild] = useState("N/A");
  // DISPLAY
  const [displayType, setDisplayType] = useState("N/A");
  const [displaySize, setDisplaySize] = useState("N/A");
  const [displayResolution, setDisplayResolution] = useState("N/A");
  const [displayProtection, setDisplayProtection] = useState("N/A");
  // PLATFORM
  const [OS, setOS] = useState("N/A");
  const [chipset, setChipset] = useState("N/A");
  const [CPU, setCPU] = useState("N/A");
  const [GPU, setGPU] = useState("N/A");
  // MEMORY
  const [internal, setInternal] = useState("N/A");
  // COMMS
  const [wlan, setWlan] = useState("");
  const [blueTooth, setBlueTooth] = useState("N/A");
  const [GPS, setGPS] = useState("N/A");
  const [NFC, setNFC] = useState("N/A");
  const [radio, setRadio] = useState("N/A");
  const [USB, setUSB] = useState("N/A");
  // FEATURES
  const [sensor1, setSensor1] = useState("N/A");
  const [sensor2, setSensor2] = useState("N/A");
  const [sensor3, setSensor3] = useState("N/A");
  // BATTERY
  const [batteryType, setBatteryType] = useState("N/A");
  const [batteryCharging, setBatteryCharging] = useState("N/A");
  // MISC
  const [color1, setColor1] = useState("N/A");
  const [model1, setModel1] = useState("N/A");
  // TESTS
  const [performance1, setPerformance1] = useState("N/A");
  const [performance2, setPerformance2] = useState("N/A");
  const [performance3, setPerformance3] = useState("N/A");
  const [ohterInfo, setOhterInfo] = useState("N/A");

  // Product details from props
  var details = props.productDetails;
  // Price Range
  const [priceLowestHight, setPriceLowestHight] = useState([0, 0]);
  // Related Products
  const [relatedProducts, setRelatedProducts] = useState([]);
  // Post New Comments
  // const [userProfileImg, setUserProfileImg] = useState(dummyProfileImg128px);
  // const [userName, setUserName] = useState("Random User");
  // const [newComment, setNewComment] = useState("Write some nice stuff...");

  // product Details Setter
  useEffect(() => {
    console.log("Title: ", props.productDetails.title);
    const timer = setTimeout(() => {
      setCategory(details.category);
      // Basic
      setProductName(details.title);
      setBasePrice(details.basePrice);
      setCurrentPrice(details.currentPrice);
      setDiscountType(details.discount.type);
      setDiscountValue(details.discount.value);
      setTotalQuantity(details.totalStock);
      setSellableQuantity(details.sellableStock);
      setBrandName(details.brand);
      setWarranty(details.warranty);
      setUserComments(details.comments);
      // First clear the array before assigning new img data
      setProductImages([]);
      details.images.map((img) => {
        if (img !== null) {
          setProductImages((prevItems) => [
            ...prevItems,
            img,
            // {
            //   original: img,
            //   thumbnail: img,
            // },
          ]);
        }
      });
      // LAUNCH
      setAnnounchDate(details.announceDate);
      setReleaseDate(details.releaseDate);
      // BODY
      setDimension(details.dimension);
      setWeight(details.weight);
      setBuild(details.build);
      // DISPLAY
      setDisplayType(details.displayType);
      setDisplaySize(details.displaySize);
      setDisplayResolution(details.displayResolution);
      setDisplayProtection(details.displayProtection);
      // PLATFORM
      setOS(details.os);
      setChipset(details.chipset);
      setCPU(details.cpu);
      setGPU(details.gpu);
      // MEMORY
      setInternal(details.internalSlot);
      // COMMS
      setWlan(details.wlan);
      setBlueTooth(details.bluetooth);
      setGPS(details.gps);
      setNFC(details.nfc);
      setRadio(details.radio);
      setUSB(details.usb);
      // FEATURES
      setSensor1(details.sensors[0]);
      setSensor2(details.sensors[1]);
      setSensor3(details.sensors[2]);
      // BATTERY
      setBatteryType(details.batteryType);
      setBatteryCharging(details.batteryCharging);
      // MISC
      setColor1(details.colors[0]);
      setModel1(details.models[0]);
      // Other
      setOhterInfo(details.others[0]);
      // TESTS
      setPerformance1(details.performances[0]);
      setPerformance2(details.performances[1]);
      setPerformance3(details.performances[2]);
    }, 2000);
    return () => clearTimeout(timer);
  }, [details]);

  return (
    <>
      <div className={classes.productPage}>
        <div className={classNames(classes.section, classes.sectionGray)}>
          <div className={classes.container} style={{ maxWidth: "96.6vw" }}>
            <div className={classNames(classes.main, classes.mainRaised)}>
              <GridContainer>
                {/* ImageGallery */}
                <GridItem md={4} sm={4} style={{ maxWidth: "25vw" }}>
                  <Carousel>
                    {productImages.map((productImages) => (
                      <div key={productImages.id}>
                        <img src={productImages} />
                        <p className="legend">{productName}</p>
                      </div>
                    ))}
                  </Carousel>
                </GridItem>

                {/* Product Basic Info */}
                <GridItem md={8} sm={8}>
                  {/* Product Name  */}
                  <h2 className={classes.title}>{productName}</h2>

                  {/* Brand Name  */}
                  <div style={{ display: "flex" }}>
                    <h5>Brand:</h5>
                    <h5 className="color2196F3">{" " + brandName}</h5>
                  </div>

                  {/* Price and Discount Percentage */}
                  <div style={{ width: "48vw" }}>
                    <div>
                      <div className="flexDisplay">
                        <h5>Base Price:</h5>
                        <h5 style={{ textDecoration: "line-through" }}>
                          ৳{basePrice}
                        </h5>
                      </div>
                      <div className="flexDisplay">
                        <h5>Current Price:</h5>
                        <h5
                          className="color2196F3"
                          style={{ color: "#FF2400", fontWeight: "bold" }}
                        >
                          ৳{currentPrice}
                        </h5>
                      </div>
                    </div>

                    {/* Discount Percentage  */}
                    {discountType === "PERCENT" && discountValue > 0 ? (
                      <div className="flexDisplay">
                        <h5>Discount Percentage:</h5>
                        <div className="discountPercent-section">
                          -{discountValue}%
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Dotted Underline */}
                  <div
                    style={{
                      borderBottom: "1px dotted #000",
                      marginBottom: "1vh",
                      width: "48vw",
                    }}
                  />

                  {/* Availability, Warranty */}
                  <div className="flexDisplay" style={{ width: "48vw" }}>
                    <div>
                      {/* Availability */}
                      <div className="flexDisplay">
                        <h5>Status:</h5>
                        {sellableQuantity > 0 ? (
                          <h5 className="color2196F3">Available</h5>
                        ) : (
                          <h5 className="colorFF2400">Out of Stock</h5>
                        )}
                      </div>
                      {/* Warranty */}
                      <div className="flexDisplay">
                        <h5>Warranty:</h5>
                        <h5 className="color2196F3">{warranty} Month(s)</h5>
                      </div>
                    </div>
                  </div>

                  <GridContainer style={{ width: "48vw" }}>
                    {/* LAUNCH */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="2" className="gridItem-firstcolumn">
                              LAUNCH
                            </th>
                            <th className="gridItem-secondcolumn">Announced</th>
                            <td>{announchDate}</td>
                          </tr>
                          <tr>
                            <th>Release Date</th>
                            <td>{releaseDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* BODY */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="3" className="gridItem-firstcolumn">
                              BODY
                            </th>
                            <th className="gridItem-secondcolumn">
                              Dimensions
                            </th>
                            <td>{dimension}</td>
                          </tr>
                          <tr>
                            <th>Weight</th>
                            <td>{weight}</td>
                          </tr>
                          <tr>
                            <th>Build</th>
                            <td>{build}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* DISPLAY */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="4" className="gridItem-firstcolumn">
                              DISPLAY
                            </th>
                            <th className="gridItem-secondcolumn">Type</th>
                            <td>{displayType}</td>
                          </tr>
                          <tr>
                            <th>Size</th>
                            <td>{displaySize}</td>
                          </tr>
                          <tr>
                            <th>Resolution</th>
                            <td>{displayResolution}</td>
                          </tr>
                          <tr>
                            <th>Protection</th>
                            <td>{displayProtection}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* PLATFORM */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="4" className="gridItem-firstcolumn">
                              PLATFORM
                            </th>
                            <th className="gridItem-secondcolumn">OS</th>
                            <td>{OS}</td>
                          </tr>
                          <tr>
                            <th>Chipset</th>
                            <td>{chipset}</td>
                          </tr>
                          <tr>
                            <th>CPU</th>
                            <td>{CPU}</td>
                          </tr>
                          <tr>
                            <th>GPU</th>
                            <td>{GPU}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* MEMORY */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th className="gridItem-firstcolumn">MEMORY</th>
                            <th className="gridItem-secondcolumn">Internal</th>
                            <td>{internal}</td>
                          </tr>
                          {/* <tr>
                            <th>Internal</th>
                            <td>{internal}</td>
                          </tr> */}
                        </tbody>
                      </table>
                    </GridItem>

                    {/* COMMS */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="6" className="gridItem-firstcolumn">
                              COMMS
                            </th>
                            <th className="gridItem-secondcolumn">WLAN</th>
                            <td>{wlan}</td>
                          </tr>
                          <tr>
                            <th>Bluetooth</th>
                            <td>{blueTooth}</td>
                          </tr>
                          <tr>
                            <th>GPS</th>
                            <td>{GPS}</td>
                          </tr>
                          <tr>
                            <th>NFC</th>
                            <td>{NFC}</td>
                          </tr>
                          <tr>
                            <th>Radio</th>
                            <td>{radio}</td>
                          </tr>
                          <tr>
                            <th>USB</th>
                            <td>{USB}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* FEATURES */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="3" className="gridItem-firstcolumn">
                              FEATURES
                            </th>
                            <th rowSpan="3" className="gridItem-secondcolumn">
                              Sensors
                            </th>
                            <td>{sensor1}</td>
                          </tr>
                          <tr>
                            <td>{sensor2}</td>
                          </tr>
                          <tr>
                            <td>{sensor3}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* BATTERY */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="3" className="gridItem-firstcolumn">
                              BATTERY
                            </th>
                            <th className="gridItem-secondcolumn">Type</th>
                            <td>{batteryType}</td>
                          </tr>
                          <tr>
                            <th>Charging</th>
                            <td>{batteryCharging}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* MISC */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="2" className="gridItem-firstcolumn">
                              MISC
                            </th>
                            <th className="gridItem-secondcolumn">Colors</th>
                            <td>{color1}</td>
                          </tr>
                          <tr>
                            <th>Models</th>
                            <td>{model1}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* Details Section */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="1" className="gridItem-firstcolumn">
                              Other Info
                            </th>
                            <th className="gridItem-secondcolumn">
                              Other Info
                            </th>
                            <td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: ohterInfo,
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    {/* TESTS */}
                    <GridItem
                      xs={12}
                      sm={12}
                      className="productDetails-gridItem"
                    >
                      <table>
                        <tbody>
                          <tr>
                            <th rowSpan="3" className="gridItem-firstcolumn">
                              TESTS
                            </th>
                            <th rowSpan="3" className="gridItem-secondcolumn">
                              Performance
                            </th>
                            <td>{performance1}</td>
                          </tr>
                          <tr>
                            <td>{performance2}</td>
                          </tr>
                          <tr>
                            <td>{performance3}</td>
                          </tr>
                        </tbody>
                      </table>
                    </GridItem>

                    <br />
                    <br />
                  </GridContainer>
                </GridItem>
              </GridContainer>

              {/* User Opinions & Reviews */}
              <GridContainer>
                <h3 className={classNames(classes.title, classes.textCenter)}>
                  {productName} - User Opinions & Reviews
                </h3>
                <GridItem xs={12} sm={12} md={12} className={classes.mrAuto}>
                  <div>
                    <h3 className={classes.title + " " + classes.textCenter}>
                      {userComments.length} Comments
                    </h3>
                    {/* Users all comments */}
                    <div className="comments-container">
                      {userComments.map((userComments) => (
                        <div
                          className="user-comments-div"
                          key={userComments.id}
                        >
                          <img
                            className="user-profile-img"
                            src={userComments.userImage || dummyProfileImg128px}
                            alt="..."
                          />
                          <h4 className="user-comment-msg">
                            {userComments.msg}
                          </h4>
                          {/* <CloseIcon
                              className="close-icon"
                              onClick={deleteComment.bind(
                                null,
                                userComments.msg
                              )}
                            /> */}
                        </div>
                      ))}
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SmartWatchDetails;
