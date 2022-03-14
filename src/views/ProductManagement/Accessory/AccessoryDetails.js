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

function AccessoryDetails(props) {
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
  // accessory Details
  const [accessoryDetails, setAccessoryDetails] = useState("");
  // Product details from props
  var details = props.productDetails;
  // Price Range
  // Related Products
  // Post New Comments
  // const [userProfileImg, setUserProfileImg] = useState(dummyProfileImg128px);
  // const [userName, setUserName] = useState("Random User");
  // const [newComment, setNewComment] = useState("Write some nice stuff...");

  // product Details Setter
  useEffect(() => {
    // console.log("Title: ", props.productDetails.title);
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
      setAccessoryDetails(details.details);
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
                    {discountType === "PERCENTAGE" && discountValue > 0 ? (
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
                              Details
                            </th>
                            <th className="gridItem-secondcolumn">
                              Detail Info
                            </th>
                            <td>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: accessoryDetails,
                                }}
                              />
                            </td>
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

export default AccessoryDetails;
