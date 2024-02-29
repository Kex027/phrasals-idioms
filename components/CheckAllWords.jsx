import React from "react";
import "../src/App.css";
import phrasalVerbs from "../src/assets/data.js";
import Form from "./Form.jsx";

const CheckAllWords = () => {
  return <Form data={phrasalVerbs} />;
};

export default CheckAllWords;
