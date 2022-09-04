import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import Warning from '../Warning/Warning';

import styles from './Form.module.css';

const Form = props => {
  const { title, description, items } = props.schema;
  const { data } = props;

  const inputRef = useRef();
  const [inputData, setInputData] = useState(data);
  const [isInputValid, setIsInputValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [focusableEl, setFocusableEl] = useState();

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
    if (focusableEl) {
      focusableEl.focus();
    } else {
      inputRef.current.focus();
    }
  }, [focusableEl]);

  const inputChangeHandler = e => {
    if (e.target.value.trim().length === 0) {
      setFocusableEl(e.target);
      setIsInputValid(false);
      return;
    }

    setInputData(prevData => {
      const nextData = { ...prevData };
      nextData[e.target.id] =
        e.target.type === 'number' && e.target.value.trim().length !== 0
          ? +e.target.value
          : e.target.value;

      return nextData;
    });
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    if (!isInputValid) {
      setIsFormValid(false);
      return;
    }

    // Data from onChange function in each input
    console.log(inputData);
  };

  const closeWarningHandler = () => {
    setIsFormValid(true);
    focusableEl.focus();
  };

  return (
    <React.Fragment>
      {!isFormValid
        ? ReactDOM.createPortal(
            <Warning
              heading="Input Error"
              description="Please check again and provide all the inputs. Input fields can not be empty."
              onClick={closeWarningHandler}
            />,
            document.getElementById('warning-root')
          )
        : ''}
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
                  onChange={inputChangeHandler}
                />
              </div>
            );
          })}
          <Button type="submit" className={styles['btn-submit']}>
            Submit
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Form;
