//index->App->Admin->Sidebar->CreateAdmin
//Ghorwali Component
import React, { useState } from "react";
// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TabIcon from "@mui/icons-material/Tab";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import WatchIcon from "@mui/icons-material/Watch";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import "../../assets/scss/ghorwali-scss/create-admin.scss";
import CreatePhone from "./Phone/CreatePhone";
import CreateTab from "./Tab/CreateTab";
import CreateSmartWatch from "./SmartWatch/CreateSmartWatch";
import CreateAccessory from "./Accessory/CreateAccessory";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function CreateProducts() {
  const classes = useStyles();
  // Search
  const [dropdownValue, setDropdownValue] = useState("create-phone");

  // dropdown Handler
  const dropdownHandler = (event) => {
    // console.log('event.target.value', event.target.value);
    setDropdownValue(event.target.value);
  };

  return (
    <>
      {/* ############################# Create Products############################# */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ background: "#f5f5f5" }}>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <CardGiftcardIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Create Products</h4>
              <FormControl style={{ marginLeft: "48vw", width: "20vw" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Type*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dropdownValue}
                  label="Select Type*"
                  onChange={dropdownHandler}
                >
                  <MenuItem value={"create-phone"}>Create Phone</MenuItem>
                  <MenuItem value={"create-tab"}>Create Tab</MenuItem>
                  <MenuItem value={"create-smart-watch"}>
                    Create Smart Watch
                  </MenuItem>
                  <MenuItem value={"create-accessory"}>
                    Create Accessory
                  </MenuItem>
                </Select>
              </FormControl>
            </CardHeader>
            <CardBody>
              {dropdownValue == "create-phone" ? <CreatePhone /> : null}
              {dropdownValue == "create-tab" ? <CreateTab /> : null}
              {dropdownValue == "create-smart-watch" ? (
                <CreateSmartWatch />
              ) : null}
              {dropdownValue == "create-accessory" ? <CreateAccessory /> : null}
              <Clearfix />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}
