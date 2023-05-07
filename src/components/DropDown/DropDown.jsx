import React, { useState } from "react";
import "./DropDown.scss";
const DropDown = ({formData,setFormData,listType}) => {

    const [isSelect, setIsSelect] = useState(false);

    const handleSelectOption = (value) => {
        setFormData((prev) => ({ ...prev, selectType: value }));
        setIsSelect(false);
      };

  return (
    <div className="dropdown">
      <span>Select type of product</span>
      <div className="dropdown__select">
        <div
          className="dropdown__select__display"
          onClick={() => setIsSelect((prev) => !prev)}
        >
          {formData.selectType}
        </div>
        {isSelect && (
          <div className="dropdown__select__dropdown">
            {listType.map((item, index) => (
              <div
                key={`option-${index}`}
                className="dropdown__select__dropdown__option"
                onClick={() => handleSelectOption(item.value)}
              >
                {item.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
