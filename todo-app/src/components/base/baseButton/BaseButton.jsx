import "./BaseButton.scss";
import React from "react";
import PropTypes from "prop-types";
import TextBase from "../../../components/base/textBase/TextBase";

BaseButton.propTypes = {
  class: PropTypes.string,
  type: PropTypes.string,
};
BaseButton.defaultProps = {
  class: "default",
  type: "",
};

function BaseButton(props) {
  const classes = () => {
    return `btn btn-${props.class}`;
  };
  return (
    <button type={props.type} onClick={props.click} className={classes()}>
      <TextBase
        component="span"
        variant="form"
        color="text-white"
        size="md"
        weight="bold"
      >
        {props.children}
      </TextBase>
    </button>
  );
}

export default BaseButton;
