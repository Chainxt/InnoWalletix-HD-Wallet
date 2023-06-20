import React, { useState} from "react";

export default function Dropdown({ networks, defaultOption, onChange }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);
  
    const handleOptionChange = (event) => {
      const newSelectedOption = event.target.value;
      setSelectedOption(newSelectedOption);
      onChange(newSelectedOption);
    };
  
    return (
      <select value={selectedOption} onChange={handleOptionChange}>
        {networks.map((network) => (
          <option key={network.value} value={network.value}>
            {network.label}
          </option>
        ))}
      </select>
    );
  }