/*eslint-disable*/
import React from "react";
// material-ui icons
import CameraRearIcon from "@mui/icons-material/CameraRear";
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicElementCreator from "views/ProductManagement/DynamicElementCreator";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

export default function MainCam({ prodData, setProdData }) {
  const resetMainCams = () => {
    setProdData((prevState) => ({
      ...prevState,
      mainCams: [],
      mainCamFeatures: [],
      mainCamVideos: [],
    }));
  };

  return (
    <>
      {/* [MAIN CAMERA] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <CameraRearIcon />
                  <p className="sectionPara">[MAIN CAMERA]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetMainCams}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Main Cameras & Feature */}
              <GridContainer>
                {/* Main Cameras */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.mainCams}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        mainCams: list,
                      }))
                    }
                    placeHolder="Rare Camera"
                  />
                </GridItem>
                {/* Feature */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.mainCamFeatures}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        mainCamFeatures: list,
                      }))
                    }
                    placeHolder="Rare Camera Feature"
                  />
                </GridItem>

                {/* Video */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.mainCamVideos}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        mainCamVideos: list,
                      }))
                    }
                    placeHolder="Rare Camera Video Feature"
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
