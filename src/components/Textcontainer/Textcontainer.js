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

    return () => {
      setsplitArrays(null);
      setActualtext("");
      console.log("text runs unmount");
    };
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

    console.log(updatedCheck);

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
    console.log(id);
    const stringvalue = id + 1;

    console.log(splitArrays);

    const finalData = actualText.split(" ").map((element, index) => {
      return splitArrays[index].map((element) => {
        if (element.id === id) {
          console.log(id);
          const updatedFlag = element.answer === text && true;

          return { ...element, flag: updatedFlag };
        } else {
          return element;
        }
      });
    });

    console.log(finalData);

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
            actualText={text}
            flagFinal={flagFinal}
            updateValue={updateValue}
            splitArrays={splitArrays}
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
