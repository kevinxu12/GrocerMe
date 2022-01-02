import React from 'react';
import styled from 'styled-components/macro';

import { PageWrapper } from 'app/components/PageWrapper';
import { StyledConstants } from 'styles/StyleConstants';
import OAuthButton from 'app/components/OAuthButton';

export function HomePage() {
  return (
    <PageWrapper>
      <div className="container-center-horizontal">
        <div className="home-landingscreen">
          <OverlapGroup3>
            <OverlapGroup1>
              <BlobShape1>
                <img
                  src="https://i.ibb.co/Hp5G1G4/blob-shape-1.png"
                  alt="IMG"
                />
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
        </div>
      </div>
    </PageWrapper>
  );
}

const OverlapGroup3 = styled.div`
  width: 1384px;
  height: 900px;
  position: relative;
  margin-left: 56px;
`;

const OverlapGroup1 = styled.div`
  position: absolute;
  width: 1384px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 38px 0;
  align-items: flex-start;
  min-height: 900px;
`;

const BlobShape1 = styled.div`
  width: 671px;
  align-self: flex-end;
  margin-top: 59px;
  margin-right: 37px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  selection-color: blue;
`;

const Heading = styled.div`
  position: absolute;
  width: 608px;
  height: 152px;
  top: 274px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  min-height: 80px;
  font-family: ${p => p.theme.montserrat};
  font-weight: 400;
  color: ${p => p.theme.grey};
  font-size: ${StyledConstants.FONT_SIZE_XXL};
  letter-spacing: 0;
  line-height: 80px;
  white-space: nowrap;
`;

const Description = styled.div`
  width: 608px;
  min-height: 48px;
  margin-top: 24px;
  font-family: ${p => p.theme.montserrat};
  font-weight: 400;
  color: #66645e;
  font-size: ${StyledConstants.FONT_SIZE_L};
  letter-spacing: 0;
  line-height: 24.5px;
`;

const OverlapGroup2 = styled.div`
  position: absolute;
  width: 223px;
  height: 64px;
  top: 562px;
  left: 0;
`;
