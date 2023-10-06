import styled from "@emotion/styled";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "number" | "date" | "file";
  register?: UseFormRegisterReturn;
}

export const Input = ({ label, type = "text", register, ...attr }: IInput) => {
  return (
    <InputContainer>
      <Label htmlFor="input">{label}</Label>
      <InputBox type={type} {...register} {...attr} id="input" />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 15px;
`;

const InputBox = styled.input`
  height: 22px;
`;
