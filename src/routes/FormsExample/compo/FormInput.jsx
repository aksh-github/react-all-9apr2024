import { useEffect, useState } from "react";
import "./formInput.css";

const FormInput = (props = {}) => {
  const {
    label,
    errorMessage,
    onChange,
    id,
    classes,
    defaultValue,
    validateNow,
    validate,
    // validateOnSubmit,
    ...inputProps
  } = props;
  const [valid, setValid] = useState(true);
  // const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (props.validateNow) _validate(props.value);
  }, [props.validateNow]);

  const _validate = (value) => {
    const isValid = props.pattern
      ? new RegExp(props.pattern).test(value)
      : props.validate
        ? props.validate(value)
        : false;
    setValid(isValid);
  };

  return (
    <div className={classes?.wrapper}>
      <label className={classes?.label} htmlFor={id}>
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className={classes?.input + (!valid ? ` ${classes?.error}` : "")}
        {...inputProps}
        onChange={onChange}
        onBlur={(e) => {
          _validate(e?.target?.value);
          props.onBlur?.(e);
        }}
        // focused={focused.toString()}
      />
      {!valid ? <div className={classes?.errorText}>{errorMessage}</div> : null}
    </div>
  );
};

export default FormInput;
