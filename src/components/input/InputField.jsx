import React from 'react'

export const InputField = (props) => {
    return (
        <div className="form-floating">
            <input 
                type={props.type}
                className="form-control"
                id={props.id}
                placeholder={props.placeholder} 
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            <label 
                htmlFor="floatingInput">
                {props.label}
            </label>
        </div>
    )
}





/* 

import React from 'react'

export const InputField = ({
    md = 4, 
    styleInput = 'control',
    type = 'text', 
    id, 
    placeholder = '',
    value,
    onChange,
    onBlur,
    required = false,
    label
}) => {
    return (
        <div className={styleInput === 'floating' ? "form-control" : `col-md-${md}`}>
            {styleInput === 'control' && <label className="form-label">{label}</label>}
            <input
                type={type}
                className={`form-${styleInput}`}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
            />
            {styleInput === 'floating' && <label
                htmlFor={id}>
                {label}
            </label>}
        </div>
    )
}



*/