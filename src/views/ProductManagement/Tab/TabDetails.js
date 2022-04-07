/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
// images
import dummyProfileImg128px from "assets/img/okolele-img/dummy_profile_img_128px.png";
import phoneDummyImg from "assets/img/okolele-img/mobile-dummy-img.jpg";
import phoneNetwork from "assets/img/okolele-img/product-details-icons/phone-network.png";
import launchIcon from "assets/img/okolele-img/product-details-icons/phone-launch.png";
import phoneBody from "assets/img/okolele-img/product-details-icons/phone-body.png";
import phoneDisplay from "assets/img/okolele-img/product-details-icons/display.png";
import phoneOS from "assets/img/okolele-img/product-details-icons/operating-system.png";
import phoneStorage from "assets/img/okolele-img/product-details-icons/ram.png";
import backCamera from "assets/img/okolele-img/product-details-icons/back-camera.png";
import frontCamera from "assets/img/okolele-img/product-details-icons/front-camera.png";
import soundIcon from "assets/img/okolele-img/product-details-icons/sound-wave.png";
import commsIcon from "assets/img/okolele-img/product-details-icons/connectivity.png";
import featureIcon from "assets/img/okolele-img/product-details-icons/feature.png";
import batteryIcon from "assets/img/okolele-img/product-details-icons/battery.png";
import miscIcon from "assets/img/okolele-img/product-details-icons/misc.png";
import testIcon from "assets/img/okolele-img/product-details-icons/test.png";
// Carousel ImageGallery
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//SCSS file
import "assets/scss/ghorwali-scss/_product-details.scss";

const useStyles = makeStyles(styles);

