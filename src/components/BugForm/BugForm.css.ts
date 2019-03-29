import styled from 'styled-components';

import Color from '../../styles/color';

import { Wrapper as LabelWrapper } from '../Label';

export const Form = styled.form`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 20px 33px 20px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  ${LabelWrapper} {
    margin-bottom: 18px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;
