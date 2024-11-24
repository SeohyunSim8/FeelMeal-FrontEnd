import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import RecommendMenuPage from './RecommendMenuPage';
// api 파일
import { getRestaurantInfoAPI } from '../apis/restaurant/getRestaurantInfoAPI'; 
import { getRestaurantMenuAPI } from '../apis/restaurant/getRestaurantMenuAPI'; 

export default function RestaurantInfoPage() {
  const navigate = useNavigate();

  // state 관리
  const [showModal, setShowModal] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const location = useLocation();
  const { restaurantIdx } = location.state || {};

  // 식당 정보 불러오기
  useEffect(() => {
    const fetchRestaurantsInfo = async () => {
      try {
        const response = await getRestaurantInfoAPI(restaurantIdx);
        console.log('받은 데이터:', response);
        setRestaurantInfo(response);  // 식당 정보 저장
      } catch (error) {
        console.error('식당 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchRestaurantsInfo();
  }, [restaurantIdx]);
  
  // 식당 메뉴 불러오기
  useEffect(() => {
    const fetchRestaurantsMenu = async () => {
      try {
        const response = await getRestaurantMenuAPI(restaurantIdx);
        console.log('받은 데이터:', response);
        setRestaurantMenu(response);  // 식당 메뉴 저장
      } catch (error) {
        console.error('식당 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchRestaurantsMenu();
  }, [restaurantIdx]);

  return (
    <Wrapper>
      <Container>
        {/* 식당 정보 */}
        <InfoWrapper>
            <Info>
              <InfoContent>
                  <InfoText>{restaurantInfo.name}</InfoText>
              </InfoContent>
              <InfoContent>
                  <InfoText>{restaurantInfo.address}</InfoText>
              </InfoContent>
              <InfoContent>
                  <InfoText>{restaurantInfo.about}</InfoText>
              </InfoContent>
            </Info>
        </InfoWrapper>
        {/* 메뉴 */}
        <MenuListWrapper>
          <MenuList>
            <RecommendButton onClick={() => setShowModal(true)}>
              지금 감정에 먹기 좋은 메뉴 추천받기
            </RecommendButton>
            <TableHeaderWrapper>
              <TableHeader1>메뉴</TableHeader1>
            </TableHeaderWrapper>
            <Table>
              <tbody>
                {restaurantMenu.map((menuItem) => (
                  <TableRow key={menuItem.name}>
                    <TableData>{menuItem.name}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </MenuList>
        </MenuListWrapper>
      </Container>

      {/* 모달 */}
      {showModal && (
        <ModalBackground onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setShowModal(false)}>×</ModalCloseButton>
            <RecommendMenuPage
              restaurantIdx={restaurantIdx}
              closeModal={() => setShowModal(false)} />
          </ModalContent>
        </ModalBackground>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 85%;
  height: 100%;
  border-radius: 1.25em;
  background-color: #373737;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
  padding: 3em;
  margin: 1.5em;
`;

const InfoWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Info = styled.div`
  background-color: #787878;
  border-radius: 0.9375em;
  padding: 0.5em;
  overflow-y: auto;
  display: flex;
  align-items: center;
  gap: 1em;
  width: 100%;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8x;
    background: none;
  }
  &:hover::-webkit-scrollbar-thumb {
      border-radius: 30px;
      background-color: darkgray;
  }
`;

const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 0.1em;
    padding: 0.5em;
`;

const InfoText = styled.div`
    color: #fff;
    font-family: 'Pretendard-Medium';
    font-size: 1.2em;
    font-weight: 500;
    padding: 0.5em;
`;

const RecommendButton = styled.div`
    margin-right: 1em;
    border: none;
    border-radius: 0.5em;
    width: 100%;
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    background-color: #940000;
    color: white;
    font-family: 'Pretendard-Medium';
    font-size: 1.3em;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        filter: brightness(80%);
    }
`;

const MenuListWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuList = styled.div`
  width: 100%;
  height: 28em;
  background-color: #787878;
  border-radius: 0.9375em;
  padding: 0.5em;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8x;
    background: none;
  }
  &:hover::-webkit-scrollbar-thumb {
      border-radius: 30px;
      background-color: darkgray;
  }
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr``;

const TableHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1em;
`;

const TableHeader1 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 100%;
`;

const TableData = styled.td`
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  padding-left: 1em;
  padding-right: 1em;
  text-align: center;
  border-bottom: 1px solid #fff;
  height: 2.375em;
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5em;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #212121;
  width: 80%;
  max-height: 80vh; /* 최대 높이를 화면의 80%로 제한 */
  height: auto; /* 내용에 맞게 자동으로 높이 조정 */
  border-radius: 1em;
  overflow: hidden;
  position: relative;
  z-index: 1000;
`;

const ModalCloseButton = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  font-size: 3em;
  font-family: 'esamanru-Bold';
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;