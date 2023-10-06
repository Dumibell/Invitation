import { Button } from "@/Components/Button";
import { Loading } from "@/Components/Loading";
import { dbService } from "@/firebase";
import { IList, IRegister } from "@/interfaces/interfaces";
import styled from "@emotion/styled";
import { useSpring, animated } from "@react-spring/web";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [list, setList] = useState<IList[]>();

  //데이터 조회
  useEffect(() => {
    const q = query(collection(dbService, "list"));
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
        <Title>
          <p className="title">- MT 초대장 -</p>
          <p className="subtitle">⭐️직장인도 엠티 간다⭐️</p>
          <p className="subtitle">만 26세 이상 참가 가능</p>
        </Title>
        <Detail>
          <p>- 일시: 2023.10.08 (일) 12:00</p>
          <p>- 집결지: 양재역 10번출구 앞</p>
          <p>- 지참물: 면허증</p>
        </Detail>
        <Count>
          <p>현재 참가 인원</p>
          {list === undefined ? (
            <Loading />
          ) : (
            <p>
              <span className="count">{list?.length}</span>명
            </p>
          )}
        </Count>
        <Button onClick={() => router.push("/list")}>참가 목록 보러가기</Button>
        <Button onClick={() => router.push("/register")}>
          신청서 작성하러 가기
        </Button>
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
  color: white;
  background-color: black;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border: 1px solid white;
  width: 300px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;

  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 25px;
    text-align: center;
  }
`;

const Detail = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  font-size: 20px;
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  font-size: 20px;

  .count {
    font-size: 40px;
    font-weight: 600;
  }
`;

// const Loading = styled.div`
//   width: 25px;
//   height: 25px;
//   border: 3px dotted white;
//   border-radius: 70%;
//   margin-top: 5px;

//   transition: all ease 1s;
// `;
