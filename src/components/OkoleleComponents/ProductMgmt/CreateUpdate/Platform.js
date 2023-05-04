/*eslint-disable*/
import React from "react";
// material-ui icons
import HardwareIcon from "@mui/icons-material/Hardware";
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

export default function Platform({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetPlatform = () => {
    setProdData((prevState) => ({
      ...prevState,
      os: "",
      chipset: "",
      cpu: "",
      gpu: "",
    }));
  };

  return (
    <>
      {/* [PLATFORM] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <HardwareIcon />
                  <p className="sectionPara">[PLATFORM]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetPlatform}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* OS & Chipset  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="OS"
                    id="os"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "os",
                      value: prodData.os,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Chipset"
                    id="chipset"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "chipset",
                      value: prodData.chipset,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* CPU & GPU  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="CPU"
                    id="cpu"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "cpu",
                      value: prodData.cpu,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="GPU"
                    id="gpu"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "gpu",
                      value: prodData.gpu,
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
