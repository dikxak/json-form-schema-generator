import React, { useRef, useEffect } from 'react';

import Button from '../Button/Button';

import styles from './Form.module.css';

const Form = props => {
  const inputRef = useRef();

  const { title, description, items } = props.schema;
  const { data } = props;

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

  const formSubmitHandler = e => {
    e.preventDefault();
    const formData = {
      spotName: e.target[0].value,
      spotAddress: e.target[1].value,
      availableSpotNo: e.target[2].value,
      spotEmail: e.target[3].value,
      spotPrice: e.target[4].value,
    };
    console.log(formData);
  };

  return (
    <div className={styles['form-container']}>
      <h2 className={styles['form-heading']}>{title}</h2>
      <p className={styles['form-description']}>{description}</p>

      <form onSubmit={formSubmitHandler} className={styles.form}>
        {objList.map((obj, i) => {
          return (
            <div key={obj.key} className={styles['form-control']}>
              <label htmlFor={obj.key}>
                {obj.required ? obj.label + '*' : obj.label}
              </label>
              <input
                defaultValue={data[obj.key]}
                ref={i === 0 ? inputRef : null}
                id={obj.key}
                type={obj.type}
                name={obj.key}
                placeholder={obj.placeholder}
              />
            </div>
          );
        })}
        <Button type="submit" className={styles['btn-submit']}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
