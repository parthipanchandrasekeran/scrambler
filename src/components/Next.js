import React from "react";

function Next({ nextClick, clearValue, flagchange }) {
  return (
    <button
      onClick={() => {
        nextClick();
        clearValue();
        flagchange();
      }}
      className="nextbutton-main"
    >
      Next
    </button>
  );
}

export default Next;
