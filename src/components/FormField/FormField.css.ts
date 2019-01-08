import styled from 'styled-components';

import { Color } from '../../styles/index';
import { TypeStyleArcturus, TypeStyleCanopus } from '../../styles/typography.css';

export const Error = styled.div`
  position: absolute;
  padding: 5px 10px;
  align-self: flex-end;
  background-color: ${Color.MARS};
  color: ${Color.SUN};
  font-size: 10px;
  height: auto;
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
