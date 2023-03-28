// /*eslint-disable*/
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// // core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
// // images
// import dummyProfileImg128px from "assets/img/okolele-img/dummy_profile_img_128px.png";
// import phoneDummyImg from "assets/img/okolele-img/mobile-dummy-img.jpg";
// import phoneNetwork from "assets/img/okolele-img/product-details-icons/phone-network.png";
// import launchIcon from "assets/img/okolele-img/product-details-icons/phone-launch.png";
// import phoneBody from "assets/img/okolele-img/product-details-icons/phone-body.png";
// import phoneDisplay from "assets/img/okolele-img/product-details-icons/display.png";
// import phoneOS from "assets/img/okolele-img/product-details-icons/operating-system.png";
// import phoneStorage from "assets/img/okolele-img/product-details-icons/ram.png";
// import backCamera from "assets/img/okolele-img/product-details-icons/back-camera.png";
// import frontCamera from "assets/img/okolele-img/product-details-icons/front-camera.png";
// import soundIcon from "assets/img/okolele-img/product-details-icons/sound-wave.png";
// import commsIcon from "assets/img/okolele-img/product-details-icons/connectivity.png";
// import featureIcon from "assets/img/okolele-img/product-details-icons/feature.png";
// import batteryIcon from "assets/img/okolele-img/product-details-icons/battery.png";
// import miscIcon from "assets/img/okolele-img/product-details-icons/misc.png";
// import testIcon from "assets/img/okolele-img/product-details-icons/test.png";
// import OtherDetails from "assets/img/okolele-img/product-details-icons/other-details.png";
// // Carousel ImageGallery
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// //SCSS file
// import "assets/scss/ghorwali-scss/_product-details.scss";

// const useStyles = makeStyles(styles);

// export default function AccessoryDetails(props) {
//   const classes = useStyles();
//   const history = useHistory();
//   // General
//   const [category, setCategory] = useState("");
//   // Basic
//   const [mName1, setmName1] = useState("");
//   const [mDiscountType, setmDiscountType] = useState("");
//   const [mDiscountValue, setmDiscountValue] = useState(0);
//   const [mBrandName1, setmBrandName1] = useState("");
//   const [mWarranty1, setmWarranty1] = useState("");
//   const [userComments, setUserComments] = useState([]);
//   const [productImages, setProductImages] = useState([]);
//   //All Variant
//   const [allVariants, setAllVariants] = useState([]);
//   //All the variants for a selected color
//   const [selectedColorVariants, setSelectedColorVariants] = useState([]);
//   // selected color
//   const [selectedColor, setSelectedColor] = useState("");
//   const [selectedVariantBasePrice, setSelectedVariantBasePrice] = useState(0);
//   const [
//     selectedVariantCurrentPrice,
//     setSelectedVariantCurrentPrice,
//   ] = useState(0);
//   const [selectedVariantTotalStock, setSelectedVariantTotalStock] = useState(0);
//   const [
//     selectedVariantSellableStock,
//     setSelectedVariantSellableStock,
//   ] = useState(0);
//   const [selectedVariantRam, setSelectedVariantRam] = useState(0);
//   const [selectedVariantRom, setSelectedVariantRom] = useState(0);
//   const [selectedVariantRamRom, setSelectedVariantRamRom] = useState("");
//   // LAUNCH
//   const [mAnnounchDate1, setmAnnounchDate1] = useState("");
//   const [mReleaseDate1, setmReleaseDate1] = useState("");
//   // Other Details
//   const [otherDetails, setOtherDetails] = useState([]);
//   // Post New Comments
//   const [userProfileImg, setUserProfileImg] = useState(dummyProfileImg128px);
//   const [userName, setUserName] = useState("Random User");
//   const [newComment, setNewComment] = useState("");

//   // Phone Details from props/API call
//   useEffect(() => {
//     if (props.productDetails != undefined) {
//       productDetailsSetter(props.productDetails);
//     }
//   }, [props.productDetails]);

//   // product Details Setter
//   const productDetailsSetter = (details) => {
//     setCategory(details.category);
//     // Basic
//     setmName1(details.title);
//     setmDiscountType(details.discount.type);
//     setmDiscountValue(details.discount.value);
//     setmBrandName1(details.brand);
//     setmWarranty1(details.warranty);
//     setUserComments(details.comments);
//     //Variants
//     setAllVariants(details.variants);
//     // set null initially
//     setProductImages([]);
//     // Initial Img Setter
//     if (Object.keys(details.variants[0].images).length !== 0) {
//       details.variants[0].images.map((img) => {
//         setProductImages((prevItems) => [
//           ...prevItems,
//           {
//             original: img,
//             thumbnail: img,
//           },
//         ]);
//       });
//     } else {
//       setProductImages([{ original: phoneDummyImg, thumbnail: null }]);
//     }
//     // Initial Selected Color setter
//     setSelectedColor(details.variants[0].color);
//     //All the variants for a selected color
//     // Initial value is the first index value
//     if (details.variants.length > 0) {
//       setSelectedColorVariants(details.variants[0].variants);
//     }

