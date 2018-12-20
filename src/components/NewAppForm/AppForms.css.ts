import styled, { css } from 'styled-components';

import SvgIcon from '../SvgIcon';

import { Color } from '../../styles/index';

const ResponsiveWidth = css`
  /* max-width: 472px; (on one screen of designs)*/

  /* max-width changed from design */
  /* minimum window width for admin window is 450px */
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
`;

export const CheckboxWrapper = styled.div`
  padding-top: 20px;
`;

export const ButtonWrapper = styled.div`
  ${ResponsiveWidth};

  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;

  & > button:nth-child(2) {
    margin-left: 14px;
  }
`;

export const GridWrapper = styled.div`
  ${ResponsiveWidth};

  display: grid;
  grid-row-gap: 28px;
  grid-column-gap: 15px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 62px 62px 99px 161px;
  padding: 20px 60px 20px 20px;

  & > label:nth-child(1) {
    grid-column: 1 / -1;
  }

  & > label:nth-child(2) {
    grid-column: 1 / -1;
  }
`;

export const Footer = styled.div`
  background-color: ${Color.OORT_CLOUD};
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  height: 60px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;

  & > button:nth-child(2) {
    margin-left: 14px;
  }
`;

export const IconWrapper = styled.div`
  align-self: flex-end;
  position: absolute;
  top: 25px;
  right: 0;
`;

export const RefreshIcon = styled(SvgIcon)`
  position: absolute;
  background-color: ${Color.JUPITER};
  cursor: pointer;

  &:hover {
    background-color: ${Color.JUPITER};
  }
`;

export const HelpIcon = styled(SvgIcon)`
  align-self: center;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: ${Color.JUPITER};
  }
`;
