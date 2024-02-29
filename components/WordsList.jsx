import React from "react";
import phrasalVerbs from "../src/assets/data.js";

const WordsList = () => {
  const phrases = phrasalVerbs;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <div style={{ maxHeight: "93%", overflowY: "scroll" }}>
        {phrases.sort().map(({ english, polish }, index) => (
          <div key={`${english}-${polish}`}>
            {index + 1}. <span style={{ fontStyle: "italic" }}>{english}</span>{" "}
            - {polish}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsList;
