import { Loading } from "@/Components/Loading";
import { dbService } from "@/firebase";
import { IList } from "@/interfaces/interfaces";
import styled from "@emotion/styled";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function List() {
  const [list, setList] = useState<IList[]>();

  // 만나이 계산 함수
  const caculateAge = (birth: string) => {
    let age = dayjs().get("year") - dayjs(birth).get("year") - 1;
    if (dayjs().get("month") > dayjs(birth).get("month")) {
      age++;
    } else if (dayjs().get("month") === dayjs(birth).get("month")) {
      if (dayjs().get("day") > dayjs(birth).get("day")) {
        age++;
      }
    }
    return age;
  };

  //데이터 조회
  useEffect(() => {
    const q = query(
      collection(dbService, "list"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList(arr as IList[]);
    });
  }, []);

  return (
    <Container>
      <InnerContainer>
        {list?.map((info) => {
          return (
            <ListBox key={info.id}>
              {info.file ? (
                <Image
                  src={info.file}
                  alt=""
                  width={70}
                  height={70}
                  className="profileImgae"
                />
              ) : (
                <ProfileIcon>
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </ProfileIcon>
              )}
              <InfoBox>
                <p>
                  <span className="name">{info.name}</span>
                  <span className="option">만{caculateAge(info.birth)}세</span>
                  <span className="option">{info.drive}</span>
                </p>
                <p className="goal">{info.goal}</p>
              </InfoBox>
            </ListBox>
          );
        })}
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
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  width: 300px;
`;

const ListBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  .profileImgae {
    object-fit: cover;
    border-radius: 30%;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid lightgray;
  }
`;

const ProfileIcon = styled.div`
  background-color: lightgray;
  border-radius: 30%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoBox = styled.div`
  .name {
    font-size: 20px;
    font-weight: 600;
    margin-right: 5px;
  }
  .option {
    color: gray;
    font-size: 15px;
    margin-right: 5px;
  }

  // 한줄이 넘어갈 경우 말줌임표시
  .goal {
    max-width: 220px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
