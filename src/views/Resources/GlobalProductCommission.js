import React, { useState, useEffect } from "react";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import CustomInput from "components/CustomInput/CustomInput.js";
// material-ui icons
import Edit from "@material-ui/icons/Edit";
// SCSS File
import "../../assets/scss/ghorwali-scss/appPrivacy.scss";

const useStyles = makeStyles(styles);

function GlobalProductCommission() {
  const classes = useStyles();
  const [globalProductCommission, setGlobalProductCommission] = useState("");

  useEffect(() => {
    // const ghorwaliAboutUrl = "/multivendorshop/mv/v1/ghorwali/app/about/702";

    // axios.get(ghorwaliAboutUrl)
    //     .then(function (response) {
    //         setAboutGhorwali(response.data.content);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
  }, []);

  const aboutUpdateHandler = (event) => {
    // const ghorwaliAboutUpdateUrl =
    //   "/multivendorshop/mv/v1/ghorwali/app/about/6105a5e9e4f3890d41e09929";

    // axios.put(ghorwaliAboutUpdateUrl, aboutGhorwali)
    //     .then(function (response) {

    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    event.preventDefault();
  };

  return (
    <>
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Edit />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>
            Global Product Commission -{" "}
            <small>Update Global Product Commission</small>
          </h4>
        </CardHeader>
        <CardBody>
          {/* Others  */}
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Global Product Commission"
                id="global-pc"
                multiline
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "String",
                  value: globalProductCommission || "",
                  onChange: (event) =>
                    setGlobalProductCommission(event.target.value),
                  maxLength: "500",
                }}
              />
            </GridItem>
          </GridContainer>

          <Button
            color="rose"
            className={classes.updateProfileButton}
            onClick={aboutUpdateHandler}
          >
            Update Global PC
          </Button>
        </CardBody>
      </Card>
    </>
  );
}

export default GlobalProductCommission;
