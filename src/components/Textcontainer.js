import React from "react";
import "../styles/Main.scss";
import { useState, useEffect } from "react";

let mainCount = 0;

function Textcontainer({ data, actualText }) {
  const [input, setInput] = useState("");
  const [answerMap, setanswerMap] = useState([]);
  const [entryCount, setentryCount] = useState(0);

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

        console.log("s");

        count = count + 1;
      }
    });
    console.log(arrayFinal);
    arrayFinal = {};
  };

  //function to return max length of the word in an array of words - pass the sentence
  const maxWordLengthFinder = (sentence) => {
    let maxLength = 0;

    sentence.split(" ").forEach((word) => {
      if (maxLength <= word.length) {
        maxLength = word.length;
      }
    });

    return maxLength;
  };

  //function to return n+1 elements based on letter

  const elementReturn = (word) => {
    const wordLength = word.length;
    const finalData = word.split("").map((letter, index) => {
      if (index === wordLength - 1) {
        mainCount = mainCount + 1;
        return (
          <>
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={mainCount}
            ></input>

            <div className="text-container__end-section">
              <input
                className="text-container__end-section-sub"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={mainCount}
              ></input>
            </div>
          </>
        );
      } else {
        return (
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        );
      }
    });

    return finalData;
  };

  //function to return n input fields based on character passed

  const elementReturnEqual = (word) => {
    const textDisplayMain = word.split("").map((letter, index) => {
      return (
        <section className="text-container__matched-section">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </section>
      );
    });

    return textDisplayMain;
  };

  //function to return elements based on the sentence passed
  const length = maxWordLengthFinder(actualText);
  const lengthSentence = actualText.split(" ").length;

  const textDisplayMain = actualText.split(" ").map((word, index) => {
    if (index < lengthSentence - 1) {
      return (
        <div className="text-container__no-match-main">
          {elementReturn(word)}
        </div>
      );
    } else {
      return (
        <div className="text-container__match-main">
          {elementReturnEqual(word)}
        </div>
      );
    }
  });

  //function to populate data based on object answer map

  const textDisplayUpdated = answerMap.map((letter) => {
    if (letter === " ") {
      return (
        <div className="text-container__end-section">
          <input
            className="text-container__end-section-sub"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </div>
      );
    } else {
      return;
    }
  });

  //function to map the actual sentence to an object - use it later to compare the text

  const answerObject = (text, count = 0) => {
    return text.split("").map((word) => {
      if (word === " ") {
        count++;

        return [{ id: count - 1, answer: word, value: "" }];
      } else {
        return word.split("").map((letter) => {
          count++;

          return { id: count - 1, answer: letter, value: "" };
        });
      }
    });
  };

  const functionFinalForm = (objarray) => {
    const length = actualText.length - 1;

    for (let i = 0; i <= length; i++) {
      objarray[i].map((element) => {
        if (element.answer !== " ") {
          return <input>{element.answer}</input>;
        }
      });
    }
  };

  useEffect(() => {
    setanswerMap(answerObject(actualText));
    splitArray(answerObject(actualText));
  }, []);

  return (
    <>
      <div className="text-container__main">{textDisplayMain}</div>
    </>
  );
}

export default Textcontainer;
