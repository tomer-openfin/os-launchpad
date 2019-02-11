import styled from 'styled-components';

import { Color } from '../../styles';
import { FOOTER_HEIGHT, ResponsiveWidth } from '../ResponsiveForm/ResponsiveForm.css';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`;

export const RowWrapper = styled.div<{ height?: string; firstElementWidth?: string; secondElementWidth?: string }>`
  display: grid;
  grid-template-columns: ${props => props.firstElementWidth || '1fr'} ${props => props.secondElementWidth || '1fr'};
  grid-template-rows: ${props => props.height || '62px'};
  grid-column-gap: 20px;
`;

export const MessageBannerWrapper = styled.div<{ shown?: boolean }>`
  ${ResponsiveWidth}

  bottom: ${FOOTER_HEIGHT};
  position: absolute;
`;

export const PasswordIconWrapper = styled.div`
  align-self: flex-end;
  position: absolute;
  padding: 32px 5px;
`;

export const CheckboxWrapper = styled.div`
  padding-top: 20px;
`;
