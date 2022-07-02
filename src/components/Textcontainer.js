import React from "react";
import "../styles/Main.scss";
import { useState, useEffect, useRef } from "react";
import Next from "./Next";

function Textcontainer({ actualtext, buttonPress, nextClick }) {
  const [answerMap, setanswerMap] = useState([]);
  const [splitArrays, setsplitArrays] = useState();
  const [mainFlag, setmainFlag] = useState(false);
  const [actualText, setActualtext] = useState("");
  const [info, setInfo] = useState([]);
  const idRef = useRef([]);
  idRef.current = [];
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

  const answerObject = (text, count = 0) => {
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

  //value updater function

  const updateValue = (id, text) => {
    const valueused = splitArrays;
    const stringvalue = id + 1;

    //const elementInput = document.querySelector('input[name="1"]');

    const textLength = actualText.split(" ");

    const finalData = textLength.map((element, index) => {
      return valueused[index].map((element) => {
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

    setsplitArrays(finalData);

    console.log(finalData);

    if (text !== "") {
      if (id !== idRef.current.length - 1) {
        idRef.current[id + 1].focus();
      }
    }

    if (allCorrectCheck(finalData)) {
      setmainFlag(true);
      buttonPress();
    }
  };

  const addRef = (e) => {
    if (e && !idRef.current.includes(e)) {
      idRef.current.push(e);
    }
  };

  //value fetcher

  const flagChange = () => {
    setmainFlag(false);
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

  const functionFinalForm = () => {
    const arrayref = () => {
      return actualText.split(" ").map((e) => {
        return e;
      });
    };
    const length = actualText.length - 1;

    const value = arrayref();
    const displayMain = value.map((elements, index) => {
      if (index < value.length) {
        return (
          <div key={index} className="text-container__no-match-main">
            {splitArrays[index].map((element) => {
              if (element.answer !== " ") {
                return (
                  <div className="text-container__end-section">
                    <input
                      name={element.id}
                      value={
                        //valueFetcher(element.id)

                        info[element.id] ? info[element.id] : ""
                      }
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);
                        setInfo({ ...info, [e.target.name]: e.target.value });
                      }}
                      ref={addRef}
                    ></input>
                  </div>
                );
              } else {
                return (
                  <input
                    name={element.id}
                    className="text-container__end-section-sub"
                    value={
                      //valueFetcher(element.id)

                      info[element.id] ? info[element.id] : ""
                    }
                    style={{
                      backgroundColor: element.flag && "#4caf50",
                    }}
                    onChange={(e) => {
                      updateValue(element.id, e.target.value);
                      setInfo({ ...info, [e.target.name]: e.target.value });
                    }}
                    ref={addRef}
                  ></input>
                );
              }
            })}
          </div>
        );
      } else {
        return (
          <div key={index} className="text-container__match-main">
            {splitArrays[index].map((element) => {
              console.log(element);
              if (element.answer !== " ") {
                return (
                  <div>
                    <input
                      name={element.id}
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      value={
                        //valueFetcher(element.id)

                        info[element.id] ? info[element.id] : ""
                      }
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);
                        setInfo({ ...info, [e.target.name]: e.target.value });
                      }}
                      ref={addRef}
                    ></input>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="text-container__matched-section">
                    <input
                      name={element.id}
                      style={{
                        backgroundColor: element.flag && "#4caf50",
                      }}
                      value={
                        //valueFetcher(element.id)

                        info[element.id] ? info[element.id] : ""
                      }
                      onChange={(e) => {
                        updateValue(element.id, e.target.value);
                        setInfo({ ...info, [e.target.name]: e.target.value });
                      }}
                      ref={addRef}
                    ></input>
                  </div>
                );
              }
            })}
          </div>
        );
      }
    });

    return displayMain;
  };

  const clearValue = () => {
    setInfo([]);
  };

  useEffect(() => {
    setanswerMap(answerObject(actualtext));
    setActualtext(actualtext);

    setsplitArrays(splitArray(answerObject(actualtext)));
    console.log(actualtext);
    console.log(answerMap);
  }, [actualtext]);

  return (
    <>
      <div className="text-container__main">
        {functionFinalForm(splitArray(answerObject(actualText)))}
        <div className="text-container__button">
          {mainFlag && (
            <Next
              clearValue={clearValue}
              nextClick={nextClick}
              flagchange={flagChange}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Textcontainer;
