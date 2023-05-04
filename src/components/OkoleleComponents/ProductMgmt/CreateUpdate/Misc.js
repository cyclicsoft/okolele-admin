/*eslint-disable*/
import React from "react";
// material-ui icons
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DynamicElementCreator from "./DynamicInputs/DynamicElementCreator";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

export default function Misc({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetMisc = () => {
    setProdData((prevState) => ({
      ...prevState,
      sar: "",
      sarEu: "",
      models: [],
    }));
  };

  return (
    <>
      {/* [MISC] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <MiscellaneousServicesIcon />
                  <p className="sectionPara">[MISC]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetMisc} />{" "}
                  Reset
                </div>
              </div>

              {/* SAR & SAR EU & Models */}
              <GridContainer>
                {/* SAR */}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="SAR"
                    id="sar"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "sar",
                      value: prodData.sar,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>

                {/* SAR EU */}
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="SAR EU"
                    id="sar-eu"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "sarEu",
                      value: prodData.sarEu,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>

                {/* Models */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.models}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        models: list,
                      }))
                    }
                    placeHolder="Models"
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
