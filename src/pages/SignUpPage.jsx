import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImg from "../assets/images/loginPage/background.png";
import { postSignupAPI } from '../apis/member/postSignupAPI'; 

export default function SignUpPage() {
    const navigate = useNavigate();
    // state 관리
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    // 회원가입
    const handleSignUpButtonClick = async (id, password, name, address) => {
        try {
        const response = await postSignupAPI(id, password, name, address);

        if (response.status === 200) {
            setModalMessage('회원가입이 완료되었습니다.');
        }
        navigate("/login");
        } catch (error) {
            if (error.message === '이미 가입된 유저입니다.') {
                setModalMessage('이미 가입된 유저입니다.');
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
                    회원가입
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
                                비밀번호 (영어 대소문자와 숫자로 구성)
                            </InputText>
                            <StyledInput type="password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} />
                        </InputWrapper>
                        {/* 이름(닉네임) */}
                        <InputWrapper>
                            <InputText>
                                이름(닉네임)
                            </InputText>
                            <StyledInput
                                value={name} 
                                onChange={(e) => setName(e.target.value)} />
                        </InputWrapper>
                        {/* 주소 */}
                        <InputWrapper>
                            <InputText>
                                내 위치 (복정동/태평동 + 지번)<br />예) 복정동 495
                            </InputText>
                            <StyledInput
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} />
                        </InputWrapper>
                    </UpWrapper>
                    <DownWrapper>
                        <SignUpButton onClick={() => handleSignUpButtonClick(id, password, name, address)}>
                            회원가입
                        </SignUpButton>
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
    height: 85%;
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #1A1A1A;
`;

const UpWrapper = styled.div`
    
`;

const InputWrapper = styled.div`
    
`;

const InputText = styled.div`
    margin-top: 0.5em;
    margin-left: 0.3em;
    color: #FBE8E9;
    font-family: 'Pretendard-Medium';
    font-size: 1em;
    font-weight: 500;
`;

const StyledInput = styled.input`
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

const DownWrapper = styled.div`
    text-align: center;
`;

const SignUpButton = styled.div`
    margin-top: 1.7em;
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
