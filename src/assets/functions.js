const shufflePhrases = (initialArray) => {
  return [...initialArray].sort(() => Math.random() - 0.5);
};

export default shufflePhrases;
