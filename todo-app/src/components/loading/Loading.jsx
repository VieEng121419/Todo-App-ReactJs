import React from "react";
import "./loading.scss";

function Loading() {
  return (
    <div className="loading__container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
