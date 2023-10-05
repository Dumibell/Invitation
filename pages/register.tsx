import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { Form, useForm } from "react-hook-form";

interface IRegister {
  name: string;
  birth: string;
  drive: string;
}

export default function Register() {
  const { register, setValue, handleSubmit } = useForm<IRegister>({
    mode: "all",
  });

  const handleRegister = (data: IRegister) => {
    const { name, birth, drive } = data;
    console.log(name);
    console.log(birth);
    console.log(drive);
  };

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Input label="이름" register={register("name", { required: true })} />
          <Input
            label="생년월일"
            type="date"
            register={register("birth", { required: true })}
          />
          <Label>운전 가능 여부</Label>
          <Select onChange={(e) => setValue("drive", e.target.value)}>
            <option>선택</option>
            <option value="true">가능</option>
            <option value="false">블가능</option>
          </Select>
          <Button
            backgroundColor="black"
            color="white"
            className="button"
            type="submit"
          >
            제출하기
          </Button>
        </form>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  padding: 30px;
  border: 1px solid black;
  width: 300px;

  form {
    display: flex;
    flex-direction: column;
  }

  .button {
    margin-top: 50px;
  }
`;

const Label = styled.label`
  font-size: 15px;
`;

const Select = styled.select`
  height: 25px;
`;
