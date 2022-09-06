import React, { useRef, useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import Warning from '../Warning/Warning';

import styles from './Form.module.css';

const initialValidityState = {
  isValid: true,
  message: '',
};

const validityReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { isValid: action.state, message: action.userMsg };
  }
  return initialValidityState;
};

/**
 * Capitalize and returns the first letter of the given sentence/word
 * @param {string} str - word/sentence whose first letter should be capitalized
 * @returns {string}
 */
const capitalizeWord = (str = 'word') => {
  let result = '';

  str.split('').forEach((letter, i) => {
    if (i === 0) {
      result += letter.toUpperCase();
    } else if (letter.toUpperCase() === letter) {
      result += ` ${letter.toLowerCase()}`;
    } else {
      result += letter;
    }
  });

  return result;
};

/**
 * Checks if email address contains more than one '@' or '.' symbol.
 * @param {string} email - email address to be validated
 * @returns {boolean}
 */
const checkMoreAtAndDot = (email = 'example@example.com') => {
  let atCount = 0;
  let dotCount = 0;

  email.split('').forEach(item => {
    if (item === '@') atCount++;
    if (item === '.') dotCount++;
  });

  if (atCount > 1 || dotCount > 1) return true;

  return false;
};

/**
 * Returns the final expression of the provided conditions for email validation.
 * @param {object} e - event object of the input field
 * @returns {boolean}
 */
const emailValidationExpression = e => {
  return (
    // email must contain '@' and '.' and should not contain ' ' space
    e.target.type === 'email' &&
    (!e.target.value.toLowerCase().trim().includes('@') ||
      !e.target.value.toLowerCase().trim().includes('.') ||
      e.target.value.toLowerCase().trim().includes(' ') ||
      !(
        // some value must be present after '@' and, the value present can not be '.'
        (
          e.target.value.toLowerCase().trim().indexOf('@') + 1 <
            e.target.value.length &&
          e.target.value.at(e.target.value.trim().indexOf('@') + 1) !== '.'
        )
      ) ||
      checkMoreAtAndDot(e.target.value) ||
      !(
        e.target.value.toLowerCase().trim().indexOf('.') + 1 <
        e.target.value.length
      ))
  );
};

const Form = props => {
  const { title, description, items } = props.schema;
  const { data } = props;

  const [inputValidityState, dispatchValidityState] = useReducer(
    validityReducer,
    initialValidityState
  );

  const inputRef = useRef();
  const [inputData, setInputData] = useState(data);
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
        ...(items[key].required && { required: items[key].required }),
        ...(items[key].min && { min: items[key].min }),
        ...(items[key].max && { max: items[key].max }),
      };

      objList.push(obj);
    }
  };
  initializeObjList();

  useEffect(() => {
    // When the page is loaded, set focus to the first input element else wherever the input is invalid.
    if (focusableEl) {
      focusableEl.focus();
    } else {
      inputRef.current.focus();
    }
  }, [focusableEl]);

  /**
   * Handles the input change in the input element and also validates the inputs
   * @param {object} e - Event input object where the input has occurred
   */
  const inputChangeHandler = (obj, e) => {
    if (e.target.value.trim().length === 0) {
      // Validate for empty value
      dispatchValidityState({
        type: 'USER_INPUT',
        state: false,
        userMsg: `${capitalizeWord(obj.key)} can not be empty.`,
      });
    } else if (obj.type === 'email' && emailValidationExpression(e)) {
      dispatchValidityState({
        type: 'USER_INPUT',
        state: false,
        userMsg: `The input is not a valid email address.`,
      });
    } else if (
      obj.type === 'text' &&
      obj.min &&
      !obj.max &&
      e.target.value.trim().length < obj.min
    ) {
      dispatchValidityState({
        type: 'USER_INPUT',
        state: false,
        userMsg: `${capitalizeWord(obj.key)} must be at least ${
          obj.min
        } characters.`,
      });
    } else if (
      obj.type === 'text' &&
      obj.min &&
      obj.max &&
      (e.target.value.trim().length < obj.min ||
        e.target.value.trim().length > obj.max)
    ) {
      dispatchValidityState({
        type: 'USER_INPUT',
        state: false,
        userMsg: `${capitalizeWord(obj.key)} must be between ${obj.min} and ${
          obj.max
        } characters.`,
      });
    } else if (
      obj.type === 'password' &&
      e.target.value.trim().length < obj.min
    ) {
      dispatchValidityState({
        type: 'USER_INPUT',
        state: false,
        userMsg: `${capitalizeWord(
          obj.key
        )} must be at least 8 characters long.`,
      });
    } else if (
      obj.type === 'number' &&
      (+e.target.value < obj.min || +e.target.value > obj.max)
    ) {
      const message =
        obj.min && !obj.max
          ? `${capitalizeWord(obj.key)} must be more than or equal to ${
              obj.min
            }.`
          : `${capitalizeWord(obj.key)} must be between ${obj.min} and ${
              obj.max
            }.`;

      dispatchValidityState({
        type: 'USER_INPUT',
        state: false,
        userMsg: message,
      });
    } else {
      dispatchValidityState({ type: 'USER_INPUT', state: true, userMsg: '' });

      setInputData(prevData => {
        const nextData = { ...prevData };
        nextData[obj.key] =
          e.target.type === 'number' && e.target.value.trim().length !== 0
            ? +e.target.value
            : e.target.value;

        return nextData;
      });
    }

    // Set the focusable element to the element which have invalid input.
    setFocusableEl(e.target);
  };

  const formSubmitHandler = e => {
    e.preventDefault();

    if (!inputValidityState.isValid) {
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
                  onChange={inputChangeHandler.bind(null, obj)}
                  min={obj.min ? obj.min : null}
                  max={obj.max ? obj.max : null}
                />

                {
                  // Select under which element the warning message should be displayed.
                  focusableEl && focusableEl.id === obj.key ? (
                    !inputValidityState.isValid ? (
                      <p className={styles['input-warning-msg']}>
                        *{inputValidityState.message}
                      </p>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )
                }
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
