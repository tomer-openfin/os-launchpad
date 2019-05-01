import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { CATEGORIES } from '../utils/storyCategories';
import { Color, Typography } from './index';
import { TypeStyleBellatrix, TypeStyleProcyon } from './typography.css';

const TypeStyleDiv = css => styled.div`
  ${css}

  margin: 5px 25px;
  width: 100px;
  padding-left: 5px;
  border-left: 3px solid ${Color.NEBULA};
  border-bottom: 1px solid ${Color.NEBULA};
`;

const renderTypeStyles = css => {
  const startIndexOfMixin = css.indexOf('font-size: ');
  const endIndexOfMixin = startIndexOfMixin ? startIndexOfMixin : 0;

  return css.substring(endIndexOfMixin);
};

const Styles = styled.div`
  ${TypeStyleBellatrix}

  white-space: pre-line;
  padding-left: 3px;
  margin: 5px 25px;
`;

const StyleWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  height: 100px;
  width: 225px;
  padding: 25px 0;
`;

const TypeStory = ({ style, name }) => {
  const Title = TypeStyleDiv(style);

  return (
    <StyleWrapper>
      <Title>{name}</Title>

      <Styles>{renderTypeStyles(`${style}`)}</Styles>
    </StyleWrapper>
  );
};

const Wrapper = styled.div`
  background-color: #ffffff;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
`;

storiesOf(`${CATEGORIES.STYLEGUIDE}Typography`, module).add('default', () => {
  const typeStyleKeys = Object.keys(Typography);

  return (
    <Wrapper>
      {typeStyleKeys.map(key => (
        <TypeStory key={key} style={Typography[key]} name={key} />
      ))}
    </Wrapper>
  );
});

const ColorPane = styled.div<{ name: string; backgroundColor: string }>`
  height: 300px;
  width: 225px;
  margin: 25px;
  background-color: ${props => props.backgroundColor};
  position: relative;
  border: 1px solid grey;
  display: inline-block;
  vertical-align: top;

  ${TypeStyleProcyon}

  &:before {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: black;
    content: '';
  }

  &:after {
    position: absolute;
    bottom: 10px;
    width: 95px;
    height: 45px;
    margin: 0 65px;
    background-color: black;
    color: ${Color.SUN};
    text-align: center;
    content: '${props => `${props.name} ${props.backgroundColor}`}';
    white-space: pre-wrap;
  }
`;

storiesOf(`${CATEGORIES.STYLEGUIDE}Color`, module).add('default', () => {
  const colorKeys = Object.keys(Color);

  return (
    <Wrapper>
      {colorKeys.map(key => (
        <ColorPane key={key} backgroundColor={Color[key]} name={key} />
      ))}
    </Wrapper>
  );
});
