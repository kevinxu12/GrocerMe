/**
 * @file Wrapper file for components shown in private routes
 */
import styled from 'styled-components';
import { StyledConstants } from 'styles/StyleConstants';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  margin-left: ${StyledConstants.SIDE_BAR_WIDTH_PADDING};
  margin-top: ${StyledConstants.NAV_BAR_HEIGHT};
`;
