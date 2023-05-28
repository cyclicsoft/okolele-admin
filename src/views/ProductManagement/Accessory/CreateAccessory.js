/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import Button from "components/CustomButtons/Button.js";
import moment from "moment";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
import GeneralInfo from "components/OkoleleComponents/ProductMgmt/CreateUpdate/GeneralInfo";
import { enums } from "services/enum/enums";
import Launch from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Launch";
import OtherDetails from "components/OkoleleComponents/ProductMgmt/CreateUpdate/OtherDetails";
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import { apiHeader } from "services/helper-function/api-header";
import VariantsAccessoryContainer from "components/OkoleleComponents/ProductMgmt/CreateUpdate/VariantsAccessoryContainer";

const useStyles = makeStyles(styles);

function CreateAccessory() {
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

  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
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
    discount: {
      type: prodData.discountType,
      value: prodData.discountValue,
    },
    variants: prodData.productAllVariants,
    details: prodData.otherDetails,
  };

  useEffect(() => {
    apiHeader((headers) => {
      setHeaders(headers);
    });
  }, []);

  const accessorySaveClick = () => {
    setShowProductCreatePopup(true);
  };
  // Product Create Flag From Modal
  const productCreateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      saveNewAccesory();
    }

    setShowHttpResponseMsg(false);
    setShowProductCreatePopup(false);
  };

  const saveNewAccesory = () => {
    const accesspruCreateAPI = rootPath + "/accessories";
    axios
      .post(accesspruCreateAPI, accessoryDetails, headers)
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
        {showProductCreatePopup && (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productCreateFlagFromModal}
          />
        )}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg && (
          <HttpStatusCode responseCode={httpResponseCode} />
        )}
      </div>

      <h4 className={classes.cardIconTitle}>Create New Accessory</h4>
      {/* Reset & Search To Clone */}
      <div style={{ display: "flex" }}>
        {/* Reset */}
        <div className="resetIcon-container">
          {/* <RefreshIcon className="reset-input" onClick={inputsResetHandler} />{" "} */}
          Reset A~Z
        </div>
      </div>

      {/* GeneralInfo */}
      <GeneralInfo prodData={prodData} setProdData={setProdData} />
      {/* Variants */}
      <VariantsAccessoryContainer prodData={prodData} setProdData={setProdData} />
      {/* Launch */}
      <Launch prodData={prodData} setProdData={setProdData} />
      {/* OtherDetails */}
      <OtherDetails prodData={prodData} setProdData={setProdData} />

      {/* Save Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={accessorySaveClick}
      >
        Save
      </Button>
    </>
  );
}

export default CreateAccessory;
