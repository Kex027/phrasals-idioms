import React from "react";

const Status = ({ state }: { state: boolean | null }) => {
  return (
    <span
      style={{
        color: state ? "#0f0" : "#f00",
      }}
    >
      {state !== null ? (state ? "Success!" : "Wrong!") : ""}
    </span>
  );
};

export default Status;
