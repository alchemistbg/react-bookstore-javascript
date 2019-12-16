import React from 'react'

function Input(props) {
    const { divClassNames, value, onChange, isAutoFocus, type, nameAndId, labelClassName, labelTextValue } = props;
    return (
        <div className={divClassNames}>
            <input
                autoFocus={isAutoFocus}
                value={value}
                onChange={onChange}
                type={type}
                name={nameAndId}
                id={nameAndId} />
            <label className={labelClassName} htmlFor={nameAndId}>{labelTextValue}</label>
        </div>
    );
}

export default Input;