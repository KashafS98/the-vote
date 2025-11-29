import { content } from "../content";

const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * (5 - 0 + 1) + 0);
  return content.colors[randomNumber];
};

export { randomColor };
