import React, { useState } from 'react'

// core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// material-ui icons
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import Edit from "@material-ui/icons/Edit";
// SCSS File
import '../../assets/scss/ghorwali-scss/appPrivacy.scss'
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles(styles);

function AppPrivacy() {

    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(null);

    const [fields, setFields] = useState([{ value: null }]);

    function privacyTermsHandler(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    const handleChange = event => {
        setSelectedValue(event.target.value);
    };

    // const privacyTermsHandler = (event) => {
    //     setPrivacyTerms(event.target.value)
    //   }


    return (
        <>
            <Card>
                <CardHeader color="rose" icon>
                    <CardIcon color="rose">
                        <Edit />
                    </CardIcon>
                    <h4 className={classes.cardIconTitle}>
                        Privacy Policy - <small>Update Privacy Policy</small>
                    </h4>
                </CardHeader>
                <CardBody>
                    <GridContainer>




                        {/* ########################## Slide Image Selector ########################## */}
                        <GridItem xs={12} sm={4} md={4}>
                            <legend>Select User Type</legend>
                            <div
                                className={
                                    classes.checkboxAndRadio +
                                    " " +
                                    classes.checkboxAndRadioHorizontal
                                }
                            >
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={selectedValue === "a"}
                                            onChange={handleChange}
                                            value="a"
                                            name="radio button demo"
                                            aria-label="A"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label,
                                        root: classes.labelRoot
                                    }}
                                    label="Customer"
                                />
                            </div>

                            <div
                                className={
                                    classes.checkboxAndRadio +
                                    " " +
                                    classes.checkboxAndRadioHorizontal
                                }
                            >
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={selectedValue === "b"}
                                            onChange={handleChange}
                                            value="b"
                                            name="radio button demo"
                                            aria-label="B"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label,
                                        root: classes.labelRoot
                                    }}
                                    label="Vendor"
                                />
                            </div>

                            <div
                                className={
                                    classes.checkboxAndRadio +
                                    " " +
                                    classes.checkboxAndRadioHorizontal
                                }
                            >
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={selectedValue === "c"}
                                            onChange={handleChange}
                                            value="c"
                                            name="radio button demo"
                                            aria-label="C"
                                            icon={
                                                <FiberManualRecord
                                                    className={classes.radioUnchecked}
                                                />
                                            }
                                            checkedIcon={
                                                <FiberManualRecord
                                                    className={classes.radioChecked}
                                                />
                                            }
                                            classes={{
                                                checked: classes.radio,
                                                root: classes.radioRoot
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label,
                                        root: classes.labelRoot
                                    }}
                                    label="Rider"
                                />
                            </div>

                        </GridItem>
                        <GridItem xs={12} sm={4} md={8}>
                            <legend>Enter Privacy Terms</legend>
                            <div className={classes.buttonGroup}>
                                <Button
                                    color="info"
                                    size="sm"
                                    round
                                    className={classes.lastButton}
                                    onClick={() => handleAdd()}
                                >
                                    <Add className={classes.icon} />
                                </Button>
                            </div>
                            <br />
                            {fields.map((field, idx) => {
                                return (
                                    <div key={`${field}-${idx}`}>
                                        <input
                                            style={{ "padding": "1%", "margin": "1%", "width": "70%" }}
                                            type="text"
                                            placeholder="Enter Privacy Term"
                                            onChange={e => privacyTermsHandler(idx, e)}
                                            maxLength='100'
                                        />
                                        <button style={{ "padding": "1%" }} type="button" onClick={() => handleRemove(idx)}>X</button>
                                    </div>
                                );
                            })}

                        </GridItem>
                        <Button style={{ marginLeft: '65vw' }} color="rose" className={classes.updateProfileButton}>
                            Save
                        </Button>
                    </GridContainer>
                </CardBody>
            </Card>
        </>
    )
}

export default AppPrivacy
