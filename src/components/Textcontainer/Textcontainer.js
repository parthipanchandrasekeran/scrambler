import React, { useCallback, useMemo } from "react";
import "./Textcontainer.scss";
import { useState, useEffect, useRef } from "react";
import Next from "../NextButton/NextButton";
import KeyInput from "../KeyInput/KeyInput";

function Textcontainer({ text, nextClick }) {
  const [mainFlag, setmainFlag] = useState(false);
  const [splitArrays, setsplitArrays] = useState(null);
  const [actualText, setActualtext] = useState("");

  useEffect(() => {
    setActualtext(() => text);
    setsplitArrays(() => splitArray(answerObject(text)));
  }, [text]);

  const splitArray = (answerMap) => {
    let arrayFinal = {};
    let count = 0;

    answerMap.forEach((element, index) => {
      if (arrayFinal[count] === undefined) {
        arrayFinal[count] = [];
      }
      if (element[0].answer !== " ") {
        arrayFinal[count].push(element[0]);
      } else {
        arrayFinal[count].push(element[0]);

        count++;
      }
    });

    return arrayFinal;
  };

  //function to map the actual sentence to an object - use it later to compare the text

  const answerObject = (text) => {
    return text.split("").map((word, index) => {
      return [{ id: index, answer: word, value: "", flag: false }];
    });
  };

  //flag indicator fetcher

  const allCorrectCheck = (splitArrays) => {
    const valueused = splitArrays;
    const textLength = actualText.split(" ");

    const updatedCheck = textLength.every((element, index) => {
      return valueused[index].every((item) => {
        return item.flag === true;
      });
    });

    return updatedCheck;
  };

  //value fetch

  const fetchvalue = (id) => {
    const selectedData = actualText.split(" ").map((element, index) => {
      const checkedValue = splitArrays[index].filter((item) => {
        return item.id === id;
      });

      return checkedValue;
    });
  };

  //value updater function

  const updateValue = (id, text) => {
    const stringvalue = id + 1;

    const finalData = actualText.split(" ").map((element, index) => {
      return splitArrays[index].map((element) => {
        if (element.id === id) {
          return {
            ...element,
            flag: element.answer === text && true,
            value: text,
          };
        } else {
          return element;
        }
      });
    });

    setsplitArrays((e) => finalData);

    if (allCorrectCheck(finalData)) {
      flagFinal();
    }
  };

  const flagChange = () => {
    setmainFlag(false);
  };

  const flagFinal = () => {
    setmainFlag(true);
  };

  return (
    <>
      <div className="text-container__main">
        {text && (
          <KeyInput
            splitArrays={splitArrays}
            actualText={actualText}
            flagFinal={flagFinal}
            updateValue={updateValue}
            fetchvalue={fetchvalue}
          />
        )}
        <div className="text-container__button">
          {mainFlag && <Next nextClick={nextClick} flagchange={flagChange} />}
        </div>
      </div>
    </>
  );
}

export default Textcontainer;
