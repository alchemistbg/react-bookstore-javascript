import React from 'react'

function Input(props) {
    const { divClassNames, isAutoFocus, value, onFocus, onChange, onBlur, type, nameAndId, labelClassName, labelTextValue, error } = props;
    return (
        <div className={divClassNames}>
            <input
                autoFocus={isAutoFocus}
                value={value}
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                name={nameAndId}
                id={nameAndId} />
            <label className={labelClassName} htmlFor={nameAndId}>{labelTextValue}</label>
            {/* {error && <div className="message message-error">{error}</div>} */}
        </div >
    );
}

export default Input;