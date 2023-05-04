/*eslint-disable*/
import React from "react";
// material-ui icons
import RssFeedIcon from "@mui/icons-material/RssFeed";
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import DynamicElementCreator from "./DynamicInputs/DynamicElementCreator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

export default function Network({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetGeneralInfo = () => {
    setProdData((prevState) => ({
      ...prevState,
      technology: "",
      speed: "",
      discountValue: 0,
      brand: "",
      warranty: 0,
    }));
  };

  return (
    <>
      {/* [NETWORK] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <RssFeedIcon />
                  <p className="sectionPara">[NETWORK]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetGeneralInfo}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Technology & Speed */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Technology"
                    id="technology"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "technology",
                      value: prodData.technology,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Speed"
                    id="speed"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "speed",
                      value: prodData.speed || "",
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* 2G Bands & 3G Bands*/}
              <GridContainer>
                {/* 2G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={prodData.band2G ? prodData.band2G : []}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        band2G: list,
                      }))
                    }
                    placeHolder="2G Bands"
                  />
                </GridItem>
                {/* 3G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={prodData.band3G ? prodData.band3G : []}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        band3G: list,
                      }))
                    }
                    placeHolder="3G Bands"
                  />
                </GridItem>
              </GridContainer>

              {/* 4G Bands & 5G Bands */}
              <GridContainer>
                {/* 4G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={prodData.band4G ? prodData.band4G : []}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        band4G: list,
                      }))
                    }
                    placeHolder="4G Bands"
                  />
                </GridItem>
                {/* 5G Bands */}
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={prodData.band5G ? prodData.band5G : []}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        band5G: list,
                      }))
                    }
                    placeHolder="5G Bands"
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
