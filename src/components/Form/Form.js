import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import Warning from '../Warning/Warning';

import styles from './Form.module.css';

const Form = props => {
  const inputRef = useRef();
  const [inputData, setInputData] = useState({});
  const [warning, setWarning] = useState(false);
  const [focusableEl, setFocusableEl] = useState();

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
    // Initialize inputData
    setInputData(data);

    if (focusableEl) {
      focusableEl.focus();
    } else {
      inputRef.current.focus();
    }
  }, [focusableEl, data]);

  const inputChangeHandler = e => {
    setInputData(prevData => {
      const nextData = { ...prevData };
      nextData[e.target.id] =
        e.target.type === 'number' && e.target.value.trim().length !== 0
          ? +e.target.value
          : e.target.value;

      return nextData;
    });
  };

  /**
   *Sets the first input element to focusableEl for focusing if no any input value is provided (i.e. value in input element is empty)
   * Also sets the error state to true for showing invalid input message to users.
   * @param {object} e - event object of the form
   * @returns {number} - flag for stopping code execution in other function where it is called
   */
  const validateInput = e => {
    for (const key in inputData) {
      if (inputData[key].toString().trim().length === 0) {
        const focusableEl = Array.from(e.target).filter(t => {
          return t.id === key;
        })[0];

        setFocusableEl(focusableEl);
        setWarning(true);

        return 1;
      }
    }
  };

  /**
   * Gets data from form and populating the formData and inputData value with the value from each input.
   * @param {object} e - event object of the form
   * @param {object} formData - empty object to be initialized defined in the form
   */
  const populateInputData = (e, formData) => {
    Array.from(e.target).forEach(t => {
      if (t.type === 'number') {
        formData[t.id] = +t.value;
      } else if (t.type === 'submit') {
        return;
      } else {
        formData[t.id] = t.value;
      }
    });
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    const value = validateInput(e);
    if (value === 1) return;

    const formData = {};
    populateInputData(e, formData);

    // Dynamically transformed data
    console.log(formData);

    // Data from onChange function in each input
    console.log(inputData);
  };

  const closeWarningHandler = () => {
    setWarning(false);
    focusableEl.focus();
  };

  return (
    <React.Fragment>
      {warning
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
