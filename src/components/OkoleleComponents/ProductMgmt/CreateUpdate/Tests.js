/*eslint-disable*/
import React from "react";
// material-ui icons
import SpeedIcon from "@mui/icons-material/Speed";
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

export default function Tests({ prodData, setProdData }) {
  const resetTests = () => {
    setProdData((prevState) => ({
      ...prevState,
      performances: [],
    }));
  };

  return (
    <>
      {/* [TESTS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SpeedIcon />
                  <p className="sectionPara">[TESTS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetTests} />{" "}
                  Reset
                </div>
              </div>

              {/* Performances */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={prodData.performances}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        performances: list,
                      }))
                    }
                    placeHolder="Performances"
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
