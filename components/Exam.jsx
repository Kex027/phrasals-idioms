import React, { useEffect, useRef, useState } from "react";
import Form from "./Form.jsx";
import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import phrasalVerbs from "../src/assets/data.js";
import shufflePhrases from "../src/assets/functions.js";

const Exam = () => {
  const [showExam, setShowExam] = useState(false);
  const phrases = phrasalVerbs;
  const inputRef = useRef(null);

  const setPhrases = () => {
    setShowExam(true);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!showExam ? (
        <div
          style={{
            maxWidth: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <span>How many words do you want to study?</span>
          <NumberInput min={1} max={phrases.length} defaultValue={1}>
            <NumberInputField ref={inputRef} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button onClick={setPhrases}>Go!</Button>
        </div>
      ) : (
        <Form
          data={shufflePhrases(phrases).splice(0, inputRef?.current?.value)}
        />
      )}
    </div>
  );
};

export default Exam;
