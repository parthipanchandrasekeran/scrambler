import { useState, useEffect } from "react";
import axios from "axios";
import "./Main.scss";
import Textcontainer from "../Textcontainer/Textcontainer";
import Win from "../Winmodal/Winmodal";

const URL = "https://api.hatchways.io/assessment/sentences/";

export default function Main() {
  const [data, setData] = useState("");
  const [score, setScore] = useState(0);
  const [actualText, setActualText] = useState("");
  const [winnerFlag, setwinnerFlag] = useState(false);

  useEffect(() => {
    const scoretoUse = Number(score) + 1;
    axios
      .get(URL + scoretoUse)
      .then((res) => {
        setData(wordSorter(res.data.data.sentence.toLowerCase()));
        setActualText(res.data.data.sentence.toLowerCase());
        console.log(res.data.data.sentence.toLowerCase());
      })
      .catch((er) => {
        console.error(er);
      });
  }, []);

  const buttonPress = () => {
    setScore(score + 1);
  };

  const nextClick = () => {
    buttonPress();

    const scoreupdated = score + 2;

    if (score < 9) {
      axios
        .get(URL + scoreupdated)
        .then((res) => {
          setData(wordSorter(res.data.data.sentence.toLowerCase()));
          setActualText(res.data.data.sentence.toLowerCase());
          console.log(res.data.data.sentence.toLowerCase());

          setwinnerFlag(false);
        })
        .catch((er) => {
          console.error(er);
        });
    } else {
      setwinnerFlag(true);
    }
  };

  const randomiser = (array) => {
    let shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffled;
  };

  const arrayPopulater = (max) => {
    let arrayValue = [];
    for (let i = 1; i < max - 1; i++) {
      arrayValue.push(i);
    }

    return arrayValue;
  };

  const wordSorterSingle = (word) => {
    let temp = "";

    const randomArray = randomiser(arrayPopulater(word.length));

    const arrayWord = word.split("");

    arrayWord.forEach((letter, index) => {
      if (index === 0 || index === word.length - 1) {
        temp = temp + letter;
      } else {
        temp = temp + word[randomArray[index - 1]];
      }
    });

    /*  while (word === temp) {
      return wordSorterSingle(word);
    }*/
    const update = temp;
    temp = "";
    return update;
  };

  const wordSorter = (text) => {
    const arraySentence = text.split(" ");

    const sentence = arraySentence.map((word) => {
      if (word.length === 1 || word.length === 2) {
        return word;
      } else if (word.length >= 3) {
        return wordSorterSingle(word);
      }
    });

    return sentence.join(" ");
  };

  return (
    <div className="word-main">
      {winnerFlag && <Win />}
      <div
        className="word-main__sub"
        style={{
          display: winnerFlag && "none",
        }}
      >
        <h1 className="word-main__text" id="scrambled-word">
          {data}
        </h1>
        <section className="word-main__text">
          <p className="word-main__guess-text">
            Guess the sentence! Start typing.
          </p>
          <p className="word-main__clue-text">
            The yellow blocks are meant for spaces
          </p>
        </section>

        <h2 className="word-main__score-text">Score:&nbsp;{score}</h2>
      </div>
      <div
        style={{
          display: winnerFlag && "none",
        }}
      >
        {actualText && (
          <Textcontainer text={actualText} nextClick={nextClick} />
        )}
      </div>
    </div>
  );
}
