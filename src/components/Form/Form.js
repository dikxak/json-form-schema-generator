import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import Warning from '../Warning/Warning';

import styles from './Form.module.css';

const Form = props => {
  const inputRef = useRef();
  const [inputData, setInputData] = useState({});
  const [warning, setWarning] = useState(false);

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

  const formSubmitHandler = e => {
    e.preventDefault();

    for (const key in inputData) {
      if (inputData[key].toString().trim().length === 0) {
        setWarning(true);
        return;
      }
    }

    const formData = {};

    Array.from(e.target).forEach(t => {
      if (t.type === 'number') {
        formData[t.id] = +t.value;
      } else if (t.type === 'submit') {
        return;
      } else {
        formData[t.id] = t.value;
      }
    });

    // Dynamically transformed data
    console.log(formData);

    // Data from onChange function in each input
    console.log(inputData);
  };

  const closeWarningHandler = () => {
    setWarning(false);
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
