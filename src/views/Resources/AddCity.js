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
import Edit from "@material-ui/icons/Edit";
// SCSS File
import '../../assets/scss/ghorwali-scss/appPrivacy.scss'
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles(styles);

function AddCity() {

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

            <GridContainer>

                <GridItem xs={12} sm={4} md={8}>
                    <Card >
                        <CardHeader color="rose" icon>
                            <CardIcon color="rose">
                                <Edit />
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>
                                Service Areas - <small>Update City Names</small>
                            </h4>
                        </CardHeader>
                        <CardBody>
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
                                            placeholder="Enter City Name"
                                            onChange={e => privacyTermsHandler(idx, e)}
                                            maxLength='100'
                                        />
                                        <button style={{ "padding": "1%" }} type="button" onClick={() => handleRemove(idx)}>X</button>
                                    </div>
                                );
                            })}
                            <Button color="rose" className={classes.updateProfileButton}>
                                Update
                            </Button>
                        </CardBody>
                    </Card>

                </GridItem>


            </GridContainer>

        </>
    )
}

export default AddCity
