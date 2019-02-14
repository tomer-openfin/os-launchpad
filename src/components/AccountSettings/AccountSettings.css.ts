import styled from 'styled-components';

import { Color, hexToRgba, Typography } from '../../styles';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${hexToRgba(Color.OORT_CLOUD, 0.25)};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  min-width: 0;
  padding: 22px 20px;
`;

export const ButtonWrapper = styled.div`
  display: inline-block;
  margin-top: auto;
  padding: 12px;
`;

export const InfoHeading = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
`;

export const Info = styled.div`
  ${Typography.TypeStyleSol}

  color: ${Color.SUN};
  max-width: 100%;
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Heading = styled.div`
  ${Typography.TypeStyleNaos}

  align-self: flex-start;
  color: ${Color.MERCURY};
  margin-bottom: 16px;
  text-transform: uppercase;
`;

export const Group = styled.div`
  align-self: flex-start;
  width: 100%;

  & ~ & {
    margin-top: 14px;
  }
`;