//     // Set initial value of inner variants object (Capacity)
//     setSelectedVariantBasePrice(details.variants[0].basePrice);
//     setSelectedVariantCurrentPrice(details.variants[0].currentPrice);
//     setSelectedVariantTotalStock(details.variants[0].totalStock);
//     setSelectedVariantSellableStock(details.variants[0].sellableStock);
//     // setSelectedVariantRam(details.variants[0].ram);
//     // setSelectedVariantRom(details.variants[0].rom);
//     // setSelectedVariantRamRom(details.variants[0].ram + details.variants[0].rom);

//     // LAUNCH
//     setmAnnounchDate1(details.announceDate);
//     setmReleaseDate1(details.releaseDate);
//     // Other Details
//     setOtherDetails(details.details);
//   };

//   const productColorClick = (variant, e) => {
//     console.log("productColorClick/variant: ", variant);
//     e.preventDefault();

//     setSelectedColor(variant.color);
//     // console.log("variant.images: ...", variant.images);
//     if (Object.keys(variant.images).length !== 0) {
//       setProductImages([]); //First set to empty to clear previous data
//       variant.images.map((img) => {
//         setProductImages((prevItems) => [
//           ...prevItems,
//           {
//             original: img,
//             thumbnail: img,
//           },
//         ]);
//       });
//     } else {
//       setProductImages([{ original: phoneDummyImg, thumbnail: null }]);
//     }
//     // setSelectedColorVariants(variant.variants);

//     // Once a clolor is selected, select the first capacity automatically
//     setSelectedVariantBasePrice(variant.basePrice);
//     setSelectedVariantCurrentPrice(variant.currentPrice);
//     setSelectedVariantTotalStock(variant.totalStock);
//     setSelectedVariantSellableStock(variant.sellableStock);
//   };

//   // Post new comment
//   const userNewComment = {
//     msg: newComment,
//     userName: userName,
//     userImage: userProfileImg,
//   };
//   const postNewComment = () => {
//     let newCommentAPI = rootPath[0] + "/mobiles/addComment/" + productId;
//     axios
//       .post(newCommentAPI, userNewComment)
//       .then(function (response) {})
//       .catch(function (error) {
//         console.log("error: ", error);
//       });
//   };

//   return (
//     <div>
//       <div className={classes.main + "" + classes.mainRaised}>
//         <div className="sec-container">
//           <div style={{ marginTop: "10px" }}>
//             {/* Product Basic Info */}
//             {/* Color & capacity selector */}
//             <div className="sec-basic-grid-cont">
//               {/* Products Basic Section */}
//               <div className="product-details-label1">{mName1}</div>
//               {/* ImageGallery, color selector and capacity selector */}
//               <GridContainer>
//                 {/* ImageGallery */}
//                 <GridItem xs={12} sm={3} md={6}>
//                   <Carousel className="carousel-root">
//                     {productImages.map((productImages) => (
//                       <div key={productImages.id}>
//                         <img src={productImages.original} />
//                         {/* <p className="legend">{productName}</p> */}
//                       </div>
//                     ))}
//                   </Carousel>

//                   {/* Price & Discount */}
//                   <div className="price-discount-sec">
//                     {/* Price */}
//                     <div>
//                       {selectedVariantBasePrice ===
//                       selectedVariantCurrentPrice ? (
//                         //If current price & base price is same
//                         <span
//                           className="currten-price"
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                           }}
//                         >
//                           Price: {selectedVariantBasePrice}৳
//                         </span>
//                       ) : (
//                         //If current price & base price is not same
//                         <div
//                           className={classes.priceContainer}
//                           style={{
//                             display: "flex",
//                             justifyContent: "center",
//                           }}
//                         >
//                           Price:
//                           <span className="old-price">
//                             <p>{selectedVariantBasePrice}৳</p>
//                           </span>
//                           <span className="currten-price">
//                             {selectedVariantCurrentPrice}৳
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Discount */}
//                     {mDiscountValue > 0 && selectedVariantCurrentPrice > 0 && (
//                       <div style={{ marginLeft: "3vw" }}>
//                         {mDiscountType === "PERCENTAGE" &&
//                         mDiscountValue > 0 ? (
//                           <div className="discount-percentage">
//                             -{mDiscountValue}%
//                           </div>
//                         ) : (
//                           <div>
//                             {mDiscountType === "FLAT" && mDiscountValue > 0 ? (
//                               <div className="discount-percentage">
//                                 -{mDiscountValue}৳
//                               </div>
//                             ) : null}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                   {/* Brand */}
//                   {mBrandName1.length > 0 && (
//                     <div
//                       className="product-details-label6"
//                       style={{
//                         justifyContent: "center",
//                         display: "flex",
//                       }}
//                     >
//                       Brand: {mBrandName1}
//                     </div>
//                   )}
//                   {/* Selected Variant Color */}
//                   {selectedColor.length > 0 && (
//                     <div
//                       className="product-details-label6"
//                       style={{
//                         justifyContent: "center",
//                         display: "flex",
//                       }}
//                     >
//                       Color: {selectedColor}
//                     </div>
//                   )}
//                 </GridItem>

