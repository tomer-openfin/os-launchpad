import styled from 'styled-components';

import { Color } from '../../styles/index';

import Button from '../Button';

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CTA = styled(Button)`
  margin: 5px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Heading = styled.div`
  color: ${Color.SUN};
  font-weight: 200;
  padding: 10px;
`;

export const Section = styled.div`
  width: 100vw;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
