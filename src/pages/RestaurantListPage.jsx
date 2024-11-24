import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation,useNavigate } from 'react-router-dom';
// api 파일
import { getRestaurantListAPI } from '../apis/restaurant/getRestaurantListAPI'; 
import { postRestaurantLikeAPI } from '../apis/restaurant/postRestaurantLikeAPI';

export default function RestaurantListPage() {
  const navigate = useNavigate();

  // state 관리
  const [restaurantList, setRestaurantList] = useState([]);
  const location = useLocation();
  const { foodCategory, memberIdx } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // 식당 목록 불러오기
  useEffect(() => {
    const fetchRestaurantsList = async () => {
      try {
        const response = await getRestaurantListAPI(memberIdx, foodCategory.category);
        console.log('받은 데이터:', response);
        setRestaurantList(response);  // 식당 목록 저장
      } catch (error) {
        console.error('식당 목록 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchRestaurantsList();
  }, [foodCategory]); // foodCategory 변경 시 다시 호출
  
  // 식당 좋아요
  const handleLikeClick = async (restaurantIdx) => {
    try {
      const response = await postRestaurantLikeAPI(memberIdx, restaurantIdx);

      if (response.status === 200) {
        setModalMessage('좋아요가 성공적으로 반영되었습니다.');
      }
    } catch (error) {
      if (error.message === '이미 좋아요를 눌렀습니다.') {
        setModalMessage('이미 좋아요를 한 식당입니다.');
      } else {
          setModalMessage('좋아요 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setShowModal(true); // 항상 모달을 표시
    }
  };
  
  // 식당 메뉴 보기
  const handleMenuClick = (restaurantIdx) => {
    console.log('받은 음식 종류 데이터:', restaurantIdx);
    navigate('/menus', {state: restaurantIdx});
  };

  return (
    <Wrapper>
      <Container>
        {/* 식당 목록 */}
        <RestaurantListWrapper>
          <RestaurantList>
            <RestaurantHeader>식당 목록 (내 위치에서 가까운 순)</RestaurantHeader>
            <TableHeaderWrapper>
              <TableHeader1>식당 이름</TableHeader1>
              <TableHeader2>주소</TableHeader2>
              <TableHeader3>좋아요</TableHeader3>
              <TableHeader4>메뉴 보기</TableHeader4>
            </TableHeaderWrapper>
            <Table>
              <tbody>
                {restaurantList.map((restaurant) => (
                  <TableRow key={restaurant.restaurantIdx}>
                    <TableData>{restaurant.name}</TableData>
                    <TableData>{restaurant.address}</TableData>
                    <TableData>
                      <Button onClick={() => handleLikeClick(restaurant.restaurantIdx)}>
                        좋아요
                      </Button>
                    </TableData>
                    <TableData>
                      <Button onClick={() => handleMenuClick({ restaurantIdx: restaurant.restaurantIdx })}>
                        메뉴 보기
                      </Button>
                    </TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </RestaurantList>
        </RestaurantListWrapper>
      </Container>

      {/* 모달 */}
      {showModal && (
          <ModalBackground onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalCloseButton onClick={() => setShowModal(false)}>×</ModalCloseButton>
              <ModalText>{modalMessage}</ModalText>
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

const RestaurantListWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RestaurantList = styled.div`
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

const RestaurantHeader = styled.div`
    margin-top: 0.7em;
    color: #fff;
    font-family: 'Pretendard-Medium';
    font-size: 1.5em;
    text-align: center;
    border-radius: 0.9615em;
    width: auto;
    margin-left: 1.5em;
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
  width: 100%; /* 부모 요소의 너비를 꽉 채움 */
  margin-top: 1em; /* 상단 간격 조정 */
`;

const TableHeader1 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 45%;
`;

const TableHeader2 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 24%;
`;

const TableHeader3 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 14%;
`;

const TableHeader4 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 18%;
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

const Button = styled.div`
    border: none;
    border-radius: 0.5em;
    width: 100%;
    height: 3em;
    line-height: 3em;
    text-align: center;
    background-color: #940000;
    color: white;
    font-family: 'Pretendard-Medium';
    font-size: 1em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        filter: brightness(80%);
    }
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
  margin-top: 10em;
  width: 40em;
  max-height: 80vh;
  height: 25%;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCloseButton = styled.div`
  position: absolute;
  top: 0.5em;
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

const ModalText = styled.td`    
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.5em;
  text-align: center;
  width: auto;
  height: auto;
`;
