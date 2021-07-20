import React, { useRef, useState, useEffect } from 'react';


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
        handleHidePassword,
        showPassword
    } = props;

    const changeFieldTypeRef = useRef();

    const handleFieldChangeType = (evt) => {
        console.log(evt.target.classList);
        console.log(evt.target.parentElement.children[0].id);
        if (showPassword && evt.target.parentElement.children[0].id === "password") {
            evt.target.classList.add("show-pass");
            evt.target.classList.remove("hide-pass");
            evt.target.parentElement.children[0].type = "text";
        } else if (!showPassword && evt.target.parentElement.children[0].id === "password") {
            evt.target.classList.remove("show-pass");
            evt.target.classList.add("hide-pass");
            evt.target.parentElement.children[0].type = "password";
        }

        if (showPassword && evt.target.parentElement.children[0].id === "repeatPassword") {
            evt.target.classList.add("show-pass");
            evt.target.classList.remove("hide-pass");
            evt.target.parentElement.children[0].type = "text";
        } else if (!showPassword && evt.target.parentElement.children[0].id === "repeatPassword") {
            evt.target.classList.remove("show-pass");
            evt.target.classList.add("hide-pass");
            evt.target.parentElement.children[0].type = "password";
        }
    }

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
                id={nameAndId}
            />

            <label className={labelClassName} htmlFor={nameAndId}>{labelTextValue}</label>

            {
                isPassword ? (
                    <button
                        className="field-type-change hide-pass"
                        id={nameAndId}
                        key={nameAndId}
                        type="button"
                        // ref={changeFieldTypeRef}
                        onClick={(evt) => {
                            handleHidePassword();
                            handleFieldChangeType(evt);
                        }} >
                        {/* {
                            showPassword ? ("test") : ("fuck")
                        } */}
                    </button>
                ) : null
            }
            {/* {error && <div className="message message-error">{error}</div>} */}
        </div >
    );
}

export default Input;