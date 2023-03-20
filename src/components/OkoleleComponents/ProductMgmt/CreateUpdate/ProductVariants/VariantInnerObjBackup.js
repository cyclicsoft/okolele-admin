/*eslint-disable*/
import React, { useEffect, useState } from "react";
// core components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Select from "@mui/material/Select";

// material-ui icons
import UpdateIcon from "@mui/icons-material/Update";

// SCSS
import "../../../../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";

const VariantInnerObj = (props) => {
  // console.log("VariantInnerObj/props.variants: ", props.variants);

  const [innerObj, setInnerObj] = useState([
    {
      ramUnit: "GB",
      ram: "",
      romUnit: "GB",
      rom: "",
      basePrice: "",
    },
  ]);

  useEffect(() => {
    if (Object.keys(props.variants).length > 0) {
      setInnerObj(props.variants);
    } else {
      setInnerObj([
        {
          ramUnit: "GB",
          ram: "",
          romUnit: "GB",
          rom: "",
          basePrice: "",
        },
      ]);
    }
  }, [props.variants]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...innerObj];
    list[index][name] = value;
    setInnerObj(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...innerObj];
    list.splice(index, 1);
    setInnerObj(list);

    // props.innerObjCallbackFun(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInnerObj([
      ...innerObj,
      {
        ramUnit: "GB",
        ram: "",
        romUnit: "GB",
        rom: "",
        basePrice: "",
      },
    ]);
  };

  const dataSender = () => {
    props.innerObjCallbackFun(innerObj, props.variantIndex);
  };

  return (
    // onBlur={dataSender}
    <div key={props.variantIndex}>
      {innerObj.map((x, i) => {
        return (
          <div key={i} style={{ display: "flex" }}>
            {/* RAM Unit */}
            <FormControl
              variant="standard"
              style={{ width: "100%", marginTop: "12px", paddingRight: "10px" }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ fontSize: "14px" }}
              >
                RAM Unit
              </InputLabel>
              <Select
                labelId="ramUnit"
                id="ramUnit"
                name="ramUnit"
                style={{ fontSize: "14px" }}
                value={x.ramUnit}
                onChange={(e) => handleInputChange(e, i)}
                label="RAM Unit"
              >
                <MenuItem value={"KB"}>KB</MenuItem>
                <MenuItem value={"MB"}>MB</MenuItem>
                <MenuItem value={"GB"}>GB</MenuItem>
              </Select>
            </FormControl>
            {/* RAM */}
            <input
              name="ram"
              placeholder="RAM"
              className="input-field"
              style={{ marginRight: "10px" }}
              type="Number"
              value={x !== undefined ? x.ram : ""}
              onChange={(e) => handleInputChange(e, i)}
            />
            {/* ROM Unit */}
            <FormControl
              variant="standard"
              style={{ width: "100%", marginTop: "12px", paddingRight: "10px" }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ fontSize: "14px" }}
              >
                ROM Unit
              </InputLabel>
              <Select
                labelId="romUnit"
                id="romUnit"
                name="romUnit"
                style={{ fontSize: "14px" }}
                value={x !== undefined ? x.romUnit : ""}
                onChange={(e) => handleInputChange(e, i)}
                label="RAM Unit"
              >
                <MenuItem value={"KB"}>KB</MenuItem>
                <MenuItem value={"MB"}>MB</MenuItem>
                <MenuItem value={"GB"}>GB</MenuItem>
              </Select>
            </FormControl>
            {/* ROM */}
            <input
              name="rom"
              placeholder="ROM"
              className="input-field"
              style={{ marginRight: "10px" }}
              type="Number"
              value={x !== undefined ? x.rom : ""}
              onChange={(e) => handleInputChange(e, i)}
            />
            {/* Base Price */}
            <input
              name="basePrice"
              placeholder="Base Price"
              className="input-field"
              style={{ marginRight: "10px" }}
              type="Number"
              value={x !== undefined ? x.basePrice : ""}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div style={{ display: "flex" }}>
              {/* Remove Inner Obj */}
              {innerObj.length !== 1 && (
                <button
                  className="add-remove-btn"
                  style={{ width: "5vh" }}
                  onClick={() => handleRemoveClick(i)}
                >
                  -
                </button>
              )}
              {/* Add Inner Obj */}
              {innerObj.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{ width: "5vh" }}
                  onClick={handleAddClick}
                >
                  +
                </button>
              )}
              {/* Update Inner Obj */}
              {innerObj.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{
                    width: "6vh",
                    marginTop: "26px",
                    marginLeft: "10px",
                  }}
                  onClick={() => dataSender()}
                >
                  <UpdateIcon />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantInnerObj;
