/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import moment from "moment";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
import GeneralInfo from "components/OkoleleComponents/ProductMgmt/CreateUpdate/GeneralInfo";
import { enums } from "services/enum/enums";
import Launch from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Launch";
import { accessoryDataSetter } from "components/OkoleleComponents/ProductMgmt/CreateUpdate/DataMapping/accessoryDataSetter";
import OtherDetails from "components/OkoleleComponents/ProductMgmt/CreateUpdate/OtherDetails";
import { apiHeader } from "services/helper-function/api-header";
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import VariantsAccessoryUpdateContainer from "components/OkoleleComponents/ProductMgmt/CreateUpdate/VariantsAccessoryUpdateContainer";
import { removeDbImgIdfromVariants } from "services/helper-function/removeDbImgIdfromVariants";

const useStyles = makeStyles(styles);

export default function UpdateAccessory({ editProductId, prodDetailInfo }) {
  const classes = useStyles();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;
  // headers
  const [headers, setHeaders] = useState();
  // Product Info
  const [prodData, setProdData] = useState({
    name: "",
    prodType: 4,
    discountType: enums.discountType[0],
    discountValue: 0,
    brand: "1101",
    warranty: 0,
    productAllVariants: [],
    announceDate: new Date(),
    releaseDate: new Date(),
    otherDetails: [],
  });

  useEffect(() => {
    const data = accessoryDataSetter(prodDetailInfo);
    setProdData(data);
  }, [prodDetailInfo]);

  // Product create confirmation popup viewar
  const [showProductUpdatePopup, setShowProductUpdatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const prodDetails = {
    category: prodData.prodType,
    title: prodData.name,
    brand: prodData.brand,
    warranty: prodData.warranty,
    announceDate: moment(prodData.announceDate).format("YYYY-MM-DD"),
    releaseDate: moment(prodData.releaseDate).format("YYYY-MM-DD"),
    variants: prodData.productAllVariants,
    others: prodData.otherDetails,
  };

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  const prodUpdateClick = () => {
    setShowProductUpdatePopup(true);
  };
  // Product Create Flag From Modal
  const productUpdateFlagFromModal = (isConfirmed) => {
    if (isConfirmed && headers) {
      updateProd();
    }

    setShowHttpResponseMsg(false);
    setShowProductUpdatePopup(false);
  };

  const updateProd = async () => {
    let productDetails = await removeDbImgIdfromVariants(prodDetails);

    const productUpdateApi = rootPath + "/accessories/" + editProductId;
    console.log(
      "%cUpdateAccessory.js line:88 productDetails",
      "color: #007acc;",
      productDetails
    );

    axios
      .put(productUpdateApi, productDetails, headers)
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
        {showProductUpdatePopup && (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productUpdateFlagFromModal}
          />
        )}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg && (
          <HttpStatusCode responseCode={httpResponseCode} />
        )}
      </div>

      <h4 className={classes.cardIconTitle}>Update Accessory</h4>

      {/* GeneralInfo */}
      <GeneralInfo prodData={prodData} setProdData={setProdData} />
      {/* Variants */}
      <VariantsAccessoryUpdateContainer
        prodData={prodData}
        setProdData={setProdData}
      />
      {/* Launch */}
      <Launch prodData={prodData} setProdData={setProdData} />
      {/* OtherDetails */}
      <OtherDetails prodData={prodData} setProdData={setProdData} />

      {/* Update Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={prodUpdateClick}
      >
        Update
      </Button>
    </>
  );
}
