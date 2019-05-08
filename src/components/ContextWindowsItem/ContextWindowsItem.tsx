import * as React from 'react';

import * as EyeIcon from '../../assets/Eye.svg';

import { Color } from '../../styles';
import { Dot, Icon, Text, Wrapper } from './ContextWindowsItem.css';

interface Props {
  color: string;
  colorTitle: string;
  handleAdd: () => void;
  handlePreview: () => void;
  isPreviewActive?: boolean;
  name: string;
}

const ContextWindowsItem = ({ color, colorTitle, name, handleAdd, handlePreview, isPreviewActive }: Props) => (
  <Wrapper>
    <Dot color={color} title={colorTitle} />

    <Text title={name} onClick={handleAdd}>
      {name}
    </Text>

    <Icon
      hoverColor={Color.JUPITER}
      imgSrc={EyeIcon}
      onClick={handlePreview}
      size={15}
      isActive={isPreviewActive}
      title={isPreviewActive ? 'Close snapshot' : 'View snapshot'}
    />
  </Wrapper>
);

export default ContextWindowsItem;
