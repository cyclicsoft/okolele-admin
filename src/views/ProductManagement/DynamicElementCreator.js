/*eslint-disable*/
import React, { useEffect, useState } from "react";
// SCSS
import "../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";

const DynamicElementCreator = (props) => {
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

    props.callBackFun(list);
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
    const list = [...inputList, ""];
    setInputList(list);
    props.callBackFun(list);
  };

  return (
    <div>
      {inputList.map((x, i) => {
        return (
          <div key={i} className="box" style={{ display: "flex" }}>
            <input
              name="firstName"
              placeholder={props.placeHolder}
              className="input-field"
              // style={{
              //   borderBottom:
              //     x.length <= 0 ? "2px solid red" : "1px solid #d2d2d2",
              // }}
              value={x}
              onChange={(e) => handleInputChange(e, i)}
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
