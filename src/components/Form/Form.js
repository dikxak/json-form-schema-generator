import React, { useRef, useEffect } from 'react';

import Button from '../Button/Button';

import styles from './Form.module.css';

const Form = props => {
  const inputRef = useRef();

  const { title, description, items } = props.schema;
  const objList = [];

  const initializeObjList = () => {
    for (const key in items) {
      const obj = {
        key: key,
        type: items[key].type,
        label: items[key].label,
        placeholder: items[key].placeholder,
        required: items[key].required,
      };

      objList.push(obj);
    }
  };

  initializeObjList();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className={styles['form-container']}>
      <h2 className={styles['form-heading']}>{title}</h2>
      <p className={styles['form-description']}>{description}</p>

      <form className={styles.form}>
        {objList.map((obj, i) => {
          return (
            <div key={obj.key} className={styles['form-control']}>
              <label htmlFor={obj.key}>
                {obj.required ? obj.label + '*' : obj.label}
              </label>
              <input
                ref={i === 0 ? inputRef : null}
                id={obj.key}
                type={obj.type}
                name={obj.key}
                placeholder={obj.placeholder}
              />
            </div>
          );
        })}
        <Button className={styles['btn-submit']}>Submit</Button>
      </form>
    </div>
  );
};

export default Form;