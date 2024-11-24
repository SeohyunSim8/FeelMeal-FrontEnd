import React from 'react';
import styled from 'styled-components'

export default function RecommendMenuResultPage({ recommendedMenu, closeModal }) {
    return (
        <Wrapper>
            <ContentBoxWrapper>
                <ContentText>{recommendedMenu.name}을(를) 추천합니다</ContentText>
            </ContentBoxWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const ContentBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContentText = styled.div`
    font-family: 'esamanru-Medium';
    color: #fff;
    font-size: 2.5em;
`;
