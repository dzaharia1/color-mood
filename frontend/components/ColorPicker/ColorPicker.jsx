import React, { useState, useCallback, useEffect, useRef } from 'react';
import _ from 'lodash';
import styles from './ColorPicker.module.scss';

const ColorPicker = ({color, setColor, redInput, greenInput, blueInput}) => {
    const [localRed, setLocalRed] = useState(0);
    const [localGreen, setLocalGreen] = useState(0);
    const [localBlue, setLocalBlue] = useState(0);

    useEffect(() => {
        setColor("#" + ((localRed << 16) | (localGreen << 8) | localBlue).toString(16).padStart(6, '0'));
    }, [redInput.current.value, greenInput.current.value, blueInput.current.value]);

    const redChange = (e) => {
        setLocalRed(e.target.value);
    }

    const greenChange = (e) => {
        setLocalGreen(e.target.value);
    }

    const blueChange = (e) => {
        setLocalBlue(e.target.value);
    }

    const hexInput = (e) => {
        if (e.target.value.indexOf('#') < 0) {
            setColor(`#${e.target.value}`);
        } else {
            setColor(`${e.target.value}`);
        }
        setLocalRed(parseInt(color.slice(1, 3), 16));
        setLocalGreen(parseInt(color.slice(3, 5), 16));
        setLocalBlue(parseInt(color.slice(5, 7), 16));
        redInput.current.value = localRed;
        greenInput.current.value = localGreen;
        blueInput.current.value = localBlue;
    }

    return (
        <div>
            <div style={{ width: '100px', height: '100px', backgroundColor: `${color}`, borderRadius: '50%' }}></div>
            <input className='hexInput'
                type="text"
                defaultValue={color}
                value={color}
                onChange={hexInput}
                onInput={hexInput} />
            <div>
                <label htmlFor="red">Red:</label>
                <input className={styles['colorInput']}
                    type="range"
                    id="red"
                    min="0"
                    max="255"
                    ref={redInput}
                    defaultValue={localRed}
                    onChange={redChange} />
                <p>{localRed}</p>
            </div>
            <div>
                <label htmlFor="green">Green:</label>
                <input className={styles['colorInput']}
                    type="range"
                    id="green"
                    min="0"
                    max="255"
                    ref={greenInput}
                    defaultValue={localGreen}
                    onChange={greenChange} />
                <p>{localGreen}</p>
            </div>
            <div>
                <label htmlFor="blue">Blue:</label>
                <input className={styles['colorInput']}
                    type="range"
                    id="blue"
                    min="0"
                    max="255"
                    ref={blueInput}
                    defaultValue={localBlue}
                    onChange={blueChange} />
                <p>{localBlue}</p>
            </div>
        </div>
    );
};

export default ColorPicker;
