/*eslint-disable*/
import React from "react";
// material-ui icons
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import RefreshIcon from "@mui/icons-material/Refresh";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicElementCreator from "views/ProductManagement/DynamicElementCreator";
toast.configure();
// SCSS File
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";

export default function SelfiCam({ prodData, setProdData }) {
  const resetMainCams = () => {
    setProdData((prevState) => ({
      ...prevState,
      frontCams: [],
      frontCamFeatures: [],
      frontCamVideos: [],
    }));
  };

  return (
    <>
      {/* [SELFIE CAMERA] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <CameraFrontIcon />
                  <p className="sectionPara">[SELFIE CAMERA]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetMainCams}
                  />
                  Reset
                </div>
              </div>

              {/* SELFIE Cameras & Feature */}
              <GridContainer>
                {/* SELFIE Cameras */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.frontCams}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        frontCams: list,
                      }))
                    }
                    placeHolder="Front Camera"
                  />
                </GridItem>
                {/* Feature */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.frontCamFeatures}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        frontCamFeatures: list,
                      }))
                    }
                    placeHolder="Front Camera Feature"
                  />
                </GridItem>
                {/* Video */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.frontCamVideos}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        frontCamVideos: list,
                      }))
                    }
                    placeHolder="Front Camera Video Feature"
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
