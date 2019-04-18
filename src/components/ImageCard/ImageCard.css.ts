import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CTAWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const InfoWrapper = styled.div`
  display: block;
  flex: 1;
  padding: 0 6px;
  height: 100%;
  cursor: default;
`;

export const Title = styled.div`
  ${Typography.TypeStyleCanopus}
  color: ${Color.SUN};
  display: flex;
`;

export const Meta = styled.div`
  ${Typography.TypeStyleNaos}
  color: ${Color.MERCURY};
`;

export const Asterisk = styled.div`
  ${Typography.TypeStyleNaos}
  color: ${Color.JUPITER};
  padding: 2px;
`;
