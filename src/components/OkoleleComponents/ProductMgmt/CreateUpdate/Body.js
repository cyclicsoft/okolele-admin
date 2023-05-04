/*eslint-disable*/
import React from "react";
// material-ui icons
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
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

export default function Body({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetBody = () => {
    setProdData((prevState) => ({
      ...prevState,
      dimension: "",
      weight: "",
      build: "",
      sim: "",
    }));
  };

  return (
    <>
      {/* [BODY] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <PhoneAndroidIcon />
                  <p className="sectionPara">[BODY]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetBody} />{" "}
                  Reset
                </div>
              </div>

              {/* Dimension & Weight  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Dimension"
                    id="dimension"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "dimension",
                      value: prodData.dimension,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Weight"
                    id="weight"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "weight",
                      value: prodData.weight,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Build & Sim  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Build"
                    id="build"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "build",
                      value: prodData.build,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="SIM"
                    id="sim"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "sim",
                      value: prodData.sim,
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
