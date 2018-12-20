import styled, { css } from 'styled-components';

import SvgIcon from '../SvgIcon';

import { Form } from 'formik';
import { Color } from '../../styles/index';
import { TypeStyleArcturus, TypeStyleCanopus, TypeStyleProcyon } from '../../styles/typography.css';

interface CommonProps {
  hasPasswordField?: boolean;
}

const ResponsiveWidth = css`
  max-width: 469px;
  width: 100%;
  margin: 0 auto;
`;

export const FormWrapper = styled(Form)`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  width: 100vw;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
`;

export const ScrollWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  width: 100%;
  margin-bottom: 60px;
`;

export const GridWrapper = styled.div<CommonProps>`
  ${ResponsiveWidth};

  display: grid;
  grid-row-gap: 28px;
  padding: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${props => (props.hasPasswordField ? '5' : '4')}, 62px);
`;

export const MiniGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 55px;
  grid-template-rows: 62px;
  grid-column-gap: 20px;
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

export const Error = styled.div`
  position: absolute;
  padding: 5px 10px;
  align-self: flex-end;
  background-color: ${Color.MARS};
  color: ${Color.SUN};
  font-size: 10px;
  height: auto;
`;

export const ErrorWrapper = styled.div`
  bottom: 200px;
  position: absolute;
  width: 92vw;
`;

export const LabelText = styled.div`
  display: flex;
  ${TypeStyleArcturus}
  color: ${Color.SUN};
`;

export const Label = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;

  & > input {
    ${TypeStyleCanopus}
    padding: 7px 0 9px 9px;

    margin-top: 5px;
    max-height: 35px;
  }

  & > textarea {
    ${TypeStyleCanopus}
    padding: 7px 0 9px 9px;
    margin-top: 5px;
    resize: none;
    height: 75px;
  }

  & > input:focus {
    outline: none;
    border: 3px solid rgba(251, 194, 60, 0.54);
  }
`;

export const Message = styled.div`
  align-items: center;
  background-color: ${Color.SATURN};
  color: ${Color.VACUUM};
  display: flex;
  font-size: 10px;
  justify-content: center;
  padding: 5px 5px;
  width: 100%;
`;

export const IconWrapper = styled.div`
  align-self: flex-end;
  position: absolute;
  padding: 32px 5px;
`;

export const PasswordIcon = styled(SvgIcon)`
  background-color: ${Color.COMET};
  cursor: pointer;
`;

export const DeleteIcon = styled(SvgIcon)`
  background-color: ${Color.MERCURY};
  cursor: pointer;

  &:hover {
    background-color: ${Color.MARS};
  }

  &:disabled {
    background-color: ${Color.MERCURY};
    cursor: default;
  }
`;
