import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImg from "../assets/images/loginPage/background.png";
import { postLoginAPI } from '../apis/member/postLoginAPI'; 

export default function LoginPage() {
    const navigate = useNavigate();

    // state 관리
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    // 로그인
    const handleLoginButtonClick = async (id, password) => {
        try {
            const response = await postLoginAPI(id, password);
            
            if (response.status === 200) {
                // 세션 저장
                sessionStorage.setItem('userSession', JSON.stringify(response.data));
                // 홈으로 이동
                navigate("/home", { state: { memberIdx: response.data.memberIdx } });
            }
        } catch (error) {
            if (error.message === '비밀번호가 일치하지 않습니다.') {
                setModalMessage('비밀번호가 일치하지 않습니다.');
            } else if (error.message === '존재하지 않는 유저입니다.') {
                setModalMessage('존재하지 않는 유저입니다.');
            } else {
                setModalMessage('요청 중 오류가 발생했습니다.');
            }
        } finally {
            setShowModal(true); // 항상 모달을 표시
        }
    };

    return (
        <PageWrapper>
            <ContentWrapper>
                {/* 좌측 영역 */}
                <LeftWrapper>
                    로그인
                </LeftWrapper>
                
                {/* 우측 영역 */}
                <RightWrapper>
                    <UpWrapper>
                        {/* 아이디 */}
                        <InputWrapper>
                            <InputText>
                                아이디
                            </InputText>
                            <StyledInput
                                value={id} 
                                onChange={(e) => setId(e.target.value)} />
                        </InputWrapper>
                        {/* 비밀번호 */}
                        <InputWrapper>
                            <InputText>
                                비밀번호
                            </InputText>
                            <StyledInput type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} />
                        </InputWrapper>
                    </UpWrapper>
                    <DownWrapper>
                        <LoginButton onClick={() => handleLoginButtonClick(id, password)}>로그인</LoginButton>
                        <SignupButton onClick={() => navigate("/signup")}>회원가입 하기</SignupButton>
                    </DownWrapper>
                </RightWrapper>
            </ContentWrapper>
            
            {/* 모달 */}
            {showModal && (
                <ModalBackground onClick={() => setShowModal(false)}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <ModalCloseButton onClick={() => setShowModal(false)}>×</ModalCloseButton>
                    <ModalText>{modalMessage}</ModalText>
                </ModalContent>
                </ModalBackground>
            )}
        </PageWrapper>
    )
}

// CSS
const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentWrapper = styled.div`
    margin-top: 1em;
    border-radius: 1em;
    display: flex;
    justify-content: space-between;
    width: 65em;
    height: 36em;
    background-color: #030303;
    background-image: url(${BackgroundImg});
    background-size: 55em;
    background-repeat: no-repeat;
`;

const LeftWrapper = styled.div`
    margin: 1.5em;
    width: 10em;
    color: #EAEAEA;
    font-family: 'Pretendard-SemiBold';
    font-weight: 600;
    font-size: 2.3em;
`;

const RightWrapper = styled.div`
    padding: 1.5em 2.5em 2.5em 2.5em;
    box-sizing: border-box;
    margin: 3.45em;
    border-radius: 0.7em;
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #1A1A1A;
`;

const UpWrapper = styled.div`
    margin-top: 1.5em;
    
`;

const InputWrapper = styled.div`
    margin-top: 0.7em;
    
`;

const InputText = styled.div`
    margin-left: 0.5em;
    color: #FBE8E9;
    font-family: 'Pretendard-Medium';
    font-size: 1em;
    font-weight: 500;
`;

const StyledInput = styled.input`
    padding: 0 1em;
    box-sizing: border-box;
    margin: 0.7em 0;
    border: none;
    border-radius: 0.6em;
    width: 100%;
    height: 3.2em;
    background-color: #322F35;
    color: #FBE8E9;
    outline: none;
`;

const DownWrapper = styled.div`
    text-align: center;
`;

const LoginButton = styled.div`
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

const SignupButton = styled.div`
    margin-top: 2em;
    margin-bottom: 1.2em;
    border: none;
    border-radius: 0.5em;
    width: 100%;
    height: 3em;
    line-height: 3em;
    text-align: center;
    background-color: #727070;
    color: white;
    font-family: 'Pretendard-regular';
    font-size: 1em;
    font-weight: 400;
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
