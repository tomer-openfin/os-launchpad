import styled from 'styled-components';

import Color from '../../styles/color';

import Button from '../Button';
import { Wrapper as LabelWrapper } from '../Label';

export const Wrapper = styled.div`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 18px;
  padding: 20px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  ${LabelWrapper} {
    margin-bottom: 8px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 22px;

  ${Button} {
    margin-left: 14px;
  }
`;

export const Form = styled.form``;
