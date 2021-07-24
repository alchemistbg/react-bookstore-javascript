import React, { useRef } from 'react';


function Input(props) {
    const { divClassNames,
        isAutoFocus,
        value,
        onFocus,
        onChange,
        onBlur,
        type,
        nameAndId,
        labelClassName,
        labelTextValue,
        error,
        isPassword,
        handleHide,
    } = props;

    const inputRef = useRef();
    const showPassRef = useRef();

    return (

        <div className={divClassNames}>
            <input
                ref={inputRef}
                autoFocus={isAutoFocus}
                value={value}
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                name={nameAndId}
                id={nameAndId}
            />

            <label className={labelClassName} htmlFor={nameAndId}>{labelTextValue}</label>

            {
                isPassword ? (
                    <button
                        ref={showPassRef}
                        className="field-type-change hide-pass"
                        id={nameAndId}
                        key={nameAndId}
                        type="button"
                        onClick={() => handleHide(inputRef, showPassRef)} >
                    </button>
                ) : (null)
            }
            {/* {error && <div className="message message-error">{error}</div>} */}
        </div >
    );
}

export default Input;