import styled from 'styled-components';

import { Color } from '../../styles/index';
import { TypeStyleArcturus, TypeStyleProcyon } from '../../styles/typography.css';

export const Heading = styled.div`
  background-color: ${Color.KUIPER_BELT};
  width: 100%;
`;

export const HeadingText = styled.div`
  ${TypeStyleProcyon};
  padding: 20px 0 18px 20px;
  color: ${Color.SUN};
`;

export const ButtonWrapper = styled.div`
  align-items: center;
  align-self: flex-end;
  display: flex;
  flex-wrap: nowrap;
  padding-right: 20px;
  padding-bottom: 18px;

  button:nth-child(2) {
    margin-left: 11px;
  }
`;

export const CopyWrapper = styled.div`
  padding: 36px 0 24px 20px;
`;

export const Copy = styled.div`
  ${TypeStyleArcturus};
  color: ${Color.SUN};
`;

export const Error = styled.div`
  background-color: ${Color.MARS};
  color: ${Color.VACUUM};
  position: relative;
  font-size: 10px;
  height: auto;
`;

export const Wrapper = styled.div`
  align-items: flex-start;
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  min-height: 219px;
  justify-content: flex-start;
  min-width: 420px;
`;
