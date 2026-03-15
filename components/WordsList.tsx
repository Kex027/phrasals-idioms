import React from "react";
import type { StudyItem } from "../src/types/word_list.js";

const WordsList = ({ data: phrases }: { data: StudyItem[] }) => {
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
        {phrases.sort().map(({ foreign, polish }, index) => (
          <div key={`${foreign}-${polish}`}>
            {index + 1}. <span style={{ fontStyle: "italic" }}>{foreign}</span>{" "}
            - {polish}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsList;
