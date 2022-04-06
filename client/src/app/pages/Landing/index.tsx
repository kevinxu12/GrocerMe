/**
 * @file Component for HomePage
 * We shoud move the landing / home page out using Material UI instead of Hardcoded Components
 * @author Kevin Xu
 */
import React from 'react';
import styled from 'styled-components/macro';

import { PageWrapper } from 'app/components/PageWrapper';
import { StyledConstants } from 'styles/StyleConstants';
import OAuthButton from 'app/components/OAuthButton';
import { Constants } from 'utils/constants';

/**
 * @returns {React.FC} Homepage Component
 */
export function HomePage() {
  return (
    <PageWrapper>
      <OverlapGroup3>
        <OverlapGroup1>
          <BlobShape1>
            <img loading="lazy" src={Constants.BLOB_PNG_URL} alt="IMG" />
          </BlobShape1>
        </OverlapGroup1>
        <Heading>
          <Title>Need Groceries?</Title>
          <Description>
            Buy Groceries Quick, and get them even quicker!
          </Description>
        </Heading>
        <OverlapGroup2>
          <OAuthButton />
        </OverlapGroup2>
      </OverlapGroup3>
    </PageWrapper>
  );
}

const OverlapGroup3 = styled.div`
  width: 100%;
  height: 80%;
  position: relative;
  margin-left: 3%;
`;

const OverlapGroup1 = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 3% 0;
  align-items: flex-start;
  min-height: 80%;
`;

const BlobShape1 = styled.div`
  width: 48%;
  align-self: flex-end;
  margin-top: 5%;
  margin-right: 3%;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  selection-color: blue;
`;

const Heading = styled.div`
  position: absolute;
  width: 50%;
  height: 20%;
  top: 30%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  min-height: 50%;
  font-weight: 400;
  color: ${p => p.theme.grey};
  font-size: ${StyledConstants.FONT_SIZE_XXL};
  letter-spacing: 0;
  line-height: 100%;
  white-space: nowrap;
`;

const Description = styled.div`
  min-height: 40%;
  margin-top: 5;
  font-weight: 400;
  color: #66645e;
  font-size: ${StyledConstants.FONT_SIZE_L};
  letter-spacing: 0;
  line-height: 5%;
`;

const OverlapGroup2 = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 60%;
  left: 0;
`;
