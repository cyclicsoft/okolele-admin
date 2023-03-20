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

export default function Models({ prodData, setProdData }) {
  const resetModels = () => {
    setProdData((prevState) => ({
      ...prevState,
      models: [],
    }));
  };

  return (
    <>
      {/* [MODELS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <MiscellaneousServicesIcon />
                  <p className="sectionPara">[MODELS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetModels} />{" "}
                  Reset
                </div>
              </div>

              {/* Models */}
              <GridContainer>
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
