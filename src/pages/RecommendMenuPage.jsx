import React, { useState } from 'react'
import styled from 'styled-components'
import HappyEmotion from '../assets/images/recommendMenuPage/happy.png'
import SadEmotion from '../assets/images/recommendMenuPage/sad.png'
import AngryEmotion from '../assets/images/recommendMenuPage/angry.png'
import NervousEmotion from '../assets/images/recommendMenuPage/nervous.png'
import RecommendMenuResultPage from './RecommendMenuResultPage';
import { getRecommendedMenuAPI } from '../apis/restaurant/getRecommendedMenuAPI';

export default function RecommendMenuPage({ restaurantIdx, closeModal }) {    
    const [showModal, setShowModal] = useState(false);
    const [recommendedMenu, setRecommendedMenu] = useState(null);

    const handleEmotionClick = async (emotion) => {
        const response = await fetchRecommendedMenu(restaurantIdx, emotion);
        setRecommendedMenu(response);
        setShowModal(true);
        // navigate('/recommendMenuResult', { state: recommendedData });
    };

    // 추천 메뉴 불러오기
    const fetchRecommendedMenu = async (restaurantIdx, emotion) => {
        try {
            const response = await getRecommendedMenuAPI(restaurantIdx, emotion);
            return response;  // 추천 메뉴 저장
        } catch (error) {
            console.error('추천 메뉴를 불러오는 중 오류 발생:', error);
            throw error
        }
    };

    return (
        <Wrapper>
            <TitleBoxWrapper>
                <TitleText>지금 어떤 기분인가요?</TitleText>
            </TitleBoxWrapper>
            <EmotionWrapper>
              <EmotionButton onClick={() => handleEmotionClick('HAPPY')}>
                  <MenuIcon src={HappyEmotion} />
                  <MenuText>기쁨</MenuText>
              </EmotionButton>
              <EmotionButton onClick={() => handleEmotionClick('SAD')}>
                  <MenuIcon src={SadEmotion} />
                  <MenuText>슬픔</MenuText>
              </EmotionButton>
              <EmotionButton onClick={() => handleEmotionClick('ANGRY')}>
                  <MenuIcon src={AngryEmotion} />
                  <MenuText>화남</MenuText>
              </EmotionButton>
              <EmotionButton onClick={() => handleEmotionClick('NERVOUS')}>
                  <MenuIcon src={NervousEmotion} />
                  <MenuText>긴장</MenuText>
              </EmotionButton>
            </EmotionWrapper>
            
            {/* 모달 */}
            {showModal && (
                <ModalBackground onClick={() => setShowModal(false)}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalCloseButton onClick={() => setShowModal(false)}>×</ModalCloseButton>
                    <RecommendMenuResultPage
                        recommendedMenu={recommendedMenu}
                        closeModal={() => setShowModal(false)} />
                </ModalContent>
                </ModalBackground>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 65%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const TitleBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleText = styled.div`
    color: #E0E0E0;
    font-family: 'esamanru-Medium';
    font-size: 2.7em;
    text-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.25);
    text-align: center;
    margin-top: 1em;
`;

const EmotionWrapper = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5em;
`;

const EmotionButton = styled.div`
    width: 15em;
    height: 20em;
    background: linear-gradient(to bottom, #FFB0A5 30%, #251E1E 85%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.9375em;
    margin: 2em;
    box-shadow: 0 1em 2em 0 rgba(255, 121, 121, 0.15);
    gap: 2.5em;
    cursor: pointer;
`;

const MenuIcon = styled.img`
    width: 10em;
    height: 10em;
`;

const MenuText = styled.div`
    font-family: 'esamanru-Bold';
    color: #fff;
    font-size: 2.2em;
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
  margin-top: 10%;
  width: 50%;
  max-height: 80vh;
  height: 35%;
  border-radius: 1em;
  overflow: hidden;
  position: relative;
  z-index: 1000;
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