import { AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const LinkCSS = `
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${Color.JUPITER};
    text-decoration: underline;
  }
`;

export default styled.a`
  ${LinkCSS}
`;

export const RouterLink = styled(Link)<{ isDisabled: boolean }>`
  ${LinkCSS}

  ${({ isDisabled }) =>
    isDisabled
      ? `
      cursor: default;
      opacity: 0.5;

      &:hover {
        color: ${Color.SUN};
        text-decoration: none;
      }`
      : ''};
`;
