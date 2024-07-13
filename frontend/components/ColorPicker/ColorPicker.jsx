import React, { useState, useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';

const ColorPicker = ({color, setColor, red, green, blue, setRed, setGreen, setBlue}) => {

    useEffect(() => {
        setColor("#" + ((red << 16) | (green << 8) | blue).toString(16).padStart(6, '0'));
    }, [red, green, blue]);

    const redChange = (e) => {
        setRed(e.target.value);
    }

    const greenChange = (e) => {
        setGreen(e.target.value);
    }

    const blueChange = (e) => {
        setBlue(e.target.value);
    }

    return (
        <div>
            <div style={{ width: '100px', height: '100px', backgroundColor: {color}, borderRadius: '50%' }}></div>
            <p>{color}</p>
            <div>
                <label htmlFor="red">Red:</label>
                <input type="range" id="red" min="0" max="255" value={red} onChange={redChange} />
                <p>{red}</p>
            </div>
            <div>
                <label htmlFor="green">Green:</label>
                <input type="range" id="green" min="0" max="255" value={green} onChange={greenChange} />
                <p>{green}</p>
            </div>
            <div>
                <label htmlFor="blue">Blue:</label>
                <input type="range" id="blue" min="0" max="255" value={blue} onChange={blueChange} />
                <p>{blue}</p>
            </div>
        </div>
    );
};

export default ColorPicker;
