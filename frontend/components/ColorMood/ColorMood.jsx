import React from 'react';
import styles from './ColorMood.module.scss';

const ColorMood = ({ colorMood }) => {
    return (
        <div className={styles["colorMood"]}>
            <input type="text" value={colorMood} />
        </div>
    );
}

export default ColorMood;