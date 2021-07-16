/* eslint-disable no-sequences */
import React from "react";
import PropTypes from "prop-types";
import "./TextBase.scss";

TextBase.propTypes = {
  component: PropTypes.string,
  class: PropTypes.string,
  ellipsis: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
};
TextBase.defaultProps = {
  component: "p",
  class: "",
  ellipsis: false,
  variant: "",
  size: "md",
  color: "black",
  weight: "normal",
};

function TextBase(props) {
  const Component = props.component;
  const classes = () => {
    return `style-${props.component} style-${props.variant} style-${
      props.color
    } font-${props.weight} font-${props.size} ${
      props.ellipsis ? `ellipsis` : ""
    } ${props.class === "active" ? "active" : ""}`;
  };
  return (
    <Component onClick={props.click} className={classes()}>
      {props.children}
    </Component>
  );
}
export default TextBase;
