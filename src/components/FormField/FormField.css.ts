import styled from 'styled-components';

import { Color } from '../../styles/index';
import { TypeStyleArcturus, TypeStyleCanopus, TypeStyleDeneb } from '../../styles/typography.css';

interface Props {
  isValid?: boolean;
}

export const Error = styled.div`
  ${TypeStyleDeneb}

  bottom: -20px;
  color: ${Color.MARS};
  left: 0;
  position: absolute;
`;

export const LabelText = styled.div`
  ${TypeStyleArcturus}

  display: flex;
  color: ${Color.SUN};
`;

export const Label = styled.label<Props>`
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
    color: ${props => (props.isValid ? `${Color.VACUUM}` : `${Color.MARS}`)};
    border: 3px solid ${props => (props.isValid ? 'rgba(251, 194, 60, 0.54)' : 'rgba(223,83,83,0.5)')};
  }
`;
