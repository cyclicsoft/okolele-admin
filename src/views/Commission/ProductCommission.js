import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import PaymentIcon from "@material-ui/icons/Payment";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// @material-ui/icons

//SCSS file
import "../../assets/scss/ghorwali-scss/voucher-list.scss";

import "date-fns";

import "../../assets/scss/ghorwali-scss/paginations.scss";

// @material-ui/core components

// core components

// material-ui icons

const useStyles = makeStyles(styles);

function ProductCommission() {
  const classes = useStyles();
  const [commissionRate, setCommissionRate] = useState("0");

  return (
    <>
      <GridContainer xs={12} sm={8} md={8}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <PaymentIcon />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>
              Product Commission - <small>Add / Update Commission</small>
            </h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText="Commission Rate (%)"
                  id="commission-rate"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "Number",
                    value: commissionRate,
                    // onChange: (event) => setPlanName(event.target.value),
                    maxLength: "3",
                  }}
                />
              </GridItem>
            </GridContainer>

            <Button color="info" className={classes.updateProfileButton}>
              Update
            </Button>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}

export default ProductCommission;
