import React, { useCallback } from "react";
import "./Textcontainer.scss";
import { useState, useEffect, useRef } from "react";
import Next from "../NextButton/NextButton";
import KeyInput from "../KeyInput/KeyInput";

function Textcontainer({ text, nextClick }) {
  const [mainFlag, setmainFlag] = useState(false);
  const [actualText, setActualtext] = useState("");

  const flagChange = () => {
    setmainFlag(false);
  };

  const flagFinal = () => {
    setmainFlag(true);
  };

  useEffect(() => {
    setActualtext(() => text);
  }, [text]);

  return (
    <>
      <div className="text-container__main">
        {actualText && <KeyInput actualText={text} flagFinal={flagFinal} />}
        <div className="text-container__button">
          {mainFlag && <Next nextClick={nextClick} flagchange={flagChange} />}
        </div>
      </div>
    </>
  );
}

export default Textcontainer;
