import React from 'react';
import SelectListItem from './SelectListItem/SelectListItem';

const SelectList = (props) => {
    // console.log(props);
    const {
        selectListClassNames,
        selectItemClassNames,
        selectListHeader,
        selectIsOpen,
        selectListItems,
        selectedOption,
        handleSelectChange,
        handleHeaderClick
    } = props;

    return (
        <span className="select-list-container">
            <h6 className={`select-list-header ${selectIsOpen ? "opened" : ""}`} onClick={handleHeaderClick}>{selectListHeader}{selectedOption}</h6>
            {selectIsOpen &&
                <ul className={selectListClassNames}>
                    {selectListItems.map((selectListItem) => {
                        return <SelectListItem
                            selectItemClassNames={selectItemClassNames}
                            selectListItem={selectListItem}
                            handleSelectChange={handleSelectChange}
                            isSelected={selectedOption === selectListItem.text}
                        />
                    })}
                </ul>
            }
        </span>
    )
}

export default SelectList