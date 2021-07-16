import React from "react";
import "./TextErrorBase.scss";

TextErrorBase.propTypes = {};
TextErrorBase.defaultProps = {};

function TextErrorBase(props) {
  return (
    <p className="error-message">
      <i className="fas fa-exclamation-circle"></i> {props.children}
    </p>
  );
}

export default TextErrorBase;
