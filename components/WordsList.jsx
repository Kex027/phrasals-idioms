import React from "react";

const WordsList = ({ data }) => {
  const phrases = data;

  return (
    <div
      style={{
        height: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          maxHeight: "90%",
          overflowY: "scroll",
          padding: "0 1rem",
        }}
      >
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
