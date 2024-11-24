import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
// api 파일
import { getRestaurantLikedListAPI } from '../apis/member/getRestaurantLikedListAPI'; 
import { patchAddressAPI } from '../apis/member/patchAddressAPI'; 
import { deleteRestaurantLikeAPI } from '../apis/restaurant/deleteRestaurantLikeAPI'; 

export default function MypagePage() {
  // state 관리
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [restaurantLikedList, setRestaurantLikedList] = useState([]);
  const [address, setAddress] = useState('');
  const location = useLocation();
  const { memberIdx } = location.state || {};

  // 좋아요 한 식당 목록 불러오기
  useEffect(() => {
    const fetchRestaurantsLikedList = async () => {
      try {
        const response = await getRestaurantLikedListAPI(memberIdx);
        console.log('받은 데이터:', response);
        setRestaurantLikedList(response);  // 식당 목록 저장
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchRestaurantsLikedList();
  }, []); // foodCategory 변경 시 다시 호출
  
  // 식당 좋아요 취소
  const handleDislikeClick = async (restaurantIdx) => {
    try {
      const response = await deleteRestaurantLikeAPI(memberIdx, restaurantIdx);

      if (response.status === 200) 
        setModalMessage('좋아요가 성공적으로 취소되었습니다.');
      
    } catch (error) {
      if (error.message === '좋아요를 누르지 않은 식당입니다.') {
        setModalMessage('좋아요를 누르지 않은 식당입니다.');
      } else {
          setModalMessage('좋아요 요청 중 오류가 발생했습니다.');
      }
    } finally {
      setShowModal(true); // 항상 모달을 표시
    }
  };

  // 주소 수정
  const handleAddressClick = async (address) => {
    try {
      const response = await patchAddressAPI(memberIdx, address);

      if (response.status === 200) {
        setModalMessage('주소가 수정되었습니다.');
      }
    } catch (error) {
        setModalMessage('요청 중 오류가 발생했습니다.');
    } finally {
      setShowModal(true); // 항상 모달을 표시
    }
  };


  return (
    <Wrapper>
      <Container>
        {/* 주소 수정 */}
        <AddressWrapper>
            <Address>
                <AddressHeader>내 위치 수정하기</AddressHeader>
                <AddressContent>
                    <AddressText>내 위치 (복정동, 태평동을 포함한 지번주소)</AddressText>
                    <StyledAddress 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} />
                </AddressContent>
                <AddressButton onClick={() => handleAddressClick(address)}> 
                    수정
                </AddressButton>
            </Address>
        </AddressWrapper>
        {/* 좋아요 한 식당 목록 조회 */}
        <LikeListWrapper>
          <LikeList>
            <LikeHeader>좋아요 한 식당 목록</LikeHeader>
            <TableHeaderWrapper>
              <TableHeader1>식당 이름</TableHeader1>
              <TableHeader2>주소</TableHeader2>
              <TableHeader3>좋아요 취소</TableHeader3>
            </TableHeaderWrapper>
            <Table>
              <tbody>
                {restaurantLikedList.map((restaurant) => (
                  <TableRow key={restaurant.idx}>
                    <TableData>{restaurant.name}</TableData>
                    <TableData>{restaurant.address}</TableData>
                    <TableData>
                      <Button onClick={() => handleDislikeClick(restaurant.idx)}>
                        좋아요 취소
                      </Button>
                    </TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </LikeList>
        </LikeListWrapper>
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

const AddressWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Address = styled.div`
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

const AddressHeader = styled.div`
    color: #fff;
    font-family: 'Pretendard-Medium';
    font-size: 1.3em;
    text-align: center;
    border-radius: 0.9615em;
    width: auto;
    margin-left: 1.5em;
`;

const AddressContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 0.1em;
    padding: 0.5em;
`;

const AddressText = styled.div`
    color: #fff;
    font-family: 'Pretendard-Medium';
    font-size: 1.2em;
    font-weight: 500;
    padding: 0.5em;
`;

const StyledAddress = styled.input`
    padding: 0 1em;
    box-sizing: border-box;
    margin: 0.5em 0;
    border: none;
    border-radius: 0.6em;
    width: 100%;
    height: 3.2em;
    background-color: #322F35;
    color: #FBE8E9;
    outline: none;
`;

const AddressButton = styled.div`
    margin-right: 1em;
    border: none;
    border-radius: 0.5em;
    width: 4em;
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    background-color: #940000;
    color: white;
    font-family: 'Pretendard-Medium';
    font-size: 1.2em;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        filter: brightness(80%);
    }
`;

const LikeListWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LikeList = styled.div`
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

const LikeHeader = styled.div`
    margin-top: 1em;
    color: #fff;
    font-family: 'Pretendard-Medium';
    font-size: 1.3em;
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
  width: 47%;
`;

const TableHeader2 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 35%;
`;

const TableHeader3 = styled.div`
  padding: 0.6em;
  background-color: rgba(56, 50, 50, 0.7);
  color: #fff;
  font-family: 'Pretendard-Medium';
  font-size: 1.3em;
  text-align: center;
  border-radius: 0.9615em;
  width: 26%;
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