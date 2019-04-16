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

// Global font-family
// Font family stylesheet needs to be import into
// src/index.html - for openfin
// .storybook/preview-head.html - for storybook
const TypeStyle = `
  font-family: 'Nunito';
`;

export const TypeStyleSirius = `
  ${TypeStyle}
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.09px;
`;

export const TypeStyleCanopus = `
  ${TypeStyle}
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.09px;
`;

export const TypeStyleArcturus = `
  ${TypeStyle}
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.1px;
`;

export const TypeStyleProcyon = `
  ${TypeStyle}
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
  letter-spacing: -0.1px;
`;

export const TypeStyleDeneb = `
  ${TypeStyle}
  font-size: 13px;
  font-weight: 400;
  font-style: italic;
  line-height: 16px;
  letter-spacing: -0.08px;
`;

export const TypeStylePollux = `
  ${TypeStyle}
  font-size: 13px;
  font-weight: 800;
  font-style: italic;
  line-height: 18px;
  letter-spacing: -0.24px;
`;

export const TypeStyleBellatrix = `
  ${TypeStyle}
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 1.5px;
`;

export const TypeStylePolaris = `
  ${TypeStyle}
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.5px;
`;

export const TypeStyleAlgol = `
  ${TypeStyle}
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.35px;
`;

export const TypeStyleEnif = `
  ${TypeStyle}
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 2px;
`;

export const TypeStyleNaos = `
  ${TypeStyle}
  font-size: 11px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 1px;
`;

export const TypeStyleSol = `
  ${TypeStyle}
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.09px;
`;

export const TypeStylePollx = `
  ${TypeStyle}
  font-size: 13px;
  font-weight: 800;
  letter-spacing: -0.24px;
  line-height: 18px;
`;
