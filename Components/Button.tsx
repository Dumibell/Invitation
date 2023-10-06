import styled from "@emotion/styled";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
}

export const Button = ({
  children,
  backgroundColor = "white",
  color = "black",
  ...attr
}: IButton) => {
  return (
    <ButtonContainer backgroundColor={backgroundColor} color={color} {...attr}>
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button<{
  backgroundColor: string;
  color: string;
}>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border: none;
  font-size: 20px;
  border-radius: 5px;
  height: 32px;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
  }
`;
