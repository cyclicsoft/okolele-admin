/*eslint-disable*/
import React from "react";
// material-ui icons
import DetailsIcon from "@mui/icons-material/Details";
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

export default function OtherDetails({ prodData, setProdData }) {
  const resetOtherDetails = () => {
    setProdData((prevState) => ({
      ...prevState,
      otherDetails: [],
    }));
  };

  return (
    <>
      {/* [OTHER DETAILS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <DetailsIcon />
                  <p className="sectionPara">[OTHER DETAILS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetOtherDetails}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Models */}
              <GridContainer>
                {/* Models */}
                <GridItem xs={12} sm={12} md={4}>
                  <DynamicElementCreator
                    objectValue={prodData.otherDetails}
                    callBackFun={(list) =>
                      setProdData((prevState) => ({
                        ...prevState,
                        otherDetails: list,
                      }))
                    }
                    placeHolder="Other Details"
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
