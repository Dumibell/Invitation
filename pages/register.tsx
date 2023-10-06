import { Button } from "@/Components/Button";
import { Input } from "@/Components/Input";
import { IRegister } from "@/interfaces/interfaces";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "@/firebase";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { ref, uploadString } from "firebase/storage";
import { uuidv7 } from "uuidv7";

export default function Register() {
  const router = useRouter();
  const [file, setFile] = useState<string>();

  const { register, setValue, handleSubmit } = useForm<IRegister>({
    mode: "all",
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files && files.length > 0) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
        const { currentTarget } = finishedEvent;
        if (currentTarget instanceof FileReader) {
          const result: string | null = currentTarget.result as string;
          if (result) {
            setFile(result);
          }
        }
      };
      reader.readAsDataURL(theFile);
    }
  };

  const handleRegister = async (data: IRegister) => {
    const { name, birth, drive, goal } = data;
    try {
      if (file) {
        const attachmentRef = ref(storageService, uuidv7());
        await uploadString(attachmentRef, file, "data_url");
      }

      await addDoc(collection(dbService, "list"), {
        file,
        name,
        birth,
        drive,
        goal,
        createdAt: dayjs().format(),
      });
      alert("신청 등록이 완료되었습니다.");
      router.replace("/");
    } catch {
      alert("정보 등록에 실패하였습니다.");
    }
  };

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={handleSubmit(handleRegister)}>
          <PhotoBox>
            <label htmlFor="photoFile">
              <ProfileIcon>
                {file ? (
                  <Image
                    src={file}
                    width={70}
                    height={70}
                    alt="profile-image"
                    className="profileImage"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} size="2x" />
                )}
              </ProfileIcon>
            </label>
            <input
              type="file"
              accept="image/*"
              id="photoFile"
              onChange={onFileChange}
            />
          </PhotoBox>
          <Input label="이름" register={register("name", { required: true })} />
          <Input
            label="생년월일"
            type="date"
            register={register("birth", { required: true })}
          />
          <Label>운전면허 취득 여부</Label>
          <Select onChange={(e) => setValue("drive", e.target.value)}>
            <option>선택</option>
            <option value="면허">면허</option>
            <option value="무면허">무면허</option>
          </Select>
          <Input
            label="각오 한마디^~^"
            register={register("goal", { required: true })}
          />
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
    margin-top: 30px;
  }
`;

const PhotoBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    width: 0;
    height: 0;
  }
`;

const ProfileIcon = styled.div`
  background-color: lightgray;
  border-radius: 70%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  .profileImage {
    border-radius: 70%;
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-size: 15px;
`;

const Select = styled.select`
  height: 25px;
  margin-bottom: 15px;
`;
