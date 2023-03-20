/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { useGlobalState } from "state-pool";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import moment from "moment";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
toast.configure();

import GeneralInfo from "components/OkoleleComponents/ProductMgmt/CreateUpdate/GeneralInfo";
import { enums } from "services/enum/enums";
import Network from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Network";
import Launch from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Launch";
import Body from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Body";
import Display from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Display";
import Platform from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Platform";
import Memory from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Memory";
import MainCam from "components/OkoleleComponents/ProductMgmt/CreateUpdate/MainCam";
import SelfiCam from "components/OkoleleComponents/ProductMgmt/CreateUpdate/SelfiCam";
import Sound from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Sound";
import Comms from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Comms";
import Features from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Features";
import Battery from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Battery";
import Misc from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Misc";
import Tests from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Tests";
import Variants from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Variants";
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import { accessoryDataSetter } from "components/OkoleleComponents/ProductMgmt/CreateUpdate/DataMapping/accessoryDataSetter";
import VariantsUpdate from "components/OkoleleComponents/ProductMgmt/CreateUpdate/VariantsUpdate";
import Models from "components/OkoleleComponents/ProductMgmt/CreateUpdate/Models";
import OtherDetails from "components/OkoleleComponents/ProductMgmt/CreateUpdate/OtherDetails";
import AccessoryVariantsComp from "components/OkoleleComponents/ProductMgmt/CreateUpdate/AccessoryVariantsComp";

const useStyles = makeStyles(styles);

export default function UpdateAccessory({ editProductId, prodDetails }) {
  console.log(
    "%UpdateAccessory.js line:51 prodDetails",
    "color: #007acc;",
    prodDetails
  );
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
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        updateAccessory();
      } else {
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          updateAccessory();
        });
      }
    }

    setShowHttpResponseMsg(false);
    setShowProductUpdatePopup(false);
  };

  const updateAccessory = () => {
    console.log("updateAccessory/accessoryDetails: ", accessoryDetails);
    const accesoryUpdateAPI = rootPath[0] + "/accessories/" + editProductId;

    axios
      .put(accesoryUpdateAPI, accessoryDetails, config)
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

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      const refreshTokenAPI = rootPath[0] + "/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
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
          console.log(error);
        });
    } else {
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
