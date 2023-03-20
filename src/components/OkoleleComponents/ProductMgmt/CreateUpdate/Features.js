/*eslint-disable*/
import React from "react";
// material-ui icons
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicElementCreator from "./DynamicInputs/DynamicElementCreator";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

export default function Features({ prodData, setProdData }) {
  const resetFeatures = () => {
    setProdData((prevState) => ({
      ...prevState,
      sensors: [],
    }));
  };
  return (
    <>
      {/* [FEATURES] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <FeaturedPlayListIcon />
                  <p className="sectionPara">[FEATURES]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetFeatures}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Sensors */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={prodData.sensors}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        sensors: list,
                      }))
                    }
                    placeHolder="Sensor"
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
