import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "../../assets/images/common/logo.png";

function Header() {
    // state 관리
    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    
    // navigate
    const navigate = useNavigate();

    // 페이지 이동
    const handleNavigation = (path) => {
        navigate(path);
        setIsVisibleMenu(false);
    };

    // 메뉴 열고 닫기
    const handleMenu = () => {
        setIsVisibleMenu(!isVisibleMenu);
    }
    
    // 메뉴바 참조를 위한 ref
    const menuRef = useRef(null);

    // 메뉴바 외부 클릭 시 메뉴를 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsVisibleMenu(false);
            }
        };

        if (isVisibleMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisibleMenu]);

    return (
        <>
        <HeaderWrapper>
            <StyledLogoImage src={LogoImage} alt="Logo" onClick={() => handleNavigation("/home")}/>
            <ButtonWrapper>
                <StyledButton onClick={() => handleNavigation("/home")}>홈</StyledButton>
                <StyledButton onClick={() => handleNavigation("/menuCategory")}>메뉴 추천</StyledButton>
                <StyledButton onClick={() => handleNavigation("/mypage")}>마이페이지</StyledButton>
            </ButtonWrapper>
        </HeaderWrapper>
        </>
    )
}

export default Header;

// CSS
const HeaderWrapper = styled.div`
    position: fixed;
    padding: 0 3em;
    width: 100%;
    height: 6em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1A1A1A;
    background-color: rgba(26,26,26,0.9);
    backdrop-filter: blur(15px);
    z-index: 2000;
    box-sizing: border-box;
`;

const StyledLogoImage = styled.img`
    height: 4.5em;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    height: 2em;
    line-height: 2em;
    display: flex;
`;

const StyledButton = styled.div`
    margin-left: 4em;
    color: white;
    font-family: 'Pretendard-SemiBold';
    font-size: 1.2em;
    font-weight: 600;
    cursor: pointer;
`;