import styled from 'styled-components';

import { Color } from '../../styles';
import Button from '../Button';
import { ResponsiveWidth } from '../Responsive';

export const FOOTER_HEIGHT = '60px';

export const ButtonWrapper = styled.div`
  ${ResponsiveWidth}

  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  justify-content: flex-start;
  padding-right: 20px;

  ${Button} {
    margin-left: 14px;
  }
`;

export const Wrapper = styled.div<{ color?: Color }>`
  background-color: ${({ color }) => color || Color.OORT_CLOUD};
  bottom: 0;
  display: flex;
  flex-wrap: nowrap;
  height: ${FOOTER_HEIGHT};
  justify-content: flex-end;
  left: 0;
  padding-right: 8px;
  position: absolute;
  right: 0;
  z-index: 1;
`;
