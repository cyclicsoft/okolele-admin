
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import PaymentIcon from '@material-ui/icons/Payment';
import styles from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.js";
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import Assignment from "@material-ui/icons/Assignment";
import Search from "@material-ui/icons/Search";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";


//SCSS file
import '../../assets/scss/ghorwali-scss/voucher-list.scss'

import 'date-fns';
import DateValidate from "views/DatePicker/DateValidate";

import PaginationComponent from "views/Pagination/PaginationComponent";

import "../../assets/scss/ghorwali-scss/paginations.scss"


// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";

// core components
import ImageUpload from "components/CustomUpload/ImageUpload.js";

// material-ui icons
import Check from "@material-ui/icons/Check";
import PermIdentity from "@material-ui/icons/PermIdentity";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";






const useStyles = makeStyles(styles);

function CommissionAdjustment() {
    
    const classes = useStyles();
    const searchButton = classes.top + " " + classes.searchButton;

    const [commissionRate, setCommissionRate] = useState("0");


    return (
        <>
            <GridContainer xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="rose" icon>
                        <CardIcon color="rose">
                            <PaymentIcon />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>
                            Commission Adjustment - <small>Adjustment for Specific Vendor</small>
                        </h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                                <CustomInput
                                    labelText="Commission Rate (%)"
                                    id="commission-rate"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: 'Number',
                                        value: commissionRate,
                                        // onChange: (event) => setPlanName(event.target.value),
                                        maxLength: "3"

                                    }}
                                />
                            </GridItem>
                        </GridContainer>


                        {/* ########################## Associated Vendor Selector ########################## */}
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="rose" icon>
                                        {/* <CardIcon color="rose">
                                            <Assignment />
                                        </CardIcon> */}
                                        <h4 style={{ float: 'left' }} className={classes.cardIconTitle}>Select Vendor(s)</h4>
                                        <div style={{ marginLeft: '45vw', display: 'flex' }}>

                                            <div className="search-dropdown-style">
                                                <select
                                                    // value={searchTypeValue}
                                                // onChange={handleSearchType}
                                                >
                                                    <option value="Search By Vendor">Search By Vendor</option>
                                                    <option value="Search By Product Name">Product Name</option>
                                                </select>
                                            </div>

                                            <CustomInput
                                                formControlProps={{
                                                    className: classes.top + " " + classes.search
                                                }}
                                                inputProps={{
                                                    placeholder: "Search Product",
                                                    // value: searchKeyword,
                                                    // onChange: (event) => setSearchKeyword(event.target.value),
                                                    type: 'String'
                                                }}
                                            />
                                            <Button
                                                style={{ marginTop: '5%' }}
                                                color="white"
                                                aria-label="edit"
                                                justIcon
                                                round
                                                className={searchButton}
                                            // onClick={() => riderSearchHanler()}
                                            >
                                                <Search className={classes.headerLinksSvg + " " + classes.searchIcon} />
                                            </Button>
                                        </div>

                                    </CardHeader>
                                    <CardBody>
                                        <Table
                                            striped
                                            tableHead={[
                                                "#",
                                                "",
                                                "Product Name",
                                                "Type",
                                                "Qty",
                                                "Price",
                                                "Amount"
                                            ]}
                                            tableData={[
                                                [
                                                    "1",
                                                    <Checkbox
                                                        key="key"
                                                        className={classes.positionAbsolute}
                                                        tabIndex={-1}
                                                        // onClick={() => handleToggle(1)}
                                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot
                                                        }}
                                                    />,
                                                    "Moleskine Agenda",
                                                    "Office",
                                                    "25",
                                                    "€ 49",
                                                    "€ 1,225"
                                                ],
                                                [
                                                    "2",
                                                    <Checkbox
                                                        key="key"
                                                        className={classes.positionAbsolute}
                                                        tabIndex={-1}
                                                        // onClick={() => handleToggle(2)}
                                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{
                                                            checked: classes.checked,
                                                            root: classes.checkRoot
                                                        }}
                                                    />,
                                                    "Stabilo Pen",
                                                    "Office",
                                                    "30",
                                                    "€ 10",
                                                    "€ 300"
                                                ]

                                            ]}
                                            customCellClasses={[classes.center, classes.right, classes.right]}
                                            customClassesForCells={[0, 5, 6]}
                                            customHeadCellClasses={[
                                                classes.center,
                                                classes.right,
                                                classes.right
                                            ]}
                                            customHeadClassesForCells={[0, 5, 6]}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <Button color="info" className={classes.updateProfileButton} >
                                Update
                            </Button>
                        </GridContainer>

                    </CardBody>
                </Card>
            </GridContainer>
        </>
    )
}

export default CommissionAdjustment
