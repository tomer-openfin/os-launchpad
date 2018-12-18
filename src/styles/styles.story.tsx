import * as React from 'react';
import styled, { FlattenInterpolation, ThemedStyledProps } from 'styled-components';

import { storiesOf } from '@storybook/react';

import { Theme } from '../types/commons';
import { Color } from './index';
import {
  TypeStyleAlgol,
  TypeStyleArcturus,
  TypeStyleBellatrix,
  TypeStyleCanopus,
  TypeStyleDeneb,
  TypeStyleEnif,
  TypeStyleNaos,
  TypeStylePolaris,
  TypeStylePollux,
  TypeStyleProcyon,
  TypeStyleProps,
  TypeStyleSirius,
  TypeStyleSol,
} from './typography.css';

type StyledCSS = Array<FlattenInterpolation<ThemedStyledProps<TypeStyleProps, Theme>>>;

const TypeStyleDiv = (css: StyledCSS) => styled.div<TypeStyleProps>`
  ${css};
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
  width: 100%;
  overflow-y: scroll;
`;

storiesOf('Styleguide/Typography', module).add('default', () => (
  <Wrapper>
    <TypeStory style={TypeStyleSirius} name={'Sirius'} />
    <TypeStory style={TypeStyleCanopus} name={'Canopus'} />
    <TypeStory style={TypeStyleArcturus} name={'Arcturus'} />
    <TypeStory style={TypeStyleProcyon} name={'Procyon'} />
    <TypeStory style={TypeStyleDeneb} name={'Deneb'} />
    <TypeStory style={TypeStylePollux} name={'Pollux'} />
    <TypeStory style={TypeStyleBellatrix} name={'Bellatrix'} />
    <TypeStory style={TypeStylePolaris} name={'Polaris'} />
    <TypeStory style={TypeStyleAlgol} name={'Algol'} />
    <TypeStory style={TypeStyleEnif} name={'Enif'} />
    <TypeStory style={TypeStyleNaos} name={'Naos'} />
    <TypeStory style={TypeStyleSol} name={'Sol'} />
  </Wrapper>
));

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

storiesOf('Styleguide/Color', module).add('default', () => (
  <Wrapper>
    <ColorPane backgroundColor={Color.SUN} name={'Sun'} />
    <ColorPane backgroundColor={Color.MERCURY} name={'Mercury'} />
    <ColorPane backgroundColor={Color.VENUS} name={'Venus'} />
    <ColorPane backgroundColor={Color.EARTH} name={'Earth'} />
    <ColorPane backgroundColor={Color.MARS} name={'Mars'} />
    <ColorPane backgroundColor={Color.ASTEROID_BELT} name={'Asteroid_Belt'} />
    <ColorPane backgroundColor={Color.JUPITER} name={'Jupiter'} />
    <ColorPane backgroundColor={Color.SATURN} name={'Saturn'} />
    <ColorPane backgroundColor={Color.URANUS} name={'Uranus'} />
    <ColorPane backgroundColor={Color.NEPTUNE} name={'Neptune'} />
    <ColorPane backgroundColor={Color.KUIPER_BELT} name={'Kuiper_Belt'} />
    <ColorPane backgroundColor={Color.PLUTO} name={'Pluto'} />
    <ColorPane backgroundColor={Color.NEBULA} name={'Nebula'} />
    <ColorPane backgroundColor={Color.COMET} name={'Comet'} />
    <ColorPane backgroundColor={Color.VACUUM} name={'Vacuum'} />
    <ColorPane backgroundColor={Color.VOID} name={'Void'} />
  </Wrapper>
));
