import React from 'react';

const SelectListItem = (props) => {
    const { selectItemClassNames, selectListItem, handleSelectChange, isSelected } = props;
    // console.log(selectListItem.key);

    return (
        <li
            // key={selectListItem.key}
            className={`${selectItemClassNames} ${isSelected ? "selected" : ""}`}
            onClick={handleSelectChange}
        >
            {selectListItem.text}
        </li>
    )
}

export default SelectListItem;