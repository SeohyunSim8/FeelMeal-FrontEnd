import React, { useEffect } from 'react'
import styled from 'styled-components'
import MenuRecommendMenu from '../assets/images/mainPage/menuRecommend.png'
import MyPageMenu from '../assets/images/mainPage/myPage.png'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MainPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const { memberIdx } = location.state || {};

    const isLoggedIn = () => {
        const session = sessionStorage.getItem('userSession');
        return session ? true : false;
    };
      
    useEffect(() => {
      if (!isLoggedIn()) {
        navigate("/login");
      }
    }, []);      

    return (
        <Wrapper>
            <TitleBoxWrapper>
                <TitleText>가천대생을 위한 감정 기반 메뉴 추천 시스템<br />FeelMeal에 어서 오세요</TitleText>
            </TitleBoxWrapper>
            <MenuBoxWrapper>
                <MenuBox onClick={() => navigate("/menuCategory", { state: { memberIdx } })}>
                    <MenuIcon src={MenuRecommendMenu} />
                    <MenuText>메뉴 추천</MenuText>
                </MenuBox>
                <MenuBox onClick={() => navigate("/myPage", { state: { memberIdx } })}>
                    <MenuIcon src={MyPageMenu} />
                    <MenuText>마이페이지</MenuText>
                </MenuBox>
            </MenuBoxWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const TitleText = styled.div`
    color: #E0E0E0;
    font-family: 'esamanru-Medium';
    font-size: 1.7em;
    text-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.25);
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 1em;
`;

const MenuBox = styled.div`
    width: 18em;
    height: 23em;
    background: linear-gradient(to bottom, #FFB0A5 30%, #251E1E 85%);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0.9375em;
    margin: 1.3em;
    box-shadow: 0 1em 2em 0 rgba(255, 121, 121, 0.15);
    gap: 4em;
    cursor: pointer;
`;

const MenuIcon = styled.img`
    width: 10.875em;
    height: 10.875em;
`;

const MenuText = styled.div`
    font-family: 'esamanru-Bold';
    color: #fff;
    font-size: 2em;
`;

const TitleBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    width: 90%;
    box-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.25);
`;