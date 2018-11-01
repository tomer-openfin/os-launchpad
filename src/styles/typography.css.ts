import styled, { css } from 'styled-components';

import { Color } from './';

export interface HProps {
  margin?: string;
  color?: string;
}

const H = css<HProps>`
  font-weight: 400;
  color: ${props => props.color || Color.BLACK};
  margin: ${props => props.margin || '0'};
`;

export const H1 = styled.h1<HProps>`
  ${H};
  line-height: 48px;
`;

export const H2 = styled.h2<HProps>`
  ${H};
  line-height: 40px;
`;

export const H3 = styled.h3<HProps>`
  ${H};
  line-height: 30px;
`;

export const H4 = styled.h4<HProps>`
  ${H};
  line-height: 24px;
`;
