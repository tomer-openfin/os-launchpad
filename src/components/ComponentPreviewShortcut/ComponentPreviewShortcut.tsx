import * as React from 'react';

import * as ShortcutArrow from '../../assets/ShortcutArrow.png';

import { Shortcut, ShortcutArrowImage, ShortcutImageWrapper, ShortcutText, StyledImg } from './ComponentPreviewShortcut.css';

interface Props {
  imageSrc: string;
  shortcutName: string;
}

const ComponentPreviewShortcut = ({ imageSrc, shortcutName }: Props) => {
  return (
    <Shortcut>
      <ShortcutImageWrapper>
        <StyledImg src={imageSrc} />
        <ShortcutArrowImage src={ShortcutArrow} />
      </ShortcutImageWrapper>
      <ShortcutText>{shortcutName}</ShortcutText>
    </Shortcut>
  );
};

export default ComponentPreviewShortcut;
