import React from 'react';

import Button from '../Button/Button';

import styles from './Form.module.css';

const Form = props => {
  return (
    <div className={styles['form-container']}>
      <h2 className={styles['form-heading']}>Form heading</h2>
      <p className={styles['form-description']}>Form description</p>
      <form className={styles.form}>
        <div className={styles['form-control']}>
          <label htmlFor="aaa">First Name</label>
          <input id="aaa" type="" name="" placeholder="Enter your first name" />
        </div>
        <div className={styles['form-control']}>
          <label htmlFor="aaa">First Name</label>
          <input id="aaa" type="" name="" placeholder="Enter your first name" />
        </div>
        <div className={styles['form-control']}>
          <label htmlFor="aaa">First Name</label>
          <input id="aaa" type="" name="" placeholder="Enter your first name" />
        </div>
        <div className={styles['form-control']}>
          <label htmlFor="aaa">First Name</label>
          <input id="aaa" type="" name="" placeholder="Enter your first name" />
        </div>
        <Button className={styles['btn-submit']}>Submit</Button>
      </form>
    </div>
  );
};

export default Form;
