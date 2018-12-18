import styled, { css } from 'styled-components';

import { Color } from './';

export interface TypeStyleProps {
  color?: string;
  opacity?: string;
}

const DEFAULT_TYPE_STYLES = {
  color: Color.VACUUM,
  opacity: '1',
};

/*
FONT WEIGHT MAP:

100   Thin (Hairline)
200   Extra Light (Ultra Light)
300   Light
400   Normal
500   Medium
600   Semi Bold (Demi Bold)
700   Bold
800   Extra Bold (Ultra Bold)
900   Black (Heavy)

https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
*/

const TypeStyle = css<TypeStyleProps>`
  font-family: 'Nunito';
  color: ${props => props.color || DEFAULT_TYPE_STYLES.color};
  opacity: ${props => props.opacity || DEFAULT_TYPE_STYLES.opacity};
`;

export const TypeStyleSirius = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.09px;
`;

export const TypeStyleCanopus = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.09px;
`;

export const TypeStyleArcturus = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.1px;
`;

export const TypeStyleProcyon = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
  letter-spacing: -0.1px;
`;

export const TypeStyleDeneb = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 13px;
  font-weight: 400;
  font-style: italic;
  line-height: 16px;
  letter-spacing: -0.08px;
`;

export const TypeStylePollux = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 13px;
  font-weight: 800;
  font-style: italic;
  line-height: 18px;
  letter-spacing: -0.24px;
`;

export const TypeStyleBellatrix = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 1.5px;
`;

export const TypeStylePolaris = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.5px;
`;

export const TypeStyleAlgol = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.35px;
`;

export const TypeStyleEnif = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 2px;
`;

export const TypeStyleNaos = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 1px;
`;

export const TypeStyleSol = css<TypeStyleProps>`
  ${TypeStyle};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.09px;
`;
