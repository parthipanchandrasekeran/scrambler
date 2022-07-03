import React, { useCallback } from "react";
import "./Textcontainer.scss";
import { useState, useEffect, useRef } from "react";
import Next from "../NextButton/NextButton";
import KeyInput from "../KeyInput/KeyInput";

function Textcontainer({ text, nextClick }) {
  const [mainFlag, setmainFlag] = useState(false);
  const [splitArrays, setsplitArrays] = useState();
  const [actualText, setActualtext] = useState("");

  useEffect(() => {
    setActualtext(() => text);
    setsplitArrays(() => splitArray(answerObject(text)));

    return () => {
      setsplitArrays();
    };
  }, [text]);

  const splitArray = (answerMap) => {
    let arrayFinal = {};
    let count = 0;

    answerMap.forEach((element) => {
      if (arrayFinal[count] === undefined) {
        arrayFinal[count] = [];
      }
      if (element[0].answer !== " ") {
        arrayFinal[count].push(element[0]);
      } else {
        arrayFinal[count].push(element[0]);

        count = count + 1;
      }
    });

    return arrayFinal;
  };

  //function to map the actual sentence to an object - use it later to compare the text

  const answerObject = (text) => {
    let count = 0;
    console.log(text);

    return text.split("").map((word) => {
      if (word === " ") {
        count++;

        return [{ id: count - 1, answer: word, value: "", flag: false }];
      } else {
        return word.split("").map((letter) => {
          count++;

          return { id: count - 1, answer: letter, value: "", flag: false };
        });
      }
    });
  };

  //flag indicator fetcher

  const allCorrectCheck = (splitArrays) => {
    const valueused = splitArrays;
    const textLength = actualText.split(" ");

    const finalData = textLength.map((element, index) => {
      return valueused[index].filter((element) => {
        return element.flag === false;
      });
    });

    const flag = finalData.every((data) => {
      return data.length === 0;
    });

    return flag;
  };

  //value updater function

  const updateValue = (id, text) => {
    const stringvalue = id + 1;
    const textLength = actualText.split(" ");

    const finalData = textLength.map((element, index) => {
      return splitArrays[index].map((element) => {
        if (element.id === id) {
          const updatedFlag = element.answer === text ? true : false;

          return {
            id: id,
            answer: element.answer,
            value: text,
            flag: updatedFlag,
          };
        } else {
          return element;
        }
      });
    });

    setsplitArrays((e) => finalData);

    /* if (text !== "") {
      if (id !== idRef.current.length - 1) {
        idRef.current[id + 1].focus();
      }
    }*/

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
        {!text ? (
          <h1>Loading...</h1>
        ) : (
          <KeyInput
            actualText={text}
            flagFinal={flagFinal}
            updateValue={updateValue}
            splitArrays={splitArrays}
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
