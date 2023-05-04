/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import moment from "moment";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
toast.configure();

import GeneralInfo from "components/OkoleleComponents/ProductMgmt/CreateUpdate/GeneralInfo";
import { enums } from "services/enum/enums";
import Launch from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Launch";
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import { accessoryDataSetter } from "components/OkoleleComponents/ProductMgmt/CreateUpdate/DataMapping/accessoryDataSetter";
import OtherDetails from "components/OkoleleComponents/ProductMgmt/CreateUpdate/OtherDetails";
import AccessoryVariantsComp from "components/OkoleleComponents/ProductMgmt/CreateUpdate/AccessoryVariantsComp";
import { apiHeader } from "services/helper-function/api-header";

const useStyles = makeStyles(styles);

export default function UpdateAccessory({ editProductId, prodDetails }) {
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
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  useEffect(() => {
    const data = accessoryDataSetter(prodDetails);
    setProdData(data);
  }, [prodDetails]);

  // Product create confirmation popup viewar
  const [showProductUpdatePopup, setShowProductUpdatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const accessoryDetails = {
    category: prodData.prodType,
    title: prodData.name,
    brand: prodData.brand,
    warranty: prodData.warranty,
    announceDate: moment(prodData.announceDate).format("YYYY-MM-DD"),
    releaseDate: moment(prodData.releaseDate).format("YYYY-MM-DD"),
    variants: prodData.productAllVariants,
    others: prodData.otherDetails,
  };

  const accessoryUpdateClick = () => {
    setShowProductUpdatePopup(true);
  };
  // Product Create Flag From Modal
  const productUpdateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true && headers) {
      updateAccessory();
    }

    setShowHttpResponseMsg(false);
    setShowProductUpdatePopup(false);
  };

  const updateAccessory = () => {
    const accesoryUpdateAPI = rootPath + "/accessories/" + editProductId;

    axios
      .put(accesoryUpdateAPI, accessoryDetails, headers)
      .then(function (response) {
        console.log("update response: ", response);
        // console.log("response code: ", response.status);
        // setHttpResponseCode(response.status);
        // setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        // setHttpResponseCode(error.response.status);
        // setShowHttpResponseMsg(true);
      });
  };

  return (
    <>
      {/* Confirmation Modal */}
      <div>
        {/* Confirmation Modal */}
        {showProductUpdatePopup ? (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productUpdateFlagFromModal}
          />
        ) : null}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg === true ? (
          <HttpStatusCode responseCode={httpResponseCode} />
        ) : null}
      </div>

      <h4 className={classes.cardIconTitle}>Update Accessory</h4>

      {/* GeneralInfo */}
      <GeneralInfo prodData={prodData} setProdData={setProdData} />
      {/* Variants */}
      <AccessoryVariantsComp prodData={prodData} setProdData={setProdData} />
      {/* Launch */}
      <Launch prodData={prodData} setProdData={setProdData} />
      {/* OtherDetails */}
      <OtherDetails prodData={prodData} setProdData={setProdData} />

      {/* Update Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={accessoryUpdateClick}
      >
        Update
      </Button>
    </>
  );
}
