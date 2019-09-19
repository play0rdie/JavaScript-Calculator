import React from 'react';
import './Display.scss';

export const Display = ({ value }) => {
    return (
        <div className='display' id='display'>
            {value}
        </div>
    )
}