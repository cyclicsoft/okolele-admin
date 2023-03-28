/*eslint-disable*/
import React, { useEffect, useState } from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// Style
// import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
import productStyle from "../../../../assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";

//SCSS file
import detailStyles from "../../../../assets/scss/ghorwali-scss/_product-details-comp.module.scss";
// Okolele components
import ProductFeatureArray from "../ProductDetails/ProductFeatureArray";
import ProductFeatureString from "../ProductDetails/ProductFeatureString";
import ColorSelector from "../ProductDetails/ColorSelector";
// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
toast.configure();
// OKOLele Strings
import { previousPath } from "../../../../services/static/okolele-strings";
import ImageCarousel2 from "../ImageCarousel/ImageCarousel2";
import CapacitySelector from "./CapacitySelector";
import appIcons from "services/static/appIcons.js";

const useStyles = makeStyles(productStyle);

export default function ProductDetailsComponent(props) {
  const classes = useStyles();

  // Product details from props
  var productAttributes = props.prodAttributes;

  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // Path URL
  let pathURL = window.location.pathname;
  // Product id
  const [productId, setProductId] = useState("");

  const [productInfo, setProductInfo] = useState({
    // General
    category: "",
    name: "",
    // Basic
    discountType: "",
    discountValue: 0,
    brand: "",
    warranty: "",
    images: [],
    //All Variant
    allVariants: [],
    // NETWORK
    technology: "",
    band2G: [],
    band3G: [],
    band4G: [],
    band5G: [],
    speed: "",
    // LAUNCH
    announceDate: "",
    releaseDate: "",
    // BODY
    dimension: "",
    weight: "",
    build: "",
    sim: "",
    // DISPLAY
    displayType: "",
    displaySize: "",
    displayResolution: "",
    displayProtection: "",
    // PLATFORM
    os: "",
    chipset: "",
    cpu: "",
    gpu: "",
    // MEMORY
    cardSlot: "",
    internal: "",
    // MAIN CAMERA
    mainCams: [],
    mainCamFeatures: [],
    mainCamVideo: [],
    // SELFIE CAMERA
    selfiCams: [],
    selfiCamFeatures: [],
    selfiCamVideo: [],
    // SOUND
    loudSpeaker: "",
    jack: "",
    // COMMS
    wlan: "",
    blueTooth: "",
    gps: "",
    nfc: "",
    radio: "",
    usb: "",
    // FEATURES
    sensors: [],
    // BATTERY
    batteryType: "",
    batteryCharging: "",
    // MISC
    model: "",
    sar: "",
    sarEu: "",
    // TESTS
    performance: [],
    // OTHERS
    others: [],
  });

  const [category, setCategory] = useState("MOBILE");

  //All the variants for a selected color
  // const [allVariants, setAllVariants] = useState([]);
  const [selectedColorVariants, setSelectedColorVariants] = useState([]);
  // selected color
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariantBasePrice, setSelectedVariantBasePrice] = useState(0);
  const [
    selectedVariantCurrentPrice,
    setSelectedVariantCurrentPrice,
  ] = useState(0);
  const [colorVariantId, setColorVariantId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [selectedVariantTotalStock, setSelectedVariantTotalStock] = useState(0);
  const [
    selectedVariantSellableStock,
    setSelectedVariantSellableStock,
  ] = useState(0);
  const [selectedVariantRam, setSelectedVariantRam] = useState(0);
  const [selectedVariantRamUnit, setSelectedVariantRamUnit] = useState("");
  const [selectedVariantRom, setSelectedVariantRom] = useState(0);
  const [selectedVariantRomUnit, setSelectedVariantRomUnit] = useState("");

  // Cart
  const [prodExistInCart, setProdExistInCart] = useState(false);
  // show Alert
  const [showAlert, setShowAlert] = useState(false);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  // Data loader flag
  const [showTwinSpin, setShowTwinSpin] = useState(false);

  // product Details from props/API call
  useEffect(() => {
    setShowTwinSpin(true);
    let prodId = "";
    getProductID((pId) => {
      prodId = pId;
    });

    if (productAttributes != undefined) {
      productDetailsSetter(productAttributes);

      setShowTwinSpin(false);
    } else {
      let productDetailsURL =
        rootPath + "/" + props.productCategory + "/" + prodId;

      axios
        .get(productDetailsURL)
        .then(function (response) {
          if (response.status === 200) {
            productDetailsSetter(response.data.content);
          }

          setShowTwinSpin(false);
        })
        .catch(function (error) {
          setShowTwinSpin(false);
        });
    }
  }, [productAttributes]);

  // product Details Setter
  const productDetailsSetter = (details) => {
    if (details.category === 1) {
      setCategory("MOBILE");
      localStorage.setItem(previousPath, JSON.stringify("/phone-details"));
    } else if (details.category === 2) {
      setCategory("TABLET");
      localStorage.setItem(previousPath, JSON.stringify("/tab-details"));
    } else if (details.category === 3) {
      setCategory("SMARTWATCH");
      localStorage.setItem(previousPath, JSON.stringify("/smartwatch-details"));
    } else if (details.category === 4) {
      setCategory("ACCESSORY");
      localStorage.setItem(previousPath, JSON.stringify("/accessory-details"));
    }

    setProductInfo({
      // General
      category: details.category,
      name: details.title,
      // Basic
      discountType: details?.discount?.type ? details.discount.type : "",
      discountValue: details?.discount?.value ? details.discount.value : 0,
      brand: details.brand,
      warranty: details.warranty ? details.warranty : "",
      images:
        details?.variants?.length > 0
          ? //&& Object.keys(details.variants[0].images).length > 0
            details.variants[0].images.map((img) => {
              return {
                original: rootPath + "/file/download/" + img,
                thumbnail: rootPath + "/file/download/" + img,
              };
            })
          : [{ original: appIcons.phoneDummyImg, thumbnail: null }],
      //All Variant
      allVariants: details.variants ? details.variants : [],
      // NETWORK
      technology: details.technology ? details.technology : "",
      band2G: details.m2GBands ? details.m2GBands : [],
      band3G: details.m3GBands ? details.m3GBands : [],
      band4G: details.m4GBands ? details.m4GBands : [],
      band5G: details.m5GBands ? details.m5GBands : [],
      speed: details.speed ? details.speed : "",
      // LAUNCH
      announceDate: details.announceDate ? details.announceDate : "",
      releaseDate: details.releaseDate ? details.releaseDate : "",
      // BODY
      dimension: details.dimension ? details.dimension : "",
      weight: details.weight ? details.weight : "",
      build: details.build ? details.build : "",
      sim: details.sim ? details.sim : "",
      // DISPLAY
      displayType: details.displayType ? details.displayType : "",
      displaySize: details.displaySize ? details.displaySize : "",
      displayResolution: details.displayResolution
        ? details.displayResolution
        : "",
      displayProtection: details.displayProtection
        ? details.displayProtection
        : "",
      // PLATFORM
      os: details.os ? details.os : "",
      chipset: details.chipset ? details.chipset : "",
      cpu: details.cpu ? details.cpu : "",
      gpu: details.gpu ? details.gpu : "",
      // MEMORY
      cardSlot: details.cardSlot ? details.cardSlot : "",
      internal: details.internalSlot ? details.internalSlot : "",
      // MAIN CAMERA
      mainCams: details.mainCamera ? details.mainCamera : [],
      mainCamFeatures: details.mainCameraFeatures
        ? details.mainCameraFeatures
        : [],
      mainCamVideo: details.mainCameraVideo ? details.mainCameraVideo : [],
      // SELFIE CAMERA
      selfiCams: details.frontCamera ? details.frontCamera : [],
      selfiCamFeatures: details.frontCameraFeatures
        ? details.frontCameraFeatures
        : [],
      selfiCamVideo: details.frontCameraVideo ? details.frontCameraVideo : [],
      // SOUND
      loudSpeaker: details.loudspeaker ? details.loudspeaker : "",
      jack: details.jack ? details.jack : "",
      // COMMS
      wlan: details.wlan ? details.wlan : "",
      blueTooth: details.bluetooth ? details.bluetooth : "",
      gps: details.gps ? details.gps : "",
      nfc: details.nfc ? details.nfc : "",
      radio: details.radio ? details.radio : "",
      usb: details.usb ? details.usb : "",
      // FEATURES
      sensors: details.sensors ? details.sensors : [],
      // BATTERY
      batteryType: details.batteryType ? details.batteryType : "",
      batteryCharging: details.batteryCharging ? details.batteryCharging : "",
      // MISC
      model: details.models ? details.models[0] : "",
      sar: details.sarUs ? details.sarUs : "",
      sarEu: details.sarEu ? details.sarEu : "",
      // TESTS
      performance: details.performances ? details.performances : [],
      // OTHERS
      others: details.others ? details.others : [],
    });

    //Variants
    // setAllVariants(details.variants);
    // Initial Selected Color setter
    setSelectedColor(details?.variants[0]?.color);
    //All the variants for a selected color
    // Initial value is the first index value
    setSelectedColorVariants(
      details.variants.length > 0 ? details.variants[0].variants : []
    );

    // Set initial value of inner variants object (Capacity)
    setSelectedVariantBasePrice(
      details.category != 4
        ? details.variants[0].variants[0].basePrice
        : details.variants[0].basePrice
    );
    setSelectedVariantCurrentPrice(
      details.category != 4
        ? details.variants[0].variants[0].currentPrice
        : details.variants[0].currentPrice
    );
    setColorVariantId(
      details.category != 4
        ? details.variants[0].colorVariantId
        : details.variants[0].variantId
    );
    setVariantId(
      details.category != 4 ? details.variants[0].variants[0].variantId : ""
    );
    setSelectedVariantTotalStock(
      details.category != 4
        ? details.variants[0].variants[0].totalStock
        : details.variants[0].totalStock
    );
    setSelectedVariantSellableStock(
      details.category != 4
        ? details.variants[0].variants[0].sellableStock
        : details.variants[0].sellableStock
    );
    setSelectedVariantRam(
      details.category != 4 ? details.variants[0].variants[0].ram : ""
    );
    setSelectedVariantRamUnit(
      details.category != 4 ? details.variants[0].variants[0].ramUnit : ""
    );
    setSelectedVariantRom(
      details.category != 4 ? details.variants[0].variants[0].rom : ""
    );
    setSelectedVariantRomUnit(
      details.category != 4 ? details.variants[0].variants[0].romUnit : ""
    );
  };

  // get Product ID to get product details
  function getProductID(callback) {
    let lastSlashIndex = -1;
    for (let i in pathURL) {
      if (pathURL.charCodeAt(i) === 47) {
        lastSlashIndex = parseInt(i) + 1;
      }
    }
    if (lastSlashIndex > 0) {
      setProductId(pathURL.slice(lastSlashIndex));
      callback(pathURL.slice(lastSlashIndex));
    }
  }

  // Color Click
  const productColorClick = (variant) => {
    setSelectedColor(variant.color);

    if (Object.keys(variant.images).length > 0) {
      setProductInfo({
        ...productInfo,
        images: variant.images.map((img) => {
          return {
            original: rootPath + "/file/download/" + img,
            thumbnail: rootPath + "/file/download/" + img,
          };
        }),
      });
    } else {
      setProductInfo({
        ...productInfo,
        images: [{ original: appIcons.phoneDummyImg, thumbnail: null }],
      });
    }

    setSelectedColorVariants(variant.variants);

    // Once a clolor is selected, select the first capacity automatically
    setSelectedVariantBasePrice(
      productInfo.category != 4
        ? variant.variants[0].basePrice
        : variant.basePrice
    );
    setSelectedVariantCurrentPrice(
      productInfo.category != 4
        ? variant.variants[0].currentPrice
        : variant.currentPrice
    );
    setColorVariantId(
      productInfo.category != 4 ? variant.colorVariantId : variant.variantId
    );
    setVariantId(
      productInfo.category != 4 ? variant.variants[0].variantId : ""
    );
    setSelectedVariantTotalStock(
      productInfo.category != 4
        ? variant.variants[0].totalStock
        : variant.totalStock
    );
    setSelectedVariantSellableStock(
      productInfo.category != 4
        ? variant.variants[0].sellableStock
        : variant.sellableStock
    );
    setSelectedVariantRam(
      productInfo.category != 4 ? variant.variants[0].ram : ""
    );
    setSelectedVariantRamUnit(
      productInfo.category != 4 ? variant.variants[0].ramUnit : ""
    );
    setSelectedVariantRom(
      productInfo.category != 4 ? variant.variants[0].rom : ""
    );
    setSelectedVariantRomUnit(
      productInfo.category != 4 ? variant.variants[0].romUnit : ""
    );
  };
  // Capacity Click
  const productCapacityClick = (variant) => {
    setSelectedVariantBasePrice(variant.basePrice);
    setSelectedVariantCurrentPrice(variant.currentPrice);
    setVariantId(variant.variantId);
    setSelectedVariantTotalStock(variant.totalStock);
    setSelectedVariantSellableStock(variant.sellableStock);
    setSelectedVariantRam(variant.ram);
    setSelectedVariantRamUnit(variant.ramUnit);
    setSelectedVariantRom(variant.rom);
    setSelectedVariantRomUnit(variant.romUnit);
  };

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      {/* TwinSpin Loader */}
      {/* {showTwinSpin && <TwinSpinLoader />} */}

      <div className={detailStyles["sec-container"]}>
        <div style={{ marginTop: "10px" }}>
          {/* Product Basic Info */}
          {!showTwinSpin && (
            <div className={detailStyles["sec-basic-grid-cont"]}>
              {/* Products Basic Section */}
              <div className={detailStyles["product-details-label1"]}>
                {productInfo.name}
              </div>
              {/* ImageGallery, color selector and capacity selector */}
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={3}
                  md={6}
                  // className={detailStyles["basic-left-pane"]}
                >
                  {/* ImageGallery */}
                  {/* <ImageCarousel imageData={productInfo.images} /> */}
                  <ImageCarousel2 images={productInfo.images} />

                  {/* Price & Discount */}
                  <div className={detailStyles["price-discount-sec"]}>
                    {/* Price */}
                    <div>
                      {selectedVariantBasePrice ===
                      selectedVariantCurrentPrice ? (
                        //If current price & base price is same
                        <span
                          className={detailStyles["currten-price"]}
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
                          <span className={detailStyles["old-price"]}>
                            <p>{selectedVariantBasePrice}৳</p>
                          </span>
                          <span className={detailStyles["currten-price"]}>
                            {selectedVariantCurrentPrice}৳
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Discount */}
                    {productInfo.discountValue > 0 &&
                      selectedVariantCurrentPrice > 0 && (
                        <div style={{ marginLeft: "3vw", marginRight: "50px" }}>
                          {productInfo.discountType === "PERCENTAGE" &&
                          productInfo.discountValue > 0 ? (
                            <div
                              className={detailStyles["discount-percentage"]}
                            >
                              -{productInfo.discountValue}%
                            </div>
                          ) : (
                            <div>
                              {productInfo.discountType === "FLAT" &&
                              productInfo.discountValue > 0 ? (
                                <div
                                  className={
                                    detailStyles["discount-percentage"]
                                  }
                                >
                                  -{productInfo.discountValue}৳
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      )}
                  </div>

                  {/* Brand */}
                  {productInfo.brand.length > 0 && (
                    <div
                      className={detailStyles["product-details-label6"]}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Brand: {productInfo.brand}
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
                      <div className={detailStyles["product-details-label6"]}>
                        RAM: {selectedVariantRam} {selectedVariantRamUnit} /
                      </div>

                      <div className={detailStyles["product-details-label6"]}>
                        ROM: {selectedVariantRom} {selectedVariantRomUnit}
                      </div>
                    </div>
                  )}

                  {/* Selected Variant Color */}
                  {selectedColor.length > 0 && (
                    <div
                      className={detailStyles["product-details-label6"]}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Color: {selectedColor}
                    </div>
                  )}

                  {/* Warranty */}
                  {parseInt(productInfo.warranty) > 0 && (
                    <div
                      className={detailStyles["product-details-label6"]}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      Warranty: {productInfo.warranty}
                      {` `} Month(s)
                    </div>
                  )}
                </GridItem>

                {/* Color & capacity selector */}
                <GridItem xs={12} sm={3} md={6}>
                  <div className={detailStyles["product-details-label2"]}>
                    Choose your color:
                  </div>
                  <br />
                  {/* Choose your color: */}
                  <ColorSelector
                    allVariants={productInfo.allVariants}
                    productColorClick={productColorClick}
                    colorVariantId={colorVariantId}
                  />

                  <div className={detailStyles["product-details-label2"]}>
                    Choose your capacity:
                  </div>
                  <br />

                  {/* Choose your capacity: */}
                  {productInfo.category != 4 && (
                    <CapacitySelector
                      selectedColorVariants={selectedColorVariants}
                      productCapacityClick={productCapacityClick}
                      variantId={variantId}
                    />
                  )}
                </GridItem>
              </GridContainer>
            </div>
          )}

          {/* Detail Specifications Label */}
          <div
            className={detailStyles["product-details-label3"]}
            style={{
              marginTop: "10vh",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Detail Specifications
          </div>

          {/* Product Detail Info */}
          <div style={{ margin: "50px 50px" }}>
            <GridContainer>
              {/* Network */}
              {(productInfo.technology ||
                Object.keys(productInfo.band2G).length > 0 ||
                Object.keys(productInfo.band3G).length > 0 ||
                Object.keys(productInfo.band4G).length > 0 ||
                Object.keys(productInfo.band5G).length > 0 ||
                productInfo.speed) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.phoneNetwork}
                    alt="Netword"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    NETWORK
                  </div>
                  {/* Technology */}
                  {productInfo.technology && (
                    <ProductFeatureString
                      featureLable="Technology"
                      feature={productInfo.technology}
                    />
                  )}

                  {/* 2GBand */}
                  {Object.keys(productInfo.band2G).length > 0 && (
                    <ProductFeatureArray
                      featureLable="2G Bands"
                      features={productInfo.band2G}
                    />
                  )}
                  {/* 3GBand */}
                  {Object.keys(productInfo.band3G).length > 0 && (
                    <ProductFeatureArray
                      featureLable="3G Bands"
                      features={productInfo.band3G}
                    />
                  )}

                  {/* 4GBand */}
                  {Object.keys(productInfo.band4G).length > 0 && (
                    <ProductFeatureArray
                      featureLable="4G Bands"
                      features={productInfo.band4G}
                    />
                  )}

                  {/* 5GBand */}
                  {Object.keys(productInfo.band5G).length > 0 && (
                    <ProductFeatureArray
                      featureLable="5G Bands"
                      features={productInfo.band5G}
                    />
                  )}

                  {/* Speed */}
                  {productInfo.speed && (
                    <ProductFeatureString
                      featureLable="Speed"
                      feature={productInfo.speed}
                    />
                  )}
                </GridItem>
              )}

              {/* DISPLAY */}
              {(productInfo.discountType ||
                productInfo.displaySize ||
                productInfo.displayResolution ||
                productInfo.displayProtection) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.phoneDisplay}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    DISPLAY
                  </div>
                  {/* Display Type */}
                  {productInfo.discountType && (
                    <ProductFeatureString
                      featureLable="Display Type"
                      feature={productInfo.discountType}
                    />
                  )}

                  {/* Display Size */}
                  {productInfo.displaySize && (
                    <ProductFeatureString
                      featureLable="Display Size"
                      feature={productInfo.displaySize}
                    />
                  )}
                  {/* Resolution */}
                  {productInfo.displayResolution && (
                    <ProductFeatureString
                      featureLable="Resolution"
                      feature={productInfo.displayResolution}
                    />
                  )}
                  {/* Protection */}
                  {productInfo.displayProtection && (
                    <ProductFeatureString
                      featureLable="Protection"
                      feature={productInfo.displayProtection}
                    />
                  )}
                </GridItem>
              )}

              {/* BODY */}
              {(productInfo.dimension ||
                productInfo.weight ||
                productInfo.build ||
                productInfo.sim) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.phoneBody}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    BODY
                  </div>
                  {/* Dimensions */}
                  {productInfo.dimension && (
                    <ProductFeatureString
                      featureLable="Dimensions"
                      feature={productInfo.dimension}
                    />
                  )}

                  {/* Weight */}
                  {productInfo.weight && (
                    <ProductFeatureString
                      featureLable="Weight"
                      feature={productInfo.weight}
                    />
                  )}

                  {/* Build */}
                  {productInfo.build && (
                    <ProductFeatureString
                      featureLable="Build"
                      feature={productInfo.build}
                    />
                  )}

                  {/* SIM */}
                  {productInfo.sim && (
                    <ProductFeatureString
                      featureLable="SIM"
                      feature={productInfo.sim}
                    />
                  )}
                </GridItem>
              )}

              {/* LAUNCH */}
              {(productInfo.announceDate || productInfo.releaseDate) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.launchIcon}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    LAUNCH
                  </div>
                  {/* Announced */}
                  {productInfo.announceDate && (
                    <ProductFeatureString
                      featureLable="Announced"
                      feature={productInfo.announceDate}
                    />
                  )}

                  {/* Released */}
                  {productInfo.releaseDate && (
                    <ProductFeatureString
                      featureLable="Released"
                      feature={productInfo.releaseDate}
                    />
                  )}
                </GridItem>
              )}

              {/* MEMORY */}
              {(productInfo.cardSlot || productInfo.internal) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.phoneStorage}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    MEMORY
                  </div>
                  {/* Card slot */}
                  {productInfo.cardSlot && (
                    <ProductFeatureString
                      featureLable="Card Slot"
                      feature={productInfo.cardSlot}
                    />
                  )}

                  {/* Internal Storage */}
                  {productInfo.internal && (
                    <ProductFeatureString
                      featureLable="Internal Storage"
                      feature={productInfo.internal}
                    />
                  )}
                </GridItem>
              )}

              {/* BATTERY */}
              {(productInfo.batteryType || productInfo.batteryCharging) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.batteryIcon}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    BATTERY
                  </div>
                  {/* Battery Type */}
                  {productInfo.batteryType && (
                    <ProductFeatureString
                      featureLable="Battery Type"
                      feature={productInfo.batteryType}
                    />
                  )}
                  {/* Charging Type */}
                  {productInfo.batteryCharging && (
                    <ProductFeatureString
                      featureLable="Charging Type"
                      feature={productInfo.batteryCharging}
                    />
                  )}
                </GridItem>
              )}

              {/* PLATFORM */}
              {(productInfo.os ||
                productInfo.chipset ||
                productInfo.cpu ||
                productInfo.gpu) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.phoneOS}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    PLATFORM
                  </div>
                  {/* OS */}
                  {productInfo.os && (
                    <ProductFeatureString
                      featureLable="OS"
                      feature={productInfo.os}
                    />
                  )}

                  {/* Chipset */}
                  {productInfo.chipset && (
                    <ProductFeatureString
                      featureLable="Chipset"
                      feature={productInfo.chipset}
                    />
                  )}

                  {/* CPU */}
                  {productInfo.cpu && (
                    <ProductFeatureString
                      featureLable="CPU"
                      feature={productInfo.cpu}
                    />
                  )}

                  {/* GPU */}
                  {productInfo.gpu && (
                    <ProductFeatureString
                      featureLable="GPU"
                      feature={productInfo.gpu}
                    />
                  )}
                </GridItem>
              )}

              {/* MAIN CAMERA */}
              {(Object.keys(productInfo.mainCams).length > 0 ||
                Object.keys(productInfo.mainCamFeatures).length > 0 ||
                Object.keys(productInfo.mainCamVideo).length > 0) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.backCamera}
                    alt="Netword"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    MAIN CAMERA
                  </div>
                  {/* Camera(s) */}
                  {Object.keys(productInfo.mainCams).length > 0 && (
                    <ProductFeatureArray
                      featureLable={
                        Object.keys(productInfo.mainCams).length + " Camera(s)"
                      }
                      features={productInfo.mainCams}
                    />
                  )}

                  {/* Camera(s) Features*/}
                  {Object.keys(productInfo.mainCamFeatures).length > 0 && (
                    <ProductFeatureArray
                      featureLable="Features"
                      features={productInfo.mainCamFeatures}
                    />
                  )}

                  {/* Camera(s) Video*/}
                  {Object.keys(productInfo.mainCamVideo).length > 0 && (
                    <ProductFeatureArray
                      featureLable="Video"
                      features={productInfo.mainCamVideo}
                    />
                  )}
                </GridItem>
              )}

              {/* SELFIE CAMERA */}
              {(Object.keys(productInfo.selfiCams).length > 0 ||
                Object.keys(productInfo.selfiCamFeatures).length > 0 ||
                Object.keys(productInfo.selfiCamVideo).length > 0) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.frontCamera}
                    alt="Netword"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    SELFIE CAMERA
                  </div>
                  {/* Camera(s) */}
                  {Object.keys(productInfo.selfiCams).length > 0 && (
                    <ProductFeatureArray
                      featureLable={
                        Object.keys(productInfo.selfiCams).length + " Camera(s)"
                      }
                      features={productInfo.selfiCams}
                    />
                  )}

                  {/* Camera(s) Features*/}
                  {Object.keys(productInfo.selfiCamFeatures).length > 0 && (
                    <ProductFeatureArray
                      featureLable="Features"
                      features={productInfo.selfiCamFeatures}
                    />
                  )}

                  {/* Camera(s) Video*/}
                  {Object.keys(productInfo.selfiCamVideo).length > 0 && (
                    <ProductFeatureArray
                      featureLable="Video"
                      features={productInfo.selfiCamVideo}
                    />
                  )}
                </GridItem>
              )}

              {/* SOUND */}
              {(productInfo.loudSpeaker || productInfo.jack) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.soundIcon}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    SOUND
                  </div>
                  {/* Loudspeaker */}
                  {productInfo.loudSpeaker && (
                    <ProductFeatureString
                      featureLable="Loudspeaker"
                      feature={productInfo.loudSpeaker}
                    />
                  )}

                  {/* Jack */}
                  {productInfo.jack && (
                    <ProductFeatureString
                      featureLable="Jack"
                      feature={productInfo.jack}
                    />
                  )}
                </GridItem>
              )}

              {/* FEATURES */}
              {Object.keys(productInfo.sensors).length !== 0 && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.featureIcon}
                    alt="Netword"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    FEATURES
                  </div>
                  {/* Sensors */}

                  <ProductFeatureArray
                    featureLable="Sensors"
                    features={productInfo.sensors}
                  />
                </GridItem>
              )}

              {/* MISC */}
              {(productInfo.model || productInfo.sar || productInfo.sarEu) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.miscIcon}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    MISC
                  </div>
                  {/* Models */}
                  {productInfo.model && (
                    <ProductFeatureString
                      featureLable="Model(s)"
                      feature={productInfo.model}
                    />
                  )}

                  {/* SAR */}
                  {productInfo.sar && (
                    <ProductFeatureString
                      featureLable="SAR"
                      feature={productInfo.sar}
                    />
                  )}

                  {/* SAR EU */}
                  {productInfo.sarEu && (
                    <ProductFeatureString
                      featureLable="SAR EU"
                      feature={productInfo.sarEu}
                    />
                  )}
                </GridItem>
              )}

              {/* COMMS */}
              {(productInfo.wlan ||
                productInfo.blueTooth ||
                productInfo.gps ||
                productInfo.nfc ||
                productInfo.radio ||
                productInfo.usb) && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.commsIcon}
                    alt="Launch"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    COMMS
                  </div>
                  {/* WLAN */}
                  {productInfo.wlan && (
                    <ProductFeatureString
                      featureLable="WLAN"
                      feature={productInfo.wlan}
                    />
                  )}

                  {/* Bluetooth */}
                  {productInfo.blueTooth && (
                    <ProductFeatureString
                      featureLable="Bluetooth"
                      feature={productInfo.blueTooth}
                    />
                  )}

                  {/* GPS */}
                  {productInfo.gps && (
                    <ProductFeatureString
                      featureLable="GPS"
                      feature={productInfo.gps}
                    />
                  )}

                  {/* NFC */}
                  {productInfo.nfc && (
                    <ProductFeatureString
                      featureLable="NFC"
                      feature={productInfo.nfc}
                    />
                  )}

                  {/* Radio */}
                  {productInfo.radio && (
                    <ProductFeatureString
                      featureLable="Radio"
                      feature={productInfo.radio}
                    />
                  )}

                  {/* USB */}
                  {productInfo.usb && (
                    <ProductFeatureString
                      featureLable="USB"
                      feature={productInfo.usb}
                    />
                  )}
                </GridItem>
              )}

              {/* TESTS */}
              {Object.keys(productInfo.performance).length > 0 && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.testIcon}
                    alt="Netword"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    TESTS
                  </div>
                  {/* Performance */}

                  <ProductFeatureArray
                    featureLable="Performance"
                    features={productInfo.performance}
                  />
                </GridItem>
              )}

              {/* Other Details */}
              {Object.keys(productInfo.others).length > 0 && (
                <GridItem
                  xs={6}
                  sm={3}
                  md={4}
                  className={detailStyles["productDetails-grid-item"]}
                  style={{ marginBottom: "30px" }}
                >
                  <img
                    src={appIcons.otherIcon}
                    alt="Netword"
                    className={detailStyles["img-icon"]}
                  />
                  <div
                    className={
                      detailStyles["product-details-label2 details-sec-header"]
                    }
                  >
                    Other Details
                  </div>
                  {/* Performance */}

                  <ProductFeatureArray
                    featureLable="Other Details"
                    features={productInfo.others}
                  />
                </GridItem>
              )}
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
