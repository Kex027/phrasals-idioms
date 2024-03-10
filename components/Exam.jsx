import React, { useRef, useState } from "react";
import {
  Button,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import phrasalVerbs from "../src/assets/phrasal_verbs.js";
import shufflePhrases, { enterPressed } from "../src/assets/functions.js";

const Exam = ({ data }) => {
  const phrases = data;
  const [showExam, setShowExam] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [examinedPhrases, setExaminedPhrases] = useState([]);
  const inputQuestionsNumberRef = useRef(null);
  const inputAnswerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const setPhrases = () => {
    setExaminedPhrases(
      shufflePhrases(phrases).splice(
        0,
        inputQuestionsNumberRef?.current?.value,
      ),
    );
    setShowExam(true);
  };

  const handleInputClick = (e) => {
    if (enterPressed(e)) {
      nextQuestion();
    }
  };

  const clearInput = () => {
    inputAnswerRef.current.value = "";
  };

  const focusInput = () => {
    inputAnswerRef?.current?.focus();
  };

  const validAnswer = () =>
    examinedPhrases[currentPhrase].english ===
    inputAnswerRef?.current?.value?.toLowerCase().trim();

  const nextQuestion = () => {
    if (currentPhrase < examinedPhrases.length)
      setCurrentPhrase((phraseValue) => phraseValue + 1);

    if (validAnswer()) {
      setScore((oldScore) => oldScore + 1);
    }
    setUserAnswers([
      ...userAnswers,
      inputAnswerRef?.current?.value?.toLowerCase().trim(),
    ]);
    clearInput();
    focusInput();
  };

  const reset = () => {
    setCurrentPhrase(0);
    inputAnswerRef?.current?.focus();
    setExaminedPhrases(shufflePhrases(examinedPhrases));
    setUserAnswers([]);
    setScore(0);
  };

  const newExam = () => {
    setCurrentPhrase(0);
    inputAnswerRef?.current?.focus();
    setUserAnswers([]);
    setScore(0);
    setShowExam(false);
  };

  const handleEnter = (e) => {
    if (enterPressed(e)) setPhrases();
  };

  const finalScore = ((score / examinedPhrases.length) * 100).toString();

  return (
    <div className="container">
      {!showExam ? (
        <div className="content">
          <span>How many words do you want to study?</span>
          <NumberInput
            min={1}
            max={phrases.length}
            defaultValue={1}
            onKeyDown={handleEnter}
          >
            <NumberInputField ref={inputQuestionsNumberRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={setPhrases}>Go!</Button>
        </div>
      ) : (
        <div
          className="content"
          style={{
            maxWidth: "100%",
          }}
        >
          {currentPhrase !== examinedPhrases.length ? (
            <>
              <span>
                {currentPhrase} / {examinedPhrases.length}
              </span>
              <span>Translate: {examinedPhrases[currentPhrase].polish}</span>
              <Input ref={inputAnswerRef} onKeyDown={handleInputClick} />
              <Button color="teal" variant="outline" onClick={nextQuestion}>
                Next question
              </Button>
            </>
          ) : (
            <>
              <span>Everything done!</span>
              <span>
                Your score: {score} / {examinedPhrases.length}
              </span>
              <span style={{ fontWeight: "bold" }}>
                {parseFloat(finalScore).toFixed(2)}%
              </span>
              <div className="grid-answers">
                <div>Nb.</div>
                <div>Polish</div>
                <div>English</div>
                <div>Your answer</div>
                {userAnswers.map((answer, index) => {
                  const colorStyle = {
                    color:
                      answer === examinedPhrases[index].english
                        ? "#d1ffc2"
                        : "#ff8e8e",
                  };
                  return (
                    <React.Fragment
                      key={`${answer}-${examinedPhrases[index].polish}`}
                    >
                      <div style={colorStyle}>{index + 1}.</div>
                      <div style={colorStyle}>
                        {examinedPhrases[index].polish}
                      </div>
                      <div style={{ ...colorStyle, fontWeight: "bold" }}>
                        {examinedPhrases[index].english}
                      </div>
                      <div style={colorStyle}>{answer}</div>
                    </React.Fragment>
                  );
                })}
              </div>
              <Button onClick={reset} variant="outline" color="lightgreen">
                Reset
              </Button>
              <Button onClick={newExam} color="pink" variant="outline">
                New exam
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Exam;