//                 <GridItem xs={12} sm={3} md={6}>
//                   <div className="product-details-label2">
//                     Choose your color:
//                   </div>
//                   <br />
//                   {/* Choose your color: */}
//                   <GridContainer>
//                     {allVariants.map((productVariants) => (
//                       <GridItem
//                         xs={6}
//                         sm={6}
//                         md={6}
//                         onClick={() =>
//                           productColorClick(productVariants, event)
//                         }
//                         key={productVariants.id}
//                       >
//                         <div
//                           className="product-details-color-sec"
//                           style={{
//                             borderColor:
//                               productVariants.color === selectedColor
//                                 ? "#0E86D4"
//                                 : "#d3d3d3",
//                           }}
//                         >
//                           <div
//                             className="product-details-color-color"
//                             style={{ background: productVariants.colorCode }}
//                           />
//                           <div
//                             className="product-details-label4"
//                             style={{ marginTop: "7px" }}
//                           >
//                             {productVariants.color}
//                           </div>
//                         </div>
//                       </GridItem>
//                     ))}
//                   </GridContainer>
//                 </GridItem>
//               </GridContainer>
//             </div>

//             {/* Product Detail Info */}
//             <div
//               className="product-details-label3"
//               style={{
//                 marginTop: "10vh",
//                 justifyContent: "center",
//                 display: "flex",
//               }}
//             >
//               Detail Specifications
//             </div>
//             <div style={{ margin: "50px 50px" }}>
//               <GridContainer>
//                 {/* LAUNCH */}
//                 <GridItem
//                   xs={6}
//                   sm={3}
//                   md={4}
//                   className="productDetails-grid-item"
//                   style={{ marginBottom: "30px" }}
//                 >
//                   <img src={launchIcon} alt="Launch" className="img-icon" />
//                   <div className="product-details-label2 details-sec-header">
//                     LAUNCH
//                   </div>
//                   {/* Announced */}
//                   {mAnnounchDate1 !== undefined && (
//                     <div style={{ alignItems: "center" }}>
//                       <div className="product-details-label5 ">Announced</div>
//                       <div className="product-details-label4">
//                         {mAnnounchDate1}
//                       </div>
//                     </div>
//                   )}
//                   {/* Released */}
//                   {mReleaseDate1 !== undefined && (
//                     <div style={{ alignItems: "center" }}>
//                       <div className="product-details-label5 ">Released</div>
//                       <div className="product-details-label4">
//                         {mReleaseDate1}
//                       </div>
//                     </div>
//                   )}
//                 </GridItem>

//                 {/* Other Details */}
//                 <GridItem
//                   xs={6}
//                   sm={3}
//                   md={8}
//                   className="productDetails-grid-item"
//                   style={{ marginBottom: "30px" }}
//                 >
//                   <img
//                     src={OtherDetails}
//                     alt="Other Details"
//                     className="img-icon"
//                   />
//                   <div className="product-details-label2 details-sec-header">
//                     Other Details
//                   </div>
//                   {Object.keys(otherDetails).length !== 0 && (
//                     <div style={{ alignItems: "center" }}>
//                       <div
//                         className="product-details-label4"
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "flex-start",
//                         }}
//                       >
//                         {otherDetails.map((otherDetails) => (
//                           <div key={otherDetails.id}>{otherDetails}</div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </GridItem>
//               </GridContainer>

//               {/* User Opinions & Reviews */}
//               <GridContainer>
//                 <h3 className={classes.title + "" + classes.textCenter}>
//                   {mName1} - User Opinions & Reviews
//                 </h3>
//                 <GridItem xs={12} sm={12} md={12} className={classes.mrAuto}>
//                   <div>
//                     <h3 className={classes.title + " " + classes.textCenter}>
//                       {userComments.length} Comments
//                     </h3>
//                     {/* Users all comments */}
//                     <div className="comments-container">
//                       {userComments.map((userComments) => (
//                         <div
//                           className="user-comments-div"
//                           key={userComments.id}
//                         >
//                           <img
//                             className="user-profile-img"
//                             src={userComments.userImage || dummyProfileImg128px}
//                             alt="..."
//                           />
//                           <h4 className="user-comment-msg">
//                             {userComments.msg}
//                           </h4>
//                           {/* <CloseIcon
//                               className="close-icon"
//                               onClick={deleteComment.bind(
//                                 null,
//                                 userComments.msg
//                               )}
//                             /> */}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </GridItem>
//               </GridContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
