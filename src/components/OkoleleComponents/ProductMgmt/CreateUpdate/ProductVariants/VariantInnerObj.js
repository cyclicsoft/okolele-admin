/*eslint-disable*/
import React from "react";
// core components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// SCSS
import "../../../../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";

const VariantInnerObj = ({ ramRomVariants, setRamRomVariants }) => {
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...ramRomVariants];
    list[index][name] = value;
    setRamRomVariants(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...ramRomVariants];
    list.splice(index, 1);
    setRamRomVariants(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setRamRomVariants([
      ...ramRomVariants,
      {
        ramUnit: "GB",
        ram: "",
        romUnit: "GB",
        rom: "",
        basePrice: "",
      },
    ]);
  };

  return (
    <div>
      {ramRomVariants.map((x, i) => {
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
                style={{ fontSize: "14px" }}
                name="ramUnit"
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
              placeholder="RAM"
              className="input-field"
              style={{ marginRight: "10px" }}
              type="Number"
              name="ram"
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
              placeholder="ROM"
              className="input-field"
              style={{ marginRight: "10px" }}
              type="Number"
              name="rom"
              value={x !== undefined ? x.rom : ""}
              onChange={(e) => handleInputChange(e, i)}
            />
            {/* Base Price */}
            <input
              placeholder="Base Price"
              className="input-field"
              style={{ marginRight: "10px" }}
              type="Number"
              name="basePrice"
              value={x !== undefined ? x.basePrice : ""}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div style={{ display: "flex" }}>
              {/* Remove Inner Obj */}
              {ramRomVariants.length !== 1 && (
                <button
                  className="add-remove-btn"
                  style={{ width: "5vh" }}
                  onClick={() => handleRemoveClick(i)}
                >
                  -
                </button>
              )}
              {/* Add Inner Obj */}
              {ramRomVariants.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{ width: "5vh" }}
                  onClick={handleAddClick}
                >
                  +
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
