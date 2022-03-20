import React, { useEffect, useState } from "react";

// material-ui icons
import Add from "@material-ui/icons/Add";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
// SCSS
import "../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(styles);

const DynamicElementCreator = (props) => {
  console.log(
    "DynamicElementCreator/props.objectValue: ",
    props.objectValue,
    Object.keys(props.objectValue).length
  );
  const classes = useStyles();
  const [inputList, setInputList] = useState([""]);

  useEffect(() => {
    if (Object.keys(props.objectValue).length > 0) {
      setInputList(props.objectValue);
    } else {
      setInputList([""]);
    }
  }, [props.objectValue]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);

    props.callBackFun(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, ""]);
  };

  const callBackDataSender = () => {
    props.callBackFun(inputList);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div className="box" style={{ display: "flex" }}>
            <input
              name="firstName"
              placeholder={props.placeHolder}
              className="input-field"
              style={{
                borderBottom:
                  x.length <= 0 ? "2px solid red" : "1px solid #d2d2d2",
              }}
              value={x}
              onChange={(e) => handleInputChange(e, i)}
              onBlur={callBackDataSender}
            />

            <div style={{ display: "flex" }}>
              {inputList.length !== 1 && (
                <button
                  className="add-remove-btn"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button className="add-remove-btn" onClick={handleAddClick}>
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DynamicElementCreator;
