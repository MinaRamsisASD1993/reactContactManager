import React from "react";
import classNames from "classnames";
function TextInputGroup(props) {
  const { name, label, type, value, onChange, error } = props;
  // NOW error is like this .. 'Name is Required!!!'
  let outputErr;
  if (error) {
    outputErr = <div className="invalid-feedback">{error}</div>;
  } else {
    outputErr = null;
  }
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        // if there is an error .. add is-invalid class
        className={classNames("form-control", { "is-invalid": error })}
      />
      {outputErr}
    </div>
  );
}

export default TextInputGroup;
