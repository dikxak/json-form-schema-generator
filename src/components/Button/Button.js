import styles from './Button.module.css';

const Button = props => {
  return (
    <button
      type={props.type ? props.type : 'button'}
      className={`${props.className ? props.className : ''} ${styles['btn']}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
