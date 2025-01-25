import React, {useId} from 'react';
import "./SelectInput.css"

const SelectInput = ({ selectedItem, setSelectedItem, inputName, dataKeys }) => {
    const id = useId()

    const handleChange = (event) => {
        setSelectedItem(event.target.value);
    };

    return (
        <div className='selectContainer'>
        <label htmlFor={id}>{inputName}</label>
        <select value={selectedItem} id={id} onChange={handleChange}>
        {dataKeys.map((item, index) => (
            <option key={index} value={item}>
            {item}
            </option>
        ))}
        </select>
        </div>
    );
};

export default SelectInput;
