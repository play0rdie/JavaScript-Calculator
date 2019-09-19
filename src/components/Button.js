import React from 'react';
import './Button.scss'

export const Button = ({ id, value, className, handleClick }) => {
    return <button className={className} id={id} value={value} onClick={handleClick}>{value}</button>
}