import React from 'react';

import styles from './Warning.module.css';

const Warning = props => {
  return (
    <div className={styles['warning-container']}>
      <div onClick={props.onClick} className={styles['overlay']}></div>
      <div className={styles['content-container']}>
        <h3 className={styles['warning-heading']}>{props.heading}</h3>
        <p className={styles['warning-description']}>{props.description}</p>
        <span onClick={props.onClick} className={styles.cross}>
          &#10005;
        </span>
      </div>
    </div>
  );
};

export default Warning;
