import { useState, useEffect } from "react";
import "../style/productpage.css";

function CustomSelect({ options = [], selectedValue, setSearchParams, searchParams,title,keyform }) {
  const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue || "");

  useEffect(() => {
    setLocalSelectedValue(selectedValue || "");
  }, [selectedValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setLocalSelectedValue(value);

    const newSearchParams = new URLSearchParams(searchParams);
    if (value === "") {
      newSearchParams.delete(keyform);
    } else {
      newSearchParams.set(keyform, value);
    }
    setSearchParams(newSearchParams);
  };

  return (
    <div className="custom-select-wrapper">
      <select value={localSelectedValue} onChange={handleChange} className="custom-select">
        <option value="">{title}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="choose">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
