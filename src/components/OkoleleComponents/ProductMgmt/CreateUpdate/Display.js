/*eslint-disable*/
import React from "react";
// material-ui icons
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
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

export default function Display({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetDisplay = () => {
    setProdData((prevState) => ({
      ...prevState,
      displayType: "",
      displaySize: "",
      resolution: "",
      protection: "",
    }));
  };

  return (
    <>
      {/* [DISPLAY] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SmartDisplayIcon />
                  <p className="sectionPara">[DISPLAY]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetDisplay} />{" "}
                  Reset
                </div>
              </div>

              {/* DISPLAY Type & Size  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Type"
                    id="type"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "displayType",
                      value: prodData.displayType,
                      onChange: (event) => inputChangeHandler(event),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Size"
                    id="size"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "displaySize",
                      value: prodData.displaySize,
                      onChange: (event) => inputChangeHandler(event),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* DISPLAY Resolution & Protection  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Resolution"
                    id="resolution"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "resolution",
                      value: prodData.resolution,
                      onChange: (event) => inputChangeHandler(event),
                      maxLength: "100",
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Protection"
                    id="protection"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "protection",
                      value: prodData.protection,
                      onChange: (event) => inputChangeHandler(event),
                      maxLength: "100",
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
