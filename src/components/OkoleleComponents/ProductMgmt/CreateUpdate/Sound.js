/*eslint-disable*/
import React from "react";
// material-ui icons
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
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

export default function Sound({ prodData, setProdData }) {
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    let tempData = { ...prodData };
    tempData[name] = value;

    setProdData(tempData);
  };

  const resetSound = () => {
    setProdData((prevState) => ({
      ...prevState,
      loudSpeaker: "",
      jack: "",
    }));
  };

  return (
    <>
      {/* [SOUND] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <VolumeUpIcon />
                  <p className="sectionPara">[SOUND]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetSound} />
                  Reset
                </div>
              </div>

              {/* Loud Speaker & Jack */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Loud Speaker"
                    id="loud-speaker"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "loudSpeaker",
                      value: prodData.loudSpeaker,
                      onChange: (event) => inputChangeHandler(event),
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Jack"
                    id="jack"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "String",
                      name: "jack",
                      value: prodData.jack,
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
