import * as React from 'react';
import styled from 'styled-components/macro';

export function Logo() {
  return (
    <Wrapper>
      <Title>Grocer + Me</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-family: ${p => p.theme.montserrat};
  font-weight: 400;
  color: ${p => p.theme.grey};
  font-size: 32px;
  letter-spacing: -1.28px;
`;
