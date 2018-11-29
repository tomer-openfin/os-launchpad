import * as React from 'react';

import * as restoreLayoutIcon from '../../assets/RestoreLayout.svg';
import * as saveLayoutIcon from '../../assets/SaveLayout.svg';

import IconSpace from '../IconSpace';

import { LauncherPosition } from '../../types/commons';

import { Wrapper } from './Layouts.css';

interface Props {
  launcherPosition: LauncherPosition;
  onBlur: () => void;
  restoreCurrentLayout: () => void;
  saveCurrentLayout: () => void;
}

const Layouts = ({ launcherPosition, saveCurrentLayout, onBlur, restoreCurrentLayout }: Props) => {
  const handleClickCreator = fn => () => {
    onBlur();
    fn();
  };

  return (
    <Wrapper launcherPosition={launcherPosition}>
      <IconSpace iconImg={saveLayoutIcon} onClick={handleClickCreator(saveCurrentLayout)} hover />

      <IconSpace iconImg={restoreLayoutIcon} onClick={handleClickCreator(restoreCurrentLayout)} hover />
    </Wrapper>
  );
};

export default Layouts;