export default function TabDetails(props) {
  const classes = useStyles();
  const history = useHistory();
  // General
  const [category, setCategory] = useState("");
  // Basic
  const [mName1, setmName1] = useState("");
  const [mDiscountType, setmDiscountType] = useState("");
  const [mDiscountValue, setmDiscountValue] = useState(0);
  const [mBrandName1, setmBrandName1] = useState("");
  const [mWarranty1, setmWarranty1] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [productImages, setProductImages] = useState([]);
  //All Variant
  const [allVariants, setAllVariants] = useState([]);
  //All the variants for a selected color
  const [selectedColorVariants, setSelectedColorVariants] = useState([]);
  // selected color
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariantBasePrice, setSelectedVariantBasePrice] = useState(0);
  const [
    selectedVariantCurrentPrice,
    setSelectedVariantCurrentPrice,
  ] = useState(0);
  const [selectedVariantTotalStock, setSelectedVariantTotalStock] = useState(0);
  const [
    selectedVariantSellableStock,
    setSelectedVariantSellableStock,
  ] = useState(0);
  const [selectedVariantRam, setSelectedVariantRam] = useState(0);
  const [selectedVariantRom, setSelectedVariantRom] = useState(0);
  const [selectedVariantRamRom, setSelectedVariantRamRom] = useState("");

  // NETWORK
  const [mTechnology1, setmTechnology1] = useState("");
  const [m2GBand, setm2GBand] = useState([]);
  const [m3GBand, setm3GBand] = useState([]);
  const [m4GBand, setm4GBand] = useState([]);
  const [m5GBand, setm5GBand] = useState([]);
  const [mSpeed1, setmSpeed1] = useState("");
  // LAUNCH
  const [mAnnounchDate1, setmAnnounchDate1] = useState("");
  const [mReleaseDate1, setmReleaseDate1] = useState("");
  // BODY
  const [mDimension1, setmDimension1] = useState("");
  const [mWeight1, setmWeight1] = useState("");
  const [mBuild1, setmBuild1] = useState("");
  const [mSim1, setmSim1] = useState("");
  // DISPLAY
  const [mDisplayType1, setmDisplayType1] = useState("");
  const [mDisplaySize1, setmDisplaySize1] = useState("");
  const [mResolution1, setmResolution1] = useState("");
  const [mProtection1, setmProtection1] = useState("");
  // PLATFORM
  const [mOS1, setmOS1] = useState("");
  const [mChipset1, setmChipset1] = useState("");
  const [mCPU1, setmCPU1] = useState("");
  const [mGPU, setmGPU] = useState("");
  // MEMORY
  const [mCardSlot1, setmCardSlot1] = useState("");
  const [mInternal1, setmInternal1] = useState("");
  // MAIN CAMERA
  const [mainCameras, setMainCameras] = useState([]);
  const [mMainFeatures, setmMainFeatures] = useState([]);
  const [mMainVideo, setmMainVideo] = useState([]);
  // SELFIE CAMERA
  const [mSecondaryMP1, setmSecondaryMP1] = useState([]);
  const [mSecondaryFeatures1, setmSecondaryFeatures1] = useState([]);
  const [mSecondaryVideo1, setmSecondaryVideo1] = useState([]);
  // SOUND
  const [mLoudSpeaker1, setmLoudSpeaker1] = useState("");
  const [mJack1, setmJack1] = useState("");
  // COMMS
  const [mWlan1, setmWlan1] = useState("");
  const [mBlueTooth1, setmBlueTooth1] = useState("");
  const [mGPS1, setmGPS1] = useState("");
  const [mNFC1, setmNFC1] = useState("");
  const [mRadio1, setmRadio1] = useState("");
  const [mUSB1, setmUSB1] = useState("");
  // FEATURES
  const [mSensor, setmSensor] = useState([]);
  // BATTERY
  const [mType1, setmType1] = useState("");
  const [mBatteryCharging1, setmBatteryCharging1] = useState("");
  // MISC
  // const [mColor1, setmColor1] = useState("N/A");
  const [mModel1, setmModel1] = useState("");
  const [mSar1, setmSar1] = useState("");
  const [mSarEu1, setmSarEu1] = useState("");
  // TESTS
  const [mPerformance, setmPerformance] = useState([]);

  // Post New Comments
  const [userProfileImg, setUserProfileImg] = useState(dummyProfileImg128px);
  const [userName, setUserName] = useState("Random User");
  const [newComment, setNewComment] = useState("");

  // Phone Details from props/API call
  useEffect(() => {
    if (props.productDetails != undefined) {
      productDetailsSetter(props.productDetails);
    }
  }, [props.productDetails]);

  // product Details Setter
  const productDetailsSetter = (details) => {
    setCategory(details.category);
    // Basic
    setmName1(details.title);
    setmDiscountType(details.discount.type);
    setmDiscountValue(details.discount.value);
    setmBrandName1(details.brand);
    setmWarranty1(details.warranty);
    setUserComments(details.comments);
    //Variants
    setAllVariants(details.variants);
    // set null initially
    setProductImages([]);
    // Initial Img Setter
    if (Object.keys(details.variants[0].images).length !== 0) {
      details.variants[0].images.map((img) => {
        setProductImages((prevItems) => [
          ...prevItems,
          {
            original: img,
            thumbnail: img,
          },
        ]);
      });
    } else {
      setProductImages([{ original: phoneDummyImg, thumbnail: null }]);
    }
    // Initial Selected Color setter
    setSelectedColor(details.variants[0].color);
    //All the variants for a selected color
    // Initial value is the first index value
    if (details.variants.length > 0) {
      setSelectedColorVariants(details.variants[0].variants);
    }

    // Set initial value of inner variants object (Capacity)
    setSelectedVariantBasePrice(details.variants[0].variants[0].basePrice);
    setSelectedVariantCurrentPrice(
      details.variants[0].variants[0].currentPrice
    );
    setSelectedVariantTotalStock(details.variants[0].variants[0].totalStock);
    setSelectedVariantSellableStock(
      details.variants[0].variants[0].sellableStock
    );
    setSelectedVariantRam(details.variants[0].variants[0].ram);
    setSelectedVariantRom(details.variants[0].variants[0].rom);
    setSelectedVariantRamRom(
      details.variants[0].variants[0].ram + details.variants[0].variants[0].rom
    );

    // NETWORK
    setmTechnology1(details.technology);
    setm2GBand(details.m2GBands);
    setm3GBand(details.m3GBands);
    setm4GBand(details.m4GBands);
    setm5GBand(details.m5GBands);
    setmSpeed1(details.currentPrice);
    // LAUNCH
    setmAnnounchDate1(details.announceDate);
    setmReleaseDate1(details.releaseDate);
    // BODY
    setmDimension1(details.dimension);
    setmWeight1(details.weight);
    setmBuild1(details.build);
    setmSim1(details.sim);
    // DISPLAY
    setmDisplayType1(details.displayType);
    setmDisplaySize1(details.displaySize);
    setmResolution1(details.displayResolution);
    setmProtection1(details.displayProtection);
    // PLATFORM
    setmOS1(details.os);
    setmChipset1(details.chipset);
    setmCPU1(details.cpu);
    setmGPU(details.gpu);
    // MEMORY
    setmCardSlot1(details.cardSlot);
    setmInternal1(details.internalSlot);
    // MAIN CAMERA
    setMainCameras(details.mainCamera);
    setmMainFeatures(details.mainCameraFeatures);
    setmMainVideo(details.mainCameraVideo);
    // SELFIE CAMERA
    setmSecondaryMP1(details.frontCamera);
    setmSecondaryFeatures1(details.frontCameraFeatures);
    setmSecondaryVideo1(details.frontCameraVideo);
    // SOUND
    setmLoudSpeaker1(details.loudspeaker);
    setmJack1(details.jack);
    // COMMS
    setmWlan1(details.wlan);
    setmBlueTooth1(details.bluetooth);
    setmGPS1(details.gps);
    setmNFC1(details.nfc);
    setmRadio1(details.radio);
    setmUSB1(details.usb);
    // FEATURES
    setmSensor(details.sensors);
    // BATTERY
    setmType1(details.batteryType);
    setmBatteryCharging1(details.batteryCharging);
    // MISC
    setmModel1(details.models[0]);
    setmSar1(details.sarUs);
    setmSarEu1(details.sarEu);
    // TESTS
    setmPerformance(details.performances);
  };

  const productColorClick = (variant, e) => {
    e.preventDefault();

    setSelectedColor(variant.color);
    // console.log("variant.images: ...", variant.images);
    if (Object.keys(variant.images).length !== 0) {
      setProductImages([]); //First set to empty to clear previous data
      variant.images.map((img) => {
        setProductImages((prevItems) => [
          ...prevItems,
          {
            original: img,
            thumbnail: img,
          },
        ]);
      });
    } else {
      setProductImages([{ original: phoneDummyImg, thumbnail: null }]);
    }
    setSelectedColorVariants(variant.variants);

    // Once a clolor is selected, select the first capacity automatically
    setSelectedVariantBasePrice(variant.variants[0].basePrice);
    setSelectedVariantCurrentPrice(variant.variants[0].currentPrice);
    setSelectedVariantTotalStock(variant.variants[0].totalStock);
    setSelectedVariantSellableStock(variant.variants[0].sellableStock);
    setSelectedVariantRam(variant.variants[0].ram);
    setSelectedVariantRom(variant.variants[0].rom);
    setSelectedVariantRamRom(variant.variants[0].ram + variant.variants[0].rom);
  };

  const productCapacityClick = (variant) => {
    setSelectedVariantBasePrice(variant.basePrice);
    setSelectedVariantCurrentPrice(variant.currentPrice);
    setSelectedVariantTotalStock(variant.totalStock);
    setSelectedVariantSellableStock(variant.sellableStock);
    setSelectedVariantRam(variant.ram);
    setSelectedVariantRom(variant.rom);
    setSelectedVariantRamRom(variant.ram + variant.rom);
  };

  // Post new comment
  const userNewComment = {
    msg: newComment,
    userName: userName,
    userImage: userProfileImg,
  };
  const postNewComment = () => {
    let newCommentAPI = rootPath[0] + "/tablets/addComment/" + productId;
    axios
      .post(newCommentAPI, userNewComment)
      .then(function (response) {})
      .catch(function (error) {
        console.log("error: ", error);
      });
  };

  return (
    <div>
      <div className={classes.main + "" + classes.mainRaised}>
        <div className="sec-container">
          <div style={{ marginTop: "10px" }}>
            {/* Product Basic Info */}
            {/* Color & capacity selector */}
            <div className="sec-basic-grid-cont">
              {/* Products Basic Section */}
              <div className="product-details-label1">{mName1}</div>
              {/* ImageGallery, color selector and capacity selector */}
              <GridContainer>
                {/* ImageGallery */}
                <GridItem xs={12} sm={3} md={6}>
                  <Carousel className="carousel-root">
                    {productImages.map((productImages) => (
                      <div key={productImages.id}>
                        <img src={productImages.original} />
                        {/* <p className="legend">{productName}</p> */}
                      </div>
                    ))}
                  </Carousel>

                  {/* Price & Discount */}
                  <div className="price-discount-sec">
                    {/* Price */}
                    <div>
                      {selectedVariantBasePrice ===
                      selectedVariantCurrentPrice ? (
                        //If current price & base price is same
                        <span
                          className="currten-price"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Price: {selectedVariantBasePrice}৳
                        </span>
                      ) : (
                        //If current price & base price is not same
                        <div
                          className={classes.priceContainer}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Price:
                          <span className="old-price">
                            <p>{selectedVariantBasePrice}৳</p>
                          </span>
                          <span className="currten-price">
                            {selectedVariantCurrentPrice}৳
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Discount */}
                    {mDiscountValue > 0 && selectedVariantCurrentPrice > 0 && (
                      <div style={{ marginLeft: "3vw" }}>
                        {mDiscountType === "PERCENTAGE" &&
                        mDiscountValue > 0 ? (
                          <div className="discount-percentage">
                            -{mDiscountValue}%
                          </div>
                        ) : (
                          <div>
                            {mDiscountType === "FLAT" && mDiscountValue > 0 ? (
                              <div className="discount-percentage">
                                -{mDiscountValue}৳
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Brand */}
                  {mBrandName1.length > 0 && (
                    <div
                      className="product-details-label6"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Brand: {mBrandName1}
                    </div>
                  )}
                  {/* Selected Variant Ram & Rom */}
                  {selectedVariantRam > 0 && (
                    <div
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <div className="product-details-label6">
                        RAM: {selectedVariantRam} GB /
                      </div>

                      <div className="product-details-label6">
                        ROM: {selectedVariantRom} GB
                      </div>
                    </div>
                  )}
                  {/* Selected Variant Color */}
                  {selectedColor.length > 0 && (
                    <div
                      className="product-details-label6"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Color: {selectedColor}
                    </div>
                  )}
                </GridItem>

                <GridItem xs={12} sm={3} md={6}>
                  <div className="product-details-label2">
                    Choose your color:
                  </div>
                  <br />
                  {/* Choose your color: */}
                  <GridContainer>
                    {allVariants.map((productVariants) => (
                      <GridItem
                        xs={6}
                        sm={6}
                        md={6}
                        onClick={() =>
                          productColorClick(productVariants, event)
                        }
                        key={productVariants.id}
                      >
                        <div
                          className="product-details-color-sec"
                          style={{
                            borderColor:
                              productVariants.color === selectedColor
                                ? "#0E86D4"
                                : "#d3d3d3",
                          }}
                        >
                          <div
                            className="product-details-color-color"
                            style={{ background: productVariants.colorCode }}
                          />
                          <div
                            className="product-details-label4"
                            style={{ marginTop: "7px" }}
                          >
                            {productVariants.color}
                          </div>
                        </div>
                      </GridItem>
                    ))}
                  </GridContainer>

                  <div className="product-details-label2">
                    Choose your capacity:
                  </div>
                  <br />

                  {/* Choose your capacity: */}
                  <GridContainer>
                    {console.log(
                      "selectedColorVariants:",
                      selectedColorVariants
                    )}
                    {selectedColorVariants.map((selectedVrnt) => (
                      <GridItem
                        xs={6}
                        sm={6}
                        md={6}
                        onClick={() => productCapacityClick(selectedVrnt)}
                        key={selectedVrnt.id}
                      >
                        <div
                          className="product-details-capacity-sec"
                          style={{
                            borderColor:
                              selectedVrnt.ram + selectedVrnt.rom ===
                              selectedVariantRamRom
                                ? "#0E86D4"
                                : "#d3d3d3",
                          }}
                        >
                          {/* Ram / Rom */}
                          <div className="ram-rom-div-cont">
                            <div className="product-details-label3">
                              {selectedVrnt.ram}GB /
                            </div>
                            <div className="product-details-label6">
                              {selectedVrnt.rom}GB
                            </div>
                          </div>
                          <div
                            className="product-details-label4"
                            style={{ marginTop: "7px" }}
                          >
                            {selectedVrnt.currentPrice}৳
                          </div>
                        </div>
                      </GridItem>
                    ))}
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>

            {/* Product Detail Info */}
            <div
              className="product-details-label3"
              style={{
                marginTop: "10vh",
                justifyContent: "center",
                display: "flex",
              }}
            >
              Detail Specifications
            </div>
            <div style={{ margin: "50px 50px" }}>
              <GridContainer>
                {/* Network */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={phoneNetwork} alt="Netword" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    NETWORK
                  </div>
                  {/* Technology */}
                  {mTechnology1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Technology</div>
                      <div className="product-details-label4">
                        {mTechnology1}
                      </div>
                    </div>
                  )}
                  {/* 2GBand */}
                  {Object.keys(m2GBand).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">2G Bands </div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {m2GBand.map((m2GBands) => (
                          <div key={m2GBands.id}>{m2GBands}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* 3GBand */}
                  {Object.keys(m3GBand).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">3G Bands </div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {m3GBand.map((m3GBands) => (
                          <div key={m3GBands.id}>{m3GBands}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* 4GBand */}
                  {Object.keys(m4GBand).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">4G Bands </div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {m4GBand.map((m4GBands) => (
                          <div key={m4GBands.id}>{m4GBands}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* 5GBand */}
                  {Object.keys(m5GBand).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">5G Bands </div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {m5GBand.map((m5GBands) => (
                          <div key={m5GBands.id}>{m5GBands}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Speed */}
                  {mSpeed1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Speed</div>
                      <div className="product-details-label4">{mSpeed1}</div>
                    </div>
                  )}
                </GridItem>

                {/* DISPLAY */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={phoneDisplay} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    DISPLAY
                  </div>
                  {/* Display Type */}
                  {mDisplayType1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        Display Type
                      </div>
                      <div className="product-details-label4">
                        {mDisplayType1}
                      </div>
                    </div>
                  )}
                  {/* Display Size */}
                  {mDisplaySize1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        Display Size
                      </div>
                      <div className="product-details-label4">
                        {mDisplaySize1}
                      </div>
                    </div>
                  )}
                  {/* Resolution */}
                  {mResolution1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Resolution</div>
                      <div className="product-details-label4">
                        {mResolution1}
                      </div>
                    </div>
                  )}
                  {/* Protection */}
                  {mProtection1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Protection</div>
                      <div className="product-details-label4">
                        {mProtection1}
                      </div>
                    </div>
                  )}
                </GridItem>

                {/* BODY */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={phoneBody} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    BODY
                  </div>
                  {/* Dimensions */}
                  {mDimension1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Dimensions</div>
                      <div className="product-details-label4">
                        {mDimension1}
                      </div>
                    </div>
                  )}
                  {/* Weight */}
                  {mWeight1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Weight</div>
                      <div className="product-details-label4">{mWeight1}</div>
                    </div>
                  )}
                  {/* Build */}
                  {mBuild1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Build</div>
                      <div className="product-details-label4">{mBuild1}</div>
                    </div>
                  )}
                  {/* SIM */}
                  {mSim1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">SIM</div>
                      <div className="product-details-label4">{mSim1}</div>
                    </div>
                  )}
                </GridItem>

                {/* LAUNCH */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={launchIcon} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    LAUNCH
                  </div>
                  {/* Announced */}
                  {mAnnounchDate1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Announced</div>
                      <div className="product-details-label4">
                        {mAnnounchDate1}
                      </div>
                    </div>
                  )}
                  {/* Released */}
                  {mReleaseDate1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Released</div>
                      <div className="product-details-label4">
                        {mReleaseDate1}
                      </div>
                    </div>
                  )}
                </GridItem>

                {/* MEMORY */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={phoneStorage} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    MEMORY
                  </div>
                  {/* Card slot */}
                  {mCardSlot1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Card slot</div>
                      <div className="product-details-label4">{mCardSlot1}</div>
                    </div>
                  )}
                  {/* Internal Storage */}
                  {mInternal1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        Internal Storage
                      </div>
                      <div className="product-details-label4">{mInternal1}</div>
                    </div>
                  )}
                </GridItem>

                {/* BATTERY */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={batteryIcon} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    BATTERY
                  </div>
                  {/* Battery Type */}
                  {mType1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        Battery Type
                      </div>
                      <div className="product-details-label4">{mType1}</div>
                    </div>
                  )}
                  {/* Charging Type */}
                  {mBatteryCharging1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        Charging Type
                      </div>
                      <div className="product-details-label4">
                        {mBatteryCharging1}
                      </div>
                    </div>
                  )}
                </GridItem>

                {/* PLATFORM */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={phoneOS} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    PLATFORM
                  </div>
                  {/* OS */}
                  {mOS1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">OS</div>
                      <div className="product-details-label4">{mOS1}</div>
                    </div>
                  )}
                  {/* Chipset */}
                  {mChipset1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Chipset</div>
                      <div className="product-details-label4">{mChipset1}</div>
                    </div>
                  )}
                  {/* CPU */}
                  {mCPU1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">CPU</div>
                      <div className="product-details-label4">{mCPU1}</div>
                    </div>
                  )}
                  {/* GPU */}
                  {mGPU !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">GPU</div>
                      <div className="product-details-label4">{mGPU}</div>
                    </div>
                  )}
                </GridItem>

                {/* MAIN CAMERA */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={backCamera} alt="Netword" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    MAIN CAMERA
                  </div>
                  {/* Camera(s) */}
                  {Object.keys(mainCameras).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        {Object.keys(mainCameras).length} Camera(s)
                      </div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mainCameras.map((mainCameras) => (
                          <div key={mainCameras.id}>{mainCameras}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Camera(s) Features*/}
                  {Object.keys(mMainFeatures).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Features</div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mMainFeatures.map((mMainFeatures) => (
                          <div key={mMainFeatures.id}>{mMainFeatures}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Camera(s) Video*/}
                  {Object.keys(mMainVideo).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Video</div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mMainVideo.map((mMainVideo) => (
                          <div key={mMainVideo.id}>{mMainVideo}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </GridItem>

                {/* SELFIE CAMERA */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={frontCamera} alt="Netword" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    SELFIE CAMERA
                  </div>
                  {/* Camera(s) */}
                  {Object.keys(mSecondaryMP1).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">
                        {Object.keys(mSecondaryMP1).length} Camera(s)
                      </div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mSecondaryMP1.map((mSecondaryMP1) => (
                          <div key={mSecondaryMP1.id}>{mSecondaryMP1}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Camera(s) Features*/}
                  {Object.keys(mSecondaryFeatures1).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Features</div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mSecondaryFeatures1.map((mSecondaryFeatures1) => (
                          <div key={mSecondaryFeatures1.id}>
                            {mSecondaryFeatures1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Camera(s) Video*/}
                  {Object.keys(mSecondaryVideo1).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Video</div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mSecondaryVideo1.map((mSecondaryVideo1) => (
                          <div key={mSecondaryVideo1.id}>
                            {mSecondaryVideo1}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </GridItem>

                {/* SOUND */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={soundIcon} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    SOUND
                  </div>
                  {/* Loudspeaker */}
                  {mLoudSpeaker1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Loudspeaker</div>
                      <div className="product-details-label4">
                        {mLoudSpeaker1}
                      </div>
                    </div>
                  )}
                  {/* Jack */}
                  {mJack1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Jack</div>
                      <div className="product-details-label4">{mJack1}</div>
                    </div>
                  )}
                </GridItem>

                {/* FEATURES */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={featureIcon} alt="Netword" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    FEATURES
                  </div>
                  {/* Sensors */}
                  {Object.keys(mSensor).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Sensors</div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mSensor.map((mSensor) => (
                          <div key={mSensor.id}>{mSensor}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </GridItem>

                {/* MISC */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={miscIcon} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    MISC
                  </div>
                  {/* Models */}
                  {mModel1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Model(s)</div>
                      <div className="product-details-label4">{mModel1}</div>
                    </div>
                  )}
                  {/* SAR */}
                  {mSar1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">SAR</div>
                      <div className="product-details-label4">{mSar1}</div>
                    </div>
                  )}
                  {/* SAR EU */}
                  {mSarEu1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">SAR EU</div>
                      <div className="product-details-label4">{mSarEu1}</div>
                    </div>
                  )}
                </GridItem>

                {/* COMMS */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={commsIcon} alt="Launch" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    COMMS
                  </div>
                  {/* WLAN */}
                  {mWlan1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">WLAN</div>
                      <div className="product-details-label4">{mWlan1}</div>
                    </div>
                  )}
                  {/* Bluetooth */}
                  {mBlueTooth1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Bluetooth</div>
                      <div className="product-details-label4">
                        {mBlueTooth1}
                      </div>
                    </div>
                  )}
                  {/* GPS */}
                  {mGPS1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">GPS</div>
                      <div className="product-details-label4">{mGPS1}</div>
                    </div>
                  )}
                  {/* NFC */}
                  {mNFC1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">NFC</div>
                      <div className="product-details-label4">{mNFC1}</div>
                    </div>
                  )}
                  {/* Radio */}
                  {mRadio1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Radio</div>
                      <div className="product-details-label4">{mRadio1}</div>
                    </div>
                  )}
                  {/* USB */}
                  {mUSB1 !== undefined && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">USB</div>
                      <div className="product-details-label4">{mUSB1}</div>
                    </div>
                  )}
                </GridItem>

                {/* TESTS */}
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className="productDetails-grid-item"
                  style={{ marginBottom: "30px" }}
                >
                  <img src={testIcon} alt="Netword" className="img-icon" />
                  <div className="product-details-label2 details-sec-header">
                    TESTS
                  </div>
                  {/* Performance */}
                  {Object.keys(mPerformance).length !== 0 && (
                    <div style={{ alignItems: "center" }}>
                      <div className="product-details-label5 ">Performance</div>
                      <div
                        className="product-details-label4"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {mPerformance.map((mPerformance) => (
                          <div key={mPerformance.id}>{mPerformance}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </GridItem>
              </GridContainer>

              {/* User Opinions & Reviews */}
              <GridContainer>
                <h3 className={classes.title + "" + classes.textCenter}>
                  {mName1} - User Opinions & Reviews
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
    </div>
  );
}
