import React from 'react';
import styles from './ColorMood.module.scss';

const ColorMood = ({ colorMood }) => {
    return (
        <div className={styles["colorMood"]}>
            {/* <input type="text" value={colorMood} /> */}
            <h3>{ colorMood }</h3>
        </div>
    );
}

export default ColorMood;