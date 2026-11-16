import React from "react";
import { RoughNotation } from "react-rough-notation";

export const RainbowHighlight = ({ color, children, show }) => {
   // Получаем текст из children
  const textContent = React.Children.toArray(children)
    .map(child => (typeof child === "string" ? child : child.props?.children))
    .join("");

  const animationDuration = Math.floor(30 * children.length);
  return (
    <RoughNotation
      type="highlight"
      multiline={true}
      padding={[0, 2]}
      iterations={1}
      animationDuration={animationDuration}
      color={color}
      show={show}
    >
      {children}
    </RoughNotation>
  );
};
