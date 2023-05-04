/*eslint-disable*/
import React from "react";
// material-ui icons
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

export default function Comms({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetComms = () => {
    setProdData((prevState) => ({
      ...prevState,
      wlan: "",
      bluetooth: "",
      gps: "",
      nfc: "",
      radio: "",
      usb: "",
    }));
  };

  return (
    <>
      {/* [COMMS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SettingsInputAntennaIcon />
                  <p className="sectionPara">[COMMS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetComms} />{" "}
                  Reset
                </div>
              </div>

              {/* WLAN & Bluetooth */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="WLAN"
                    id="wlan"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "wlan",
                      value: prodData.wlan,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Bluetooth"
                    id="bluetooth"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "bluetooth",
                      value: prodData.bluetooth,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* GPS & NFC */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="GPS"
                    id="gps"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "gps",
                      value: prodData.gps,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="NFC"
                    id="NFC"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "nfc",
                      value: prodData.nfc,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Radio & USB */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Radio"
                    id="radio"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "radio",
                      value: prodData.radio,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="USB"
                    id="usb"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "usb",
                      value: prodData.usb,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
